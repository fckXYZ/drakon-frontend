import React, {useEffect, useLayoutEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {BiImages} from "react-icons/all";
import {getPhotos} from "../../helpers/backend-helper";
import {SERVER_PATH} from "../../common/serverPath";

const bgPlaceholders = [
	{
		bgColor: '#111',
	},
	{
		bgColor: '#252525',
	},
	{
		bgColor: '#363636',
	},
	{
		bgColor: '#464646',
	},
	{
		bgColor: '#555',
	},
	{
		bgColor: '#555',
	},
	{
		bgColor: '#464646',
	},
	{
		bgColor: '#363636',
	},
	{
		bgColor: '#252525',
	},
	{
		bgColor: '#111',
	},

]
const bgPlaceholdersDT = [
	{
		bgColor: '#252525',
	},
	{
		bgColor: '#363636',
	},
	{
		bgColor: '#464646',
	},
	{
		bgColor: '#555',
	},
	{
		bgColor: '#555',
	},
	{
		bgColor: '#464646',
	},
	{
		bgColor: '#363636',
	},
	{
		bgColor: '#252525',
	},
]
const bgPlaceholdersTablet = [
	{
		bgColor: '#111',
	},
	{
		bgColor: '#252525',
	},
]

const Spotify = (props) => {
	const { t } = useTranslation();
	const { link } = props;

	const [size, setSize] = useState(window.innerWidth);
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		getPhotos()
			.then((data) => {
				setPhotos(data)
			})
	}, []);


	useLayoutEffect(() => {
		function updateSize() {
			setSize(window.innerWidth);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	const getBlocksCount = () => {
		if (size > 1320) {
			return bgPlaceholders;
		} else if (size > 1023) {
			return bgPlaceholdersDT;
		} else {
			return bgPlaceholdersTablet;
		}
	}

	const renderPhotos = () => {
		const placeholderForRender = getBlocksCount();

		return (
			placeholderForRender.map((bg) => {
				const indexToCheck = placeholderForRender.indexOf(bg)
				return (
					<div
						key={`photo-square-${placeholderForRender.indexOf(bg)}`}
						className="photo-square"
						style={{ backgroundColor: bg.bgColor }}
					>
						{
							photos[indexToCheck] ?
								<img
									src={SERVER_PATH + photos[indexToCheck]}
									alt="Band"
								/>
								:
								null
						}
					</div>
				)
			})
		)

	}

	return (
		<section className="section spotify">
			{renderPhotos()}
			<div className="wrapper-1168mw">
				<div className="spotify-info-block">
					<div className="section-header">
						<h3 className="small-header">
							{t('Следите за нами')}
						</h3>
						<h2 className="big-header">
							{t('на Spotify')}
						</h2>
					</div>
					<div className="spotify-btns-block">
						<a
							href={link}
							target='_blank'
							rel='noreferrer'
						>
							<button className="spotify-btn">SPOTIFY</button>
						</a>
						<Link to="/photo" className="spotify-gallery-link"><BiImages />{t('Галерея')}</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Spotify;
