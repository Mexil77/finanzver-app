import styles from "./page.module.css";
import UserHome from "../pages/dashboard/UserHome";

export default function Home() {
	return (
		<main className={styles.main}>
			<div className={styles.description}>Hola mundo</div>
			<UserHome />
		</main>
	);
}
