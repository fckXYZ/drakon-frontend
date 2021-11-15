import React from 'react';
import {useTranslation} from "react-i18next";

const Tracks = (props) => {
	const { t } = useTranslation();

	return (
		<section className="section music">
			<div className="music-container">
				<div className="music-backborder"/>
				<div className="music-tracks-container"/>
			</div>
			<div className="info-container">
				<div className="section-header">
					<h3 className="small-header">
						{t('Наша')}
					</h3>
					<h2 className="big-header">
						{t('Дискография')}
					</h2>
				</div>
				<p className="info-text">Having enjoyed a breathlessly successful 2015, there can be no doubting DJR
					position as one of the most influential electronic artists of the moment. Continues to transition
					rapidly from the techno underground.</p>
				<button className="music-btn">{t('Дискография')}</button>
			</div>
		</section>
	)
}

export default Tracks;
