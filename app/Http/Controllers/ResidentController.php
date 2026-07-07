<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resident;
use Inertia\Inertia;

class ResidentController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Resident::query();

        // 1. Role Based Filtering (Ketua RT hanya melihat warganya)
        if ($user->role === 'ketua_rt') {
            $query->where('rt', $user->rt_managed);
        }

        // 2. Search by Name or NIK
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%");
            });
        }

        // 3. Filter by RT & Block
        if ($request->filled('rt') && $user->role !== 'ketua_rt') {
            $query->where('rt', $request->rt);
        }
        if ($request->filled('block')) {
            $query->where('block', $request->block);
        }

        $residents = $query->latest('entry_date')->paginate(10)->withQueryString();

        return Inertia::render('Residents/Index', [
            'residents' => $residents,
            'filters' => $request->only(['search', 'rt', 'block'])
        ]);
    }

    public function store(Request $request)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat mengubah data.');

        $validated = $request->validate([
            'nik' => 'required|string|max:16|unique:residents,nik',
            'kk' => 'required|string|max:16',
            'name' => 'required|string|max:255',
            'gender' => 'required|in:Laki-laki,Perempuan',
            'birth_place' => 'required|string|max:100',
            'birth_date' => 'required|date',
            'religion' => 'required|string|max:50',
            'education' => 'required|string|max:100',
            'occupation' => 'required|string|max:100',
            'marital_status' => 'required|string|max:50',
            'phone' => 'nullable|string|max:20',
            'address' => 'required|string',
            'rt' => 'required|string|max:3',
            'rw' => 'required|string|max:3',
            'block' => 'nullable|string|max:10',
            'residency_status' => 'required|in:Tetap,Kontrak/Kos',
            'entry_date' => 'required|date',
        ]);

        Resident::create($validated);
        return redirect()->back()->with('success', 'Data Warga berhasil ditambahkan.');
    }

    public function update(Request $request, Resident $resident)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat mengubah data.');

        $validated = $request->validate([
            'nik' => 'required|string|max:16|unique:residents,nik,'.$resident->id,
            'kk' => 'required|string|max:16',
            'name' => 'required|string|max:255',
            'gender' => 'required|in:Laki-laki,Perempuan',
            'birth_place' => 'required|string|max:100',
            'birth_date' => 'required|date',
            'religion' => 'required|string|max:50',
            'education' => 'required|string|max:100',
            'occupation' => 'required|string|max:100',
            'marital_status' => 'required|string|max:50',
            'phone' => 'nullable|string|max:20',
            'address' => 'required|string',
            'rt' => 'required|string|max:3',
            'rw' => 'required|string|max:3',
            'block' => 'nullable|string|max:10',
            'residency_status' => 'required|in:Tetap,Kontrak/Kos',
            'entry_date' => 'required|date',
        ]);

        $resident->update($validated);
        return redirect()->back()->with('success', 'Data Warga berhasil diperbarui.');
    }

    public function destroy(Request $request, Resident $resident)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat menghapus data.');
        $resident->delete();
        return redirect()->back()->with('success', 'Data Warga berhasil dipindahkan ke sampah.');
    }

    public function bulkDestroy(Request $request)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat menghapus data.');
        $request->validate(['ids' => 'required|array']);
        Resident::whereIn('id', $request->ids)->delete();
        return redirect()->back()->with('success', 'Data warga terpilih berhasil dipindahkan ke sampah.');
    }

    public function trash(Request $request)
    {
        $user = $request->user();
        $query = Resident::onlyTrashed();

        if ($user->role === 'ketua_rt') {
            $query->where('rt', $user->rt_managed);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%");
            });
        }

        $residents = $query->latest('deleted_at')->paginate(10)->withQueryString();

        return Inertia::render('Residents/Trash', [
            'residents' => $residents,
            'filters' => $request->only(['search'])
        ]);
    }

    public function restore(Request $request, $id)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat memulihkan data.');
        Resident::onlyTrashed()->findOrFail($id)->restore();
        return redirect()->back()->with('success', 'Data warga berhasil dipulihkan.');
    }

    public function bulkRestore(Request $request)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat memulihkan data.');
        $request->validate(['ids' => 'required|array']);
        Resident::onlyTrashed()->whereIn('id', $request->ids)->restore();
        return redirect()->back()->with('success', 'Data warga terpilih berhasil dipulihkan.');
    }

    public function forceDelete(Request $request, $id)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat menghapus permanen data.');
        Resident::onlyTrashed()->findOrFail($id)->forceDelete();
        return redirect()->back()->with('success', 'Data warga berhasil dihapus permanen.');
    }

    public function bulkForceDelete(Request $request)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat menghapus permanen data.');
        $request->validate(['ids' => 'required|array']);
        Resident::onlyTrashed()->whereIn('id', $request->ids)->forceDelete();
        return redirect()->back()->with('success', 'Data warga terpilih berhasil dihapus permanen.');
    }
}
