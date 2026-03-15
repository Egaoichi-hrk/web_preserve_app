'use client';

import { useState, useEffect } from 'react';

interface Bookmark {
  name: string;
  url: string;
}

export default function Home() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  // load bookmarks
  useEffect(() => {
    const stored = localStorage.getItem('bookmarks');
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, []);

  // save bookmarks
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // add bookmark
  const addBookmark = () => {
    if (name && url) {
      setBookmarks([...bookmarks, { name, url }]);
      setName('');
      setUrl('');
    }
  };

  // delete bookmark
  const deleteBookmark = (index: number) => {
    if (!confirm("Delete this bookmark?")) return;
    const updated = bookmarks.filter((_, i) => i !== index);
    setBookmarks(updated);
  };

  // open bookmark
  const openBookmark = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-black p-2">
      <div className="max-w-lg mx-auto">

        <h1 className="text-2xl font-bold text-center mb-18 mt-18 text-white drop-shadow-lg">
          Favorite Websites
        </h1>

        {/* Add bookmark */}
        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl shadow-xl mb-18">
          <h2 className="text-lg font-semibold mb-2 text-white">
            Add New Bookmark
          </h2>

          <div className="space-y-2">

            <input
              type="text"
              placeholder="Website Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none"
            />

            <input
              type="url"
              placeholder="Website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none"
            />

            <button
              onClick={addBookmark}
              className="w-full bg-white/20 text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              Add Bookmark
            </button>

          </div>
        </div>

        {/* Bookmark list */}
        <div className="space-y-2">

          {bookmarks.map((bookmark, index) => (

            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg p-3 rounded-xl shadow-lg flex justify-between items-center"
            >

              <h3
                onClick={() => openBookmark(bookmark.url)}
                className="text-base font-medium text-white cursor-pointer"
              >
                {bookmark.name}
              </h3>

              <button
                onClick={() => deleteBookmark(index)}
                className="text-red-400 hover:text-red-300"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}