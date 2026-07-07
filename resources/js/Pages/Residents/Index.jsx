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
    const { auth, residents, filters } = usePage().props;
    const isAdmin = auth.user.role === 'admin';
    
    // States for Modals
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingResident, setEditingResident] = useState(null);

    // Checkbox State
    const [selectedIds, setSelectedIds] = useState([]);

    // Form handling using Inertia useForm
    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        nik: '', kk: '', name: '', gender: 'Laki-laki', birth_place: '', birth_date: '',
        religion: '', education: '', occupation: '', marital_status: 'Belum Kawin',
        phone: '', address: '', rt: '', rw: '', block: '', residency_status: 'Tetap', entry_date: ''
    });

    const openAddModal = () => {
        setEditingResident(null);
        reset();
        clearErrors();
        setIsFormModalOpen(true);
    };

    const openEditModal = (resident) => {
        setEditingResident(resident);
        setData({
            nik: resident.nik || '', kk: resident.kk || '', name: resident.name || '',
            gender: resident.gender || 'Laki-laki', birth_place: resident.birth_place || '',
            birth_date: resident.birth_date || '', religion: resident.religion || '',
            education: resident.education || '', occupation: resident.occupation || '',
            marital_status: resident.marital_status || 'Belum Kawin', phone: resident.phone || '',
            address: resident.address || '', rt: resident.rt || '', rw: resident.rw || '',
            block: resident.block || '', residency_status: resident.residency_status || 'Tetap',
            entry_date: resident.entry_date || ''
        });
        clearErrors();
        setIsFormModalOpen(true);
    };

    const openDeleteModal = (resident) => {
        setEditingResident(resident);
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
        if (editingResident) {
            put(route('residents.update', editingResident.id), {
                onSuccess: () => closeModals(),
            });
        } else {
            post(route('residents.store'), {
                onSuccess: () => closeModals(),
            });
        }
    };

    const submitDelete = (e) => {
        e.preventDefault();
        destroy(route('residents.destroy', editingResident.id), {
            onSuccess: () => {
                closeModals();
                setSelectedIds(selectedIds.filter(id => id !== editingResident.id)); // Remove from selection if deleted individually
            },
        });
    };

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

    const handleBulkDelete = () => {
        if (confirm(`Apakah Anda yakin ingin memindahkan ${selectedIds.length} data ke sampah?`)) {
            useForm({ ids: selectedIds }).post(route('residents.bulkDestroy'), {
                onSuccess: () => setSelectedIds([])
            });
        }
    };

    // Helper for input onChange
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Data Warga</h2>
                    <div className="flex gap-2">
                        {isAdmin && (
                            <Link href={route('residents.trash')} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-sm transition">
                                Tong Sampah
                            </Link>
                        )}
                        {isAdmin && (
                            <PrimaryButton onClick={openAddModal}>+ Tambah Warga</PrimaryButton>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Data Warga" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* Filter and Search Bar */}
                    <div className="mb-4 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <form className="flex gap-2 w-full sm:w-auto" method="GET" action={route('residents.index')}>
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
                                <DangerButton onClick={handleBulkDelete}>
                                    Hapus {selectedIds.length} Data
                                </DangerButton>
                            )}
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition ease-in-out duration-150">
                                Import Excel
                            </button>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition ease-in-out duration-150">
                                Export PDF
                            </button>
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
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat / Blok / RT</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                                                    <div>{resident.address}</div>
                                                    <div className="text-xs">Blok {resident.block || '-'} | RT {resident.rt}/RW {resident.rw}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${resident.residency_status === 'Tetap' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {resident.residency_status}
                                                    </span>
                                                </td>
                                                {isAdmin && (
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                        <button onClick={() => openEditModal(resident)} className="text-indigo-600 hover:text-indigo-900 mr-3 font-semibold">Edit</button>
                                                        <button onClick={() => openDeleteModal(resident)} className="text-red-600 hover:text-red-900 font-semibold">Hapus</button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={isAdmin ? 7 : 5} className="px-6 py-4 text-center text-sm text-gray-500">Tidak ada data warga yang ditemukan.</td>
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

            {/* Modal Form Add/Edit */}
            <Modal show={isFormModalOpen} onClose={closeModals} maxWidth="3xl">
                <form onSubmit={submitForm} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">
                        {editingResident ? 'Edit Data Warga' : 'Tambah Warga Baru'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* NIK & KK */}
                        <div>
                            <InputLabel htmlFor="nik" value="NIK" />
                            <TextInput id="nik" name="nik" value={data.nik} onChange={handleChange} className="mt-1 block w-full" required />
                            <InputError message={errors.nik} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="kk" value="No. Kartu Keluarga" />
                            <TextInput id="kk" name="kk" value={data.kk} onChange={handleChange} className="mt-1 block w-full" required />
                            <InputError message={errors.kk} className="mt-2" />
                        </div>

                        {/* Nama & Gender */}
                        <div>
                            <InputLabel htmlFor="name" value="Nama Lengkap" />
                            <TextInput id="name" name="name" value={data.name} onChange={handleChange} className="mt-1 block w-full" required />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="gender" value="Jenis Kelamin" />
                            <select id="gender" name="gender" value={data.gender} onChange={handleChange} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" required>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                            <InputError message={errors.gender} className="mt-2" />
                        </div>

                        {/* TTL */}
                        <div>
                            <InputLabel htmlFor="birth_place" value="Tempat Lahir" />
                            <TextInput id="birth_place" name="birth_place" value={data.birth_place} onChange={handleChange} className="mt-1 block w-full" required />
                            <InputError message={errors.birth_place} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="birth_date" value="Tanggal Lahir" />
                            <TextInput id="birth_date" name="birth_date" type="date" value={data.birth_date} onChange={handleChange} className="mt-1 block w-full" required />
                            <InputError message={errors.birth_date} className="mt-2" />
                        </div>
                        
                        {/* Status & Agama */}
                        <div>
                            <InputLabel htmlFor="marital_status" value="Status Perkawinan" />
                            <select id="marital_status" name="marital_status" value={data.marital_status} onChange={handleChange} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" required>
                                <option value="Belum Kawin">Belum Kawin</option>
                                <option value="Kawin">Kawin</option>
                                <option value="Cerai Hidup">Cerai Hidup</option>
                                <option value="Cerai Mati">Cerai Mati</option>
                            </select>
                            <InputError message={errors.marital_status} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="religion" value="Agama" />
                            <TextInput id="religion" name="religion" value={data.religion} onChange={handleChange} className="mt-1 block w-full" required />
                            <InputError message={errors.religion} className="mt-2" />
                        </div>

                        {/* Pendidikan & Pekerjaan */}
                        <div>
                            <InputLabel htmlFor="education" value="Pendidikan Terakhir" />
                            <TextInput id="education" name="education" value={data.education} onChange={handleChange} className="mt-1 block w-full" required />
                            <InputError message={errors.education} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="occupation" value="Pekerjaan" />
                            <TextInput id="occupation" name="occupation" value={data.occupation} onChange={handleChange} className="mt-1 block w-full" required />
                            <InputError message={errors.occupation} className="mt-2" />
                        </div>

                        {/* Alamat & RT/RW */}
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="address" value="Alamat Lengkap" />
                            <TextInput id="address" name="address" value={data.address} onChange={handleChange} className="mt-1 block w-full" required />
                            <InputError message={errors.address} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="rt" value="RT" />
                            <TextInput id="rt" name="rt" value={data.rt} onChange={handleChange} className="mt-1 block w-full" required />
                            <InputError message={errors.rt} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="rw" value="RW" />
                            <TextInput id="rw" name="rw" value={data.rw} onChange={handleChange} className="mt-1 block w-full" required />
                            <InputError message={errors.rw} className="mt-2" />
                        </div>

                        {/* Blok & No HP */}
                        <div>
                            <InputLabel htmlFor="block" value="Blok Rumah (Opsional)" />
                            <TextInput id="block" name="block" value={data.block} onChange={handleChange} className="mt-1 block w-full" />
                            <InputError message={errors.block} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="phone" value="No. HP / Telepon (Opsional)" />
                            <TextInput id="phone" name="phone" value={data.phone} onChange={handleChange} className="mt-1 block w-full" />
                            <InputError message={errors.phone} className="mt-2" />
                        </div>

                        {/* Status Tinggal & Tanggal Masuk */}
                        <div>
                            <InputLabel htmlFor="residency_status" value="Status Tinggal" />
                            <select id="residency_status" name="residency_status" value={data.residency_status} onChange={handleChange} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" required>
                                <option value="Tetap">Tetap</option>
                                <option value="Kontrak/Kos">Kontrak/Kos</option>
                            </select>
                            <InputError message={errors.residency_status} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="entry_date" value="Tanggal Masuk (Domisili)" />
                            <TextInput id="entry_date" name="entry_date" type="date" value={data.entry_date} onChange={handleChange} className="mt-1 block w-full" required />
                            <InputError message={errors.entry_date} className="mt-2" />
                        </div>
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
                    <h2 className="text-lg font-medium text-gray-900">Konfirmasi Hapus</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Apakah Anda yakin ingin menghapus data warga bernama <strong>{editingResident?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                    </p>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModals}>Batal</SecondaryButton>
                        <DangerButton disabled={processing}>Hapus</DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
