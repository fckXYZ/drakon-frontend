import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import ScrollToTop from "../../components/ScrollToTop";
import {getPhotos} from "../../helpers/backend-helper";
import {SERVER_PATH} from "../../common/serverPath";
import Loader from "../../components/Spinner";
import NoContent from "../../components/NoContent";
import {Modal, ModalBody} from "reactstrap";
import {OFFSET} from "../../common/constants";
import Pagination from "../../components/Header/Pagination";

const Photo = () => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false)
	const [photos, setPhotos] = useState([]);

	const [modal, setModal] = useState(false);
	const [modalImage, setModalImage] = useState('');
	const [activePage, setActivePage] = useState(1);
	const [pagesCount,setPagesCount] = useState(1);

	const toggleModal = () => setModal(!modal);

	const fetchPhotos = () => {
		setLoading(true)
			getPhotos()
				.then((data) => {
					setPhotos(data)
					setPagesCount(Math.floor((data.length - 1) / OFFSET) + 1);
					setLoading(false)
			})
	}

	useEffect(() => {
		fetchPhotos();
	}, []);

	const openImageModal = (image) => {
		setModalImage(image);
		setModal(true);
	}

	const renderPhotos = () => {
		const photosForRender = photos.slice((activePage - 1) * OFFSET, activePage * OFFSET)
		return photosForRender.map((photo) => (
			<div className="photo-container" onClick={() => openImageModal(photo)}>
				<img src={SERVER_PATH + photo} alt="Drakon Photo" />
			</div>
		))
	}

	return(
		<>
			<section className="page page-photo">
				<ScrollToTop />
				<div className="section-header">
					<h3 className="small-header">
						{t('Наша')}
					</h3>
					<h2 className="big-header">
						{t('Галерея')}
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
				<Pagination
					activePage={activePage}
					pagesCount={pagesCount}
					callbackPrev={() => setActivePage(activePage - 1)}
					callbackNext={() => setActivePage(activePage + 1)}
				/>
			</section>
			<Modal centered size="xl" isOpen={modal} toggle={toggleModal} scrollable={false} modalClassName="photo-modal">
				<ModalBody>
					<div className="modal-image-container" onClick={toggleModal}>
						{
							modalImage ?
								<img src={SERVER_PATH + modalImage} alt="Drakon" />
								: null
						}
					</div>
				</ModalBody>
			</Modal>
		</>
	)
}

export default Photo;
