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