import React from "react";
import {useTranslation} from "react-i18next";

import bg from "../../assets/images/bg-main-logo.png";

const MainInfo = (props) => {
	const { t, i18n } = useTranslation();
	const { scrollTo } = props;

	const onClickScroll = () => {
		scrollTo.current.scrollIntoView();
	}

	return (
		<section className="main-info section">
			<div className="section-item info">
				<h1 className="title">
					Drakon
				</h1>
				<p className="info-subtitle">
					One-man <span>black metal</span> band from South Ural.
				</p>
				<button className="info-btn" onClick={onClickScroll}>
					{t('Подробнее')}
				</button>
			</div>
			<div className="section-item image">
				<img src={bg} alt="drakon-logo" />
			</div>
		</section>
	)
}

export default MainInfo;
