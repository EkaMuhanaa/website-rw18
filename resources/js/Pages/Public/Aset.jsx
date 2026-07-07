import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Aset({ assets }) {
    // Group assets by category
    const groupedAssets = assets.reduce((acc, asset) => {
        if (!acc[asset.category]) {
            acc[asset.category] = [];
        }
        acc[asset.category].push(asset);
        return acc;
    }, {});

    return (
        <PublicLayout>
            <Head title="Inventaris Aset" />

            <div className="bg-green-800 py-16 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Transparansi Aset & Inventaris RW</h1>
                <p className="text-xl max-w-2xl mx-auto opacity-90">Keterbukaan informasi mengenai daftar barang dan fasilitas umum milik lingkungan RW.</p>
            </div>

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {Object.keys(groupedAssets).length > 0 ? (
                        <div className="space-y-12">
                            {Object.keys(groupedAssets).map((category, idx) => (
                                <div key={idx}>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-green-200 inline-block">{category}</h2>
                                    <div className="bg-white overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nama Aset</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Kondisi</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Jumlah</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tahun Perolehan</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Lokasi Penyimpanan</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {groupedAssets[category].map((asset) => (
                                                    <tr key={asset.id} className="hover:bg-gray-50">
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                            {asset.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                                asset.condition === 'Baik' ? 'bg-green-100 text-green-800' :
                                                                asset.condition === 'Rusak Ringan' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'
                                                            }`}>
                                                                {asset.condition}
                                                            </span>
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {asset.quantity} Unit
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {asset.acquired_year || '-'}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {asset.location}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-dashed border-gray-300">
                            <h3 className="text-xl font-medium text-gray-900 mb-1">Belum Ada Data Aset</h3>
                            <p className="text-gray-500">Data inventaris RW saat ini kosong atau belum diperbarui oleh pengurus.</p>
                        </div>
                    )}

                </div>
            </div>
        </PublicLayout>
    );
}
