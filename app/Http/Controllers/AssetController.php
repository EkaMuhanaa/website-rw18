<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Asset::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
        }

        $assets = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Assets/Index', [
            'assets' => $assets,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat menambah data aset.');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'quantity' => 'required|integer|min:1',
            'condition' => 'required|in:Baik,Rusak Ringan,Rusak Berat',
            'location' => 'required|string|max:255',
            'acquired_year' => 'nullable|integer|min:1900|max:'.date('Y'),
        ]);

        Asset::create($validated);

        return redirect()->back()->with('success', 'Data aset berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Asset $asset)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat mengubah data aset.');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'quantity' => 'required|integer|min:1',
            'condition' => 'required|in:Baik,Rusak Ringan,Rusak Berat',
            'location' => 'required|string|max:255',
            'acquired_year' => 'nullable|integer|min:1900|max:'.date('Y'),
        ]);

        $asset->update($validated);

        return redirect()->back()->with('success', 'Data aset berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Asset $asset)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat menghapus data aset.');

        $asset->delete();

        return redirect()->back()->with('success', 'Data aset berhasil dihapus.');
    }
}
