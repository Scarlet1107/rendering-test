import { createClient } from "@/lib/supabase/server";

interface Todo {
    id: string;
    created_at: string;
    title?: string;
    description?: string;
    completed?: boolean;
}

async function getTodo(): Promise<{ todo: Todo | null; error: string | null }> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('todo')
        .select('*')
        .eq('id', '25d8dac3-f3c3-4231-bbce-6b33947165a4')
        .single();

    if (error) {
        return { todo: null, error: error.message };
    }

    return { todo: data, error: null };
}

export default async function ServerSidePage() {
    const renderStartTime = Date.now();
    const { todo, error } = await getTodo();
    const renderEndTime = Date.now();
    const renderTime = renderEndTime - renderStartTime;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Server-Side Rendering Test
                </h1>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Rendering Performance
                    </h2>
                    <div className="flex items-center space-x-4">
                        <div className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-lg">
                            <span className="text-green-800 dark:text-green-200 font-medium">
                                Server-side fetch time: {renderTime}ms
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Todo Data (Server-side fetched)
                    </h2>

                    {error ? (
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
