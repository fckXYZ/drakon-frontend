import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import VideoSlide from "../../components/VideoSlide";
import ScrollToTop from "../../components/ScrollToTop";
import {getVideos} from "../../helpers/backend-helper";
import Loader from "../../components/Spinner";
import NoContent from "../../components/NoContent";

const Video = () => {
	const {t} = useTranslation();
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchVideos = () => {
		setLoading(true)
		getVideos()
			.then((data) => {
				setVideos(data)
				setLoading(false)
			})
	}

	useEffect(() => {
		fetchVideos();
	}, []);

	const renderVideos = () => {
		return videos.map((video) => (
			<VideoSlide
				images={video.photos}
				title={video.title}
				url={video.url}
			/>
		))
	}

	return (
		<section className="page page-video">
			<ScrollToTop />
			<div className="section-header">
				<h3 className="small-header">
					{t('Наше')}
				</h3>
				<h2 className="big-header">
					{t('Видео')}
				</h2>
			</div>
			<div className="videos-container">
				{/*TODO remove HC*/}
				<div className="videos-container">
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>

					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>
					<div className="video-container">
						<div className="video-play-block" />
						<p className="video-title">title</p>
					</div>

				</div>

				{/*till here*/}
				{
					videos ?
						renderVideos() :
						loading ?
							<Loader /> :
							<NoContent contentName={t('видео')} />
				}
			</div>
		</section>
	)
}

export default Video;
