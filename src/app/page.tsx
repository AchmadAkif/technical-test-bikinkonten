'use client';

import { useEffect, useMemo, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getAllAnime } from '@/libs/api-libs';
import { CardSkeleton, Card, ButtonGroup } from '@/components/molecules';
import { useUrlState } from '@/hooks/useUrlState';
import { useSearch } from './SearchProvider';

interface IAnimeData {
  mal_id: number;
  title: string;
  popularity: number;
  year: number;
  images: {
    webp: {
      image_url: string;
    };
  };
  genres: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
}

const HomePageContent = () => {
  const { getParam, setParam, clearAllParams } = useUrlState();
  const { searchTerm, setSearchTerm } = useSearch();

  // Get state from URL parameters
  const filterByGenre = getParam('genre', 'All');

  const {
    data: response,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['animeList'],
    queryFn: getAllAnime,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      alert(error);
    }
  }, [isError, error]);

  const filteredAnimeList = useMemo(() => {
    const animesData = response?.data?.data;

    if (!animesData) return [];

    let filtered = animesData;

    if (filterByGenre !== 'All') {
      filtered = filtered.filter((anime: IAnimeData) => {
        return anime.genres?.some(
          genre => genre.name.toLowerCase() === filterByGenre.toLowerCase()
        );
      });
    }

    if (searchTerm && searchTerm.trim() !== '') {
      filtered = filtered.filter((anime: IAnimeData) =>
        anime.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    return filtered;
  }, [response?.data?.data, filterByGenre, searchTerm]);

  const handleGenreChange = (genre: string) => {
    setParam('genre', genre);
  };

  const handleClearFilters = () => {
    clearAllParams();
    setSearchTerm('');
  };

  return (
    <div>
      <div className="flex items-center gap-12">
        <h1 className="font-semibold text-lg">Browse Anime</h1>
        <ButtonGroup
          defaultValue={filterByGenre}
          onChange={handleGenreChange}
        />
      </div>

      {/* Filter Info & Clear Button */}
      {(searchTerm || filterByGenre !== 'All') && (
        <div className="mt-4 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {searchTerm && (
              <p className="text-sm text-gray-600">
                Search: "<span className="font-medium">{searchTerm}</span>"
              </p>
            )}
            {filterByGenre !== 'All' && (
              <p className="text-sm text-gray-600">
                Genre: <span className="font-medium">{filterByGenre}</span>
              </p>
            )}
            <p className="text-sm text-gray-500">
              ({filteredAnimeList.length} results)
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-4 w-full">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : filteredAnimeList.length > 0 ? (
          filteredAnimeList.map((anime: IAnimeData) => (
            <Card
              key={anime.mal_id}
              imgUrl={anime.images.webp.image_url}
              title={anime.title}
              popularity={anime.popularity}
              year={anime.year}
              genres={anime.genres}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">
              {searchTerm
                ? `No anime found for "${searchTerm}"${filterByGenre !== 'All' ? ` in ${filterByGenre} genre` : ''}`
                : `No anime found for "${filterByGenre}" genre`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
};

export default HomePage;
