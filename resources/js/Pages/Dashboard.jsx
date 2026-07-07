import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    // Menerima props dari Controller
    const { stats, upcomingAgendas } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Pengurus
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* Statistik Ringkasan */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-blue-500">
                            <div className="text-gray-500 text-sm font-semibold">Total Warga</div>
                            <div className="text-3xl font-bold text-gray-800">{stats.total_residents}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-green-500">
                            <div className="text-gray-500 text-sm font-semibold">Total Aset (Barang)</div>
                            <div className="text-3xl font-bold text-gray-800">{stats.total_assets}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-yellow-500">
                            <div className="text-gray-500 text-sm font-semibold">Agenda Mendatang</div>
                            <div className="text-3xl font-bold text-gray-800">{stats.upcoming_agendas_count}</div>
                        </div>
                    </div>

                    {/* Widget Agenda Terdekat */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Agenda Terdekat</h3>
                        
                        {upcomingAgendas && upcomingAgendas.length > 0 ? (
                            <div className="space-y-4">
                                {upcomingAgendas.map(agenda => (
                                    <div key={agenda.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                                        <div className="bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded text-center">
                                            <div className="text-sm">TGL</div>
                                            <div className="text-xl">{new Date(agenda.event_date).getDate()}</div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{agenda.title}</h4>
                                            <p className="text-sm text-gray-600">{agenda.location} | {agenda.event_time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">Belum ada agenda mendatang.</p>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
