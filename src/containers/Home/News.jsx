import React, {useEffect, useLayoutEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {getNews} from "../../helpers/backend-helper";
import {toast} from "react-toastify";
import Loader from "../../components/Spinner";
import {SERVER_PATH} from "../../common/serverPath";
import moment from "moment";

import SwiperCore, {Pagination, Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import Slide from "../../components/Slide";
import {Modal, ModalBody} from "reactstrap";

SwiperCore.use([Pagination, Navigation]);

const News = () => {
	const { t } = useTranslation();
	const [size, setSize] = useState(window.innerWidth);

	const [news, setNews] = useState([]);

	const [loading, setLoading] = useState(false);

	const [newsShowed, setNewsShowed] = useState(3);
	const [showMoreButton, setShowMoreButton] = useState(false);

	const [modal, setModal] = useState(false);
	const [modalArticle, setModalArticle] = useState('');

	const toggleModal = () => setModal(!modal);

	const openArticleModal = (article) => {
		setModalArticle(article);
		setModal(true);
	}

	useLayoutEffect(() => {
		function updateSize() {
			setSize(window.innerWidth);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	const fetchNews = () => {
		setLoading(true);
		getNews()
			.then((data) => {
				setNews(data);
				setShowMoreButton(data.length > 3);
				setLoading(false);
			})
			.catch((err) => {
				toast.error(err.message ? err.message : t('Произошла ошибка на сервере!'));
				setLoading(false);
			})
	}

	useEffect(() => {
		fetchNews();
	}, []);

	useEffect(() => {
		setShowMoreButton(news.length > newsShowed);
	}, [news.length, newsShowed])

	const renderNews = (newsCount) => {
		const newsForRender = news.slice(0, newsCount);
		return newsForRender.map((article) => {
			return (
				<div
					className="news-article"
					key={`news-article-${news.indexOf(article)}`}
					onClick={() => openArticleModal(article)}
				>
					<div className="image-container">
						<img src={SERVER_PATH + article.file} alt={article.title} />
					</div>
					<h3 className="article-title">
						{article.title}
					</h3>
					<p className="article-date">
						{moment(article.date).format('DD MMM YYYY')}
					</p>
					{
						article.preview.length > 160 ?
							<p className="article-text">
								{article.preview.substr(0, 160)}&hellip;
							</p>
							:
							<p className="article-text">
								{article.preview}
							</p>
					}
				</div>
			)
		})

	}

	const onShowMore = () => {
		setNewsShowed(newsShowed + 3);
	};

	const renderNewsMobile = () => {
		return (
			<Swiper
				tag="div"
				className="news-carousel"
				pagination={{clickable: false}}
				centeredSlides={size < 810}
				slidesPerView={size < 810 ? 1 : 2}
				spaceBetween={0}
			>
				{
					news.map((article) => {
						return (
							<SwiperSlide
								tag="li"
								key={`slide-article-${news.indexOf(article)}`}
								onClick={() => openArticleModal(article)}
							>
								<Slide
									image={article.file}
									title={article.title}
									date={article.date}
									preview={article.preview}
								/>
							</SwiperSlide>
						)
					})
				}
			</Swiper>
		)
	};

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
			{
				size > 1023 ?
					<div className="news-container">
						{loading ? <Loader /> : renderNews(newsShowed)}
					</div>
					:
					renderNewsMobile()
			}
			{
				showMoreButton ?
					<button className="news-btn" onClick={() => onShowMore()}>
						{t('показать еще')}
					</button>
					:
					null
			}
			<Modal centered size="xl" isOpen={modal} toggle={toggleModal} modalClassName="article-modal">
				<ModalBody onClick={toggleModal}>
					<div className="news-modal-article">
						<div className="image-container">
							<img src={SERVER_PATH + modalArticle.file} alt={modalArticle.title} />
						</div>
						<h3 className="article-title">
							{modalArticle.title}
						</h3>
						<p className="article-date">
							{moment(modalArticle.date).format('DD MMM YYYY')}
						</p>
						<div className="article-text" dangerouslySetInnerHTML={{__html: modalArticle.text}} />
					</div>
				</ModalBody>
			</Modal>
		</section>
	)
}

export default News;
