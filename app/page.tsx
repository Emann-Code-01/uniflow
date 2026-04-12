export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6!">
      <div className="text-center max-w-md">
        <div className="mx-auto! mb-6! w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center">
          <span className="text-white text-3xl">🌊</span>
        </div>
        <h1 className="text-5xl font-bold mb-3!">UniFlow</h1>
        <p className="text-xl text-gray-600 mb-8!">
          Real-time Timetable & Campus Pulse for AAUA
        </p>
        <div className="space-y-4">
          <a
            href="/login"
            className="block w-full btn-primary py-4! rounded-2xl text-lg font-medium"
          >
            Go to Login
          </a>
          <p className="text-sm text-gray-500">Supabase connected • Ready for auth</p>
        </div>
      </div>
    </div>
  );
}