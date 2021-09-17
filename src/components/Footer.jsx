import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import logo from '../assets/images/bg-main-logo.png';

const Footer = () => {
	const { t } = useTranslation();

	return (
		<div className="footer-wrapper">
		<div className="footer">
			<div className="logo">
				<img src={logo} alt="Drakon Logo" />
			</div>
			<ul className="nav">
				<li className="nav-item">
					<Link to="/news">{t('Новости')}</Link>
				</li>
				<li className="nav-item">
					<Link to="/about">{t('О группе')}</Link>
				</li>
				<li className="nav-item">
					<Link to="/music">{t('Дискография')}</Link>
				</li>
				<li className="nav-item">
					<Link to="/photo">{t('Фотогалерея')}</Link>
				</li>
				<li className="nav-item">
					<Link to="/video">{t('Видеогалерея')}</Link>
				</li>
			</ul>
			<div className="email">
				<p>
					E-Mail: admin@drakon.band
				</p>
			</div>
			<button className="up-btn btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
			</button>
		</div>
		</div>
	)
}

export default Footer;
