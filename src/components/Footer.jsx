import React from "react";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import NumberFormat from 'react-number-format';

const Footer = (props) => {
	const { t } = useTranslation();
	const location = useLocation();
	const { pathname } = location;
	const { mediaLinks, contacts } = props;

	const renderMedia = () => {
		if (mediaLinks && mediaLinks.length) {
			return mediaLinks.map((link) => (
				// eslint-disable-next-line jsx-a11y/anchor-has-content
				<a
					key={link._id}
					href={link.link}
					target='_blank'
					rel='noreferrer'
					className={`social-links-link
					${link.type}-icon`}
				/>
			))
		}
	}

	return (
		<div className={`footer ${pathname !== '/' ? 'pages' : ''}`}>
			<div className="footer-contacts">
				<div className="skull-bg" />
				<div className="smoke-for-pages-desktop" />

				<div className="contacts-item">
					<h3 className="contacts-title contacts-text">
						{t('ТЕЛЕФОН')}
					</h3>
					<p className="contacts-subtitle contacts-text">
						<NumberFormat
							value={contacts.phone}
							format={'#-###-###-##-##'}
							displayType={'text'}
						/>
					</p>
				</div>
				{/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
				<a href="/" className="contacts-logo" />
				<div className="contacts-item email">
					<h3 className="contacts-title contacts-text">
						EMAIL
					</h3>
					<p className="contacts-subtitle contacts-text">
						{
							contacts.email ? contacts.email : ''
						}
					</p>
				</div>
			</div>
			<div className="footer-social-links">
				{renderMedia()}
			</div>
			<div className="footer-bottom-part">
				<div className="flex-wrapper">
					<p className="band-name">Drakon Band</p>
					<p className="copyright">
						&nbsp;&copy; {t('Все права защищены')}&nbsp;
					</p>
				</div>
				<p className="footer-docs">
					<a href="/" className="docs-link">
						{t('Политика конфиденциальности')}
					</a> {t('и')} <a href="/" className="docs-link">
					{t('Пользовательское соглашение')}
				</a>
				</p>
			</div>
		</div>
	)
}

export default Footer;
