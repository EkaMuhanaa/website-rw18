import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col pt-[88px] bg-background text-on-background font-body-md antialiased">
            <Navbar />
            <main className="flex-grow w-full max-w-7xl mx-auto px-margin-page py-stack-lg md:py-16">
                {children}
            </main>
            <Footer />
        </div>
    );
}
