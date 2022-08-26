import styles from './Welcome.module.css';

const Welcome = () => {
    return (
        <div className={`${styles.welcome__flex}`}><p>Welcome to</p> <img src="/logo_font.svg" height={200} width={100} /></div>
    )
}

export default Welcome