'use client';

import { Input } from '@/components/atoms';
import { NavList } from '@/components/molecules';
import { useSearch } from '@/app/SearchProvider';

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="flex items-center justify-between px-8 py-4 border-b-[1px]">
      <div className="flex items-center gap-16">
        <h1 className="font-bold text-xl">AnimeList</h1>
        <NavList />
      </div>
      <Input
        inputType="text"
        placeholder="Find your movie"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default Navbar;
