import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
    return (
        <div className={styles.container}>
            <Link href="/" className={styles.logo} />

            <div className={styles.nav}>
                <a href="https://discord.gg/RqUQSEajPU" >Discord</a>
                <Link href="/about">About</Link>
                <Link href="/list-event">List Event</Link>
            </div>
        </div>
    )
}

export default Header;