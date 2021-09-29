import React, {useRef} from "react";
import MainInfo from "./MainInfo";
import News from "./News";
import About from "./About";
import Music from "./Music";
import Photo from "./Photo";
import Video from "./Video";
import Feedback from "./Feedback";

const Home = () => {
	const aboutRefUrl = useRef(null)

	return (
		<React.Fragment>
			<MainInfo scrollTo={aboutRefUrl}/>
			<News />
			<About refProp={aboutRefUrl} />
			<Music />
			<Photo />
			<Video />
			<Feedback />
		</React.Fragment>
	)
}

export default Home;
