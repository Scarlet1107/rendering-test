import { ServerTodo } from "@/components/server-todo";
import { ClientTodo } from "@/components/client-todo";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            SSR vs CSR Performance Comparison
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            同一ページで同時実行されるサーバーサイドレンダリングとクライアントサイドレンダリングの比較実験
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p><strong>実験条件:</strong></p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>対象データ: Todoテーブル ID「25d8dac3-f3c3-4231-bbce-6b33947165a4」</li>
                <li>測定項目: データフェッチにかかった時間（ミリ秒単位）</li>
                <li>実行環境: 同一ページ、同一条件での同時実行</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <ServerTodo />
          <ClientTodo />
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            パフォーマンス分析のポイント
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">Server-Side Rendering (SSR)</h4>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• サーバーでのデータ取得</li>
                <li>• 初期HTML生成時にデータを含む</li>
                <li>• SEO最適化</li>
                <li>• 初期表示の高速化</li>
                <li>• サーバー負荷とレスポンス時間に依存</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Client-Side Rendering (CSR)</h4>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• クライアントでのデータ取得</li>
                <li>• useEffect内での処理実行</li>
                <li>• ローディング状態の表示</li>
                <li>• インタラクティブな体験</li>
                <li>• ネットワーク状況とクライアント性能に依存</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
