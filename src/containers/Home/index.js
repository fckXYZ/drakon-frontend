import React from "react";
import MainInfo from "./MainInfo";
import News from "./News";
import About from "./About";
import Music from "./Music";
import Photo from "./Photo";
import Video from "./Video";
import Feedback from "./Feedback";

const Home = () => {
	return (
		<React.Fragment>
			<MainInfo />
			<News />
			<About />
			<Music />
			<Photo />
			<Video />
			<Feedback />
		</React.Fragment>
	)
}

export default Home;
