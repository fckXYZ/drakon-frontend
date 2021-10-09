import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useTranslation} from "react-i18next";

import Player from "../../components/Player";
import {Link} from "react-router-dom";
import {getMusic} from "../../helpers/backend-helper";
import {SERVER_PATH} from "../../common/serverPath";
import moment from "moment";
import NoContent from "../../components/NoContent";

const Music = (props) => {
	const { t } = useTranslation();
	const [albums, setAlbums] = useState([]);
	const [activeAlbum, setActiveAlbum] = useState(null);
	const [activeTrack, setActiveTrack] = useState(null);
	const [size, setSize] = useState(window.innerWidth);

	const fetchAlbums = () => {
		getMusic()
			.then((data) => {
				setAlbums(data);
			})
	}

	useEffect(() => {
		fetchAlbums();
	}, []);

	useEffect(() => {
		if (!albums.length) {
			return
		}
		setActiveAlbum(albums[0])
	}, [albums]);

	useEffect(() => {
		if (!activeAlbum) {
			return
		}
		setActiveTrack(activeAlbum.tracks[0])
	}, [activeAlbum]);

	useLayoutEffect(() => {
		function updateSize() {
			setSize(window.innerWidth);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	const onNextSong = () => {
		if (activeAlbum.tracks.indexOf(activeTrack) === activeAlbum.tracks.length - 1) {
			return;
		}
		setActiveTrack(activeAlbum.tracks[activeAlbum.tracks.indexOf(activeTrack) + 1])
	}

	const onPrevSong = () => {
		if (activeAlbum.tracks.indexOf(activeTrack) === 0) {
			return;
		}
		setActiveTrack(activeAlbum.tracks[activeAlbum.tracks.indexOf(activeTrack) - 1])
	}

	const renderNotActiveCovers = () => {
		return albums.map((album) => {
			if (album.title !== activeAlbum.title) {
				return (
					<div className="cover" key={`album-cover-${album.title}`} onClick={() => setActiveAlbum(album)}>
						<img src={SERVER_PATH + album.cover} alt={album.title} />
					</div>
				)
			}
			return null;
		})
	}

	const renderTracks = () => {
		return activeAlbum.tracks.map((track) => {
			const { name, length } = track;

			return (
				<li
					key={`track-${activeAlbum.title}-${activeAlbum.tracks.indexOf(track)}`}
					className={`track ${track === activeTrack ? 'active' : ''}`}
					onClick={() => setActiveTrack(track)}
				>
					<p className="number">
						0.{activeAlbum.tracks.indexOf(track) + 1}
					</p>
					<p className="name">
						{name}
					</p>
					<p className="length">
						{moment(length * 1000).format('m: ss')}
					</p>
				</li>
			)
		})
	}

	const renderPlaylist = () => (
		<div className="albums-block">
			{
				activeTrack ?
					<>
						<div className="cover-active">
							<img src={SERVER_PATH + activeAlbum.cover} alt={activeAlbum.title} />
						</div>
						{renderNotActiveCovers()}
						<div className="playlist">
							<h3 className="title">
								{activeAlbum.title}
							</h3>
							<ul className="tracks">
								{renderTracks()}
							</ul>
						</div>

					</> :
					null
			}
		</div>
	)

	const renderPlaylistMobile = () => {
		if (!albums.length) {
			return;
		}
		let albumsForRender;
		if (albums.indexOf(activeAlbum) === 0) {
			albumsForRender = albums.slice(0, 2);
		} else if (albums.indexOf(activeAlbum) === albums.length - 1) {
			albumsForRender = albums.slice(albums.length - 2)
		} else {
			albumsForRender = albums.slice(albums.indexOf(activeAlbum) - 1, albums.indexOf(activeAlbum) + 2);
		}
		const addMargin = (album) => {
			if (albums.indexOf(album) === 0 && album === activeAlbum) {
				return ' margin-left'
			}
			if (albums.indexOf(album) === albums.length - 1 && album === activeAlbum) {
				return ' margin-right'
			}
			return ''
		}

		return (
			<div className="albums-block-mobile">
				{
					activeTrack ?
						<>
							<div className="covers">
								{
									albumsForRender.map((album) => {
										return (
											<div
												className={`album-cover${addMargin(album)}${activeAlbum === album ? ' active' : ''}`}
												key={`album-cover-${albums.indexOf(album)}`}
												onClick={() => {
													setActiveAlbum(album);
													setActiveTrack(album.tracks[0])
												}}
											>
												<img src={SERVER_PATH + album.cover} alt={album.title} />
											</div>
										)
									})
								}
							</div>
							<div className="playlist">
								<ul className="tracks">
									{renderTracks()}
								</ul>
							</div>

						</> :
						null
				}

			</div>
		)
	}

	return (
		<section className="section music">
			<div className="section-header">
				<h2 className="section-title">
					{t('Дискография')}
				</h2>
				<Link to="/music" className="section-all">{t('Посмотреть все')}</Link>
			</div>
			{
				activeTrack ?
					<>
						{
							size > 1050 ?
								renderPlaylist() :
								renderPlaylistMobile()
						}
						<div className="player-wrapper">
							{
								activeAlbum ?
									<Player
										album={activeAlbum}
										track={activeTrack}
										next={() => onNextSong()}
										prev={() => onPrevSong()}
									/> :
									null
							}
						</div>
					</> :
					<NoContent contentName={t('музыки')}/>
			}
		</section>
	)
}

export default Music;
