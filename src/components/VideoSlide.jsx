import React, {useState} from "react";
import {SERVER_PATH} from "../common/serverPath";

const VideoSlide = (props) => {
	const { images, title, url } = props;
	const [clicked, setClicked] = useState(false);

	const renderImages = () => {
		return images.map((image) => (
			<div className="image" key={`video-slide-photo-${images.indexOf(image)}`}>
				<img src={SERVER_PATH + image} alt="videoImage" />
			</div>
		))
	}
	return (
		<div className={`video-slide ${clicked ? 'clicked' : ''}`} onClick={() => setClicked(true)}>
			<iframe
				className="iframe"
				width="100%"
				height="100%"
				src={url}
		        title="YouTube video player"
				frameBorder="0"
		        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		        allowFullScreen
			/>
			<div className="images-block">
				{renderImages()}
			</div>
			<h3 className="title">
				{title}
			</h3>
		</div>
	)
}

export default VideoSlide;
