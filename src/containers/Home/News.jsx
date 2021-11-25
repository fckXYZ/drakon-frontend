import React from "react";
import {useTranslation} from "react-i18next";

const News = () => {
	const { t } = useTranslation();

	return (
		<section className="section news">
			<div className="torch-right" />
			<div className="torch-left" />
			<div className="bg-hole" />
			<div className="section-header">
				<h3 className="small-header">
					{t('Последние')}
				</h3>
				<h2 className="big-header">
					{t('Новости')}
				</h2>
			</div>
			<div className="news-container">
				<div className="news-article">
					<div className="image-container">
						<img src="" alt="sadad" />
					</div>
					<h3 className="article-title">
						Endless remix
					</h3>
					<p className="article-date">
						25 jan 2021
					</p>
					<p className="article-text">
						Endless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remix
					</p>
				</div>
				<div className="news-article">
					<div className="image-container">
						<img src="" alt="sadad" />
					</div>
					<h3 className="article-title">
						Endless remix
					</h3>
					<p className="article-date">
						25 jan 2021
					</p>
					<p className="article-text">
						Endless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remix
					</p>
				</div>
				<div className="news-article">
					<div className="image-container">
						<img src="" alt="sadad" />
					</div>
					<h3 className="article-title">
						Endless remix
					</h3>
					<p className="article-date">
						25 jan 2021
					</p>
					<p className="article-text">
						Endless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remixEndless remix
					</p>
				</div>
			</div>
			<button className="news-btn">
				{t('показать еще')}
			</button>
		</section>
	)
}

export default News;
