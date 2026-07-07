<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Resident;
use App\Models\Asset;
use App\Models\Agenda;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // 1. Hitung Total Warga
        // Jika Ketua RT, maka filter sesuai RT-nya
        $residentQuery = Resident::query();
        if ($user->role === 'ketua_rt') {
            $residentQuery->where('rt', $user->rt_managed);
        }
        $totalResidents = $residentQuery->count();

        // 2. Hitung Total Aset
        $totalAssets = Asset::sum('quantity');

        // 3. Ambil Agenda Mendatang (Maksimal 3)
        $upcomingAgendas = Agenda::where('event_date', '>=', now()->toDateString())
            ->orderBy('event_date', 'asc')
            ->take(3)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_residents' => $totalResidents,
                'total_assets' => (int) $totalAssets,
                'upcoming_agendas_count' => Agenda::where('event_date', '>=', now()->toDateString())->count(),
            ],
            'upcomingAgendas' => $upcomingAgendas
        ]);
    }
}
