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
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChartPieIcon
} from "@heroicons/react/24/solid";
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function DefaultSidebar({ header, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(true);
    const currentUrl = window.location.pathname;

    const getPath = (url) => {
        try {
          return new URL(url).pathname;
        } catch {
          // if it's already a path like "/dashboard"
          return url;
        }
      };
      
      const isActive = (href) => {
        const hrefPath = getPath(href);
        return currentUrl === hrefPath || currentUrl.startsWith(hrefPath);
      };
      



    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true); // Sidebar selalu terbuka pada layar besar
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex bg-gray-50 dark:dark:bg-gray-900 transition-colors duration-500 ease-in-out ">
            {/* Tombol Setengah Oval Cantik untuk Membuka Sidebar (Sticky untuk layar kecil) */}
            {!isLargeScreen && !isSidebarOpen && (
                <button
                    onClick={toggleSidebar}
                    className="md:hidden fixed top-1/2 left-0 h-12 w-7 -translate-y-1/2 z-30 bg-gradient-to-r from-white/80 to-gray-100/50 backdrop-blur-sm rounded-r-full shadow-md border-r border-gray-200 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105"
                    style={{
                        display: !isLargeScreen ? 'flex' : 'none',
                    }}
                >
                    <ChevronRightIcon className={`h-6 w-6 text-gray-600 transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
                </button>
            )}

            {/* Sidebar */}
            <Card
                className={`fixed top-0 left-0 h-screen w-full md:max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 flex flex-col justify-between z-40 bg-white dark:bg-[#282828] transition-colors duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
                style={{
                    transform: isSidebarOpen ? 'translateX(0)' : `translateX(-100%)`,
                    transition: 'transform 0.3s ease-in-out',
                }}
            >
                {isSidebarOpen && !isLargeScreen && (
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden fixed top-1/2 right-0 h-12 w-7 -translate-y-1/2 z-30 bg-gradient-to-l from-white/80 to-gray-100/50 backdrop-blur-sm rounded-l-full shadow-md border-l border-gray-200 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{
                            display: !isLargeScreen ? 'flex' : 'none',
                        }}
                    >
                        <ChevronLeftIcon className={`h-6 w-6 text-gray-600 transition-transform duration-300 ${isSidebarOpen ? '' : '-rotate-180'}`} />
                    </button>
                )}
                <div>
                    <div className="mb-6 p-4 border-b border-blue-gray-300 flex items-center justify-between">
                        <Link href={route('dashboard')} className="flex items-center">
                            <ApplicationLogo className="h-8 w-8 fill-current text-blue-500 mr-2" />
                        </Link>
                    </div>
                    <List className="space-y-3 dark:text-gray-100">
                        <Link href={route('dashboard')}>
                            <ListItem
                                className={`rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${isActive(route('dashboard')) ? 'bg-gray-200 font-semibold dark:bg-gray-600' : ''
                                    }`}
                            >
                                <ListItemPrefix className="mr-3">
                                    <div className="bg-blue-50 rounded-md p-2">
                                        <PresentationChartBarIcon className="h-5 w-5 text-blue-500" />
                                    </div>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">Dashboard</Typography>
                            </ListItem>
                        </Link>

                        <Link href={route('book')}>
                            <ListItem
                                className={`rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${isActive(route('book')) ? 'bg-gray-200 font-semibold dark:bg-gray-600' : ''
                                    }`}
                            >
                                <ListItemPrefix className="mr-3">
                                    <div className="bg-indigo-50 rounded-md p-2">
                                        <InboxIcon className="h-5 w-5 text-indigo-500" />
                                    </div>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">Pesan Perjalanan</Typography>
                            </ListItem>
                        </Link>

                        <Link href={route('vehicle-checks.index')}>
                            <ListItem
                                className={`rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${isActive(route('vehicle-checks.index')) ? 'bg-gray-200 font-semibold dark:bg-gray-600' : ''
                                    }`}
                            >
                                <ListItemPrefix className="mr-3">
                                    <div className="bg-teal-50 rounded-md p-2">
                                        <ShoppingBagIcon className="h-5 w-5 text-teal-500" />
                                    </div>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">Pengecekan Kendaraan</Typography>
                            </ListItem>
                        </Link>

                        <Link href={route('driver.dashboard')}>
                            <ListItem
                                className={`rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${isActive(route('driver.dashboard')) ? 'bg-gray-200 font-semibold dark:bg-gray-600' : ''
                                    }`}
                            >
                                <ListItemPrefix className="mr-3">
                                    <div className="bg-gray-100 rounded-md p-2">
                                        <UserCircleIcon className="h-5 w-5 text-gray-500" />
                                    </div>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">Driver</Typography>
                            </ListItem>
                        </Link>

                        <Link href={route('reports.index')}>
                            <ListItem
                                className={`rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${isActive(route('reports.index')) ? 'bg-gray-200 font-semibold dark:bg-gray-600' : ''
                                    }`}
                            >
                                <ListItemPrefix className="mr-3">
                                    <div className="bg-orange-50 rounded-md p-2">
                                        <ChartPieIcon className="h-5 w-5 text-orange-500" />
                                    </div>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">Reporting</Typography>
                            </ListItem>
                        </Link>
                    </List>

                </div>
                <ResponsiveNavLink
                            method="post"
                            href={route('logout')}
                            as="button"
                            className="font-medium text-red-500"
                        >
                <div className="p-4 mt-6 border-t border-blue-gray-300">
                    <ListItem className="rounded-lg hover:bg-red-300 hover:text-red-600 transition-colors duration-200">
                        <ListItemPrefix className="mr-3">
                            <div className="rounded-md p-2">
                                <PowerIcon className="h-5 w-5 text-red-500" />
                            </div>
                        </ListItemPrefix>
                    
                            Keluar
                       
                    </ListItem>
                </div>
                 </ResponsiveNavLink>
            </Card>

            {/* Konten utama */}
            <div className={`flex-1 p-6 overflow-y-auto min-h-screen transition-margin-left dark:bg-[#121212] transition-colors duration-500 ease-in-out ${isSidebarOpen ? 'md:ml-[20rem]' : 'md:ml-0'}`}>
                <main>{children}</main>
            </div>
        </div>
    );
}