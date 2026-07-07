<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat mengakses halaman ini.');

        $query = User::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search'])
        ]);
    }

    public function store(Request $request)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat menambah data.');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,ketua_rw,bendahara,ketua_rt',
            'rt_managed' => 'nullable|string|max:5',
        ]);

        if ($validated['role'] !== 'ketua_rt') {
            $validated['rt_managed'] = null;
        }

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'],
            'rt_managed' => $validated['rt_managed'],
        ]);

        return redirect()->back()->with('success', 'Akun baru berhasil ditambahkan.');
    }

    public function update(Request $request, User $user)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat mengubah data.');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,'.$user->id,
            'role' => 'required|in:admin,ketua_rw,bendahara,ketua_rt',
            'rt_managed' => 'nullable|string|max:5',
        ]);

        if ($validated['role'] !== 'ketua_rt') {
            $validated['rt_managed'] = null;
        }

        $user->update($validated);

        return redirect()->back()->with('success', 'Data Akun berhasil diperbarui.');
    }

    public function destroy(Request $request, User $user)
    {
        abort_if($request->user()->role !== 'admin', 403, 'Hanya Admin yang dapat menghapus data.');
        
        // Mencegah admin menghapus dirinya sendiri
        abort_if($request->user()->id === $user->id, 403, 'Anda tidak dapat menghapus akun Anda sendiri.');

        $user->delete();

        return redirect()->back()->with('success', 'Akun berhasil dihapus permanen.');
    }
}
