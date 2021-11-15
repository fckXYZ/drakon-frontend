import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const Spotify = (props) => {
	const { t } = useTranslation();

	return (
		<section className="spotify">
			<div className="spotify-info-block">
				<div className="section-header">
					<h3 className="small-header">
						{t('Следите за нами')}
					</h3>
					<h2 className="big-header">
						{t('на Spotify')}
					</h2>
				</div>
				<div className="spotify-btns-block">
					<button className="spotify-btn">SPOTIFY</button>
					<Link to="/photo" className="spotify-gallery-link">{t('Галерея')}</Link>
				</div>
			</div>
		</section>
	)
}

export default Spotify;
