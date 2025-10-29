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

export default function ClientSidePage() {
    const [todo, setTodo] = useState<Todo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [fetchTime, setFetchTime] = useState<number | null>(null);
    const [renderStartTime] = useState(Date.now());

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

    const totalRenderTime = Date.now() - renderStartTime;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Client-Side Rendering Test
                </h1>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Rendering Performance
                    </h2>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg">
                                <span className="text-blue-800 dark:text-blue-200 font-medium">
                                    Total render time: {totalRenderTime}ms
                                </span>
                            </div>
                        </div>
                        {fetchTime !== null && (
                            <div className="flex items-center space-x-4">
                                <div className="bg-purple-100 dark:bg-purple-900 px-4 py-2 rounded-lg">
                                    <span className="text-purple-800 dark:text-purple-200 font-medium">
                                        Client-side fetch time: {fetchTime}ms
                                    </span>
                                </div>
                            </div>
                        )}
                        {loading && (
                            <div className="bg-yellow-100 dark:bg-yellow-900 px-4 py-2 rounded-lg">
                                <span className="text-yellow-800 dark:text-yellow-200 font-medium">
                                    Loading...
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Todo Data (Client-side fetched with useEffect)
                    </h2>

                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            <span className="ml-4 text-gray-600 dark:text-gray-400">Fetching data...</span>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    ) : todo ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ID:</label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
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
            </div>
        </div>
    );
}
