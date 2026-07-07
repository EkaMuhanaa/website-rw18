import React, { useState, useRef } from 'react';
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
    const { galleries, filters, auth } = usePage().props;
    const isAdmin = auth.user.role === 'admin';

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingGallery, setEditingGallery] = useState(null);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        title: '', description: '', event_date: '', gdrive_link: '', images: [], remove_image_ids: [], _method: 'POST'
    });

    const openAddModal = () => {
        setEditingGallery(null);
        setData({ title: '', description: '', event_date: '', gdrive_link: '', images: [], remove_image_ids: [], _method: 'POST' });
        clearErrors();
        setIsFormModalOpen(true);
    };

    const openEditModal = (gallery) => {
        setEditingGallery(gallery);
        setData({
            title: gallery.title,
            description: gallery.description || '',
            event_date: gallery.event_date,
            gdrive_link: gallery.gdrive_link || '',
            images: [],
            remove_image_ids: [],
            _method: 'PUT' // Fake PUT for file upload
        });
        clearErrors();
        setIsFormModalOpen(true);
    };

    const openDeleteModal = (gallery) => {
        setEditingGallery(gallery);
        setIsDeleteModalOpen(true);
    };

    const closeModals = () => {
        setIsFormModalOpen(false);
        setIsDeleteModalOpen(false);
        reset();
        clearErrors();
        if(fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleFileChange = (e) => {
        setData('images', Array.from(e.target.files));
    };

    const handleRemoveOldImage = (imageId) => {
        setData('remove_image_ids', [...data.remove_image_ids, imageId]);
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (editingGallery) {
            post(route('galleries.update', editingGallery.id), {
                onSuccess: () => closeModals(),
                forceFormData: true,
            });
        } else {
            post(route('galleries.store'), {
                onSuccess: () => closeModals(),
                forceFormData: true,
            });
        }
    };

    const submitDelete = (e) => {
        e.preventDefault();
        useForm().delete(route('galleries.destroy', editingGallery.id), {
            onSuccess: () => closeModals(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Dokumentasi Kegiatan (Galeri)</h2>
                    {isAdmin && (
                        <PrimaryButton onClick={openAddModal}>+ Tambah Dokumentasi</PrimaryButton>
                    )}
                </div>
            }
        >
            <Head title="Dokumentasi Kegiatan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* Filter and Search Bar */}
                    <div className="mb-4 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <form className="flex gap-2 w-full sm:w-auto" method="GET" action={route('galleries.index')}>
                            <TextInput 
                                type="text" 
                                name="search"
                                placeholder="Cari Judul Kegiatan..." 
                                className="w-full sm:w-80"
                                defaultValue={filters.search}
                            />
                            <SecondaryButton type="submit">Cari</SecondaryButton>
                        </form>
                    </div>

                    {/* Table / Grid */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {galleries.data && galleries.data.length > 0 ? (
                                galleries.data.map((gallery) => (
                                    <div key={gallery.id} className="border rounded-lg shadow-sm overflow-hidden flex flex-col">
                                        <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                                            {gallery.images && gallery.images.length > 0 ? (
                                                <img src={`/storage/${gallery.images[0].image_path}`} alt={gallery.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-gray-400">Tidak ada foto</span>
                                            )}
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className="font-bold text-lg mb-1">{gallery.title}</h3>
                                            <p className="text-xs text-gray-500 mb-2">{new Date(gallery.event_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            <p className="text-sm text-gray-700 flex-grow mb-3 line-clamp-3">{gallery.description}</p>
                                            
                                            {gallery.gdrive_link && (
                                                <a href={gallery.gdrive_link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm mb-3 block truncate">
                                                    Lihat Lengkap di GDrive &rarr;
                                                </a>
                                            )}

                                            {isAdmin && (
                                                <div className="flex gap-2 mt-auto pt-3 border-t">
                                                    <button onClick={() => openEditModal(gallery)} className="text-indigo-600 hover:text-indigo-900 text-sm font-semibold">Edit</button>
                                                    <span className="text-gray-300">|</span>
                                                    <button onClick={() => openDeleteModal(gallery)} className="text-red-600 hover:text-red-900 text-sm font-semibold">Hapus</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-10 text-gray-500">
                                    Tidak ada dokumentasi kegiatan yang ditemukan.
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {galleries.data && galleries.data.length > 0 && (
                            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 flex justify-between items-center">
                                <div className="text-sm text-gray-700">
                                    Menampilkan {galleries.from || 0} - {galleries.to || 0} dari {galleries.total}
                                </div>
                                <div className="flex gap-2">
                                    {galleries.prev_page_url && (
                                        <Link href={galleries.prev_page_url} className="px-3 py-1 border rounded bg-white hover:bg-gray-50 text-sm">Sebelumnya</Link>
                                    )}
                                    {galleries.next_page_url && (
                                        <Link href={galleries.next_page_url} className="px-3 py-1 border rounded bg-white hover:bg-gray-50 text-sm">Selanjutnya</Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Form Add/Edit */}
            {isAdmin && (
                <Modal show={isFormModalOpen} onClose={closeModals} maxWidth="2xl">
                    <form onSubmit={submitForm} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-6">
                            {editingGallery ? 'Edit Dokumentasi Kegiatan' : 'Tambah Dokumentasi Kegiatan Baru'}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <InputLabel htmlFor="title" value="Judul Kegiatan" />
                                <TextInput id="title" name="title" value={data.title} onChange={(e) => setData('title', e.target.value)} className="mt-1 block w-full" required />
                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            <div className="md:col-span-2">
                                <InputLabel htmlFor="description" value="Keterangan / Deskripsi Singkat" />
                                <textarea id="description" name="description" value={data.description} onChange={(e) => setData('description', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" rows="3" required></textarea>
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="event_date" value="Tanggal Kegiatan Berlangsung" />
                                <TextInput id="event_date" type="date" name="event_date" value={data.event_date} onChange={(e) => setData('event_date', e.target.value)} className="mt-1 block w-full" required />
                                <InputError message={errors.event_date} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="gdrive_link" value="Link Google Drive (Opsional)" />
                                <TextInput id="gdrive_link" type="url" name="gdrive_link" value={data.gdrive_link} onChange={(e) => setData('gdrive_link', e.target.value)} className="mt-1 block w-full" placeholder="https://drive.google.com/..." />
                                <InputError message={errors.gdrive_link} className="mt-2" />
                            </div>
                            <div className="md:col-span-2 border-t pt-4 mt-2">
                                <InputLabel htmlFor="images" value="Unggah Foto Baru (Pilih banyak foto sekaligus)" />
                                <input type="file" id="images" name="images" multiple accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                                <InputError message={errors.images} className="mt-2" />
                            </div>

                            {/* Show Existing Images When Editing */}
                            {editingGallery && editingGallery.images && editingGallery.images.length > 0 && (
                                <div className="md:col-span-2 border-t pt-4 mt-2">
                                    <InputLabel value="Foto Saat Ini" className="mb-2" />
                                    <div className="flex flex-wrap gap-2">
                                        {editingGallery.images.map(img => {
                                            const isRemoved = data.remove_image_ids.includes(img.id);
                                            return (
                                                <div key={img.id} className={`relative border p-1 rounded ${isRemoved ? 'opacity-50 grayscale' : ''}`}>
                                                    <img src={`/storage/${img.image_path}`} alt="doc" className="h-20 w-20 object-cover rounded" />
                                                    {!isRemoved ? (
                                                        <button type="button" onClick={() => handleRemoveOldImage(img.id)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-700">&times;</button>
                                                    ) : (
                                                        <span className="absolute inset-0 flex items-center justify-center text-red-600 font-bold bg-white bg-opacity-70 text-xs">Dihapus</span>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Klik tombol X merah untuk menghapus foto yang sudah ada.</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <SecondaryButton onClick={closeModals}>Batal</SecondaryButton>
                            <PrimaryButton disabled={processing}>Simpan Dokumentasi</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Modal Delete */}
            {isAdmin && (
                <Modal show={isDeleteModalOpen} onClose={closeModals} maxWidth="sm">
                    <form onSubmit={submitDelete} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">Hapus Dokumentasi</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Anda yakin ingin menghapus dokumentasi <strong>{editingGallery?.title}</strong> beserta seluruh fotonya?
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <SecondaryButton onClick={closeModals}>Batal</SecondaryButton>
                            <DangerButton disabled={processing}>Hapus Permanen</DangerButton>
                        </div>
                    </form>
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}
