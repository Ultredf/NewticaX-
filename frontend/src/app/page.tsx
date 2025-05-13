'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { NewsCard } from '@/components/news/news-card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { isAuthenticated, getMe } = useAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      getMe();
    }
  }, [isAuthenticated, getMe]);

  // Dummy featured news data
  const featuredNews = [
    {
      id: '1',
      image: '/api/placeholder/800/400',
      category: 'Politik',
      title: 'DPR RESMI SAHKAN RUU TNI JADI UNDANG-UNDANG',
      excerpt: 'DPR RI resmi mengesahkan RUU TNI menjadi Undang-Undang dalam rapat paripurna yang digelar hari ini...',
      time: '40 menit yang lalu',
      views: 890,
      shares: 86
    },
    {
      id: '2',
      image: '/api/placeholder/800/400',
      category: 'Internasional',
      title: 'Trump Sebut AS Akan Ambil Alih Jalur Gaza!',
      excerpt: 'Presiden terpilih Donald Trump mengungkapkan rencana untuk "mengambil alih" jalur Gaza, menimbulkan kekhawatiran atas eskalasi konflik...',
      time: '1 jam yang lalu',
      views: 1240,
      shares: 158
    },
  ];

  // Dummy latest news
  const latestNews = [
    {
      id: '3',
      image: '/api/placeholder/400/300',
      category: 'Sport',
      title: 'Tim Garuda Kalah 5-1, Bagaimana Potensi Lolos Piala Dunia?',
      time: '2 jam yang lalu',
      views: 990,
      shares: 85
    },
    {
      id: '4',
      image: '/api/placeholder/400/300',
      category: 'Kriminalitas',
      title: 'Kasus Kriminal WNI di Jepang Meningkat, Kemlu Ungkap Ada Faktor Judol',
      time: '1 jam yang lalu',
      views: 540,
      shares: 32
    },
    {
      id: '5',
      image: '/api/placeholder/400/300',
      category: 'Ekonomi',
      title: 'Rupiah Menguat di Tengah Ketidakpastian Global',
      time: '3 jam yang lalu',
      views: 320,
      shares: 14
    },
    {
      id: '6',
      image: '/api/placeholder/400/300',
      category: 'Kesehatan',
      title: 'Studi Baru: Pola Makan Sehat Kurangi Risiko Demensia',
      time: '5 jam yang lalu',
      views: 480,
      shares: 62
    },
  ];

  // Dummy popular news
  const popularNews = [
    {
      id: '7',
      image: '/api/placeholder/120/80',
      category: 'Hiburan',
      title: 'Film Indonesia Raih Penghargaan di Festival Film Internasional',
      time: '8 jam yang lalu',
      views: 3200,
      shares: 245
    },
    {
      id: '8',
      image: '/api/placeholder/120/80',
      category: 'Teknologi',
      title: 'AI Made in Indonesia Berhasil Kalahkan Kompetitor Global',
      time: '10 jam yang lalu',
      views: 2800,
      shares: 320
    },
    {
      id: '9',
      image: '/api/placeholder/120/80',
      category: 'Pendidikan',
      title: 'Sistem Pendidikan Baru Fokus pada Pengembangan Keterampilan Praktis',
      time: '12 jam yang lalu',
      views: 1950,
      shares: 178
    },
    {
      id: '10',
      image: '/api/placeholder/120/80',
      category: 'Politik',
      title: 'Kabinet Baru Terbentuk, Ini Daftar Lengkap Menteri dan Programnya',
      time: '1 hari yang lalu',
      views: 4500,
      shares: 520
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Hero Section with Featured News */}
        <section className="mb-8">
          <div className="grid gap-4 md:grid-cols-2">
            {featuredNews.map((news) => (
              <div key={news.id} className="relative rounded-xl overflow-hidden group">
                <div className="aspect-[4/3] sm:aspect-[16/9] relative">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="object-cover w-full h-full brightness-75 group-hover:brightness-90 transition-all"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md inline-block mb-2">
                    {news.category}
                  </span>
                  <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl leading-tight mb-2">
                    {news.title}
                  </h2>
                  <p className="text-gray-200 text-sm hidden sm:block">
                    {news.excerpt}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-300 text-sm">{news.time}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-300 text-sm flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {news.views}
                      </span>
                      <span className="text-gray-300 text-sm flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        {news.shares}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Latest News Section */}
          <section className="lg:col-span-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Berita Terbaru</h2>
              <Button variant="outline" size="sm">Lihat Semua</Button>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              {latestNews.map((news) => (
                <NewsCard
                  key={news.id}
                  id={news.id}
                  image={news.image}
                  category={news.category}
                  title={news.title}
                  time={news.time}
                  views={news.views}
                  shares={news.shares}
                />
              ))}
            </div>
          </section>
          
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            {/* Popular Section */}
            <section>
              <h2 className="text-xl font-bold mb-4">Populer</h2>
              <div className="space-y-4">
                {popularNews.map((news) => (
                  <NewsCard
                    key={news.id}
                    id={news.id}
                    image={news.image}
                    category={news.category}
                    title={news.title}
                    time={news.time}
                    views={news.views}
                    shares={news.shares}
                    isCompact={true}
                  />
                ))}
              </div>
            </section>
            
            {/* Category Section */}
            <section className="mt-8">
              <h2 className="text-xl font-bold mb-4">Kategori</h2>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">Politik</Button>
                <Button variant="outline" className="justify-start">Ekonomi</Button>
                <Button variant="outline" className="justify-start">Teknologi</Button>
                <Button variant="outline" className="justify-start">Kesehatan</Button>
                <Button variant="outline" className="justify-start">Pendidikan</Button>
                <Button variant="outline" className="justify-start">Hiburan</Button>
                <Button variant="outline" className="justify-start">Olahraga</Button>
                <Button variant="outline" className="justify-start">Internasional</Button>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
