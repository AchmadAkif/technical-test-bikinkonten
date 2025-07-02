import Image from 'next/image';

import { CardProps } from './Card.config';

const Card = ({ imgUrl, title, popularity, year, genres }: CardProps) => {
  return (
    <div className="w-full p-3 flex flex-col gap-2 border-1 border-[#a1a1a1] rounded-md shadow-sm">
      <Image
        src={imgUrl}
        alt={title || 'anime poster'}
        height={100}
        width={100}
        className="w-full max-h-[265px] rounded-md"
      />
      <div className="h-full flex flex-col justify-between gap-1">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm">
          Popularity : {popularity ? popularity : 'N/A'}
        </p>
        <p className="text-sm">Year : {year ? year : 'N/A'}</p>
        <ul className="flex flex-wrap gap-1">
          {genres.map(genre => (
            <li className="px-2 py-1 bg-black rounded-md text-xs text-white font-medium">
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
