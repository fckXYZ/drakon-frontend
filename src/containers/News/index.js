import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import moment from "moment";
import ScrollToTop from "../../components/ScrollToTop";
import Loader from "../../components/Spinner";
import { getNews as fetchNews } from "../../helpers/backend-helper";
import {SERVER_PATH} from "../../common/serverPath";

const News = () => {
	const { t, i18n } = useTranslation();
	const [loading, setLoading] = useState(true);
	const [news, setNews] = useState([]);

	const getNews = () => {
		setLoading(true)
		fetchNews()
			.then((data) => {
				setNews(data);
				setLoading(false);
			})
	}

	useEffect(() => {
		getNews()
	}, []);

	const renderNews = () => {
		return (
			<div className="news-container">
				{
					news.map((article) => {
						return (
							<div className="article">
								<div className="images-block">
									<div
										key={`image-in-the-article-${news.indexOf(article)}`}
										className="image-wrapper"
									>
										<img src={SERVER_PATH + article.file} alt={article.title} />
									</div>
								</div>
								<div className="top-block">
									<h2 className="title">{
										article.title
									}</h2>
									<p className="date">{
										moment(article.date).locale(i18n.language).format('MMMM DD')
									}</p>
								</div>
								<div className="text" dangerouslySetInnerHTML={{ __html: article.text }}>
								</div>
							</div>
						)
					})

				}
			</div>
		)
	}

	return (
		<div className="background-wrapper">
			<section className="page-news">
				<ScrollToTop />
				<div className="section-header">
					<h2 className="section-title">
						{t('Новости')}
					</h2>
				</div>
				{
					loading ?
						<Loader /> :
						renderNews()
				}
			</section>
		</div>
	)
}

export default News;
