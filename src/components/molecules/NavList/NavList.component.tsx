import Link from 'next/link';

const components = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
];

const NavList = () => {
  return (
    <div className="flex gap-2">
      {components.map(item => (
        <Link
          key={item.title}
          href={item.href}
          className="px-4 py-2 text-md font-medium hover:bg-[#f5f5f5] transition-all duration-500 rounded-sm"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default NavList;
