
import { useLayoutEffect } from 'react';
import styles from  './style.module.css';

type ModalProps = {
    children: React.ReactNode,
    anchor: HTMLElement | null,
    open: boolean
}

export const Modal = ({ children, open, anchor }: ModalProps) => {
    const { top, left , height } = anchor?.getBoundingClientRect() ?? {
        top: 0,
        left: 0,
        height: 0
    };


    useLayoutEffect(() => {
        if(open) {
            document.documentElement.style.overflow = 'hidden';
        }else{
            document.documentElement.style.overflow = 'auto';
        }
    }, [open]);

    if(!open) return null;

    return (
        <div  className={styles.container} >
            <div className={styles.content} 
                style={{ 
                    top: top + height + 10, 
                    left 
                }}
            >
                {children}
            </div>
        </div>
    )
}