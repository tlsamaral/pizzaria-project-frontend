import { Header } from "@/components/Header"
import { FiUpload } from "react-icons/fi"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"
import styles from './styles.module.scss'
import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { api } from "@/services/apiClient"
import { setupAPIClient } from "@/services/api"
import { GetServerSidePropsContext } from "next"

interface ItemProps {
    id: string
    name: string
}

interface CategoryProps {
    categoryList: ItemProps[]
}


export default function Product({ categoryList }: CategoryProps) {
    const [avatarUrl, setAvatarurl] = useState('')
    const [imageAvatar, setImageAvatar] = useState<File | null>(null)
    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if(!e.target.files) {
            return
        }
        const image = e.target.files[0]
        if(!image) {
            return
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image)
            setAvatarurl(URL.createObjectURL(image))
        }
    }

    function handleChamgeCategoy(event: ChangeEvent<HTMLSelectElement>) {
        const category = Number(event.target.value);
        setCategorySelected(category)
    }

    return (
        <>
            <Head>
                <title>Painel - Novo produto</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Novo produto</h1>
                    <form className={styles.form}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={25} color="#fff" />
                            </span>
                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

                            {
                                avatarUrl && (
                                    <img 
                                        src={avatarUrl}
                                        alt="Foto do produto"
                                        width={250}
                                        height={250}
                                    />
                                )
                            }
                            
                        </label>

                        <select value={categorySelected} onChange={handleChamgeCategoy}>
                            {
                                categories.map((item, index) => (<option value={index} key={item.id}>{item.name}</option>))
                            }
                        </select>
                        <input 
                            type="text" 
                            placeholder="Nome do produto" 
                            className={styles.input}
                        />
                        <input 
                            type="text" 
                            placeholder="Preço do produto" 
                            className={styles.input}
                        />
                        <textarea 
                            placeholder="Descreva seu produto"
                            className={styles.input}
                        />
                        <button className={styles.buttonAdd}>
                            Adicionar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/category')
    
    return {
        props: {
            categoryList: response.data
        }
    }
})