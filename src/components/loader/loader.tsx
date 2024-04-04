import styles from './loader.module.css';

export default function Loader() {
    return (
        <div className={styles.container}>
            <div className={styles.loader}>
                <span className={styles.span}></span>
            </div>
        </div>
    );
}