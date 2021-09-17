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
		<div className="background-wrapper">
			<section className="page-video">
				<ScrollToTop />
				<div className="section-header">
					<h2 className="section-title">
						{t('Видеоальбом')}
					</h2>
				</div>
				<div className="videos-container">
					{
						videos ?
							renderVideos() :
							loading ?
								<Loader /> :
								<NoContent contentName={t('видео')} />
					}
				</div>
			</section>
		</div>
	)
}

export default Video;
