import { notFound } from 'next/navigation';
import { animeData } from '../../../../data/anime';
import Link from 'next/link';
import { Play } from 'lucide-react';

export default function AnimeSeriesPage({ params }: { params: { id: string } }) {
  const anime = animeData.find(a => a.id === params.id);
  
  if (!anime || anime.type !== 'series') {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white pt-20 px-4 md:px-12">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 mb-12 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold z-20 px-4 text-center">
            {anime.title}
          </h1>
        </div>
      </div>

      {/* Series Info */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
              <div className="w-full h-full flex items-center justify-center">
                <Play className="w-16 h-16 text-white/50" />
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-gray-300 mb-6">{anime.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
              <div>
                <div className="font-medium">Year</div>
                <div>{anime.year}</div>
              </div>
              <div>
                <div className="font-medium">Type</div>
                <div>TV Series • {anime.episodes.length} Episodes</div>
              </div>
              <div>
                <div className="font-medium">Genres</div>
                <div>{anime.genres.join(' • ')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Episodes</h2>
        <div className="space-y-4">
          {anime.episodes.map((episode) => (
            <Link 
              key={episode.id}
              href={`/dashboard/watch?animeId=${anime.id}&episodeId=${episode.id}`}
              className="block bg-gray-900/50 hover:bg-gray-800/50 rounded-lg p-4 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-red-700 transition-colors">
                    <Play className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Episode {episode.id}</h3>
                    <p className="text-sm text-gray-400">{episode.title}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {episode.duration}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
