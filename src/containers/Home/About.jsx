import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {getAbout} from "../../helpers/backend-helper";
import {Link} from "react-router-dom";
import Loader from "../../components/Spinner";

const About = (props) => {
	const {t} = useTranslation();

	const [about, setAbout] = useState('');

	useEffect(() => {
		getAbout()
			.then((data) => {
				// {
				// 	"about_page": "html",
				// 	"main_page": "html",
				// }
				setAbout(data.main_page)
			})
	}, []);


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
				{
					about ?
						<div className="info-text" dangerouslySetInnerHTML={{__html: about}}/>
						:
						<Loader />
				}
				<Link to='/about'>
					<button className="info-btn">{t('Подробнее')}</button>
				</Link>
			</div>
		</section>
		</div>
	)
}

export default About;
