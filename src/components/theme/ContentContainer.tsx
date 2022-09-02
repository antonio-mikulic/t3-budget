import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SideNav from './SideNav';
import TopNavigation from './TopNavigation';
import Image from 'next/image';

export interface IContentContainer {
    children?: React.ReactNode;
}

const publicRoutes = ['/api/auth/signin'];
const ContentContainer = (props: IContentContainer) => {
    const router = useRouter();
    const { data: _session, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated' && !publicRoutes.includes(router.pathname)) {
            router.push('/api/auth/signin');
        }
    }, [status]);

    if (status === 'authenticated') {
        return (
            <div className="flex h-screen flex-col bg-sky-100 dark:bg-slate-900 dark:text-white">
                <TopNavigation />
                <div className="flex flex-grow">
                    <SideNav />
                    <div className="m-3 w-full rounded bg-sky-50 p-5 dark:bg-slate-700 ">{props.children}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-slate-900">
            <div className="flex content-center justify-center">
                <Image src="/assets/images/spinner.svg" alt="Loading" width="350px" height="300px" />
            </div>
        </div>
    );
};

export default ContentContainer;
