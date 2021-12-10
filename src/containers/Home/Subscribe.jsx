import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {sendFeedback} from "../../helpers/backend-helper";
import {toast} from "react-toastify";

export const validateEmail = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}


const Subscribe = () => {
	const { t } = useTranslation();
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const onSubscribe = () => {
		setLoading(true)
		if (!validateEmail(email)) {
			toast.error(t('Невалидный E-Mail!'))
			setLoading(false)
			return
		}
		sendFeedback({ email })
			.then(() => {
				toast.success(t('Ваше сообщение отправлено!'))
				setEmail('')
				setLoading(false)
			})
			.catch(() => {
				toast.error(t('Произошла ошибка на сервере. Попробуйте позже.'))
				setLoading(false)
			})

	}

	return (
		<div className="subscribe bg-wrapper">
		<section className="section subscribe">
			<div className="subscribe-text">
				<h2 className="title">
					{t('Подпишитесь!')}
				</h2>
				<p className="subtitle">
					{t('Чтобы быть в курсе новостей и грядущих событий')}
				</p>
			</div>
			<div className="subscribe-form">
				<input
					disabled={loading}
					className="subscribe-input"
					value={email}
					placeholder={t('Введите ваш EMAIL')}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button
					className="subscribe-btn"
					disabled={loading}
					onClick={() => onSubscribe()}
				>
					{
						loading ?
							'...'
							: t('Подписаться')

					}
				</button>
			</div>
		</section>
		</div>
	)
}

export default Subscribe;
