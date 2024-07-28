import Head from 'next/head';
import Image from 'next/image';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import logoImg from '../../../public/logo.svg';

import styles from '../../../styles/home.module.scss';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button';

import Link from 'next/link';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Sujeito Pizzaria - Cadastre-se</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form>
            <Input placeholder='Digite seu nome' type='text' />
            <Input placeholder='Digite seu e-mail' type='email' />
            <Input placeholder='Digite sua senha' type='password' />
            <Button type="submit" loading={true} >
              Acessar
            </Button>
          </form>
          <Link href="/" className={styles.text} >
            Já possuí uma conta? Faça login
          </Link>
        </div>
      </div>
    </>
  );
}
