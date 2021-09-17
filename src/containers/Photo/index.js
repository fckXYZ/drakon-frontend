import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import ScrollToTop from "../../components/ScrollToTop";
import {getPhotos} from "../../helpers/backend-helper";
import {SERVER_PATH} from "../../common/serverPath";
import Loader from "../../components/Spinner";
import NoContent from "../../components/NoContent";

const Photo = () => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false)
	const [photos, setPhotos] = useState([]);

	const fetchPhotos = () => {
		setLoading(true)
			getPhotos()
				.then((data) => {
					setPhotos(data)
					setLoading(false)
			})
	}

	useEffect(() => {
		fetchPhotos();
	}, []);

	const renderPhotos = () => {
		return photos.map((photo) => (
			<div className="photo-container">
				<img src={SERVER_PATH + photo} alt="Drakon Photo" />
			</div>
		))
	}

	return(
		<div className="background-wrapper">
			<section className="page-photo">
				<ScrollToTop />
				<div className="section-header">
					<h2 className="section-title">
						{t('Фотоальбом')}
					</h2>
				</div>
				<div className="album-container">
					{
						photos.length ?
							renderPhotos() :
							loading ?
								<Loader /> :
								<NoContent contentName={t('фото')} />
					}
				</div>
			</section>
		</div>
	)
}

export default Photo;
