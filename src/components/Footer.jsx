import React from "react";
import {useTranslation} from "react-i18next";

const Footer = (props) => {
	const { t } = useTranslation();
	const { photosVisible, videosVisible } = props;

	return (
		<div className="footer">
			<div className="footer-contacts">
				<div className="contacts-item">
					<h3 className="contacts-title contacts-text">
						{t('телефон')}
					</h3>
					<p className="contacts-subtitle contacts-text">
						7-800-900-22-33
					</p>
				</div>
				<a href="/" className="contacts-logo" />
				<div className="contacts-item">
					<h3 className="contacts-title contacts-text">
						email
					</h3>
					<p className="contacts-subtitle contacts-text">
						info@site.com
					</p>
				</div>
			</div>
			<div className="footer-social-links">
				<a href="/" className="social-links-link" />
				<a href="/" className="social-links-link" />
				<a href="/" className="social-links-link" />
				<a href="/" className="social-links-link" />
			</div>
			<div className="footer-bottom-part">
				<p className="band-name">Drakon Band</p>
				<p className="copyright">
					&nbsp;&copy; Все права защищены&nbsp;
				</p>
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
