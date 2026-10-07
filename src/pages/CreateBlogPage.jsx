import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useCreatePost } from '../api/useBlogQueries';
import { useNavigate, Link } from 'react-router-dom';

export default function CreateBlogPage() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  const { mutate: createPost, isPending } = useCreatePost();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !excerpt) return alert('Please fill in required fields');

    createPost(
      {
        title,
        excerpt,
        content,
        coverImage,
        tags: tags.split(',').map((t) => t.trim()),
      },
      {
        onSuccess: (data) => {
          navigate(`/blog/${data.slug}`);
        },
        onError: (err) => {
          console.error(err);
          alert(err.response?.data?.message || err.message || 'Something went wrong while publishing.');
        }
      }
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 font-body text-paper-100 min-h-screen">
      <Link to="/" className="text-ember-400 hover:text-ember-500 transition-colors mb-6 inline-flex items-center gap-2 text-sm font-medium">
        <span aria-hidden="true">&larr;</span> Back to feed
      </Link>
      
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10">
        <div>
            <p className="eyebrow mb-2 text-ember-400">Draft your ideas</p>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-paper-100 tracking-tight">Write a New Story</h1>
        </div>
        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className="auth-secondary-button rounded-xl border border-ink-700/80 bg-white/5 px-4 py-2 text-sm font-medium text-paper-100 transition-colors hover:bg-white/10"
        >
          {showGuide ? 'Hide Guide' : '📖 Formatting Guide'}
        </button>
      </div>

      {showGuide && (
        <div className="editorial-note text-paper-100 p-6 rounded-2xl mb-8 shadow-lg text-sm border border-white/10">
          <h3 className="text-lg font-display font-bold text-ember-400 mb-3">💡 How to Format</h3>
          <ul className="space-y-3 text-paper-400">
            <li><code className="text-paper-100 bg-white/10 px-1.5 py-0.5 rounded"># Heading 1</code> - Primary Section Title</li>
            <li><code className="text-paper-100 bg-white/10 px-1.5 py-0.5 rounded">## Heading 2</code> - Sub-sections</li>
            <li><code className="text-paper-100 bg-white/10 px-1.5 py-0.5 rounded">**Bold Text**</code> - Highlight important keywords</li>
            <li><code className="text-paper-100 bg-white/10 px-1.5 py-0.5 rounded">`code block`</code> - Inline technical terms</li>
            <li><code className="text-paper-100 bg-white/10 px-1.5 py-0.5 rounded">```javascript ... ```</code> - Code blocks with syntax highlighting</li>
            <li><code className="text-paper-100 bg-white/10 px-1.5 py-0.5 rounded">&gt; Quote text</code> - Callout boxes</li>
            <li><code className="text-paper-100 bg-white/10 px-1.5 py-0.5 rounded">![Alt text](image_url)</code> - Insert images</li>
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-paper-400 mb-2">Story Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="A catchy title goes here..."
            className="auth-input w-full rounded-xl border border-ink-700/80 bg-ink-950/70 px-4 py-3 text-lg font-display text-paper-100 placeholder:text-paper-400/55 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-paper-400 mb-2">Short Excerpt (Summary)</label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A short hook for your blog feed card..."
            className="auth-input w-full rounded-xl border border-ink-700/80 bg-ink-950/70 px-4 py-3 text-sm text-paper-100 placeholder:text-paper-400/55 focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
            <label className="block text-sm font-medium text-paper-400 mb-2">Cover Image URL (Optional)</label>
            <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="auth-input w-full rounded-xl border border-ink-700/80 bg-ink-950/70 px-4 py-3 text-sm text-paper-100 placeholder:text-paper-400/55 focus:outline-none"
            />
            </div>
            
            <div>
            <label className="block text-sm font-medium text-paper-400 mb-2">Tags (comma separated)</label>
            <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="react, javascript, tutorial"
                className="auth-input w-full rounded-xl border border-ink-700/80 bg-ink-950/70 px-4 py-3 text-sm text-paper-100 placeholder:text-paper-400/55 focus:outline-none"
            />
            </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-paper-400 mb-2">Content</label>
          <div data-color-mode="dark" className="rounded-xl overflow-hidden border border-ink-700/80">
            <MDEditor
              value={content}
              onChange={setContent}
              height={500}
              preview="live"
              className="bg-ink-950/70"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="auth-primary-button w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold text-ink-950 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? 'Publishing...' : 'Publish Story'}
        </button>
      </form>
    </div>
  );
}
