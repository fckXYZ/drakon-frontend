import React, {useEffect, useLayoutEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import Slide from "../../components/Slide";

import {Link} from "react-router-dom";
import {getNews as fetchNews} from "../../helpers/backend-helper";
import {SERVER_PATH} from "../../common/serverPath";
import NoContent from "../../components/NoContent";
import Loader from "../../components/Spinner";

SwiperCore.use([Pagination, Navigation]);

const News = () => {
	const { t } = useTranslation();
	const [size, setSize] = useState(window.innerWidth);

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

	useLayoutEffect(() => {
		function updateSize() {
			setSize(window.innerWidth);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	const slidesPerView = () => {
		if (size < 810) {
			return 'auto';
		}
		if (size < 1024) {
			return 2;
		}
		return 'auto';
	}
	const slidesMargin = () => {
		if (size < 810) {
			return 9;
		}
		if (size < 1024) {
			return 30;
		}
		return 50;
	}

	const isCentered = () => {
		return !(size < 1024 && size > 809);
	}

	const renderSwiper = () => {
		if (news.length) {
			return(
				<Swiper
					tag="section"
					wrapperTag="ul"
					className="carousel"
					pagination={{ clickable: true }}
					navigation
					centeredSlides={isCentered()}
					slidesPerView={slidesPerView()}
					spaceBetween={slidesMargin()}
				>
					{
						news.map((article) => {
							return (
								<SwiperSlide
									tag="li"
									key={`slide-${article}`}
								>
									<Slide
										key={article._id}
										image={SERVER_PATH + article.file}
										title={t('Новость')}
										date={article.date}
										subtitle={article.title}
										preview={article.preview}
									/>
								</SwiperSlide>
							)})
					}
				</Swiper>
			)
		}
		return(
			<NoContent contentName={t('новостей')} />
		)
	}

	return (
		<section className="section-100vw news">
			<div className="section-header">
				<h2 className="section-title">
					{t('Новости')}
				</h2>
				<Link to="/news" className="section-all">{t('Посмотреть все')}</Link>
			</div>
			{
				loading ?
					<Loader /> :
					renderSwiper()
			}
		</section>
	)
}

export default News;
