import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {getAbout} from "../../helpers/backend-helper";
import {Link} from "react-router-dom";
import Loader from "../../components/Spinner";
import {Modal, ModalBody} from "reactstrap";

const About = (props) => {
	const {t, i18n} = useTranslation();

	const [about, setAbout] = useState('');
	const [videoUrl, setVideoUrl] = useState('');

	const [modal, setModal] = useState(false);

	const toggleModal = () => setModal(!modal);


	useEffect(() => {
		getAbout()
			.then((data) => {
				// {
				// 	"about_page": "html",
				// 	"main_page": "html",
				//  "video": url
				// }
				setAbout(data.main_page)
				setVideoUrl(data.video)
			})
	}, [i18n.language]);

	return (
		<div className="bg-snake-skin-1920">
		<section className="section about" ref={props.refProp}>
			<div className="video-container">
				<div className="video-backborder"/>
				<div className="video-blood"/>
				<div className="video-about">
					{
						videoUrl ?
							<iframe
								className="iframe"
								width="100%"
								height="100%"
								src={videoUrl}
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
							:
							null
					}

				</div>
				<button className="play-btn" onClick={toggleModal}>
					{t('Воспроизвести')}
				</button>
			</div>
			<div className="info-container">
				<div className="section-header">
					<h3 className="small-header">
						{t('Пару слов')}
					</h3>
					<h2 className="big-header">
						{t('О Группе')}
					</h2>
				</div>
				{
					about ?
						<div className="info-text" dangerouslySetInnerHTML={{__html: about}}/>
						:
						<Loader />
				}
				<Link to='/about'>
					<button className="info-btn">{t('Подробнее')}</button>
				</Link>
			</div>
			{
				videoUrl ?
					<Modal centered size="xl" isOpen={modal} toggle={toggleModal} modalClassName="video-modal">
						<ModalBody>
							<iframe
								className="iframe"
								width="100%"
								height="100%"
								src={videoUrl}
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</ModalBody>
					</Modal>
					: null
			}

		</section>
		</div>
	)
}

export default About;
