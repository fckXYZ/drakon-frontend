import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {getVideos} from "../../helpers/backend-helper";
import Loader from "../../components/Spinner";
import NoContent from "../../components/NoContent";
import {Modal, ModalBody} from "reactstrap";

const Video = () => {
	const { t, i18n } = useTranslation();
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(false);

	const [modal, setModal] = useState(false);
	const [modalVideo, setModalVideo] = useState('');

	const toggleModal = () => setModal(!modal);

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
	}, [])

	const openVideoModal = (url) => {
		setModalVideo(url);
		setModal(true);
	}

	const renderVideos = () => {
		if (videos.length) {
			const videosForRender = videos.length > 5 ? videos.slice(0, 5) : videos;
			return videosForRender.map((video) => {
				return (
					<div className="video-container" key={`video-container-${videosForRender.indexOf(video)}`} onClick={() => openVideoModal(video.url)}>
						<div className="video-play-block" />
						<p className="video-title">{i18n.language === 'ru' ? video.title_ru : video.title_en}</p>
					</div>
				)
			})
		}
		return (
			<NoContent contentName={t('видео')}/>
		)
	}

	return (
		<section className="section video">
			<div className="section-header">
				<h3 className="small-header">
					{t('Наше')}
				</h3>
				<h2 className="big-header">
					{t('Видео')}
				</h2>
			</div>
			<div className="videos-container">
				{loading ? <Loader /> : renderVideos()}
			</div>
			<Modal centered size="xl" isOpen={modal} toggle={toggleModal} modalClassName="video-modal">
				<ModalBody>
						<iframe
							className="iframe"
							width="100%"
							height="100%"
							src={modalVideo}
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
				</ModalBody>
			</Modal>
		</section>
	)
}

export default Video;
