import "./globals.css";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserHome from "../pages/dashboard/UserHome";
import NavigationBar from "./components/NavigationBar";

export default function Home() {
	return (
		<main className={styles.main}>
			<NavigationBar />
			<UserHome />
		</main>
	);
}
