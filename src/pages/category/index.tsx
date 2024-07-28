import { Header } from "@/components/Header"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"

import styles from './styles.module.scss'
import { FormEvent, useState } from "react"
import { api } from "@/services/apiClient"
import { toast } from "react-toastify"

export default function Category() {
    const [name, setName] = useState('')

    async function handleRegister(event: FormEvent) {
        event.preventDefault()
        if(name === '') {
            return
        }
        const response = await api.post('category', {
            name
        })
        toast.success('Categoria cadastrada com sucesso!')
        setName('')
    }

    return (
        <>
            <Head>
                <title>Gategorias - Sujeito Pizzaria</title>
            </Head>
            <div>
                <Header></Header>
                <main className={styles.container}>
                    <h1>Cadastrar categorias</h1>
                    <form className={styles.form} onSubmit={handleRegister}>
                        <input 
                            type="text" 
                            placeholder="Nome da categoria"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button className={styles.buttonAdd}>
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})