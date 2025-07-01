import { Input } from '@/components/atoms';
import { NavList } from '@/components/molecules';

const Navbar = () => (
  <div className="flex items-center justify-between px-8 py-4 border-b-[1px]">
    <div className="flex items-center gap-16">
      <h1 className="font-bold text-xl">AnimeList</h1>
      <NavList />
    </div>
    <Input inputType="text" placeholder="Find your movie" />
  </div>
);

export default Navbar;
