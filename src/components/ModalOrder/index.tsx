import { OrderItemProps } from "@/pages/dashboard"
import { FiX } from "react-icons/fi"
import Modal from "react-modal"
import styles from './styles.module.scss'

interface ModalOrderProps {
    isOpen: boolean
    onRequestClose: () => void
    order: OrderItemProps[] | undefined
    handleFinishOrder: (id: string) => void
}
export function ModalOrder({ isOpen, onRequestClose, order, handleFinishOrder }: ModalOrderProps) {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            padding: '30px',
            backgroundColor: '#1d1d2e',
            transform: 'translate(-50%, -50%)',
        }
    }
    const orderId = order ? order[0].order_id : ''
    return(
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close" style={{ background: 'transparent', border: 0}}>
                <FiX size={45} color="#f34748" />
            </button>
            <div className={styles.container}>
                <h2>Detalhes do pedido</h2>
                <span className={styles.table}>
                   Mesa: <strong>{order && order[0].order.table}</strong>
                </span>
                {
                    order?.map(item => (
                        <section key={item.id} className={styles.containerItem}>
                            <span>{item.amount} - <strong>{item.product.name}</strong></span>
                            <span className={styles.description}>{item.product.description}</span>
                        </section>
                    ))
                }
                <button className={styles.buttonOrder} onClick={() => handleFinishOrder(orderId)}>
                    Concluir pedido
                </button>
            </div>
        </Modal>
    )
}