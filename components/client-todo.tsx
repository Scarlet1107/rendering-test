"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

interface Todo {
    id: string;
    created_at: string;
    title?: string;
    description?: string;
    completed?: boolean;
}

export function ClientTodo() {
    const [todo, setTodo] = useState<Todo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [fetchTime, setFetchTime] = useState<number | null>(null);

    useEffect(() => {
        const fetchTodo = async () => {
            const fetchStartTime = Date.now();
            const supabase = createClient();

            try {
                const { data, error } = await supabase
                    .from('todo')
                    .select('*')
                    .eq('id', '25d8dac3-f3c3-4231-bbce-6b33947165a4')
                    .single();

                const fetchEndTime = Date.now();
                setFetchTime(fetchEndTime - fetchStartTime);

                if (error) {
                    setError(error.message);
                } else {
                    setTodo(data);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchTodo();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Client-Side Rendering (CSR)
            </h2>

            {loading ? (
                <div className="space-y-4 animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-600 px-4 py-2 rounded-lg">
                        <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-48"></div>
                    </div>

                    <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-8 mb-2"></div>
                            <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        </div>
                        <div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-10 mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
                        </div>
                        <div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16 mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-48"></div>
                        </div>
                        <div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-20 mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-40"></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {fetchTime !== null && (
                        <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg">
                            <span className="text-blue-800 dark:text-blue-200 font-medium">
                                Client-side fetch time: {fetchTime}ms
                            </span>
                        </div>
                    )}

                    {error ? (
                        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded">
                            <strong className="font-bold">Client Error:</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    ) : todo ? (
                        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ID:</label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white font-mono bg-white dark:bg-gray-800 p-2 rounded">
                                    {todo.id}
                                </p>
                            </div>

                            {todo.title && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title:</label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {todo.title}
                                    </p>
                                </div>
                            )}

                            {todo.description && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description:</label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {todo.description}
                                    </p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Created At:</label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {new Date(todo.created_at).toLocaleString()}
                                </p>
                            </div>

                            {typeof todo.completed === 'boolean' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status:</label>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${todo.completed
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                        }`}>
                                        {todo.completed ? 'Completed' : 'Pending'}
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No todo found with the specified ID.</p>
                    )}
                </div>
            )}
        </div>
    );
}
