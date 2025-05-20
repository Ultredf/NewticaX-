// src/components/article/article-card.tsx
import Link from 'next/link';
import { Article } from '@/types';
import { format } from 'date-fns';

interface ArticleCardProps {
  article: Article;
  isCompact?: boolean;
}

export function ArticleCard({ article, isCompact = false }: ArticleCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow 
                    ${isCompact ? 'flex' : ''}`}>
      <div className={`${isCompact ? 'w-1/3 min-w-[100px]' : 'w-full'} aspect-video relative bg-gray-100 dark:bg-gray-800`}>
        <img 
          src={article.image || '/api/placeholder/600/400'} 
          alt={article.title} 
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-black text-white text-xs px-2 py-1 rounded-md">
            {article.category?.name || article.source || 'News'}
          </span>
        </div>
      </div>
      <div className={`p-4 ${isCompact ? 'w-2/3' : ''}`}>
        <Link href={`/article/${article.slug}`}>
          <h3 className={`font-medium hover:text-blue-600 transition-colors ${isCompact ? 'line-clamp-2 text-sm' : 'line-clamp-2'}`}>
            {article.title}
          </h3>
        </Link>
        
        {!isCompact && article.summary && (
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm line-clamp-2">{article.summary}</p>
        )}
        
        <div className={`flex items-center justify-between text-sm text-gray-500 ${isCompact ? 'mt-1' : 'mt-3'}`}>
          <span>{format(new Date(article.publishedAt), 'MMM d, yyyy')}</span>
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {article.viewCount || 0}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {article.shareCount || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/components/article/article-header.tsx
import { Category } from '@/types';
import Link from 'next/link';

interface ArticleHeaderProps {
  title: string;
  image?: string | null;
  category?: Category | null;
}

export function ArticleHeader({ title, image, category }: ArticleHeaderProps) {
  return (
    <div className="mb-6">
      {/* Category link */}
      {category && (
        <Link 
          href={`/category/${category.slug}`}
          className="inline-block mb-3 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          {category.name}
        </Link>
      )}
      
      {/* Article title */}
      <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">{title}</h1>
      
      {/* Article image */}
      {image && (
        <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-6">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

// src/components/article/article-meta.tsx
import { format } from 'date-fns';
import { Author } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ArticleMetaProps {
  author?: Author | null;
  publishedAt: string;
  source?: string | null;
  sourceUrl?: string | null;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export function ArticleMeta({ 
  author, 
  publishedAt, 
  source, 
  sourceUrl,
  viewCount,
  likeCount,
  commentCount
}: ArticleMetaProps) {
  const formattedDate = format(new Date(publishedAt), 'MMMM d, yyyy');
  
  return (
    <div className="flex flex-wrap items-center justify-between py-4 border-y mb-8">
      <div className="flex items-center mb-2 sm:mb-0">
        {author ? (
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={author.image || ''} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{author.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
            </div>
          </div>
        ) : (
          <div>
            {source && (
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Source:</span>
                {sourceUrl ? (
                  <a 
                    href={sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {source}
                  </a>
                ) : (
                  <span className="text-sm">{source}</span>
                )}
              </div>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {viewCount}
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {likeCount}
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          {commentCount}
        </div>
      </div>
    </div>
  );
}

// src/components/article/article-content.tsx
import parse from 'html-react-parser';

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="prose dark:prose-invert max-w-none mb-8">
      {parse(content)}
    </div>
  );
}

// src/components/article/article-actions.tsx
import { Button } from '@/components/ui/button';
import { Heart, Bookmark, Share2 } from 'lucide-react';

interface ArticleActionsProps {
  isLiked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
  onShare: () => void;
}

export function ArticleActions({ 
  isLiked, 
  isBookmarked, 
  onLike, 
  onBookmark, 
  onShare 
}: ArticleActionsProps) {
  return (
    <div className="flex justify-center gap-3 mb-8">
      <Button 
        variant={isLiked ? "default" : "outline"} 
        onClick={onLike}
        className={isLiked ? "bg-red-600 hover:bg-red-700" : ""}
      >
        <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
        {isLiked ? "Liked" : "Like"}
      </Button>
      
      <Button 
        variant={isBookmarked ? "default" : "outline"} 
        onClick={onBookmark}
      >
        <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
        {isBookmarked ? "Saved" : "Save"}
      </Button>
      
      <Button variant="outline" onClick={onShare}>
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
    </div>
  );
}

// src/components/article/article-comments.tsx
import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { Comment, CommentInput } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { format } from 'date-fns';
import { addComment } from '@/services/article-service';
import { toast } from 'sonner';
import { Pagination } from '@/components/ui/pagination';

interface ArticleCommentsProps {
  articleId: string;
  comments: Comment[];
  isLoading: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  onCommentAdded: () => void;
}

export function ArticleComments({ 
  articleId,
  comments,
  isLoading,
  pagination,
  onCommentAdded,
}: ArticleCommentsProps) {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  
  // Handle comment submission
  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;
    
    try {
      setIsSubmitting(true);
      await addComment(articleId, { content: commentText });
      setCommentText('');
      toast.success('Comment added successfully');
      onCommentAdded();
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Get user initials for avatar
  const getInitials = (name: string = '') => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      
      {/* Comment Form */}
      {isAuthenticated ? (
        <div className="mb-8">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="mb-2"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleSubmitComment} 
                  disabled={!commentText.trim() || isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mb-8">
          <p>Please <a href="/login" className="text-blue-600 hover:underline">sign in</a> to leave a comment.</p>
        </div>
      )}
      
      {/* Comments List */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-8">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-6 last:border-b-0">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.user.image || ''} alt={comment.user.name} />
                  <AvatarFallback>{getInitials(comment.user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{comment.user.name}</h4>
                    <span className="text-xs text-gray-500">
                      {format(new Date(comment.createdAt), 'MMM d, yyyy • h:mm a')}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                  
                  {/* Reply button */}
                  {isAuthenticated && (
                    <button className="text-sm text-blue-600 mt-2">Reply</button>
                  )}
                  
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reply.user.image || ''} alt={reply.user.name} />
                            <AvatarFallback>{getInitials(reply.user.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm">{reply.user.name}</h4>
                              <span className="text-xs text-gray-500">
                                {format(new Date(reply.createdAt), 'MMM d, yyyy • h:mm a')}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* View more replies */}
                  {comment._count && comment._count.replies > (comment.replies?.length || 0) && (
                    <button className="text-sm text-blue-600 mt-2">
                      View {comment._count.replies - (comment.replies?.length || 0)} more {comment._count.replies - (comment.replies?.length || 0) === 1 ? 'reply' : 'replies'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.pages}
              onPageChange={(page) => {
                // This would typically update query params to fetch the correct page
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  );
}

// src/components/article/related-articles.tsx
import { Article } from '@/types';
import { ArticleCard } from './article-card';

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;
  
  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}