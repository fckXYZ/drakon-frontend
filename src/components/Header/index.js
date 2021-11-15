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
		<div className={`header ${menuOpened && 'mobile-shown'}`}>
			{/*<Lang />*/}
			<Link to="/" className="logo"/>
			<ul className="nav">
				<li className="nav-item">
					<Link to="/news" onClick={(e) => handleLinkClick(e, '/news')}>{t('Новости')}</Link>
				</li>
				<li className="nav-item">
					<Link to="/about" onClick={(e) => handleLinkClick(e, '/')}>{t('О группе')}</Link>
				</li>
				<li className="nav-item">
					<Link to="/music" onClick={(e) => handleLinkClick(e, '/music')}>{t('Дискография')}</Link>
				</li>
				{
					photosVisible ?
						<li className="nav-item">
							<Link to="/photo" onClick={(e) => handleLinkClick(e, '/photo')}>{t('Фотогалерея')}</Link>
						</li>
						: null
				}
				{
					videosVisible ?
						<li className="nav-item">
							<Link to="/video" onClick={(e) => handleLinkClick(e, '/video')}>{t('Видеогалерея')}</Link>
						</li>
						: null
				}
			</ul>
			<button
				className={`mobile-menu ${menuOpened && 'opened'}`}
				onClick={() => setMenuOpened(!menuOpened)}
			/>
		</div>
	)
}

export default Header;
