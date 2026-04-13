'use client'

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
        <div className="max-w-xl p-8! bg-white rounded-3xl shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4!">Something went wrong</h1>
          <p className="text-base mb-6!">{error.message}</p>
        </div>
      </body>
    </html>
  );
}
