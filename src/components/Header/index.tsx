import { useContext } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss'

import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext'

export function Header() {
    const { signOut } = useContext(AuthContext);
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <img src="/logo.svg" alt="" />
                </Link>
                <nav className={styles.menuNav}>
                    <Link href='/category'>
                        Categoria
                    </Link>
                    <Link href='/product'>
                        Cardapio
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#fff' size={24} />
                    </button>
                </nav>
            </div>
        </header>
    );
}
