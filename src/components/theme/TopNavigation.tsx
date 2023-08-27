import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { FaHamburger, FaMoon, FaRegBell, FaSun } from 'react-icons/fa';
import UserIcon from '../layout/UserIcon';
import SideNav from './SideNav';
import useDarkMode from './UseDarkMode';

const iconStyle = 'm-2 cursor-pointer';

const TopNavigation = () => {
  const { data: session } = useSession();
  const img = session?.user?.image;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between pl-5 pr-5 pt-5">
        <Title />

        <div className="flex">
          <ThemeIcon />
          <BellIcon />
          <Link href="/users/myprofile">
              <UserIcon img={img} />
          </Link>
          <a className="flex md:hidden xl:hidden 2xl:hidden" onClick={() => setIsOpen(!isOpen)}>
            <FaHamburger size="24" className={iconStyle} />
          </a>
        </div>
      </div>
      {isOpen && <SideNav className="h-screen w-screen" />}
    </>
  );
};

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();

  return (
    <span onClick={() => setDarkTheme(!darkTheme)}>
      {darkTheme ? <FaSun size="24" className={iconStyle} /> : <FaMoon size="24" className={iconStyle} />}
    </span>
  );
};

const BellIcon = () => (
  <Link href="/notifications">
      <FaRegBell size="24" className={iconStyle} />
  </Link>
);

const Title = () => (
  <Link href="/">
    <h3 className="text-size-5 text-xl"> Budget</h3>
  </Link>
);

export default TopNavigation;
