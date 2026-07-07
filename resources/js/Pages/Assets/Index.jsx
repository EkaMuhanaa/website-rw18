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
    const { assets, filters, auth } = usePage().props;
    const isAdmin = auth.user.role === 'admin';

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingAsset, setEditingAsset] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '', category: 'Elektronik', quantity: 1, condition: 'Baik', location: '', acquired_year: ''
    });

    const openAddModal = () => {
        setEditingAsset(null);
        setData({ name: '', category: 'Elektronik', quantity: 1, condition: 'Baik', location: '', acquired_year: '' });
        clearErrors();
        setIsFormModalOpen(true);
    };

    const openEditModal = (asset) => {
        setEditingAsset(asset);
        setData({
            name: asset.name,
            category: asset.category,
            quantity: asset.quantity,
            condition: asset.condition,
            location: asset.location,
            acquired_year: asset.acquired_year || ''
        });
        clearErrors();
        setIsFormModalOpen(true);
    };

    const openDeleteModal = (asset) => {
        setEditingAsset(asset);
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
        if (editingAsset) {
            put(route('assets.update', editingAsset.id), {
                onSuccess: () => closeModals(),
            });
        } else {
            post(route('assets.store'), {
                onSuccess: () => closeModals(),
            });
        }
    };

    const submitDelete = (e) => {
        e.preventDefault();
        destroy(route('assets.destroy', editingAsset.id), {
            onSuccess: () => closeModals(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Inventaris Aset RW</h2>
                    {isAdmin && (
                        <PrimaryButton onClick={openAddModal}>+ Tambah Aset</PrimaryButton>
                    )}
                </div>
            }
        >
            <Head title="Inventaris Aset" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* Filter and Search Bar */}
                    <div className="mb-4 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <form className="flex gap-2 w-full sm:w-auto" method="GET" action={route('assets.index')}>
                            <TextInput 
                                type="text" 
                                name="search"
                                placeholder="Cari Nama Aset atau Kategori..." 
                                className="w-full sm:w-80"
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
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Aset</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kondisi / Qty</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi (Tahun)</th>
                                        {isAdmin && (
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {assets.data && assets.data.length > 0 ? (
                                        assets.data.map((asset) => (
                                            <tr key={asset.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {asset.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {asset.category}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${asset.condition === 'Baik' ? 'bg-green-100 text-green-800' : 
                                                          asset.condition === 'Rusak Ringan' ? 'bg-yellow-100 text-yellow-800' : 
                                                          'bg-red-100 text-red-800'}`}>
                                                        {asset.condition}
                                                    </span>
                                                    <span className="ml-2 text-gray-500">({asset.quantity} unit)</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {asset.location} {asset.acquired_year && <span>({asset.acquired_year})</span>}
                                                </td>
                                                {isAdmin && (
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                        <button onClick={() => openEditModal(asset)} className="text-indigo-600 hover:text-indigo-900 mr-3 font-semibold">Edit</button>
                                                        <button onClick={() => openDeleteModal(asset)} className="text-red-600 hover:text-red-900 font-semibold">Hapus</button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={isAdmin ? 5 : 4} className="px-6 py-4 text-center text-sm text-gray-500">Tidak ada data aset yang ditemukan.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 flex justify-between items-center">
                            <div className="text-sm text-gray-700">
                                Menampilkan {assets.from || 0} - {assets.to || 0} dari {assets.total}
                            </div>
                            <div className="flex gap-2">
                                {assets.prev_page_url && (
                                    <Link href={assets.prev_page_url} className="px-3 py-1 border rounded bg-white hover:bg-gray-50 text-sm">Sebelumnya</Link>
                                )}
                                {assets.next_page_url && (
                                    <Link href={assets.next_page_url} className="px-3 py-1 border rounded bg-white hover:bg-gray-50 text-sm">Selanjutnya</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Form Add/Edit */}
            {isAdmin && (
                <Modal show={isFormModalOpen} onClose={closeModals} maxWidth="xl">
                    <form onSubmit={submitForm} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-6">
                            {editingAsset ? 'Edit Data Aset' : 'Tambah Aset Baru'}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <InputLabel htmlFor="name" value="Nama Aset" />
                                <TextInput id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full" required />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="category" value="Kategori" />
                                <select id="category" name="category" value={data.category} onChange={(e) => setData('category', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" required>
                                    <option value="Elektronik">Elektronik</option>
                                    <option value="Furnitur">Furnitur</option>
                                    <option value="Properti">Properti</option>
                                    <option value="Peralatan Tenda">Peralatan Tenda</option>
                                    <option value="Kendaraan">Kendaraan</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                                <InputError message={errors.category} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="condition" value="Kondisi Aset" />
                                <select id="condition" name="condition" value={data.condition} onChange={(e) => setData('condition', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" required>
                                    <option value="Baik">Baik</option>
                                    <option value="Rusak Ringan">Rusak Ringan</option>
                                    <option value="Rusak Berat">Rusak Berat</option>
                                </select>
                                <InputError message={errors.condition} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="quantity" value="Jumlah (Unit)" />
                                <TextInput id="quantity" type="number" min="1" name="quantity" value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} className="mt-1 block w-full" required />
                                <InputError message={errors.quantity} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="acquired_year" value="Tahun Perolehan (Opsional)" />
                                <TextInput id="acquired_year" type="number" min="1900" max={new Date().getFullYear()} name="acquired_year" value={data.acquired_year} onChange={(e) => setData('acquired_year', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.acquired_year} className="mt-2" />
                            </div>
                            <div className="md:col-span-2">
                                <InputLabel htmlFor="location" value="Lokasi Penyimpanan" />
                                <TextInput id="location" name="location" value={data.location} onChange={(e) => setData('location', e.target.value)} className="mt-1 block w-full" required />
                                <InputError message={errors.location} className="mt-2" />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <SecondaryButton onClick={closeModals}>Batal</SecondaryButton>
                            <PrimaryButton disabled={processing}>Simpan Data</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Modal Delete */}
            {isAdmin && (
                <Modal show={isDeleteModalOpen} onClose={closeModals} maxWidth="sm">
                    <form onSubmit={submitDelete} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">Hapus Aset</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Anda yakin ingin menghapus aset <strong>{editingAsset?.name}</strong> secara permanen?
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <SecondaryButton onClick={closeModals}>Batal</SecondaryButton>
                            <DangerButton disabled={processing}>Hapus Aset</DangerButton>
                        </div>
                    </form>
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}
