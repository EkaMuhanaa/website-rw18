<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin User
        User::factory()->create([
            'name' => 'Admin Utama',
            'email' => 'admin@rw.com',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);

        User::factory()->create([
            'name' => 'Ketua RW Sumanang',
            'email' => 'ketua@rw.com',
            'password' => bcrypt('password'),
            'role' => 'ketua_rw'
        ]);

        User::factory()->create([
            'name' => 'Ketua RT 01',
            'email' => 'rt01@rw.com',
            'password' => bcrypt('password'),
            'role' => 'ketua_rt',
            'rt_managed' => '01'
        ]);

        // Dummy Asset
        \App\Models\Asset::create([
            'name' => 'Tenda Hajatan 3x3',
            'category' => 'Properti',
            'quantity' => 2,
            'condition' => 'Baik',
            'location' => 'Gudang Balai Warga',
            'acquired_year' => 2022
        ]);

        // Dummy Agenda
        \App\Models\Agenda::create([
            'title' => 'Rapat Bulanan Warga',
            'description' => 'Membahas program kerja bulanan dan laporan keuangan',
            'event_date' => now()->addDays(3)->format('Y-m-d'),
            'event_time' => '19:30:00',
            'location' => 'Balai Warga RW 018',
            'pic' => 'Sekretaris RW'
        ]);
    }
}
