import Head from 'next/head';
import Image from 'next/image';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import logoImg from '../../../public/logo.svg';

import styles from '../../../styles/home.module.scss';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button';

import Link from 'next/link';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp } = useContext(AuthContext);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if(name === '' || email === '' || password === '') {
      toast.error('Preencha todos os campos!')
    }

    setLoading(true)

    let data = {
      name,
      email,
      password
    }
    signUp(data)
  }

  return (
    <>
      <Head>
        <title>Sujeito Pizzaria - Cadastre-se</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input placeholder='Digite seu nome' type='text' value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder='Digite seu e-mail' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder='Digite sua senha' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" loading={loading} >
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
