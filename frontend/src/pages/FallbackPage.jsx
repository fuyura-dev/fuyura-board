function FallbackPage() {
  return (
    <div className="items-center justify-center flex bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Service Unavailable
        </h1>
        <p className="text-gray-700">
          Backend is currently offline. Please check back later.
        </p>
      </div>
    </div>
  );
}

export default FallbackPage;
