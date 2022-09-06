import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaRegBell, FaMoon, FaSun } from 'react-icons/fa';
import UserIcon from '../layout/UserIcon';
import useDarkMode from './UseDarkMode';

const iconStyle = 'm-2 cursor-pointer';

const TopNavigation = () => {
    const { data: session } = useSession();
    const img = session?.user?.image;

    return (
        <div className="flex justify-between pl-5 pr-5 pt-5">
            <Title />

            <div className="flex">
                <ThemeIcon />
                <BellIcon />
                <Link href="/users/myprofile">
                    <a>
                        <UserIcon img={img} />
                    </a>
                </Link>
            </div>
        </div>
    );
};

const ThemeIcon = () => {
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);
    return (
        <span onClick={handleMode}>
            {darkTheme ? <FaSun size="24" className={iconStyle} /> : <FaMoon size="24" className={iconStyle} />}
        </span>
    );
};

const BellIcon = () => (
    <Link href="/notifications">
        <a>
            <FaRegBell size="24" className={iconStyle} />
        </a>
    </Link>
);

const Title = () => (
    <Link href="/">
        <h3 className="text-size-5 text-xl"> Budget</h3>
    </Link>
);
export default TopNavigation;
