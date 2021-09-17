import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import Lang from "./Lang";
import {useLocation} from "react-router";

const Header = () => {
	const [menuOpened, setMenuOpened] = useState(false);
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
			<Lang />
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
				<li className="nav-item">
					<Link to="/photo" onClick={(e) => handleLinkClick(e, '/photo')}>{t('Фотогалерея')}</Link>
				</li>
				<li className="nav-item">
					<Link to="/video" onClick={(e) => handleLinkClick(e, '/video')}>{t('Видеогалерея')}</Link>
				</li>
			</ul>
			<button
				className={`mobile-menu ${menuOpened && 'opened'}`}
				onClick={() => setMenuOpened(!menuOpened)}
			/>
		</div>
	)
}

export default Header;
