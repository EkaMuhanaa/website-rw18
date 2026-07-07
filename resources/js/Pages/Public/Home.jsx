import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function Home({ upcomingAgendas, recentGalleries }) {
    return (
        <PublicLayout>
            <Head title="Beranda" />

            {/* Hero Section */}
            <div className="relative bg-green-800 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <img className="w-full h-full object-cover opacity-30" src="https://images.unsplash.com/photo-1596395819057-cbcf85b76ab1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Lingkungan RW" />
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                        Selamat Datang di Portal Warga RW
                    </h1>
                    <p className="mt-6 text-xl max-w-3xl mx-auto opacity-90">
                        Wadah informasi dan komunikasi resmi untuk seluruh warga. Bersama kita bangun lingkungan yang aman, nyaman, dan harmonis.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <Link href={route('public.agenda')} className="px-8 py-3 bg-white text-green-800 font-bold rounded-full hover:bg-gray-100 transition shadow-lg">
                            Lihat Agenda
                        </Link>
                        <Link href={route('public.profil')} className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-green-800 transition shadow-lg">
                            Profil Kami
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Links Section */}
            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 text-center hover:shadow-lg transition">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Layanan Warga</h3>
                            <p className="text-gray-600 mb-4">Informasi kependudukan dan surat pengantar kini lebih mudah dikelola secara terpadu.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-yellow-500 text-center hover:shadow-lg transition">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Transparansi Aset</h3>
                            <p className="text-gray-600 mb-4">Pantau inventaris dan fasilitas umum yang dimiliki RW kita secara terbuka.</p>
                            <Link href={route('public.aset')} className="text-yellow-600 font-semibold hover:underline">Lihat Aset &rarr;</Link>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500 text-center hover:shadow-lg transition">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Dokumentasi</h3>
                            <p className="text-gray-600 mb-4">Kumpulan momen kebersamaan warga dalam berbagai kegiatan rutin.</p>
                            <Link href={route('public.dokumentasi')} className="text-green-600 font-semibold hover:underline">Lihat Galeri &rarr;</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Agendas & Galleries Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        {/* Upcoming Agendas */}
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">Agenda Mendatang</h2>
                            <div className="space-y-6">
                                {upcomingAgendas && upcomingAgendas.length > 0 ? (
                                    upcomingAgendas.map(agenda => (
                                        <div key={agenda.id} className="flex flex-col sm:flex-row bg-gray-50 border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                                            <div className="bg-green-600 text-white p-4 flex flex-col justify-center items-center min-w-[120px] text-center">
                                                <span className="text-3xl font-bold">{new Date(agenda.event_date).getDate()}</span>
                                                <span className="text-sm font-medium uppercase">{new Date(agenda.event_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</span>
                                            </div>
                                            <div className="p-4 flex-grow">
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">{agenda.title}</h3>
                                                <div className="text-sm text-gray-500 mb-2 flex items-center gap-4">
                                                    <span>🕒 {agenda.event_time}</span>
                                                    <span>📍 {agenda.location}</span>
                                                </div>
                                                <p className="text-gray-600 text-sm line-clamp-2">{agenda.description}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
                                        Tidak ada agenda terdekat.
                                    </div>
                                )}
                            </div>
                            {upcomingAgendas && upcomingAgendas.length > 0 && (
                                <div className="mt-6 text-center lg:text-left">
                                    <Link href={route('public.agenda')} className="text-green-600 font-bold hover:underline">Lihat Semua Agenda &rarr;</Link>
                                </div>
                            )}
                        </div>

                        {/* Recent Documentation */}
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">Dokumentasi Terbaru</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {recentGalleries && recentGalleries.length > 0 ? (
                                    recentGalleries.map(gallery => (
                                        <div key={gallery.id} className="group relative rounded-lg overflow-hidden shadow-sm aspect-video">
                                            {gallery.images && gallery.images.length > 0 ? (
                                                <img src={`/storage/${gallery.images[0].image_path}`} alt={gallery.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-110" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Tanpa Foto</div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                                                <h3 className="text-white font-bold text-sm leading-tight">{gallery.title}</h3>
                                                <p className="text-gray-300 text-xs mt-1">{new Date(gallery.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full bg-gray-50 p-6 rounded-lg text-center text-gray-500">
                                        Belum ada dokumentasi.
                                    </div>
                                )}
                            </div>
                            {recentGalleries && recentGalleries.length > 0 && (
                                <div className="mt-6 text-center lg:text-left">
                                    <Link href={route('public.dokumentasi')} className="text-green-600 font-bold hover:underline">Lihat Semua Dokumentasi &rarr;</Link>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
