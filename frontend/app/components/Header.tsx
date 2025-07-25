'use client';

import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth'
import {useAuthContext} from "@/app/context/AuthContext";

const Header = () => {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuthContext();
  const router = useRouter()

  const linkClass = (path: string) =>
    `px-4 py-2 rounded hover:bg-gray-100 ${
      pathname === path ? 'bg-gray-200 font-bold text-black' : ''
    }`;

  const handleLogout = () => {
      logout();
      router.push('/login');
  }

  return (
    <nav className="border p-2 mb-2 rounded bg-black shadow text-white">
        <div className="flex gap-4">
            <Link href="/" className={linkClass('/')}>
                Home
            </Link>
            {!isAuthenticated && (
                <>
                    <Link href="/login" className={linkClass('/login')}>
                        Login
                    </Link>
                    <Link href="/register" className={linkClass('/register')}>
                        Register
                    </Link>
                </>
            )}


            {isAuthenticated && (
                <>
                    <Link href="/tasks" className={linkClass('/tasks')}>
                        Tasks
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="text-white-500 hover:underline justify-end"
                    >
                        Logout
                    </button>
                </>
            )}
        </div>

    </nav>
  );
};

export default Header;
