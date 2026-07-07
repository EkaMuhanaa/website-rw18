import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Profil() {
    return (
        <PublicLayout>
            <Head title="Profil RW" />

            {/* Header Profil */}
            <div className="bg-green-800 py-16 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Profil Rukun Warga</h1>
                <p className="text-xl max-w-2xl mx-auto opacity-90">Mengenal lebih dekat sejarah, visi, dan misi lingkungan kita.</p>
            </div>

            <div className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Sejarah Singkat */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-500 inline-block pb-2">Sejarah Singkat</h2>
                        <div className="prose prose-lg text-gray-700">
                            <p className="mb-4">
                                Rukun Warga (RW) ini didirikan sejak puluhan tahun yang lalu, seiring dengan mulai berkembangnya kawasan pemukiman di wilayah ini. Berawal dari komunitas kecil yang terdiri dari beberapa kepala keluarga, kini telah berkembang menjadi lingkungan yang padat, dinamis, dan majemuk.
                            </p>
                            <p>
                                Semangat gotong royong dan kebersamaan selalu menjadi fondasi utama dalam setiap pengambilan keputusan dan kegiatan sosial bermasyarakat di lingkungan RW kita tercinta ini.
                            </p>
                        </div>
                    </div>

                    {/* Visi dan Misi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        <div className="bg-green-50 p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                                <span className="text-3xl mr-3">🎯</span> Visi
                            </h3>
                            <p className="text-gray-700 font-medium italic">
                                "Mewujudkan lingkungan Rukun Warga yang Aman, Nyaman, Bersih, Religius, dan Sejahtera berbasis kegotongroyongan dan kerukunan antar warga."
                            </p>
                        </div>
                        
                        <div className="bg-blue-50 p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                                <span className="text-3xl mr-3">🚀</span> Misi
                            </h3>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                <li>Meningkatkan sistem keamanan lingkungan (Siskamling) secara terpadu.</li>
                                <li>Membangun dan menjaga kebersihan serta kelestarian fasilitas umum.</li>
                                <li>Mendorong partisipasi aktif warga dalam setiap kegiatan sosial dan keagamaan.</li>
                                <li>Mewujudkan transparansi administrasi dan pengelolaan kas RW.</li>
                                <li>Mempererat tali silaturahmi antar warga melalui berbagai agenda bersama.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
