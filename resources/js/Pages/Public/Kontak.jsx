import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Kontak() {
    return (
        <PublicLayout>
            <Head title="Kontak Kami" />

            <div className="bg-green-800 py-16 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
                <p className="text-xl max-w-2xl mx-auto opacity-90">Pusat layanan informasi dan pengaduan warga.</p>
            </div>

            <div className="py-16 bg-white min-h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        
                        {/* Informasi Kontak */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Informasi Sekretariat</h2>
                            
                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Alamat Lengkap</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            Gedung Sekretariat RW 0X<br/>
                                            Perumahan Warga Damai Blok A No. 1<br/>
                                            Kelurahan Sejahtera, Kecamatan Makmur<br/>
                                            Kota Nusantara, 12345
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Telepon & WhatsApp</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            Layanan Darurat Keamanan: 0812-3456-7890<br/>
                                            Layanan Administrasi RT/RW: 0898-7654-3210
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-100 text-yellow-600">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Email Resmi</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            sekretariat@rw-digital.com<br/>
                                            pengaduan@rw-digital.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Google Maps Embed */}
                        <div className="h-96 bg-gray-200 rounded-2xl overflow-hidden shadow-inner relative">
                            {/* Placeholder for map */}
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126907.08182283088!2d106.74028822005886!3d-6.22972802525389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1655184279093!5m2!1sid!2sid" 
                                width="100%" 
                                height="100%" 
                                style={{border:0}} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Peta Lokasi RW"
                                className="absolute inset-0"
                            ></iframe>
                        </div>

                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
