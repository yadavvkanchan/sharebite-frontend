'use client';
export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-700 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">🚫 Access Denied</h1>
      <p className="text-lg">You are not authorized to view this page.</p>
    </div>
  );
}
