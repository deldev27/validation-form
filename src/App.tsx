import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import './App.css'

type FormValues = {
	email: string
	password: string
}

function App() {
	const [type, setType] = useState('password')
	const [formData, setFormData] = useState({})

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>()

	const onSubmit: SubmitHandler<FormValues> = data => {
		setFormData(data)
	}

	console.log(formData)

	// fetch('https://example.com/api/endpoint', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	},
	// 	body: JSON.stringify(formData),
	// })
	// 	.then(response => response.json())
	// 	.then(result => console.log(result))
	// 	.catch(error => console.error(error))
	//
	// Failed to Fetch :(

	return (
		<div className='wrapper'>
			<h1 className='title'>Authorization</h1>
			<form className='form' onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='form__wrapper'>
					<p className='form__error-message'>{errors.email?.message}</p>
					<input
						className='form__input'
						id='email'
						type='email'
						placeholder='Email'
						{...register('email', {
							required: true,
							pattern: {
								value:
									/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
								message: 'Неправильный формат Email!',
							},
						})}
					/>
				</div>
				<div className='form__wrapper'>
					<input
						className='form__input'
						id='password'
						type={type}
						placeholder='Password'
						{...register('password', { required: true })}
					/>
				</div>
				<div className='buttons'>
					<button
						type='button'
						className='form__btn'
						onClick={() => {
							if (type == 'password') {
								setType('text')
							} else if (type == 'text') {
								setType('password')
							}
						}}
					>
						Show password
					</button>
					<button className='form__btn' onClick={() => reset()}>
						Login
					</button>
				</div>
			</form>
		</div>
	)
}

export default App
