import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Agenda({ agendas }) {
    return (
        <PublicLayout>
            <Head title="Agenda Kegiatan" />

            <div className="bg-green-800 py-16 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Agenda Kegiatan Mendatang</h1>
                <p className="text-xl max-w-2xl mx-auto opacity-90">Mari berpartisipasi dalam setiap kegiatan RW demi lingkungan yang lebih baik.</p>
            </div>

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="space-y-6">
                        {agendas && agendas.length > 0 ? (
                            agendas.map((agenda, index) => (
                                <div key={agenda.id} className="bg-white rounded-xl shadow-md border-l-8 border-green-500 flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition">
                                    <div className="md:w-1/4 bg-green-50 p-6 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-gray-100">
                                        <span className="text-green-800 font-semibold text-lg">{new Date(agenda.event_date).toLocaleDateString('id-ID', { weekday: 'long' })}</span>
                                        <span className="text-5xl font-black text-green-600 my-1">{new Date(agenda.event_date).getDate()}</span>
                                        <span className="text-gray-600 font-medium uppercase">{new Date(agenda.event_date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    <div className="p-6 md:w-3/4 flex flex-col justify-center">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{agenda.title}</h2>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                            <span className="flex items-center">
                                                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                Pukul {agenda.event_time}
                                            </span>
                                            <span className="flex items-center">
                                                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                                {agenda.location}
                                            </span>
                                            <span className="flex items-center">
                                                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                                PIC: {agenda.pic}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            {agenda.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-dashed border-gray-300">
                                <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <h3 className="text-xl font-medium text-gray-900 mb-1">Belum Ada Agenda</h3>
                                <p className="text-gray-500">Saat ini tidak ada agenda kegiatan terdekat yang dijadwalkan.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
