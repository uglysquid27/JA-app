import { useState, useEffect } from 'react';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    Bars3Icon,
    XMarkIcon
} from "@heroicons/react/24/solid";
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function DefaultSidebar({ header, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(true); // Asumsi layar besar pada awalnya

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768); // Anggap 768px sebagai titik perubahan (breakpoint md di Tailwind adalah 768px)
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false); // Tutup sidebar pada layar kecil
            }
        };

        handleResize(); // Cek saat pemuatan awal
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex bg-gray-50">
            {/* Tombol Toggle Sidebar (untuk layar kecil) */}
            {!isLargeScreen && (
                <button
                    onClick={toggleSidebar}
                    className="md:hidden absolute top-4 left-4 z-50 bg-white rounded-md p-2 shadow-md"
                >
                    {isSidebarOpen ? (
                        <XMarkIcon className="h-6 w-6 text-gray-700" />
                    ) : (
                        <Bars3Icon className="h-6 w-6 text-gray-700" />
                    )}
                </button>
            )}

            {/* Sidebar */}
            <Card
                className={`fixed top-0 left-0 h-screen w-full md:max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 flex flex-col justify-between z-40 bg-white border-r border-blue-gray-200 transition-transform duration-300 ease-in-out ${isSidebarOpen || isLargeScreen ? 'translate-x-0' : '-translate-x-full'}`}
                style={{
                    transform: isSidebarOpen || isLargeScreen ? 'translateX(0)' : 'translateX(-100%)',
                }}
            >
                <div>
                    <div className="mb-6 p-4 border-b border-blue-gray-300 flex items-center justify-between">
                        <Link href={route('dashboard')} className="flex items-center">
                            <ApplicationLogo className="h-8 w-8 fill-current text-blue-500 mr-2" />
                        </Link>
                        {!isLargeScreen && (
                            <button onClick={toggleSidebar} className="md:hidden">
                                <XMarkIcon className="h-6 w-6 text-gray-700" />
                            </button>
                        )}
                    </div>
                    <List className="space-y-3">
                        <Link href={route('dashboard')}>
                            <ListItem className="rounded-lg hover:bg-blue-gray-50 transition-colors duration-200">
                                <ListItemPrefix className="mr-3">
                                    <div className="bg-blue-50 rounded-md p-2">
                                        <PresentationChartBarIcon className="h-5 w-5 text-blue-500" />
                                    </div>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">Dasbor</Typography>
                            </ListItem>
                        </Link>
                        <Link href={route('book')}>
                            <ListItem className="rounded-lg hover:bg-blue-gray-50 transition-colors duration-200">
                                <ListItemPrefix className="mr-3">
                                    <div className="bg-indigo-50 rounded-md p-2">
                                        <InboxIcon className="h-5 w-5 text-indigo-500" />
                                    </div>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">Pesan Perjalanan</Typography>
                            </ListItem>
                        </Link>
                        <Link href={route('vehicle-checks.index')}>
                            <ListItem className="rounded-lg hover:bg-blue-gray-50 transition-colors duration-200">
                                <ListItemPrefix className="mr-3">
                                    <div className="bg-teal-50 rounded-md p-2">
                                        <ShoppingBagIcon className="h-5 w-5 text-teal-500" />
                                    </div>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">Pengecekan Kendaraan</Typography>
                            </ListItem>
                        </Link>
                        <Link href="#" className="disabled">
                            <ListItem className="rounded-lg hover:bg-blue-gray-50 transition-colors duration-200">
                                <ListItemPrefix className="mr-3">
                                    <div className="bg-gray-100 rounded-md p-2">
                                        <UserCircleIcon className="h-5 w-5 text-gray-500" />
                                    </div>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">Manajemen Pengguna</Typography>
                            </ListItem>
                        </Link>
                        <Link href="#" className="disabled">
                            <ListItem className="rounded-lg hover:bg-blue-gray-50 transition-colors duration-200">
                                <ListItemPrefix className="mr-3">
                                    <div className="bg-orange-50 rounded-md p-2">
                                        <Cog6ToothIcon className="h-5 w-5 text-orange-500" />
                                    </div>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">Pengaturan</Typography>
                            </ListItem>
                        </Link>
                    </List>
                </div>
                <div className="p-4 mt-6 border-t border-blue-gray-300">
                    <ListItem className="rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
                        <ListItemPrefix className="mr-3">
                            <div className="bg-red-100 rounded-md p-2">
                                <PowerIcon className="h-5 w-5 text-red-500" />
                            </div>
                        </ListItemPrefix>
                        <ResponsiveNavLink
                            method="post"
                            href={route('logout')}
                            as="button"
                            className="font-medium text-red-500"
                        >
                            Keluar
                        </ResponsiveNavLink>
                    </ListItem>
                </div>
            </Card>

            {/* Konten utama */}
            <div className={`flex-1 p-6 overflow-y-auto min-h-screen transition-margin-left duration-300 ease-in-out ${isSidebarOpen || isLargeScreen ? 'md:ml-[20rem]' : 'md:ml-0'}`}>
                <main>{children}</main>
            </div>
        </div>
    );
}