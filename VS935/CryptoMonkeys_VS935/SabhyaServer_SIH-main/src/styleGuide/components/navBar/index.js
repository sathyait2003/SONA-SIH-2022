import styles from './Navbar.module.css';

const Navbar = () => {
  return (
 <nav className={`${styles.navBar}`}>
  <img className={`${styles.navBar__logo}`} src="/logo.svg"/>
</nav>
  )
}

export default Navbar