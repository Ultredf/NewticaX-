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