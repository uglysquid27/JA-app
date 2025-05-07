import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function DefaultSidebar({ header, children }) {
    return (
        <div className="flex bg-gray-100">
            {/* Sidebar */}
            <Card className="fixed top-0 left-0 h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 flex flex-col justify-between z-50">
                <div>
                    <div className="mb-4 p-4 border-b border-gray-400">
                        <ApplicationLogo className="h-8 w-8 fill-current text-blue-500" />
                    </div>
                    <List className="space-y-6">
                        <Link href={route('dashboard')}>
                        <ListItem className="rounded-lg hover:bg-blue-gray-50">
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <p className="px-4">Dashboard</p>
                        </ListItem>
                        </Link>
                        <Link href={route('book')}>
                        <ListItem className="rounded-lg hover:bg-blue-gray-50">
                            <ListItemPrefix>
                                <InboxIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <p className="px-4">Book a ride</p>
                        </ListItem>
                        </Link>
                        <ListItem className="rounded-lg hover:bg-blue-gray-50">
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <p className="px-4">User</p>
                        </ListItem>
                    </List>
                </div>
                <div>
                    <ListItem className="rounded-lg hover:bg-red-50 hover:text-red-600">
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5 text-red-500" />
                        </ListItemPrefix>
                        <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
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

