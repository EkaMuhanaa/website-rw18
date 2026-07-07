import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Index() {
    const { users, filters, auth } = usePage().props;
    const currentUserId = auth.user.id;

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '', email: '', password: '', role: 'pengurus', rt_managed: ''
    });

    const openAddModal = () => {
        setEditingUser(null);
        setData({ name: '', email: '', password: '', role: 'pengurus', rt_managed: '' });
        clearErrors();
        setIsFormModalOpen(true);
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setData({
            name: user.name,
            email: user.email,
            password: '', // Kosongkan password saat edit, nanti bisa dipakai untuk reset
            role: user.role,
            rt_managed: user.rt_managed || ''
        });
        clearErrors();
        setIsFormModalOpen(true);
    };

    const openDeleteModal = (user) => {
        setEditingUser(user);
        setIsDeleteModalOpen(true);
    };

    const closeModals = () => {
        setIsFormModalOpen(false);
        setIsDeleteModalOpen(false);
        reset();
        clearErrors();
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (editingUser) {
            put(route('users.update', editingUser.id), {
                onSuccess: () => closeModals(),
            });
        } else {
            post(route('users.store'), {
                onSuccess: () => closeModals(),
            });
        }
    };

    const submitDelete = (e) => {
        e.preventDefault();
        destroy(route('users.destroy', editingUser.id), {
            onSuccess: () => closeModals(),
        });
    };

    const getRoleName = (role) => {
        const roles = {
            'admin': 'Admin Utama',
            'ketua_rw': 'Ketua RW',
            'ketua_rt': 'Ketua RT',
            'bendahara': 'Bendahara',
            'pengurus': 'Pengurus'
        };
        return roles[role] || role;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Manajemen Akun Terdaftar</h2>
                    <PrimaryButton onClick={openAddModal}>+ Tambah Akun Baru</PrimaryButton>
                </div>
            }
        >
            <Head title="Manajemen Akun" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* Filter and Search Bar */}
                    <div className="mb-4 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <form className="flex gap-2 w-full sm:w-auto" method="GET" action={route('users.index')}>
                            <TextInput 
                                type="text" 
                                name="search"
                                placeholder="Cari Nama atau Email..." 
                                className="w-full sm:w-64"
                                defaultValue={filters.search}
                            />
                            <SecondaryButton type="submit">Cari</SecondaryButton>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terdaftar Pada</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.data && users.data.length > 0 ? (
                                        users.data.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {getRoleName(user.role)} {user.role === 'ketua_rt' ? `(${user.rt_managed})` : ''}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(user.created_at).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                    <button onClick={() => openEditModal(user)} className="text-indigo-600 hover:text-indigo-900 mr-3 font-semibold">Edit</button>
                                                    {currentUserId !== user.id && (
                                                        <button onClick={() => openDeleteModal(user)} className="text-red-600 hover:text-red-900 font-semibold">Hapus</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">Tidak ada akun yang ditemukan.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 flex justify-between items-center">
                            <div className="text-sm text-gray-700">
                                Menampilkan {users.from || 0} - {users.to || 0} dari {users.total}
                            </div>
                            <div className="flex gap-2">
                                {users.prev_page_url && (
                                    <Link href={users.prev_page_url} className="px-3 py-1 border rounded bg-white hover:bg-gray-50 text-sm">Sebelumnya</Link>
                                )}
                                {users.next_page_url && (
                                    <Link href={users.next_page_url} className="px-3 py-1 border rounded bg-white hover:bg-gray-50 text-sm">Selanjutnya</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Form Add/Edit */}
            <Modal show={isFormModalOpen} onClose={closeModals} maxWidth="xl">
                <form onSubmit={submitForm} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">
                        {editingUser ? 'Edit Akses Akun' : 'Tambah Akun Baru'}
                    </h2>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <InputLabel htmlFor="name" value="Nama Lengkap" />
                            <TextInput id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full" required />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput id="email" type="email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1 block w-full" required />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        {!editingUser && (
                            <div>
                                <InputLabel htmlFor="password" value="Kata Sandi (Password)" />
                                <TextInput id="password" type="text" name="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="mt-1 block w-full" placeholder="Minimal 8 karakter" required />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                        )}
                        <div>
                            <InputLabel htmlFor="role" value="Peran Akses (Role)" />
                            <select id="role" name="role" value={data.role} onChange={(e) => setData('role', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" required>
                                <option value="admin">Admin Utama</option>
                                <option value="ketua_rw">Ketua RW</option>
                                <option value="ketua_rt">Ketua RT</option>
                                <option value="bendahara">Bendahara</option>
                            </select>
                            <InputError message={errors.role} className="mt-2" />
                        </div>
                        {data.role === 'ketua_rt' && (
                            <div>
                                <InputLabel htmlFor="rt_managed" value="Nomor RT (Contoh: 01)" />
                                <TextInput id="rt_managed" name="rt_managed" value={data.rt_managed} onChange={(e) => setData('rt_managed', e.target.value)} className="mt-1 block w-full" required={data.role === 'ketua_rt'} />
                                <InputError message={errors.rt_managed} className="mt-2" />
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModals}>Batal</SecondaryButton>
                        <PrimaryButton disabled={processing}>Simpan Data</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Modal Delete */}
            <Modal show={isDeleteModalOpen} onClose={closeModals} maxWidth="sm">
                <form onSubmit={submitDelete} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Hapus Akun</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Anda yakin ingin menghapus akun <strong>{editingUser?.name}</strong>? Akun ini akan dihapus permanen.
                    </p>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModals}>Batal</SecondaryButton>
                        <DangerButton disabled={processing}>Hapus Permanen</DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
