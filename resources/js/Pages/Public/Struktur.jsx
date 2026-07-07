import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Struktur() {
    return (
        <PublicLayout>
            <Head title="Struktur Organisasi" />

            <div className="bg-green-800 py-16 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Struktur Organisasi Kepengurusan</h1>
                <p className="text-xl max-w-2xl mx-auto opacity-90">Susunan pengurus RW yang siap melayani warga dengan sepenuh hati.</p>
            </div>

            <div className="py-16 bg-gray-50 min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4 inline-block">Ketua RW</h2>
                            <div className="flex justify-center">
                                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 w-64 shadow-md">
                                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">Foto</div>
                                    <h3 className="font-bold text-lg text-gray-900">Bpk. Ketua RW</h3>
                                    <p className="text-sm text-green-700">Periode Berjalan</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4 inline-block">Pengurus Inti</h2>
                            <div className="flex flex-wrap justify-center gap-8">
                                <div className="bg-white border-2 border-gray-100 rounded-xl p-6 w-56 shadow-sm">
                                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                                    <h3 className="font-bold text-md text-gray-900">Sekretaris</h3>
                                </div>
                                <div className="bg-white border-2 border-gray-100 rounded-xl p-6 w-56 shadow-sm">
                                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                                    <h3 className="font-bold text-md text-gray-900">Bendahara</h3>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4 inline-block">Ketua Rukun Tetangga (RT)</h2>
                            <div className="flex flex-wrap justify-center gap-6">
                                {[1, 2, 3, 4, 5].map((rt) => (
                                    <div key={rt} className="bg-blue-50 border border-blue-100 rounded-lg p-4 w-40">
                                        <h3 className="font-bold text-gray-900">Ketua RT 0{rt}</h3>
                                        <div className="w-12 h-12 bg-white rounded-full mx-auto my-3"></div>
                                        <p className="text-xs text-gray-500">Nama Pengurus</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-200 text-gray-500 italic text-sm">
                            Bagan struktur organisasi di atas adalah ilustrasi standar. Untuk data pengurus sebenarnya, warga dapat menghubungi sekretariat RW.
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
