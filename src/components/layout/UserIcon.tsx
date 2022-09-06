import { FaUserCircle } from 'react-icons/fa';

const UserIcon = (props: { img?: string | null }) => {
    return props.img ? ProfileImage(props.img) : UserCircle();
};

const UserCircle = (): JSX.Element => <FaUserCircle size="24" className="m2" />;

const ProfileImage = (img: string): JSX.Element => {
    return (
        <picture className="m-0 inline-block p-0">
            <source srcSet={img} />
            <img src={img} alt="Profile image" className="m-2 rounded-full" width="24px" height="24px" />
        </picture>
    );
};

export default UserIcon;
