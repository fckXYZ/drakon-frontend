import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import AudioPlayer from "react-h5-audio-player";
import {SERVER_PATH} from "../../common/serverPath";

import {getDiscography} from "../../helpers/backend-helper";
import Loader from "../../components/Spinner";
import {Link} from "react-router-dom";

const Tracks = (props) => {
	const {t} = useTranslation();
	const [tracks, setTracks] = useState([]);
	const [text, setText] = useState('');

	useEffect(() => {
		getDiscography()
			.then((data) => {
				setTracks(data.tracks);
				setText(data.text);
			})
	}, []);

	const renderTrack = (track) => {
		const { name, file } = track;

		return (
			<div className="tracks-track">
				<h3 className="track-band-name">
					DRAKON
				</h3>
				<p className="track-name">
					{name}
				</p>
				<AudioPlayer
					className="track-player"
					showJumpControls={false}
					src={SERVER_PATH + file}
					layout="horizontal-reverse"
					autoPlay={false}
					customIcons={{
						play:
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							     fill="#ffffff">
								<path d="M8 0v24l12-12z"/>
							</svg>,
						pause: <svg width="20" height="22" viewBox="0 0 20 22" fill="none"
						            xmlns="http://www.w3.org/2000/svg">
							<path
								d="M13.4006 21.9562H19.683V0H13.4006V21.9562ZM0.835938 21.9562H7.11828V0H0.835938V21.9562Z"
								fill="#ffffff"/>
						</svg>
					}}
				/>
			</div>

		)
	}

	const renderTracksBlock = () => {
		const tracksForRender = tracks.sort((a, b) => +a.index - +b.index)
		return (
			<>
				<div className="logo"/>
				<div className="tracks">
					{tracksForRender.map((track) => renderTrack(track))}
				</div>
			</>
		)
	}

	return (
		<section className="section music">
			<div className="music-container">
				<div className="music-backborder"/>
				<div className="music-tracks-container">
					{
						tracks.length ? renderTracksBlock() : <Loader/>
					}
				</div>
			</div>
			<div className="info-container">
				<div className="section-header">
					<h3 className="small-header">
						{t('Наша')}
					</h3>
					<h2 className="big-header">
						{t('Дискография')}
					</h2>
				</div>
				<p className="info-text" dangerouslySetInnerHTML={{ __html: text }} />
				<Link to="/music">
					<button className="music-btn">{t('Дискография')}</button>
				</Link>
			</div>
		</section>
	)
}

export default Tracks;
