import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaRegBell, FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import useDarkMode from './UseDarkMode';

const iconStyle = 'm-2 cursor-pointer';

const TopNavigation = () => {
    return (
        <div className="flex justify-between pl-5 pr-5 pt-5">
            <Title />

            <div className="flex">
                <ThemeIcon />
                <BellIcon />
                <UserIcon />
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

const UserIcon = () => {
    const { data: session } = useSession();

    return session?.user?.image ? ProfileImage(session.user.image) : UserCircle();
};

const BellIcon = () => (
    <Link href="/notifications">
        <a>
            <FaRegBell size="24" className={iconStyle} />
        </a>
    </Link>
);

const UserCircle = (): JSX.Element => (
    <Link href="/users/myprofile">
        <a>
            <FaUserCircle size="24" className={iconStyle} />
        </a>
    </Link>
);

const ProfileImage = (img: string): JSX.Element => {
    return (
        <Link href="/users/myprofile">
            <a>
                <picture>
                    <source srcSet={img} />
                    <img
                        src={img}
                        alt="Profile image"
                        className="m-2 cursor-pointer rounded-full"
                        width="24px"
                        height="24px"
                    />
                </picture>
            </a>
        </Link>
    );
};

const Title = () => (
    <Link href="/">
        <h3 className="text-size-5 text-xl"> Budget</h3>
    </Link>
);
export default TopNavigation;
