import React from "react";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";

const Footer = (props) => {
	const { t } = useTranslation();
	const location = useLocation();
	const { pathname } = location;
	const { photosVisible, videosVisible } = props;

	return (
		<div className={`footer ${pathname !== '/' ? 'pages' : ''}`}>
			<div className="footer-contacts">
				<div className="skull-bg" />
				<div className="smoke-for-pages-desktop" />

				<div className="contacts-item">
					<h3 className="contacts-title contacts-text">
						{t('телефон')}
					</h3>
					<p className="contacts-subtitle contacts-text">
						7-800-900-22-33
					</p>
				</div>
				<a href="/" className="contacts-logo" />
				<div className="contacts-item email">
					<h3 className="contacts-title contacts-text">
						email
					</h3>
					<p className="contacts-subtitle contacts-text">
						info@site.com
					</p>
				</div>
			</div>
			<div className="footer-social-links">
				<a href="/" className="social-links-link spotify-icon" />
				<a href="/" className="social-links-link yandex-icon" />
				<a href="/" className="social-links-link apple-icon" />
				<a href="/" className="social-links-link youtube-icon" />
			</div>
			<div className="footer-bottom-part">
				<div className="flex-wrapper">
					<p className="band-name">Drakon Band</p>
					<p className="copyright">
						&nbsp;&copy; Все права защищены&nbsp;
					</p>
				</div>
				<p className="footer-docs">
					<a href="/" className="docs-link">
						{t('Политика конфиденциальности')}
					</a> и <a href="/" className="docs-link">
					{t('Пользовательское соглашение')}
				</a>
				</p>
			</div>
		</div>
	)
}

export default Footer;
