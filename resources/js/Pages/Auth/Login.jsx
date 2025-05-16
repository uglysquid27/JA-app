import React from 'react';
import { Link, useForm } from '@inertiajs/inertia-react';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import Navbar from '../../Layouts/navbar';
import { Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
const Login = ({ status, canResetPassword }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="font-poppins bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-900 dark:to-black min-h-screen flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Log in" />
            <Navbar />
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 md:p-12 w-full max-w-md mt-20">
                <div className="mb-6">
                    <Link href="/">
                        <img
                            src="/img/logoArina.png"
                            alt="Logo"
                            className="h-16 w-auto mx-auto mb-4"
                        />
                    </Link>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
                        Welcome back!
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Log in to access your account.
                    </p>
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 text-center dark:text-green-400">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FaEnvelope className="text-gray-500 dark:text-gray-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline pl-10 bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        <p className="mt-2 text-red-500 text-sm dark:text-red-400">{errors.email}</p>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FaLock className="text-gray-500 dark:text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline pl-10 bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                        <p className="mt-2 text-red-500 text-sm dark:text-red-400">{errors.password}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:bg-gray-900 dark:border-gray-500 dark:text-blue-400 dark:focus:ring-blue-400"
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                Remember me
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md dark:text-blue-400 dark:hover:text-blue-300 dark:focus:ring-blue-400"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full py-3 rounded-md font-semibold text-white text-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-gradient-to-br focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md transition-colors duration-300 dark:from-blue-400 dark:to-indigo-500 dark:hover:from-blue-300 dark:hover:to-indigo-400"
                            disabled={processing}
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
