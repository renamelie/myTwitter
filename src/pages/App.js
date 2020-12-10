import Header from '../components/Header'
import CreateMessage from '../components/CreateMessage'
import MessageList from '../components/MessageList'
import styles from '../styles/App.module.css'

import firebase, { FirebaseContext } from '../firebase'
import useAuth from '../hooks/useAuth'

function App() {
	const user = useAuth()
	// console.log(user)

	return (
		<FirebaseContext.Provider value={{ user, firebase }}>
			<div className={styles.app}>
				<Header />
				<CreateMessage />
				<MessageList />
			</div>
		</FirebaseContext.Provider>
	)
}

export default App
