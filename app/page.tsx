export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-900 mb-4">UniFlow</h1>
        <p className="text-xl text-gray-600 mb-8">Real-time Campus Pulse for AAUA</p>
        <a href="/login" className="bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-medium">
          Get Started
        </a>
      </div>
    </div>
  );
}