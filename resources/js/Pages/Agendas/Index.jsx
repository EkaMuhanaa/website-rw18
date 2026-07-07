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
    const { agendas, filters, auth } = usePage().props;
    const isAdmin = auth.user.role === 'admin';

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingAgenda, setEditingAgenda] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        title: '', description: '', event_date: '', event_time: '', location: '', pic: ''
    });

    const openAddModal = () => {
        setEditingAgenda(null);
        setData({ title: '', description: '', event_date: '', event_time: '', location: '', pic: '' });
        clearErrors();
        setIsFormModalOpen(true);
    };

    const openEditModal = (agenda) => {
        setEditingAgenda(agenda);
        setData({
            title: agenda.title,
            description: agenda.description,
            event_date: agenda.event_date,
            event_time: agenda.event_time,
            location: agenda.location,
            pic: agenda.pic
        });
        clearErrors();
        setIsFormModalOpen(true);
    };

    const openDeleteModal = (agenda) => {
        setEditingAgenda(agenda);
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
        if (editingAgenda) {
            put(route('agendas.update', editingAgenda.id), {
                onSuccess: () => closeModals(),
            });
        } else {
            post(route('agendas.store'), {
                onSuccess: () => closeModals(),
            });
        }
    };

    const submitDelete = (e) => {
        e.preventDefault();
        destroy(route('agendas.destroy', editingAgenda.id), {
            onSuccess: () => closeModals(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Agenda Kegiatan Warga</h2>
                    {isAdmin && (
                        <PrimaryButton onClick={openAddModal}>+ Tambah Agenda</PrimaryButton>
                    )}
                </div>
            }
        >
            <Head title="Agenda Kegiatan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* Filter and Search Bar */}
                    <div className="mb-4 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <form className="flex gap-2 w-full sm:w-auto" method="GET" action={route('agendas.index')}>
                            <TextInput 
                                type="text" 
                                name="search"
                                placeholder="Cari Judul, Lokasi atau PIC..." 
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
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul & Deskripsi</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu Pelaksanaan</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi & PIC</th>
                                        {isAdmin && (
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {agendas.data && agendas.data.length > 0 ? (
                                        agendas.data.map((agenda) => (
                                            <tr key={agenda.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                                                    <div className="font-semibold text-base">{agenda.title}</div>
                                                    <div className="text-gray-500 text-xs mt-1">{agenda.description}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div>{new Date(agenda.event_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                                    <div className="text-gray-500 text-xs">Pukul: {agenda.event_time}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div>{agenda.location}</div>
                                                    <div className="text-gray-500 text-xs">PIC: {agenda.pic}</div>
                                                </td>
                                                {isAdmin && (
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                        <button onClick={() => openEditModal(agenda)} className="text-indigo-600 hover:text-indigo-900 mr-3 font-semibold">Edit</button>
                                                        <button onClick={() => openDeleteModal(agenda)} className="text-red-600 hover:text-red-900 font-semibold">Hapus</button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={isAdmin ? 4 : 3} className="px-6 py-4 text-center text-sm text-gray-500">Tidak ada agenda kegiatan yang ditemukan.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 flex justify-between items-center">
                            <div className="text-sm text-gray-700">
                                Menampilkan {agendas.from || 0} - {agendas.to || 0} dari {agendas.total}
                            </div>
                            <div className="flex gap-2">
                                {agendas.prev_page_url && (
                                    <Link href={agendas.prev_page_url} className="px-3 py-1 border rounded bg-white hover:bg-gray-50 text-sm">Sebelumnya</Link>
                                )}
                                {agendas.next_page_url && (
                                    <Link href={agendas.next_page_url} className="px-3 py-1 border rounded bg-white hover:bg-gray-50 text-sm">Selanjutnya</Link>
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
                            {editingAgenda ? 'Edit Agenda Kegiatan' : 'Tambah Agenda Kegiatan'}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <InputLabel htmlFor="title" value="Judul Agenda" />
                                <TextInput id="title" name="title" value={data.title} onChange={(e) => setData('title', e.target.value)} className="mt-1 block w-full" required />
                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            <div className="md:col-span-2">
                                <InputLabel htmlFor="description" value="Deskripsi Kegiatan" />
                                <textarea id="description" name="description" value={data.description} onChange={(e) => setData('description', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" rows="3" required></textarea>
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="event_date" value="Tanggal Pelaksanaan" />
                                <TextInput id="event_date" type="date" name="event_date" value={data.event_date} onChange={(e) => setData('event_date', e.target.value)} className="mt-1 block w-full" required />
                                <InputError message={errors.event_date} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="event_time" value="Waktu Pelaksanaan" />
                                <TextInput id="event_time" type="time" name="event_time" value={data.event_time} onChange={(e) => setData('event_time', e.target.value)} className="mt-1 block w-full" required />
                                <InputError message={errors.event_time} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="location" value="Lokasi" />
                                <TextInput id="location" name="location" value={data.location} onChange={(e) => setData('location', e.target.value)} className="mt-1 block w-full" required />
                                <InputError message={errors.location} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="pic" value="Penanggung Jawab (PIC)" />
                                <TextInput id="pic" name="pic" value={data.pic} onChange={(e) => setData('pic', e.target.value)} className="mt-1 block w-full" required />
                                <InputError message={errors.pic} className="mt-2" />
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
                        <h2 className="text-lg font-medium text-gray-900">Hapus Agenda</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Anda yakin ingin menghapus agenda <strong>{editingAgenda?.title}</strong> secara permanen?
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <SecondaryButton onClick={closeModals}>Batal</SecondaryButton>
                            <DangerButton disabled={processing}>Hapus Agenda</DangerButton>
                        </div>
                    </form>
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}
