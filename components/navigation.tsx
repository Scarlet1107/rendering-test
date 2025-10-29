"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./theme-switcher";

export function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex space-x-7">
                        <div>
                            <Link href="/" className="flex items-center py-4 px-2">
                                <span className="font-semibold text-gray-500 text-lg">
                                    Rendering Test App
                                </span>
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-1">
                            <Link
                                href="/server-side"
                                className={`py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 ${pathname === "/server-side" ? "text-green-500 border-b-2 border-green-500" : ""
                                    }`}
                            >
                                Server Side
                            </Link>
                            <Link
                                href="/client-side"
                                className={`py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 ${pathname === "/client-side" ? "text-green-500 border-b-2 border-green-500" : ""
                                    }`}
                            >
                                Client Side
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </nav>
    );
}
