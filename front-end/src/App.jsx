     import React, { useState } from "react";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl }),
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          🔗 URL Shortener
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter your long URL..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Shorten
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-gray-700 font-medium">
              Short URL:{" "}
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                {shortUrl}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

