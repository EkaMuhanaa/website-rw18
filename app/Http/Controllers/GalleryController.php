<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Gallery::with('images');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('title', 'like', "%{$search}%");
        }

        $galleries = $query->latest('event_date')->paginate(10)->withQueryString();

        return Inertia::render('Galleries/Index', [
            'galleries' => $galleries,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat menambah dokumentasi.');

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'event_date' => 'required|date',
            'gdrive_link' => 'nullable|url|max:255',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:5120' // max 5MB per image
        ]);

        $gallery = Gallery::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'event_date' => $validated['event_date'],
            'gdrive_link' => $validated['gdrive_link'],
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('galleries', 'public');
                GalleryImage::create([
                    'gallery_id' => $gallery->id,
                    'image_path' => $path
                ]);
            }
        }

        return redirect()->back()->with('success', 'Dokumentasi kegiatan berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gallery $gallery)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat mengubah dokumentasi.');

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'event_date' => 'required|date',
            'gdrive_link' => 'nullable|url|max:255',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:5120',
            'remove_image_ids' => 'nullable|array', // IDs of images to remove
        ]);

        $gallery->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'event_date' => $validated['event_date'],
            'gdrive_link' => $validated['gdrive_link'],
        ]);

        // Hapus gambar lama jika ada
        if ($request->filled('remove_image_ids')) {
            $imagesToRemove = GalleryImage::whereIn('id', $request->remove_image_ids)
                                          ->where('gallery_id', $gallery->id)
                                          ->get();
            
            foreach ($imagesToRemove as $img) {
                Storage::disk('public')->delete($img->image_path);
                $img->delete();
            }
        }

        // Tambah gambar baru jika ada
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('galleries', 'public');
                GalleryImage::create([
                    'gallery_id' => $gallery->id,
                    'image_path' => $path
                ]);
            }
        }

        return redirect()->back()->with('success', 'Dokumentasi kegiatan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Gallery $gallery)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat menghapus dokumentasi.');

        foreach ($gallery->images as $img) {
            Storage::disk('public')->delete($img->image_path);
        }
        
        $gallery->delete(); // automatically deletes images if DB cascades, but since we didn't specify cascade, we delete manually or just rely on Eloquent. Wait, GalleryImage doesn't cascade by default unless specified in migration. Let's delete them.
        $gallery->images()->delete();

        return redirect()->back()->with('success', 'Dokumentasi kegiatan berhasil dihapus.');
    }
}
