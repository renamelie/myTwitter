import React from 'react'
import classnames from 'classnames'
import styles from '../styles/IconContainer.module.css'

const IconContainer = ({ children, color, count, isLike, ...props }) => {
	return (
		<div
			className={classnames(
				styles['icon-group'],
				styles[isLike && 'icon-isLike']
			)}
			{...props}
		>
			<div
				className={classnames(
					styles['icon-container'],
					styles[`icon-${color}`]
				)}
			>
				{children}
			</div>
			{count > 0 && (
				<p
					className={classnames(
						styles['icon-text'],
						styles[`icon-text-${color}`]
					)}
				>
					{count}
				</p>
			)}
		</div>
	)
}

export default IconContainer
