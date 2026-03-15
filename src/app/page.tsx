'use client';

import { useState, useEffect } from 'react';

interface Bookmark {
  name: string;
  url: string;
  favorite: boolean;
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

    if (!name || !url) return;

    const newBookmark: Bookmark = {
      name,
      url,
      favorite: false
    };

    setBookmarks([...bookmarks, newBookmark]);

    setName('');
    setUrl('');
  };

  // delete bookmark
  const deleteBookmark = (url: string) => {

    if (!confirm("Delete this bookmark?")) return;

    const updated = bookmarks.filter((b) => b.url !== url);
    setBookmarks(updated);
  };

  // toggle favorite
  const toggleFavorite = (url: string) => {

    const updated = bookmarks.map((bookmark) =>
      bookmark.url === url
        ? { ...bookmark, favorite: !bookmark.favorite }
        : bookmark
    );

    setBookmarks(updated);
  };

  // open website
  const openBookmark = (url: string) => {
    window.open(url, '_blank');
  };

  // favoriteを上に表示
  const sortedBookmarks = [...bookmarks].sort(
    (a, b) => Number(b.favorite) - Number(a.favorite)
  );

  return (
    <div className="min-h-screen bg-black p-2">

      <div className="max-w-lg mx-auto">

        <h1 className="text-2xl font-bold text-center mb-18 mt-18 text-white">
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
              className="w-full p-2 bg-white/20 border border-white/30 rounded-lg text-white"
            />

            <input
              type="url"
              placeholder="Website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 bg-white/20 border border-white/30 rounded-lg text-white"
            />

            <button
              onClick={addBookmark}
              className="w-full bg-white/20 text-white p-2 rounded-lg hover:bg-white/30"
            >
              Add Bookmark
            </button>

          </div>

        </div>

        {/* Bookmark list */}

        <div className="space-y-2">

          {sortedBookmarks.map((bookmark) => (

            <div
              key={bookmark.url}
              className="bg-white/10 backdrop-blur-lg p-3 rounded-xl shadow-lg flex justify-between items-center"
            >

              <h3
                onClick={() => openBookmark(bookmark.url)}
                className="text-base font-medium text-white cursor-pointer"
              >
                {bookmark.name}
              </h3>

              <div className="flex gap-3">

                {/* favorite */}

                <button
                  onClick={() => toggleFavorite(bookmark.url)}
                  className="text-yellow-400 text-lg"
                >
                  {bookmark.favorite ? "★" : "☆"}
                </button>

                {/* delete */}

                <button
                  onClick={() => deleteBookmark(bookmark.url)}
                  className="text-red-400"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}