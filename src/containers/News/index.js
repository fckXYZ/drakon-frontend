import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import moment from "moment";
import ScrollToTop from "../../components/ScrollToTop";
import Loader from "../../components/Spinner";
import { getNews as fetchNews } from "../../helpers/backend-helper";
import {SERVER_PATH} from "../../common/serverPath";
import Pagination from "../../components/Header/Pagination";
import {OFFSET_NEWS} from "../../common/constants";

const News = () => {
	const { t, i18n } = useTranslation();
	const [loading, setLoading] = useState(true);
	const [news, setNews] = useState([]);

	const [activePage, setActivePage] = useState(1);
	const [pagesCount, setPagesCount] = useState(1);


	const getNews = () => {
		setLoading(true)
		fetchNews()
			.then((data) => {
				setNews(data);
				setPagesCount(Math.floor((data.length - 1) / OFFSET_NEWS) + 1);
				setLoading(false);
			})
	}

	useEffect(() => {
		getNews()
	}, [i18n.language]);

	const renderNews = () => {
		const newsForRender = news.slice((activePage - 1) * OFFSET_NEWS, activePage * OFFSET_NEWS);
		return (
			<div className="news-container">
				{
					newsForRender.map((article) => {
						return (
							<div className="article" key={`news-article-${news.indexOf(article)}`}>
								<div className="images-block">
									<div
										key={`image-in-the-article-${news.indexOf(article)}`}
										className="image-wrapper"
									>
										<img src={SERVER_PATH + article.file} alt={article.title} loading="lazy"/>
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
		<section className="page page-news">
			<ScrollToTop />
			<div className="section-header">
				<h3 className="small-header">
					{t('Последние')}
				</h3>
				<h2 className="big-header">
					{t('Новости')}
				</h2>
			</div>
			{
				loading ?
					<Loader /> :
					renderNews()
			}
			<Pagination
				activePage={activePage}
				pagesCount={pagesCount}
				callbackPrev={() => setActivePage(activePage - 1)}
				callbackNext={() => setActivePage(activePage + 1)}
			/>
		</section>
	)
}

export default News;
