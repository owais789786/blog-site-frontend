import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useGetPostBySlug } from '../api/useBlogQueries';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { data: post, isLoading, isError } = useGetPostBySlug(slug);

  if (isLoading) return <div className="p-20 text-center text-paper-400 font-body">Loading Blog...</div>;
  if (isError || !post) return <div className="p-20 text-center text-red-400 font-body">Blog post not found!</div>;

  return (
    <article className="max-w-3xl mx-auto p-6 my-10 font-body text-paper-100 min-h-screen">
      <Link to="/" className="text-ember-400 hover:text-ember-500 transition-colors mb-8 inline-flex items-center gap-2 text-sm font-medium">
        <span aria-hidden="true">&larr;</span> Back to feed
      </Link>
      
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-2xl mb-10 shadow-lg ring-1 ring-white/10"
        />
      )}

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-paper-100 mb-6 leading-[1.1] tracking-tight">{post.title}</h1>

      <div className="flex items-center space-x-4 mb-12 text-sm text-paper-400 border-b border-white/10 pb-8">
        <span className="font-medium text-paper-100">By {post.author?.name || 'Anonymous'}</span>
        <span>•</span>
        <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        <span>•</span>
        <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {post.readingTime} min read</span>
      </div>

      {/* Tailwind Prose + Markdown Viewer */}
      <div className="prose prose-invert prose-lg max-w-none text-paper-100 prose-headings:font-display prose-headings:text-paper-100 prose-a:text-ember-400 hover:prose-a:text-ember-500 prose-blockquote:border-ember-400 prose-blockquote:bg-white/5 prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:rounded-r-lg prose-img:rounded-xl" data-color-mode="dark">
        <MDEditor.Markdown source={post.content} style={{ backgroundColor: 'transparent', color: 'inherit' }} />
      </div>
    </article>
  );
}
