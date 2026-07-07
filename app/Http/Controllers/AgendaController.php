<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Agenda::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('pic', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
        }

        $agendas = $query->orderBy('event_date', 'asc')->paginate(10)->withQueryString();

        return Inertia::render('Agendas/Index', [
            'agendas' => $agendas,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat menambah agenda.');

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'event_date' => 'required|date',
            'event_time' => 'required',
            'location' => 'required|string|max:255',
            'pic' => 'required|string|max:255',
        ]);

        Agenda::create($validated);

        return redirect()->back()->with('success', 'Agenda kegiatan berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Agenda $agenda)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat mengubah agenda.');

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'event_date' => 'required|date',
            'event_time' => 'required',
            'location' => 'required|string|max:255',
            'pic' => 'required|string|max:255',
        ]);

        $agenda->update($validated);

        return redirect()->back()->with('success', 'Agenda kegiatan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Agenda $agenda)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat menghapus agenda.');

        $agenda->delete();

        return redirect()->back()->with('success', 'Agenda kegiatan berhasil dihapus.');
    }
}
