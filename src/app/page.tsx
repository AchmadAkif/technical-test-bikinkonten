'use client';

import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getAllAnime } from '@/libs/api-libs';
import { CardSkeleton, Card, ButtonGroup } from '@/components/molecules';

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

const HomePage = () => {
  const [filterByGenre, setFilterByGenre] = useState('All');

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
  }, [isError]);

  const filteredAnimeList = useMemo(() => {
    const animesData = response?.data?.data;

    if (!animesData) return [];

    if (filterByGenre === 'All') {
      return animesData;
    }

    return animesData.filter((anime: IAnimeData) => {
      return anime.genres?.some(
        genre => genre.name.toLowerCase() === filterByGenre.toLowerCase()
      );
    });
  }, [response?.data?.data, filterByGenre]);

  return (
    <div>
      <div className="flex items-center gap-12">
        <h1 className="font-semibold text-lg">Browse Anime</h1>
        <ButtonGroup defaultValue={filterByGenre} onChange={setFilterByGenre} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-4 w-full">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          filteredAnimeList?.map((anime: IAnimeData) => (
            <Card
              key={anime.mal_id}
              imgUrl={anime.images.webp.image_url}
              title={anime.title}
              popularity={anime.popularity}
              year={anime.year}
              genres={anime.genres}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
