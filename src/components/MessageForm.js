import React from 'react'
import styles from '../styles/MessageForm.module.css'

const MessageForm = ({
	handleSubmit,
	handleComboDown,
	handleChange,
	values,
	errors,
	user,
}) => {
	return (
		<form onSubmit={handleSubmit} className={styles.messageFormContainer}>
			<div className={styles.messageForm}>
				<div>
					<img src={user.photoURL} alt="Profil" className="profilPicture" />
				</div>
				<textarea
					onKeyDown={handleComboDown}
					onChange={handleChange}
					name="message"
					value={values.message}
					placeholder="Quoi de neuf ?"
				/>
			</div>
			{errors.message && (
				<p className={styles['error-text']}>{errors.message}</p>
			)}
			<footer>
				<p>{280 - values.message.length}</p>
				<button
					type="submit"
					disabled={values.message.length > 280 || values.message.length === 0}
				>
					Tweeter
				</button>
			</footer>
		</form>
	)
}

export default MessageForm
