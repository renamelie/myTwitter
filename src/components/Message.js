import React, { useContext, useState, useEffect } from 'react'
import { FirebaseContext } from '../firebase'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import styles from '../styles/Message.module.css'
import {
	FiHeart,
	FiX,
	FiMessageCircle,
	FiUpload,
	FiRefreshCw,
} from 'react-icons/fi'
import IconContainer from './IconContainer'

const Message = ({ message }) => {
	const { user, firebase } = useContext(FirebaseContext)
	const [isLike, setIsLike] = useState(false)

	useEffect(() => {
		if (user) {
			const isLike = message.likes.some(like => like.likeBy.id === user.uid)
			setIsLike(isLike)
		}
	}, [user, message.likes])

	const handleLike = () => {
		setIsLike(prevIsLike => !prevIsLike)
		const likeRef = firebase.db.collection('messages').doc(message.id)

		if (!isLike) {
			const like = { likeBy: { id: user.uid, name: user.displayName } }
			const updateLikes = [...message.likes, like]
			likeRef.update({ likes: updateLikes })
		} else {
			// Garder que les likes qui ne sont pas de l'user
			const updateLikes = message.likes.filter(
				like => like.likeBy.id !== user.uid
			)
			likeRef.update({ likes: updateLikes })
		}
	}

	const handleDeleteMessage = () => {
		const messageRef = firebase.db.collection('messages').doc(message.id)
		messageRef.delete()
	}

	const isOwner = user && user.uid === message.postedBy.id

	return (
		<div className={styles['message-container']}>
			<div>
				<img src={message.photo} alt="Profil" className="profilPicture" />
			</div>
			<div className={styles.message}>
				<header>
					<h3>{message.postedBy.name} </h3>
					<span>· {formatDistanceToNow(message.createAt, { locale: fr })}</span>
				</header>
				<p>{message.message}</p>
				{user && (
					<footer>
						<IconContainer color="blue">
							<FiMessageCircle />
						</IconContainer>
						<IconContainer color="green">
							<FiRefreshCw />
						</IconContainer>
						<IconContainer
							onClick={handleLike}
							color="red"
							count={message.likes.length}
							isLike={isLike}
						>
							<FiHeart />
						</IconContainer>
						<IconContainer color="blue">
							<FiUpload />
						</IconContainer>
						{isOwner && (
							<IconContainer onClick={handleDeleteMessage} color="red">
								<FiX />
							</IconContainer>
						)}
					</footer>
				)}
			</div>
		</div>
	)
}

export default Message
