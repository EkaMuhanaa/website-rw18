<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

    Route::get('/', [\App\Http\Controllers\PublicController::class, 'home'])->name('public.home');
    Route::get('/profil', [\App\Http\Controllers\PublicController::class, 'profil'])->name('public.profil');
    Route::get('/struktur', [\App\Http\Controllers\PublicController::class, 'struktur'])->name('public.struktur');
    Route::get('/aset', [\App\Http\Controllers\PublicController::class, 'aset'])->name('public.aset');
    Route::get('/agenda', [\App\Http\Controllers\PublicController::class, 'agenda'])->name('public.agenda');
    Route::get('/dokumentasi', [\App\Http\Controllers\PublicController::class, 'dokumentasi'])->name('public.dokumentasi');
    Route::get('/kontak', [\App\Http\Controllers\PublicController::class, 'kontak'])->name('public.kontak');

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/users', [\App\Http\Controllers\UserController::class, 'index'])->name('users.index');
    Route::post('/users', [\App\Http\Controllers\UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [\App\Http\Controllers\UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [\App\Http\Controllers\UserController::class, 'destroy'])->name('users.destroy');

    Route::get('/assets', [\App\Http\Controllers\AssetController::class, 'index'])->name('assets.index');
    Route::post('/assets', [\App\Http\Controllers\AssetController::class, 'store'])->name('assets.store');
    Route::put('/assets/{asset}', [\App\Http\Controllers\AssetController::class, 'update'])->name('assets.update');
    Route::delete('/assets/{asset}', [\App\Http\Controllers\AssetController::class, 'destroy'])->name('assets.destroy');

    Route::get('/agendas', [\App\Http\Controllers\AgendaController::class, 'index'])->name('agendas.index');
    Route::post('/agendas', [\App\Http\Controllers\AgendaController::class, 'store'])->name('agendas.store');
    Route::put('/agendas/{agenda}', [\App\Http\Controllers\AgendaController::class, 'update'])->name('agendas.update');
    Route::delete('/agendas/{agenda}', [\App\Http\Controllers\AgendaController::class, 'destroy'])->name('agendas.destroy');

    Route::get('/galleries', [\App\Http\Controllers\GalleryController::class, 'index'])->name('galleries.index');
    Route::post('/galleries', [\App\Http\Controllers\GalleryController::class, 'store'])->name('galleries.store');
    // For file uploads in PUT/PATCH requests in Laravel, it's often easier to use POST and method spoofing `_method=PUT`
    Route::post('/galleries/{gallery}', [\App\Http\Controllers\GalleryController::class, 'update'])->name('galleries.update');
    Route::delete('/galleries/{gallery}', [\App\Http\Controllers\GalleryController::class, 'destroy'])->name('galleries.destroy');

    Route::get('/residents/trash', [\App\Http\Controllers\ResidentController::class, 'trash'])->name('residents.trash');
    Route::post('/residents/bulk-destroy', [\App\Http\Controllers\ResidentController::class, 'bulkDestroy'])->name('residents.bulkDestroy');
    Route::post('/residents/{id}/restore', [\App\Http\Controllers\ResidentController::class, 'restore'])->name('residents.restore');
    Route::post('/residents/bulk-restore', [\App\Http\Controllers\ResidentController::class, 'bulkRestore'])->name('residents.bulkRestore');
    Route::delete('/residents/{id}/force', [\App\Http\Controllers\ResidentController::class, 'forceDelete'])->name('residents.forceDelete');
    Route::post('/residents/bulk-force-delete', [\App\Http\Controllers\ResidentController::class, 'bulkForceDelete'])->name('residents.bulkForceDelete');

    Route::resource('residents', \App\Http\Controllers\ResidentController::class);
});

require __DIR__.'/auth.php';
