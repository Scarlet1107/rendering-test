"use client";

import { ThemeSwitcher } from "./theme-switcher";

export function Navigation() {
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div>
                        <span className="font-semibold text-gray-900 dark:text-white text-lg">
                            SSR vs CSR Performance Test
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </nav>
    );
}
