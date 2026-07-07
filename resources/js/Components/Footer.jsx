import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="w-full py-stack-lg px-margin-page flex flex-col md:flex-row justify-between items-center gap-gutter-grid bg-surface-container-highest border-t border-outline-variant/30 mt-auto">
            <div className="font-headline-sm text-headline-sm font-bold text-on-surface">
                RW Digital
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
                © {new Date().getFullYear()} RW Community Management System. All rights reserved.
            </div>
            <div className="flex gap-4 font-label-md text-label-md">
                <Link className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80" href="#">Privacy Policy</Link>
                <Link className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80" href="#">Terms of Service</Link>
                <Link className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80" href="#">Accessibility</Link>
                <Link className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80" href="#">Sitemap</Link>
            </div>
        </footer>
    );
}
