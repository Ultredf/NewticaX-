// src/components/home/hero-section.tsx
import Link from 'next/link';
import { Article } from '@/types';

interface HeroSectionProps {
  articles: Article[];
}

export function HeroSection({ articles }: HeroSectionProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Featured Article */}
          <div className="lg:col-span-1">
            <Link href={`/article/${articles[0].slug}`}>
              <div className="group relative h-96 overflow-hidden rounded-xl">
                <img 
                  src={articles[0].image || '/api/placeholder/800/600'} 
                  alt={articles[0].title} 
                  className="object-cover w-full h-full transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent">
                  <div className="absolute bottom-0 p-6 space-y-2">
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-md uppercase">
                      Breaking News
                    </span>
                    <h2 className="text-2xl font-bold leading-tight line-clamp-3">
                      {articles[0].title}
                    </h2>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {articles[0].summary}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Secondary Featured Articles */}
          <div className="lg:col-span-1 grid grid-cols-1 gap-4">
            {articles.slice(1, 3).map((article) => (
              <Link href={`/article/${article.slug}`} key={article.id}>
                <div className="group relative h-44 overflow-hidden rounded-xl">
                  <img 
                    src={article.image || '/api/placeholder/600/300'} 
                    alt={article.title} 
                    className="object-cover w-full h-full transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent">
                    <div className="absolute bottom-0 p-4 space-y-1">
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-md uppercase inline-block">
                        Breaking News
                      </span>
                      <h3 className="text-lg font-medium leading-tight line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// src/components/home/featured-section.tsx
import Link from 'next/link';
import { Article } from '@/types';
import { Button } from '@/components/ui/button';

interface FeaturedSectionProps {
  title: string;
  articles: Article[];
}

export function FeaturedSection({ title, articles }: FeaturedSectionProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/trending">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <Link href={`/article/${article.slug}`} key={article.id}>
              <div className="group bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="aspect-video relative">
                  <img 
                    src={article.image || '/api/placeholder/600/400'} 
                    alt={article.title} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">
                      Trending
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.category?.name || 'Uncategorized'}</span>
                    <div className="flex items-center">
                      <span className="text-sm">{article._count?.likes || 0} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// src/components/home/latest-section.tsx
import { Article } from '@/types';
import { ArticleCard } from '@/components/article/article-card';
import { Pagination } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface LatestSectionProps {
  title: string;
  articles: Article[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export function LatestSection({ title, articles, pagination }: LatestSectionProps) {
  if (!articles || articles.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="text-center py-8 bg-white dark:bg-gray-900 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No articles found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="/latest">View All</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {pagination && pagination.pages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pages}
            onPageChange={(page) => {
              // Handle page change - this would typically update query params
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}
    </div>
  );
}

// src/components/home/popular-section.tsx
import Link from 'next/link';
import { Article } from '@/types';
import { format } from 'date-fns';

interface PopularSectionProps {
  title: string;
  articles: Article[];
}

export function PopularSection({ title, articles }: PopularSectionProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
        <div className="space-y-4">
          {articles.map((article, index) => (
            <Link href={`/article/${article.slug}`} key={article.id}>
              <div className="flex gap-3 group">
                <span className="font-bold text-xl text-gray-300 dark:text-gray-700">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-medium group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <span>
                      {format(new Date(article.publishedAt), 'MMM d, yyyy')}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{article._count?.likes || 0} likes</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// src/components/home/category-section.tsx
import Link from 'next/link';
import { Category } from '@/types';

interface CategorySectionProps {
  title: string;
  categories: Category[];
}

export function CategorySection({ title, categories }: CategorySectionProps) {
  if (!categories || categories.length === 0) return null;

  // Helper function to get a color class based on category name
  const getCategoryColor = (name: string) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800',
      'bg-pink-100 text-pink-800',
    ];

    // Create a deterministic index based on the category name
    const index = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link href={`/category/${category.slug}`} key={category.id}>
              <span className={`inline-block px-3 py-2 rounded-lg ${getCategoryColor(category.name)} hover:opacity-90 transition-opacity`}>
                {category.name}
                {category._count?.articles && (
                  <span className="ml-1 text-xs opacity-80">({category._count.articles})</span>
                )}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}