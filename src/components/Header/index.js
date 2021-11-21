import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import Lang from "./Lang";
import {useLocation} from "react-router";

const Header = (props) => {
	const [menuOpened, setMenuOpened] = useState(false);
	const { videosVisible, photosVisible } = props;
	const { t } = useTranslation();
	const location = useLocation();

	const handleLinkClick = (e, path) => {
		if (location.pathname === path) {
			e.preventDefault()
		}
		if (menuOpened) {
			setMenuOpened(false)
		}
	}

	return (
		<div className={`header ${menuOpened ? 'mobile-shown' : ''}`}>
			{/*<Lang />*/}
			<Link to="/" className={`logo animate__animated ${menuOpened && window.innerWidth < 810 ? 'animate__heartBeat' : ''}`}/>
			<ul className="nav">
				<li className="nav-item">
					<Link to="/about" onClick={(e) => handleLinkClick(e, '/')}>{t('Главная')}</Link>
				</li>
				<li className="nav-item">
					<Link to="/news" onClick={(e) => handleLinkClick(e, '/news')}>{t('Новости')}</Link>
				</li>
				<li className="nav-item">
					<Link to="/news" onClick={(e) => handleLinkClick(e, '/news')}>{t('О группе')}</Link>
				</li>
				<li className="nav-item">
					<Link to="/music" onClick={(e) => handleLinkClick(e, '/music')}>{t('Дискография')}</Link>
				</li>
				<li className="nav-item">
					<Link to="/music" onClick={(e) => handleLinkClick(e, '/music')}>{t('Фото')}</Link>
				</li>
				{
					videosVisible ?
						<li className="nav-item">
							<Link to="/video" onClick={(e) => handleLinkClick(e, '/video')}>{t('Видео')}</Link>
						</li>
						: null
				}
			</ul>
			<ul className="header-social-links">
				<a href='/' className="social-link spotify-icon" />
				<a href='/' className="social-link yandex-icon" />
				<a href='/' className="social-link apple-icon" />
			</ul>
			<button
				className={`mobile-menu ${menuOpened && 'opened'}`}
				onClick={() => setMenuOpened(!menuOpened)}
			/>
		</div>
	)
}

export default Header;
