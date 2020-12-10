import React, { useContext } from 'react'
import { FirebaseContext } from '../firebase'
import MessageForm from './MessageForm'
import useForm from '../hooks/useForm'
import validateMessage from '../utils/validateMessage'

const INITIAL_STATE = {
	message: '',
}

const CreateMessage = () => {
	const { user, firebase } = useContext(FirebaseContext)
	const handleCreateMessage = () => {
		const { message } = values
		const newMessage = {
			message,
			postedBy: {
				id: user.uid,
				name: user.displayName,
			},
			likes: [],
			createAt: Date.now(),
			photo:
				user.photoURL ||
				'https://raw.githubusercontent.com/renamelie/renamelie/d6be15a257d1859406de55fed823c1ccafa019c2/src/images/meDark1.svg',
		}
		firebase.db.collection('messages').add(newMessage)
		console.log(newMessage)
	}

	const {
		handleSubmit,
		handleComboDown,
		handleChange,
		values,
		errors,
	} = useForm(INITIAL_STATE, validateMessage, handleCreateMessage)

	return (
		user && (
			<MessageForm
				handleSubmit={handleSubmit}
				handleComboDown={handleComboDown}
				handleChange={handleChange}
				values={values}
				errors={errors}
				user={user}
			/>
		)
	)
}

export default CreateMessage
