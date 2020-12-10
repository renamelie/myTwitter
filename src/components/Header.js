import React, { useContext } from 'react'
import { FaFacebook } from 'react-icons/fa'
import styles from '../styles/Header.module.css'

import { FirebaseContext } from '../firebase'

const Header = () => {
	const { user, firebase } = useContext(FirebaseContext)
	return (
		<div className={styles.header}>
			<h1 className={styles.headerTitle}>Twitcoders</h1>
			{user ? (
				<button
					onClick={() => firebase.logout()}
					type="button"
					className={styles.loginBtn}
				>
					<FaFacebook /> Logout
				</button>
			) : (
				<button
					onClick={() => firebase.login('facebook')}
					type="button"
					className={styles.loginBtn}
				>
					<FaFacebook /> Login
				</button>
			)}
		</div>
	)
}

export default Header
