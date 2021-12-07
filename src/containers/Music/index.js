import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import Player from "../../components/Player";
import ScrollToTop from "../../components/ScrollToTop";
import {getMusic} from "../../helpers/backend-helper";
import {SERVER_PATH} from "../../common/serverPath";
import moment from "moment";

const Music = () => {
	const { t } = useTranslation();
	const [albums, setAlbums] = useState([])
	const [activeAlbum, setActiveAlbum] = useState(null);
	const [activeTrack, setActiveTrack] = useState(null)

	const fetchAlbums = () => {
		getMusic()
			.then((data) => {
				setAlbums(data)
			})
	}

	useEffect(() => {
		fetchAlbums()
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


	const onAlbumClick = (album) => {
		setActiveAlbum(album);
		setActiveTrack(album.tracks[0])
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}

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

	const renderPlaylist = () => {
		const { tracks } = activeAlbum;

		return(
			<div className="playlist-container">
				{/*for background*/}
				<div className="top-block-container">
					<div className="top-block">
						<div className="cover">
							<img src={SERVER_PATH + activeAlbum.cover} alt={activeAlbum.title} />
						</div>
						<div className="info">
							<p className="subtitle">
								{t('Плейлист')}
							</p>
							<h2 className="title">
								{activeAlbum.title}
							</h2>
							{
								activeAlbum.description ?
									<div className="description" dangerouslySetInnerHTML={{ __html: activeAlbum.description }}/> :
									null
							}
						</div>
					</div>
				</div>
				<div className="playlist">
					<p className="track-header">
						{t('Трек')}
					</p>
					<ul className="tracks">
						{
							tracks.map((track) => {
								return(
									<li
										className={`track ${track === activeTrack ? 'active' : ''}`}
										key={`track-playlist-page-${track.name}-${track.length}-${tracks.indexOf(track)}`}
										onClick={() => setActiveTrack(track)}
									>
										<div className="cover">
											<img src={SERVER_PATH + activeAlbum.cover} alt={track.name} />
										</div>
										<p className="number">
											0.{tracks.indexOf(track) + 1}
										</p>
										<p className="name">
											{track.name.replace('.mp3', '')}
										</p>
										<p className="length">
											{moment(track.length * 1000).format('m: ss')}
										</p>
									</li>
								)
							})
						}
					</ul>
				</div>
				<div className="player-wrapper">
					<Player
						album={activeAlbum}
						track={activeTrack}
						next={() => onNextSong()}
						prev={() => onPrevSong()}
						onEnded={() => onNextSong()}
					/>
				</div>
			</div>
		)
	}

	const renderAlbums = () => {
		return(
			<div className="albums-container">
				{
					albums.map((album) => {
						return(
							<div className="album" key={`page-music-album-cover-${album.title}`} onClick={() => onAlbumClick(album)}>
								<div className="cover">
									<img src={SERVER_PATH + album.cover} alt={album.title} />
								</div>
								<div className="info">
									<p className="subtitle">
										{t('Плейлист')}
									</p>
									<h2 className="title">
										{album.title}
									</h2>
									{
										album.description ?
											<div className="description" dangerouslySetInnerHTML={{ __html: activeAlbum.description }}/>
											: null
									}
								</div>
							</div>
						)
					})
				}
			</div>
		)
	}

	return(
		// <div className="bg-wrapper">
			<section className="page page-music">
				{
					activeTrack ?
						<>
							<ScrollToTop />
							<div className="section-header">
								<h3 className="small-header">
									{t('Наша')}
								</h3>
								<h2 className="big-header">
									{t('Дискография')}
								</h2>
							</div>
							{renderPlaylist()}
							{renderAlbums()}
						</> :
						null
				}
			</section>
		// </div>
	)
}

export default Music;
