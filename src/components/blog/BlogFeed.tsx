import React, { useState, useMemo } from 'react';
import { Search, Tag, Calendar, Clock, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

export interface BlogPostItem {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  category: string;
  tags: string[];
  readTime: string;
  author: string;
  featured?: boolean;
}

interface BlogFeedProps {
  posts: BlogPostItem[];
}

export default function BlogFeed({ posts }: BlogFeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => tagsSet.add(tag));
    });
    return ['All', ...Array.from(tagsSet)];
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = selectedTag === 'All' || post.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="space-y-10">
      {/* Search & Tag Filter Bar */}
      <div className="card-base p-4 sm:p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--fg-muted))]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Laravel articles, topics, keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[hsl(var(--bg))] border border-[hsl(var(--border))] text-sm text-[hsl(var(--fg))] placeholder:text-[hsl(var(--fg-muted))] focus:outline-none focus:border-[hsl(var(--accent))] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[hsl(var(--fg-muted))] hover:text-[hsl(var(--fg))]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Tag Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[hsl(var(--border))]">
          <span className="text-xs text-[hsl(var(--fg-muted))] flex items-center gap-1 mr-1">
            <Tag className="w-3 h-3" />
            Tags:
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-xs px-3 py-1 rounded-full transition-all font-mono ${
                selectedTag === tag
                  ? 'bg-[hsl(var(--accent))] text-[hsl(var(--bg))] font-medium'
                  : 'bg-[hsl(var(--bg))] text-[hsl(var(--fg-muted))] hover:text-[hsl(var(--fg))] border border-[hsl(var(--border))] hover:border-[hsl(var(--border-strong))]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Schedule Badge */}
      <div className="flex items-center justify-between text-xs font-mono text-[hsl(var(--fg-muted))]">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-[hsl(var(--accent))]" />
          <span>Showing {filteredPosts.length} of {posts.length} articles</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Ditulis oleh Risyal Febrianto</span>
        </div>
      </div>

      {/* Blog Posts List */}
      {filteredPosts.length === 0 ? (
        <div className="card-base p-12 text-center space-y-3">
          <p className="text-sm font-mono text-[hsl(var(--fg-muted))]">
            No articles match "{searchQuery}"
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('All');
            }}
            className="text-xs text-[hsl(var(--accent))] hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="card-base group relative p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[hsl(var(--accent))]"
            >
              <div className="flex flex-col gap-4">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[hsl(var(--fg-muted))]">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[hsl(var(--accent))/0.15] text-[hsl(var(--accent))] border border-[hsl(var(--accent))/0.3] font-medium">
                      {post.category || 'Laravel'}
                    </span>
                    {post.featured && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.pubDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold font-mono text-[hsl(var(--fg))] group-hover:text-[hsl(var(--accent))] transition-colors leading-snug">
                  <a href={`/blog/${post.slug}`} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {post.title}
                  </a>
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-[hsl(var(--fg-muted))] leading-relaxed line-clamp-2">
                  {post.description}
                </p>

                {/* Footer with Tags and Read Link */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[hsl(var(--border))]">
                  <div className="flex flex-wrap gap-1.5 z-10">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag);
                        }}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[hsl(var(--bg))] text-[hsl(var(--fg-muted))] hover:text-[hsl(var(--accent))] border border-[hsl(var(--border))] cursor-pointer transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[hsl(var(--accent))] group-hover:translate-x-1 transition-transform">
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
