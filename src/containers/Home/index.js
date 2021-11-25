import React, {useRef} from "react";
import MainInfo from "./MainInfo";
import News from "./News";
import About from "./About";
import Video from "./Video";
import Spotify from "./Spotify";
import Tracks from "./Music";
import Subscribe from "./Subscribe";

const Home = (props) => {
	const aboutRefUrl = useRef(null)
	const { videosVisible } = props;

	return (
		<React.Fragment>
			<MainInfo scrollTo={aboutRefUrl}/>
			<About refProp={aboutRefUrl} />
			<Spotify />
			<div className="bg-smoke-snake-skin-1920">
				{/*TODO change to videosVisible*/}
				{ true ? <Video /> : null }
				<Tracks />
			</div>
			<Subscribe />
			<News />
		</React.Fragment>
	)
}

export default Home;
