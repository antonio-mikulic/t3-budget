import Link from 'next/link';

interface INavItem {
  name: string;
  link: string;
}

function SideNav(props: { className?: string }) {
  const categories: INavItem[] = [
    {
      name: 'Expenses',
      link: '/',
    },
    {
      name: 'Categories',
      link: '/categories',
    },
    {
      name: 'Wallets',
      link: '/wallets',
    },
    {
      name: 'Users',
      link: '/users',
    },
  ];

  return (
    <nav className={`mb-3 mt-3 rounded bg-sky-200 dark:bg-slate-800 md:flex ${props.className}`}>
      <ul className="w-full flex-col">
        {categories.map((navItem) => (
          <Link key={navItem.link} href={navItem.link}>
            <li className="w-100 my-5 flex cursor-pointer justify-center bg-sky-50 p-2 dark:bg-slate-700 md:my-3 md:mr-2 md:justify-start md:rounded-r-lg">
              <a>{navItem.name}</a>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default SideNav;
