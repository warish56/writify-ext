import styles from './style.module.css';


type LoadingItemProps = {
    delay: number;
}
const LoadingItem = ({delay}: LoadingItemProps) => {
    return <div className={styles.item} style={{animationDelay: `${delay}s`}}></div>
}


type LoaderProps = {
    count: number;
}

export const Loader = ({count}: LoaderProps) => {
    return <div className={styles.container}>
        {Array.from({length: count}).map((_, index) => <LoadingItem key={index} delay={index * 0.1} />)}
    </div>
}