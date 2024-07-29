import { Header } from "@/components/Header"
import { FiUpload } from "react-icons/fi"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"
import styles from './styles.module.scss'
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react"
import { api } from "@/services/apiClient"
import { setupAPIClient } from "@/services/api"
import { GetServerSidePropsContext } from "next"
import { toast } from "react-toastify"

interface ItemProps {
    id: string
    name: string
}

interface CategoryProps {
    categoryList: ItemProps[]
}


export default function Product({ categoryList }: CategoryProps) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

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

    async function handleRegister(event: FormEvent) {
        event.preventDefault()

        try {
            const formData = new FormData()

            if(name === '' || price === '' || description === '' || imageAvatar === null) {
                toast.error('Preencha todos os campos')
                return
            }

            formData.append('name', name)
            formData.append('price', price)
            formData.append('description', description)
            formData.append('category_id', categories[categorySelected].id)
            formData.append('file', imageAvatar)

            const apiClient = setupAPIClient()
            await apiClient.post('/product', formData)
            toast.success('Produto criado com sucesso!')
        } catch(err) {
            console.log(err)
            toast.error('Houve um erro ao tentar cadastrar produto')
        } finally {
            setName('')
            setPrice('')
            setDescription('')
            setAvatarurl('') 
            setImageAvatar(null)
        }
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
                    <form className={styles.form} onSubmit={handleRegister}>
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
                                        className={styles.preview}
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Preço do produto" 
                            className={styles.input}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <textarea 
                            placeholder="Descreva seu produto"
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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