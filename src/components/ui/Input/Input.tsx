import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { };

export function Input({ ...rest }: InputProps) {
    return (
        <input className={styles.input} {...rest} />
    );
}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { };

export function TextArea({ ...rest }: TextAreaProps) {
    return (
        <textarea className={styles.textarea} {...rest} />
    )
}

