import { useState, useEffect } from 'react'

const useForm = (initialState, validate, next) => {
	const [values, setValues] = useState(initialState)
	const [errors, setErrors] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (isSubmitting) {
			const isErrors = Object.keys(errors).length !== 0
			// console.log(isErrors)
			// console.log(errors)
			if (isErrors) {
				setIsSubmitting(false)
			} else {
				next()
				setIsSubmitting(false)
				setValues(initialState)
			}
		}
	}, [errors, next, isSubmitting, initialState])

	const handleComboDown = e => {
		if (e.ctrlKey && e.keyCode === 13) {
			handleSubmit(e)
		}
	}

	const handleChange = e => {
		// e.persist()
		setValues(prevValues => ({
			...prevValues,
			[e.target.name]: e.target.value,
		}))
	}

	const handleSubmit = e => {
		e.preventDefault()
		const errors = validate(values)
		setErrors(errors)
		setIsSubmitting(true)
		// next()
	}

	return {
		handleSubmit,
		handleComboDown,
		handleChange,
		values,
		errors,
	}
}

export default useForm
