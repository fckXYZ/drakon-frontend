import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import logo from '../assets/images/bg-main-logo.png';

const Footer = (props) => {
	const { t } = useTranslation();
	const { photosVisible, videosVisible } = props;

	const handleLogoClick = (e) => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<div className="footer-wrapper">
		<div className="footer">
			<Link
				to="/"
				className="logo"
				onClick={(e) => handleLogoClick(e)}
			>
				<img src={logo} alt="Drakon Logo" />
			</Link>
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
				{
					photosVisible ?
						<li className="nav-item">
							<Link to="/photo">{t('Фотогалерея')}</Link>
						</li>
						: null
				}
				{
					videosVisible ?
						<li className="nav-item">
							<Link to="/video">{t('Видеогалерея')}</Link>
						</li>
						: null
				}
			</ul>
			<div className="email">
				<p>
					E-Mail: <a href="mailto:info@drakon.band"> info@drakon.band</a>
				</p>
			</div>
			<button className="up-btn btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
			</button>
		</div>
		</div>
	)
}

export default Footer;
