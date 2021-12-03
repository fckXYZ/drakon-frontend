import React from "react";
import moment from 'moment';
import {SERVER_PATH} from "../../common/serverPath";

const Slide = (props) => {

	const { image, title, date, preview } = props;

	return (
			<div className="news-article">
				<div className="image-container">
					<img src={SERVER_PATH + image} alt={title} />
				</div>
				<h3 className="article-title">
					{title}
				</h3>
				<p className="article-date">
					{moment(date).format('DD MMM YYYY')}
				</p>
				{
					preview.length > 160 ?
						<p className="article-text">
							{preview.substr(0, 160)}&hellip;
						</p>
						:
						<p className="article-text">
							{preview}
						</p>
				}
			</div>
	)
}

export default Slide;
