import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import ScrollToTop from "../../components/ScrollToTop";
import {getVideos} from "../../helpers/backend-helper";
import Loader from "../../components/Spinner";
import NoContent from "../../components/NoContent";
import {Modal, ModalBody} from "reactstrap";
import Pagination from "../../components/Header/Pagination";
import {OFFSET_VIDEOS} from "../../common/constants";

const Video = () => {
	const {t, i18n} = useTranslation();
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(false);

	const [activePage, setActivePage] = useState(1);
	const [pagesCount, setPagesCount] = useState(1);

	const [modal, setModal] = useState(false);
	const [modalVideo, setModalVideo] = useState('');

	const toggleModal = () => setModal(!modal);

	const openVideoModal = (url) => {
		setModalVideo(url);
		setModal(true);
	}

	const fetchVideos = () => {
		setLoading(true)
		getVideos()
			.then((data) => {
				setVideos(data)
				setPagesCount(Math.floor((data.length - 1) / OFFSET_VIDEOS) + 1);
				setLoading(false)
			})
	}

	useEffect(() => {
		fetchVideos();
	}, []);

	const renderVideos = () => {
		const videosForRender = videos.slice((activePage - 1) * OFFSET_VIDEOS, activePage * OFFSET_VIDEOS)
		return videosForRender.map((video) => (
			<div className="video-container" key={`video-container-${videosForRender.indexOf(video)}`} onClick={() => openVideoModal(video.url)}>
				<div className="video-play-block" />
				<p className="video-title">{i18n.language === 'ru' ? video.title_ru : video.title_en}</p>
			</div>
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
				{
					videos ?
						renderVideos() :
						loading ?
							<Loader/> :
							<NoContent contentName={t('видео')}/>
				}
			</div>
			<Pagination
				activePage={activePage}
				pagesCount={pagesCount}
				callbackPrev={() => setActivePage(activePage - 1)}
				callbackNext={() => setActivePage(activePage + 1)}
			/>

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
