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
} from "@heroicons/react/24/solid";
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function DefaultSidebar({ header, children }) {
    return (
        <div className="flex bg-gray-50">
            {/* Sidebar */}
            <Card className="fixed top-0 left-0 h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 flex flex-col justify-between z-50 bg-white border-r border-blue-gray-200">
                <div>
                    <div className="mb-6 p-4 border-b border-blue-gray-300">
                        <Link href={route('dashboard')} className="flex items-center">
                            <ApplicationLogo className="h-8 w-8 fill-current text-blue-500 mr-2" />
                            <Typography variant="h6" color="blue-gray" className="font-semibold">
                                My App
                            </Typography>
                        </Link>
                    </div>
                    <List className="space-y-3">
                        <Link href={route('dashboard')}>
                            <ListItem className="rounded-lg hover:bg-blue-gray-50 transition-colors duration-200">
                                <ListItemPrefix className="mr-3">
                                    <div className="bg-blue-50 rounded-md p-2">
                                        <PresentationChartBarIcon className="h-5 w-5 text-blue-500" />
                                    </div>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">Dashboard</Typography>
                            </ListItem>
                        </Link>
                        <Link href={route('book')}>
                            <ListItem className="rounded-lg hover:bg-blue-gray-50 transition-colors duration-200">
                                <ListItemPrefix className="mr-3">
                                    <div className="bg-indigo-50 rounded-md p-2">
                                        <InboxIcon className="h-5 w-5 text-indigo-500" />
                                    </div>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">Book a ride</Typography>
                            </ListItem>
                        </Link>
                        <Link href={route('vehicle-checks.index')}>
                            <ListItem className="rounded-lg hover:bg-blue-gray-50 transition-colors duration-200">
                                <ListItemPrefix className="mr-3">
                                    <div className="bg-teal-50 rounded-md p-2">
                                        <ShoppingBagIcon className="h-5 w-5 text-teal-500" />
                                    </div>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">Vehicle Check</Typography>
                            </ListItem>
                        </Link>
                        <Link href="#" className="disabled"> {/* Contoh link tidak aktif */}
                            <ListItem className="rounded-lg hover:bg-blue-gray-50 transition-colors duration-200">
                                <ListItemPrefix className="mr-3">
                                    <div className="bg-gray-100 rounded-md p-2">
                                        <UserCircleIcon className="h-5 w-5 text-gray-500" />
                                    </div>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">User Management</Typography>
                            </ListItem>
                        </Link>
                        <Link href="#" className="disabled"> {/* Contoh link tidak aktif */}
                            <ListItem className="rounded-lg hover:bg-blue-gray-50 transition-colors duration-200">
                                <ListItemPrefix className="mr-3">
                                    <div className="bg-orange-50 rounded-md p-2">
                                        <Cog6ToothIcon className="h-5 w-5 text-orange-500" />
                                    </div>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">Settings</Typography>
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
                            Log Out
                        </ResponsiveNavLink>
                    </ListItem>
                </div>
            </Card>

            {/* Main content */}
            <div className="ml-[20rem] flex-1 p-6 overflow-y-auto min-h-screen">
                <main>{children}</main>
            </div>
        </div>
    );
}