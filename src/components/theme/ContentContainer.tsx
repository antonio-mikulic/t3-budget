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
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated' && !publicRoutes.includes(router.pathname)) {
            router.push('/api/auth/signin');
        }
    }, [session, status, router]);

    if (status === 'authenticated') {
        return (
            <div className="flex h-max min-h-screen flex-col overflow-hidden bg-sky-100 dark:bg-slate-900 dark:text-white">
                <TopNavigation />
                <div className="flex">
                    <SideNav />
                    <div className="m-3 h-fit w-full overflow-scroll rounded bg-sky-50 p-5 dark:bg-slate-700 ">
                        {props.children}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-slate-900">
            <div className="flex h-screen content-center items-center justify-center">
                <Image src="/assets/images/spinner.svg" alt="Loading" width={400} height={400} />
            </div>
        </div>
    );
};

export default ContentContainer;
