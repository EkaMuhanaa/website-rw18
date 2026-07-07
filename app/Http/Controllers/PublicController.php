<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Agenda;
use App\Models\Asset;
use App\Models\Gallery;

class PublicController extends Controller
{
    public function home()
    {
        // Ambil 3 agenda terdekat (event_date >= hari ini)
        $upcomingAgendas = Agenda::where('event_date', '>=', date('Y-m-d'))
            ->orderBy('event_date', 'asc')
            ->take(3)
            ->get();

        // Ambil 3 dokumentasi terbaru
        $recentGalleries = Gallery::with('images')
            ->orderBy('event_date', 'desc')
            ->take(3)
            ->get();

        return Inertia::render('Public/Home', [
            'upcomingAgendas' => $upcomingAgendas,
            'recentGalleries' => $recentGalleries,
        ]);
    }

    public function profil()
    {
        return Inertia::render('Public/Profil');
    }

    public function struktur()
    {
        return Inertia::render('Public/Struktur');
    }

    public function aset()
    {
        $assets = Asset::orderBy('category')->get();
        
        return Inertia::render('Public/Aset', [
            'assets' => $assets
        ]);
    }

    public function agenda()
    {
        // Semua agenda mulai dari hari ini ke depan
        $agendas = Agenda::where('event_date', '>=', date('Y-m-d'))
            ->orderBy('event_date', 'asc')
            ->get();

        return Inertia::render('Public/Agenda', [
            'agendas' => $agendas
        ]);
    }

    public function dokumentasi()
    {
        $galleries = Gallery::with('images')
            ->orderBy('event_date', 'desc')
            ->paginate(12);

        return Inertia::render('Public/Dokumentasi', [
            'galleries' => $galleries
        ]);
    }

    public function kontak()
    {
        return Inertia::render('Public/Kontak');
    }
}
