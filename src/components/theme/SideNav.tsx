import Link from 'next/link';

function SideNav() {
    return (
        <nav className="mb-3 mt-3 min-w-[125px] rounded bg-sky-50 dark:bg-slate-700">
            <ul className="flex-col">
                <li className="p-2">
                    <Link href="/">Expenses</Link>
                </li>
                <li className="p-2">
                    <Link href="/categories">Categories</Link>
                </li>

                <li className="p-2">
                    <Link href="/wallets">Wallets</Link>
                </li>
                <li className="p-2">
                    <Link href="/users">Users</Link>
                </li>
            </ul>
        </nav>
    );
}

export default SideNav;
