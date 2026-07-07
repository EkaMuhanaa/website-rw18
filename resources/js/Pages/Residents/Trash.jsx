import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Trash() {
    const { auth, residents, filters } = usePage().props;
    const isAdmin = auth.user.role === 'admin';
    const [selectedIds, setSelectedIds] = useState([]);
    
    // We only need useForm to handle array POST requests easily
    const form = useForm({ ids: [] });

    // Bulk Actions
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(residents.data.map(r => r.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectRow = (e, id) => {
        if (e.target.checked) {
            setSelectedIds([...selectedIds, id]);
        } else {
            setSelectedIds(selectedIds.filter(item => item !== id));
        }
    };

    const handleBulkRestore = () => {
        if (confirm(`Pulihkan ${selectedIds.length} data ke daftar warga?`)) {
            form.data.ids = selectedIds;
            form.post(route('residents.bulkRestore'), {
                onSuccess: () => setSelectedIds([])
            });
        }
    };

    const handleBulkForceDelete = () => {
        if (confirm(`PERINGATAN: Hapus permanen ${selectedIds.length} data? Data tidak dapat dikembalikan!`)) {
            form.data.ids = selectedIds;
            form.post(route('residents.bulkForceDelete'), {
                onSuccess: () => setSelectedIds([])
            });
        }
    };

    // Single Actions
    const handleRestore = (id) => {
        if (confirm('Pulihkan data ini?')) {
            form.post(route('residents.restore', id), {
                onSuccess: () => setSelectedIds(selectedIds.filter(item => item !== id))
            });
        }
    };

    const handleForceDelete = (id) => {
        if (confirm('PERINGATAN: Hapus data ini secara permanen?')) {
            form.delete(route('residents.forceDelete', id), {
                onSuccess: () => setSelectedIds(selectedIds.filter(item => item !== id))
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Tong Sampah Warga
                    </h2>
                    <Link href={route('residents.index')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded text-sm transition">
                        &larr; Kembali ke Data Warga
                    </Link>
                </div>
            }
        >
            <Head title="Tong Sampah Warga" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* Filter and Bulk Actions */}
                    <div className="mb-4 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <form className="flex gap-2 w-full sm:w-auto" method="GET" action={route('residents.trash')}>
                            <TextInput 
                                type="text" 
                                name="search"
                                placeholder="Cari Nama atau NIK..." 
                                className="w-full sm:w-64"
                                defaultValue={filters.search}
                            />
                            <SecondaryButton type="submit">Cari</SecondaryButton>
                        </form>
                        <div className="flex gap-2 items-center">
                            {isAdmin && selectedIds.length > 0 && (
                                <>
                                    <button onClick={handleBulkRestore} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition">
                                        Restore {selectedIds.length} Data
                                    </button>
                                    <DangerButton onClick={handleBulkForceDelete}>
                                        Hapus Permanen {selectedIds.length} Data
                                    </DangerButton>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {isAdmin && (
                                            <th className="px-6 py-3 text-left w-10">
                                                <input 
                                                    type="checkbox" 
                                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                                    onChange={handleSelectAll}
                                                    checked={residents.data.length > 0 && selectedIds.length === residents.data.length}
                                                />
                                            </th>
                                        )}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK / No KK</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L/P</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dihapus Pada</th>
                                        {isAdmin && (
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {residents.data && residents.data.length > 0 ? (
                                        residents.data.map((resident) => (
                                            <tr key={resident.id} className="hover:bg-gray-50">
                                                {isAdmin && (
                                                    <td className="px-6 py-4 w-10">
                                                        <input 
                                                            type="checkbox" 
                                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                            checked={selectedIds.includes(resident.id)}
                                                            onChange={(e) => handleSelectRow(e, resident.id)}
                                                        />
                                                    </td>
                                                )}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div className="font-semibold">{resident.nik}</div>
                                                    <div className="text-gray-500 text-xs">KK: {resident.kk}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {resident.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {resident.gender === 'Laki-laki' ? 'L' : 'P'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(resident.deleted_at).toLocaleString('id-ID')}
                                                </td>
                                                {isAdmin && (
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                        <button onClick={() => handleRestore(resident.id)} className="text-indigo-600 hover:text-indigo-900 mr-3 font-semibold">Restore</button>
                                                        <button onClick={() => handleForceDelete(resident.id)} className="text-red-600 hover:text-red-900 font-semibold">Hapus Permanen</button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={isAdmin ? 6 : 4} className="px-6 py-4 text-center text-sm text-gray-500">
                                                Tidak ada data warga di tong sampah.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 flex justify-between items-center">
                            <div className="text-sm text-gray-700">
                                Menampilkan {residents.from || 0} - {residents.to || 0} dari {residents.total}
                            </div>
                            <div className="flex gap-2">
                                {residents.prev_page_url && (
                                    <Link href={residents.prev_page_url} className="px-3 py-1 border rounded bg-white hover:bg-gray-50 text-sm">Sebelumnya</Link>
                                )}
                                {residents.next_page_url && (
                                    <Link href={residents.next_page_url} className="px-3 py-1 border rounded bg-white hover:bg-gray-50 text-sm">Selanjutnya</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
