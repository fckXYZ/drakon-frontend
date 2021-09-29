import React from "react";
import moment from 'moment';
import {useTranslation} from "react-i18next";

const Slide = (props) => {

	const { t, i18n } = useTranslation();
	const { image, alt, title, date, subtitle, preview, openModal } = props;

	return (
		<div className="slide">
			<div className="image">
				<img src={image} alt={alt} />
			</div>
			<div className="info">
				<div className="top-block">
					<h2 className="title">
						{title}
					</h2>
					<p className="date">
						{moment(date).locale(i18n.language).format('MMMM DD')}
					</p>
				</div>
				<h3 className="subtitle">
					{subtitle}
				</h3>
				<div className="date-tablet-wrapper">
					<p className="date-tablet">
						{moment(date).locale(i18n.language).format('MMMM')}
					</p>
					<p className="date-tablet">
						{moment(date).locale(i18n.language).format('DD')}
					</p>
				</div>
				<p className="preview" dangerouslySetInnerHTML={{ __html: preview }}>
				</p>
				<button className="button" onClick={openModal}>
					{t('Подробнее')}
				</button>
			</div>
		</div>
	)
}

export default Slide;
