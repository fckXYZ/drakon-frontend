import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {useTranslation} from "react-i18next";

export const validateEmail = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

const Feedback = () => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit, reset, formState: { errors } } = useForm();

	const submit = (data) => {
		console.log(data)
	}

	return (
		<section className="section feedback">
			<div className="section-header">
				<h2 className="section-title">
					{t('Обратная связь')}
				</h2>
			</div>
			<form
				className="feedback-form"
				onSubmit={handleSubmit(submit)}
			>
				<div className="form-group" >
					<input
						name="name"
						placeholder={t('Ваше имя')}
						{...register('name', {
							required: true
						})}
					/>
					{errors.name && <p className="invalid-feedback">{t('Поле необходимо заполнить!')}</p>}
				</div>
				<div className="form-group" >
					<input
						name="phone"
						placeholder={t('Ваш телефон')}
						{...register('phone', { required: true })}
					/>
					{errors.topic && <p className="invalid-feedback">{t('Поле необходимо заполнить!')}</p>}
				</div>
				<div className="form-group" >
					<input
						name="email"
						placeholder="E-Mail"
						type="email"
						{...register('email', {
							validate: async (value) => {
								return validateEmail(value)
							}
						})}/>
					{errors.email && <p className="invalid-feedback">{t('Невалидный E-Mail!')}</p>}
				</div>
				<div className="form-group" >
					<textarea
						name="text"
						placeholder={t('Комментарий')}
						{...register('text', { required: true })}
					/>
					{errors.text && <p className="invalid-feedback">{t('Поле необходимо заполнить!')}</p>}
				</div>
				<button className="support__submit btn" disabled={loading}>
					{t('Отправить')}
				</button>
			</form>
		</section>
	)
}

export default Feedback;
