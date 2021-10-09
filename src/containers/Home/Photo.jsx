import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {getPhotos} from "../../helpers/backend-helper";
import {SERVER_PATH} from "../../common/serverPath";
import NoContent from "../../components/NoContent";

const Photo = () => {
	const { t } = useTranslation();
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(false)

	const fetchPhotos = () => {
		setLoading(true)
		getPhotos()
			.then((data) => {
				setPhotos(data);
				setLoading(false)
			})
	}

	useEffect(() => {
		fetchPhotos();
	}, []);


	return (
		<section className="section photo">
			<div className="section-header">
				<h2 className="section-title">
					{t('Фотоальбом')}
				</h2>
				<Link to="/photo" className="section-all">{t('Посмотреть все')}</Link>
			</div>
			{
				photos.length ?
					<div className="photos">
						{
							photos.length ?
								photos.map((photo) => {
									return(
										<div
											key={`photo-block-photo-${photos.indexOf(photo)}`}
											className="image-container"
										>
											<img src={SERVER_PATH + photo} alt="Drakon Band"/>
										</div>
									)
								}) :
								null
						}
					</div>
					: <NoContent contentName={t('фото')} />
			}
		</section>
	)
}

export default Photo;
