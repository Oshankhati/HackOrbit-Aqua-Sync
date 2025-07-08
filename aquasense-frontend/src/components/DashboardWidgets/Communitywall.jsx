// 

import React, { useState } from 'react';

export default function Communitywall() {
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);

  const handlePost = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newPost = {
      id: Date.now(),
      content: message,
      likes: 0,
    };

    setPosts([newPost, ...posts]);
    setMessage('');
  };

  const handleLike = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <section
      className="bg-gradient-to-br from-white via-indigo-50 to-indigo-100 p-6 rounded-2xl shadow-lg max-w-xl mx-auto"
      aria-label="Community Wall"
    >
      <h2 className="text-2xl font-bold mb-5 text-indigo-700">🗣 Community Wall</h2>

      {/* Post Input */}
      <form onSubmit={handlePost} className="space-y-3 mb-8" aria-live="polite">
        <label htmlFor="postMessage" className="sr-only">
          Share a water-saving tip or question
        </label>
        <textarea
          id="postMessage"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share a water-saving tip or question..."
          rows={3}
          className="w-full rounded-lg border border-indigo-300 bg-indigo-50 px-4 py-3 resize-none
                     text-indigo-900 placeholder-indigo-500
                     focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold rounded-lg py-3
                     hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition"
          disabled={!message.trim()}
          aria-disabled={!message.trim()}
        >
          Post
        </button>
      </form>

      {/* Post Feed */}
      <div className="space-y-5">
        {posts.length === 0 ? (
          <p className="text-center text-indigo-600 italic">No posts yet. Be the first to share!</p>
        ) : (
          posts.map((post) => (
            <article
              key={post.id}
              className="bg-indigo-100 p-4 rounded-xl shadow-md"
              aria-label={`Post: ${post.content.substring(0, 20)}...`}
            >
              <p className="text-indigo-900">{post.content}</p>
              <div className="flex items-center justify-between mt-3 text-indigo-700 text-sm">
                <button
                  type="button"
                  onClick={() => handleLike(post.id)}
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded px-2"
                  aria-label={`Like post: ${post.content.substring(0, 20)}. Currently liked ${post.likes} times`}
                >
                  👍 Like ({post.likes})
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(post.id)}
                  className="hover:underline text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded px-2"
                  aria-label={`Delete post: ${post.content.substring(0, 20)}`}
                >
                  🗑 Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
