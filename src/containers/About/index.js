import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import ScrollToTop from "../../components/ScrollToTop";
import {getAbout} from "../../helpers/backend-helper";
import Loader from "../../components/Spinner";
import NoContent from "../../components/NoContent";

const About = () => {
	const { t, i18n } = useTranslation();

	const [loading, setLoading] = useState(false);
	const [about, setAbout] = useState('');

	useEffect(() => {
		setLoading(true)
		getAbout()
			.then((data) => {
				// {
				// 	"about_page": "html",
				// 	"main_page": "html",
				// }
				setAbout(data.about_page)
				setLoading(false)
			})
			.catch((err) => {
				console.log(err)
				setLoading(false)

			})
	}, [i18n.language]);

	const renderAbout = () => {
		if (about) {
			return(
				<div className="about-text" dangerouslySetInnerHTML={{ __html: about }}/>
			)
		}
		return <NoContent contentName={t('данных')} />
	}

	return (
		<section className="page page-about">
			<ScrollToTop />
			<div className="section-header">
				<h3 className="small-header">
					{t('Пару слов')}
				</h3>
				<h2 className="big-header">
					{t('О Группе')}
				</h2>
			</div>
			{
				loading ?
					<Loader />
					:
					renderAbout()
			}
		</section>
	)
}

export default About;
