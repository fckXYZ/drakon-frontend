import React from "react";
import {useTranslation} from "react-i18next";

const About = (props) => {
	const {t} = useTranslation();

	return (
		<div className="bg-snake-skin-1920">
		<section className="section about" ref={props.refProp}>
			<div className="video-container">
				<div className="video-backborder"/>
				<div className="video-blood"/>
				<div className="video-about"/>
				<button className="play-btn">{t('Воспроизвести')}</button>
			</div>
			<div className="info-container">
				<div className="section-header">
					<h3 className="small-header">
						{t('Пару слов')}
					</h3>
					<h2 className="big-header">
						{t('О Группе')}
					</h2>
				</div>
				<p className="info-text">Having enjoyed a breathlessly successful 2015, there can be no doubting DJR
					position as one of the most influential electronic artists of the moment. Continues to transition
					rapidly from the techno underground.</p>
				<button className="info-btn">{t('Подробнее')}</button>
			</div>
		</section>
		</div>
	)
}

export default About;
