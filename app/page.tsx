import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Next.js 16 & Supabase Rendering Performance Test
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            サーバーサイドレンダリングとクライアントサイドレンダリングのパフォーマンス比較実験
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Server-Side Rendering
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              サーバーコンポーネントでデータを取得し、初期レンダリング時にデータが含まれた状態で表示されます。
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>サーバーでのデータフェッチ</li>
              <li>初期HTML生成時にデータ含有</li>
              <li>SEO最適化</li>
              <li>初期表示が高速</li>
            </ul>
            <Link
              href="/server-side"
              className="inline-block w-full text-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Server-Side Test →
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Client-Side Rendering
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              useEffect内でクライアントサイドデータフェッチを行い、ローディング状態からデータ表示へと遷移します。
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>クライアントでのデータフェッチ</li>
              <li>useEffect内での処理（アンチパターン）</li>
              <li>ローディング状態表示</li>
              <li>インタラクティブな体験</li>
            </ul>
            <Link
              href="/client-side"
              className="inline-block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Client-Side Test →
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            実験内容
          </h3>
          <div className="text-gray-600 dark:text-gray-300 space-y-3">
            <p>
              <strong>対象データ:</strong> Todoテーブルのid「25d8dac3-f3c3-4231-bbce-6b33947165a4」のレコード
            </p>
            <p>
              <strong>測定項目:</strong> データフェッチ開始から画面表示完了までの時間（ミリ秒単位）
            </p>
            <p>
              <strong>使用技術:</strong> Next.js 16, Supabase SSR, TypeScript
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
