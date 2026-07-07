import { Link } from '@inertiajs/react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-page py-4 bg-surface-container-lowest/90 backdrop-blur-md shadow-sm">
            <div className="font-headline-md text-headline-md font-bold text-primary">
                <Link href="/">RW Digital</Link>
            </div>
            <div className="hidden md:flex gap-6 items-center">
                <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="/">Home</Link>
                <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="/profil-rw">Profile</Link>
                <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="/assets-agenda">Agenda & Assets</Link>
                <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="#">Gallery</Link>
                <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="#">Contact</Link>
            </div>
            <Link href={route('login')} className="bg-primary-container text-on-primary-container font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-colors scale-95 active:scale-90 shadow-sm">
                Admin Login
            </Link>
        </nav>
    );
}
