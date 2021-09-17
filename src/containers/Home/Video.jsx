import React, {useEffect, useLayoutEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

import VideoSlide from "../../components/VideoSlide";
import {Link} from "react-router-dom";
import {getVideos} from "../../helpers/backend-helper";
import {SERVER_PATH} from "../../common/serverPath";

SwiperCore.use([Pagination, Navigation]);

const Video = () => {
	const { t, i18n } = useTranslation();
	const [videos, setVideos] = useState([]);
	const [activeSlide, setActiveSlide] = useState(null);
	const [size, setSize] = useState(window.innerWidth);

	const fetchVideos = () => {
		getVideos()
			.then((data) => {
				setVideos(data)
			})
	}

	useEffect(() => {
		fetchVideos();
	}, [])

	useEffect(() => {
		setActiveSlide(videos[0])
	}, [videos]);


	useLayoutEffect(() => {
		function updateSize() {
			setSize(window.innerWidth);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	const slidesPerView = () => {
		if (size < 1024) {
			return "auto";
		}
		return 2;
	}
	const slidesMargin = () => {
		if (size < 810) {
			return 10;
		}
		if (size < 1024) {
			return 0;
		}
		return 72;
	}

	const isCentered = () => {
		return (size < 1024);
	}


	const renderPhotosMobile = () => {
		if (size < 1024) {
			return(
				<div className="photos-mobile">
					{
						activeSlide.photos.map((image) => (
							<div className="image-wrapper" key={`video-photos-mobile-${activeSlide.photos.indexOf(image)}`}>
								<img src={SERVER_PATH + image} alt={activeSlide[`title_${i18n.language}`]} />
							</div>
						))
					}
				</div>
			)
		}
	}

	return (
		<section className="section video">
			<div className="section-header">
				<h2 className="section-title">
					{t('Видеоальбом')}
				</h2>
				<Link to="/video" className="section-all">{t('Посмотреть все')}</Link>
			</div>
			<Swiper
				tag="div"
				wrapperTag="ul"
				className="carousel"
				key={`video-swiper`}
				navigation
				pagination={{ clickable: true }}
				centeredSlides={isCentered()}
				slidesPerView={slidesPerView()}
				spaceBetween={slidesMargin()}
				onActiveIndexChange={(e) => setActiveSlide(videos[e.activeIndex])}
			>
				{
					videos.length ?
						videos.map((video) => {
							return (
								<SwiperSlide
									tag="li"
									key={`slide-${videos.indexOf(video)}`}
								>
									<VideoSlide
										key={`video-slide-${videos.indexOf(video)}`}
										url={video.url}
										images={video.photos}
										title={video[`title_${i18n.language}`]}
									/>
								</SwiperSlide>
							)}) :
						null
				}
			</Swiper>
			{activeSlide ? renderPhotosMobile() : null}
		</section>
	)
}

export default Video;
