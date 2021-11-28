import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import ScrollToTop from "../../components/ScrollToTop";
import {getAbout} from "../../helpers/backend-helper";
import Loader from "../../components/Spinner";

const About = () => {
	const { t } = useTranslation();
	const [about, setAbout] = useState('');

	useEffect(() => {
		getAbout()
			.then((data) => {
				// {
				// 	"about_page": "html",
				// 	"main_page": "html",
				// }
				setAbout(data.about_page)
			})
	}, []);

	return (
		<section className="page page-about">
			<ScrollToTop />
			<div className="section-header">
				<h3 className="small-header">
					{t('Пару слов')}
				</h3>
				<h2 className="big-header">
					{t('О группе')}
				</h2>
			</div>
			{
				about ?
					<div className="about-text" dangerouslySetInnerHTML={{ __html: about }}/>
					:
					<Loader />
			}
		</section>
	)
}

export default About;
