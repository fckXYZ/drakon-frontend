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
import About from "./containers/About";

function App() {

	// const [maintain, setMaintain] = useState(false);
	const [videosVisible, setVideosVisible] = useState(false);
	const [contacts, setContacts] = useState({});
	const [mediaLinks, setMediaLinks] = useState([]);
	const [bottomDocs, setBottomDocs] = useState([]);

	const location = useLocation();
	const { pathname } = location;

	useEffect(() => {
		getSettings()
			.then((data) => {
				// {
				// 	"settings": {
				// 		"maintain": false,
				// 		"videosVisible": true,
				// 		"__v": 0
				// 	},
				// 	"contacts": {
				// 		"email": "test@test.com",
				// 		"phone": "9500923111",
				// 		"mediaLinks": [
				// 			{
				// 				"_id": "61a33aa3944a2b6db1598438",
				// 				"type": "spotify",
				// 				"link": "https://spotify.com"
				// 			},
				// 			{
				// 				"_id": "61a33aa3944a2b6db1598439",
				// 				"type": "yandex",
				// 				"link": "https://yandex.ru"
				// 			},
				// 			{
				// 				"_id": "61a33aa3944a2b6db159843a",
				// 				"type": "youtube",
				// 				"link": "https://yt.com"
				// 			},
				// 			{
				// 				"_id": "61a33aa3944a2b6db159843b",
				// 				"type": "apple",
				// 				"link": "https://apple.com"
				// 			}
				// 		]
				// 	},
				//    "bottomDocs": {
				//         "usersAgreement": {
				//             "ru": {
				//                 "name": "Users agreement",
				//                 "language": {
				//                     "_id": "61a8a21004bf21ef99c87b55",
				//                     "languageLocale": "ru"
				//                 },
				//                 "__v": 0,
				//                 "file": "/uploads/ключи pdf.pdf"
				//             },
				//             "en": {
				//                 "name": "Users agreement",
				//                 "language": {
				//                     "_id": "61a8a21004bf21ef99c87b56",
				//                     "languageLocale": "en"
				//                 },
				//                 "__v": 0,
				//                 "file": "/uploads/ключи pdf.pdf"
				//             }
				//         },
				//         "privacyPolicy": {}
				//     }
				// }
				// setMaintain(data.settings.maintain);
				setVideosVisible(data.settings.videosVisible);

				const contactsData = data.contacts;
				setContacts({
					email: contactsData.email,
					phone: contactsData.phone,
					phoneIsVisible: contactsData.phoneIsVisible,
				});
				setMediaLinks(contactsData.mediaLinks)
				setBottomDocs(data.bottomDocs)
			})
			.catch((err) => {
				console.log(err)
			})
	}, []);

	const getSpotifyLink = () => {
		if (mediaLinks && mediaLinks.length) {
			const spotify = mediaLinks.find((link) => link.type === 'spotify');

			return spotify ? spotify.link : '';
		}
	}

	return (
		<div className="App">
			<Header
				videosVisible={videosVisible}
				mediaLinks={mediaLinks}
			/>
			<Switch>
				<Route exact path="/news" component={News}/>
				<Route exact path="/about" component={About}/>
				<Route exact path="/music" component={Music}/>
				<Route exact path="/photo" component={Photo}/>
				<Route exact path="/video" component={Video}/>
				<Route exact path="/"
				       render={(props) => (
					       <Home {...props} videosVisible={videosVisible} spotifyLink={getSpotifyLink()}/>
				       )}
				       />
				<Route path="*" component={NotFound} />
			</Switch>
			<Footer
				mediaLinks={mediaLinks}
				contacts={contacts}
				bottomDocs={bottomDocs}
			/>
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
					:
					<>
						<div className="bg-top-for-pages" />
					</>
			}
		</div>
	);
}

export default App;
