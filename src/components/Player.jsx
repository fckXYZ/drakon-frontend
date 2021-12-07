import React from "react";
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';

import {SERVER_PATH} from "../common/serverPath";

const Player = (props) => {
	const {album, track, prev, next, onEnded} = props;

	return (
		<div className="player-container">
			<div className="active-track">
				<div className="cover-wrapper">
					<img src={SERVER_PATH + album.cover}/>
				</div>
				<p className="track-name">
					{track.name.replace('.mp3', '')}
				</p>
			</div>

			<AudioPlayer
				className="player"
				src={SERVER_PATH + track.url}
				onPlay={e => console.log("onPlay")}
				showSkipControls={true}
				showJumpControls={false}
				layout="horizontal-reverse"
				onClickNext={() => next()}
				onClickPrevious={() => prev()}
				onEnded={() => onEnded()}
				autoPlay={false}
				customIcons={{
					previous:
						<svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M29.0832 24.84L18.3265 14.2454L29.0832 3.6509L25.7789 0.396366L11.7178 14.2454L25.7789 28.0945L29.0832 24.84ZM4.68723 28.0945H0.000204086L0.000204086 0.396366H4.68723L4.68723 28.0945Z"
								fill="white"/>
						</svg>,
					next:
						<svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M0.0153503 3.65077L10.7721 14.2453L0.0153503 24.8398L3.31971 28.0944L17.3808 14.2453L3.31971 0.39624L0.0153503 3.65077ZM24.4113 0.39624H29.0984V28.0944H24.4113V0.39624Z"
								fill="white"/>
						</svg>,
					play:
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						     fill="#ffffff">
							<path d="M8 0v24l12-12z"/>
						</svg>,
					pause: <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13.4006 21.9562H19.683V0H13.4006V21.9562ZM0.835938 21.9562H7.11828V0H0.835938V21.9562Z" fill="#ffffff"/>
					</svg>
				}}
			/>
		</div>
	)
}

export default Player;
