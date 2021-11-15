import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

const Subscribe = () => {
	const { t } = useTranslation();
	const [email, setEmail] = useState('');

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
					className="subscribe-input"
					value={email}
					placeholder={t('Введите ваш EMAIL')}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button
					className="subscribe-btn"
				>
					{t('Подписаться')}
				</button>
			</div>
		</section>
		</div>
	)
}

export default Subscribe;
