import React, { useState, useEffect } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

// Sub-komponen untuk Image Slider
const ImageSlider = ({ images, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Berganti setiap 3 detik

        return () => clearInterval(interval);
    }, [images]);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                Tanpa Foto
            </div>
        );
    }

    if (images.length === 1) {
        return (
            <img src={`/storage/${images[0].image_path}`} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        );
    }

    return (
        <div className="relative w-full h-full overflow-hidden group">
            {images.map((img, index) => (
                <div 
                    key={img.id} 
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img src={`/storage/${img.image_path}`} alt={`${title} - Foto ${index + 1}`} className="w-full h-full object-cover transition-transform duration-[4000ms] ease-linear group-hover:scale-110" />
                </div>
            ))}
            
            {/* Indikator Slider */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
                {images.map((_, idx) => (
                    <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/50'}`}></div>
                ))}
            </div>
        </div>
    );
};

export default function Dokumentasi({ galleries }) {
    return (
        <PublicLayout>
            <Head title="Galeri & Dokumentasi" />

            <div className="bg-green-800 py-16 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Galeri Dokumentasi Kegiatan</h1>
                <p className="text-xl max-w-2xl mx-auto opacity-90">Rekam jejak momen-momen kebersamaan dan kegiatan gotong royong warga RW kita.</p>
            </div>

            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleries.data && galleries.data.length > 0 ? (
                            galleries.data.map((gallery) => (
                                <div key={gallery.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                                    <div className="h-56 bg-gray-100 relative">
                                        <ImageSlider images={gallery.images} title={gallery.title} />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-xl text-gray-900 leading-tight">{gallery.title}</h3>
                                        </div>
                                        <p className="text-sm font-semibold text-green-600 mb-3 flex items-center">
                                            📅 {new Date(gallery.event_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                        <p className="text-gray-600 text-sm flex-grow mb-4 whitespace-pre-wrap leading-relaxed">
                                            {gallery.description}
                                        </p>
                                        
                                        {gallery.gdrive_link && (
                                            <a 
                                                href={gallery.gdrive_link} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="mt-auto block w-full text-center py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg border border-blue-100 hover:bg-blue-100 transition"
                                            >
                                                📁 Lihat Album Penuh (Google Drive)
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-16 text-center bg-white rounded-lg shadow-sm border border-dashed border-gray-300">
                                <p className="text-gray-500 text-lg">Belum ada dokumentasi kegiatan yang diunggah.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {galleries.data && galleries.data.length > 0 && galleries.last_page > 1 && (
                        <div className="mt-12 flex justify-center gap-2">
                            {galleries.prev_page_url && (
                                <Link href={galleries.prev_page_url} className="px-4 py-2 border rounded-lg bg-white hover:bg-green-50 text-green-700 font-medium shadow-sm transition">
                                    &laquo; Sebelumnya
                                </Link>
                            )}
                            {galleries.next_page_url && (
                                <Link href={galleries.next_page_url} className="px-4 py-2 border rounded-lg bg-white hover:bg-green-50 text-green-700 font-medium shadow-sm transition">
                                    Selanjutnya &raquo;
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
