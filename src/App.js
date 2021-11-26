import React, {useEffect, useState} from "react";
import {Switch, Route} from 'react-router';
import './App.scss';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/Header";
import Home from "./containers/Home";
import Footer from "./components/Footer";
import News from "./containers/News";
import Music from "./containers/Music";
import Photo from "./containers/Photo";
import Video from "./containers/Video";
import {getSettings} from "./helpers/backend-helper";
import {useLocation} from "react-router-dom";
import NotFound from "./containers/NotFound";

function App() {

	const [maintain, setMaintain] = useState(false);
	const [videosVisible, setVideosVisible] = useState(false);
	const [photosVisible, setPhotosVisible] = useState(false);

	const location = useLocation();
	const { pathname } = location;

	useEffect(() => {
		getSettings()
			.then((data) => {
				setMaintain(data.maintain);
				setPhotosVisible(data.photosVisible)
				setVideosVisible(data.videosVisible)
			})
			.catch((err) => {
				console.log(err)
			})
	}, []);

	return (
		<div className="App">
			<Header photosVisible={photosVisible} videosVisible={videosVisible}/>
			<Switch>
				<Route exact path="/news" component={News}/>
				<Route exact path="/music" component={Music}/>
				<Route exact path="/photo" component={Photo}/>
				<Route exact path="/video" component={Video}/>
				<Route exact path="/"
				       render={(props) => (
					       <Home {...props} photosVisible={photosVisible} videosVisible={videosVisible} />
				       )}
				       />
				<Route path="*" component={NotFound} />
			</Switch>
			<Footer photosVisible={photosVisible} videosVisible={videosVisible}/>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			{/*background images*/}
			{
				pathname === '/' ?
					<>
						<div className="background-dragon-top" />
						<div className="bg-hole-desktop" />
						<div className="background-bottom" />
					</>
					: null
			}
		</div>
	);
}

export default App;
