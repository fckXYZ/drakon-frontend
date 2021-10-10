import React, {useRef} from "react";
import MainInfo from "./MainInfo";
import News from "./News";
import About from "./About";
import Music from "./Music";
import Photo from "./Photo";
import Video from "./Video";
import Feedback from "./Feedback";

const Home = (props) => {
	const aboutRefUrl = useRef(null)
	const { photosVisible, videosVisible } = props;

	return (
		<React.Fragment>
			<MainInfo scrollTo={aboutRefUrl}/>
			<News />
			<About refProp={aboutRefUrl} />
			<Music />
			{ photosVisible ? <Photo /> : null }
			{ videosVisible ? <Video /> : null }
			<Feedback />
		</React.Fragment>
	)
}

export default Home;
