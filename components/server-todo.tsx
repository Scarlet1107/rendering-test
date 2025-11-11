import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

interface Todo {
    id: string;
    created_at: string;
    title?: string;
    description?: string;
    completed?: boolean;
}

async function ServerTodoData() {
    const fetchStartTime = Date.now();

    const supabase = await createClient();
    const { data, error } = await supabase
        .from(`${process.env.NEXT_PUBLIC_TABLE_NAME}`)
        .select('*')
        .eq('id', `${process.env.NEXT_PUBLIC_COLUMN_ID}`)
        .single();

    const fetchEndTime = Date.now();
    const fetchTime = fetchEndTime - fetchStartTime;

    if (error) {
        return (
            <div className="space-y-4">
                <div className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-lg">
                    <span className="text-green-800 dark:text-green-200 font-medium">
                        Server-side fetch time: {fetchTime}ms
                    </span>
                </div>
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded">
                    <strong className="font-bold">Server Error:</strong>
                    <span className="block sm:inline"> {error.message}</span>
                </div>
            </div>
        );
    }

    const todo = data as Todo;

    return (
        <div className="space-y-4">
            <div className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-lg">
                <span className="text-green-800 dark:text-green-200 font-medium">
                    Server-side fetch time: {fetchTime}ms
                </span>
            </div>

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
        </div>
    );
}

function ServerTodoSkeleton() {
    return (
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
        </div>
    );
}

export function ServerTodo() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Server-Side Rendering (SSR)
            </h2>
            <Suspense fallback={<ServerTodoSkeleton />}>
                <ServerTodoData />
            </Suspense>
        </div>
    );
}
