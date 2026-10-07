import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetPosts } from '../api/useBlogQueries';
import { useAuth } from '../features/auth/AuthContext';

export default function BlogFeedPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, isError } = useGetPosts(searchQuery);
  const { user, logout } = useAuth();

  return (
    <div className="max-w-6xl mx-auto p-6 font-body text-paper-100 min-h-screen">
      <header className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
        <h1 className="text-4xl font-display font-bold text-paper-100 tracking-tight">Folio Blogs</h1>
        <div className="flex gap-5 items-center">
          {user ? (
            <>
              <Link to="/create-post" className="auth-primary-button px-5 py-2.5 rounded-xl text-sm font-semibold text-ink-950 transition-colors">Write a Post</Link>
              <button onClick={logout} className="text-sm text-paper-400 hover:text-ember-400 transition-colors font-medium">Logout</button>
            </>
          ) : (
            <Link to="/auth" className="text-sm text-ember-400 font-medium hover:text-ember-500 transition-colors">Sign In / Register</Link>
          )}
        </div>
      </header>
      
      <div className="mb-10 flex justify-between items-center">
        <input 
          type="text" 
          placeholder="Search for ideas, stories, and more..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="auth-input w-full max-w-md rounded-xl border border-ink-700/80 bg-ink-950/70 px-4 py-3 text-sm text-paper-100 placeholder:text-paper-400/55 focus:outline-none"
        />
      </div>

      {isLoading && <div className="text-center text-paper-400 py-20">Loading stories...</div>}
      {isError && <div className="text-center text-red-400 py-20">Error loading stories.</div>}

      {!isLoading && !isError && data?.posts?.length === 0 && (
        <div className="text-center text-paper-400 py-20 text-lg">No stories found.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.posts?.map((post) => (
          <div key={post._id} className="auth-card rounded-2xl p-5 hover:-translate-y-1 transition-transform duration-300 flex flex-col border border-white/[0.07]">
            {post.coverImage && <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover rounded-xl mb-5" />}
            <h2 className="text-2xl font-display font-bold mb-3 line-clamp-2 leading-tight">
                <Link to={`/blog/${post.slug}`} className="text-paper-100 hover:text-ember-400 transition-colors">{post.title}</Link>
            </h2>
            <p className="text-paper-400 mb-5 line-clamp-3 flex-1 text-sm leading-relaxed">{post.excerpt}</p>
            <div className="flex justify-between items-center text-xs text-paper-400/75 mt-auto pt-4 border-t border-white/5">
              <span>By <span className="text-paper-100 font-medium">{post.author?.name || 'Anonymous'}</span></span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
