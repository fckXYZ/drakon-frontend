import React from "react";
import {useTranslation} from "react-i18next";

import bg from "../../assets/images/bg-main-logo.png";
import {Link} from "react-router-dom";

const MainInfo = (props) => {
	const { t, i18n } = useTranslation();
	const { scrollTo } = props;

	const onClickScroll = () => {
		scrollTo.current.scrollIntoView();
	}

	return (
		<section className="main-info section">
			<div className="section-item info">
				<p className="text">
					<span>BAND</span> FROM SOUTH URAL
				</p>
				<p className="info-subtitle">
					<span>One-Man</span><br/>Black Metal Band
				</p>
				<div className="buttons-block">
					<Link to="/music">
						<button className="albums-btn">
							{t('Дискография')}
						</button>
					</Link>
					<button className="info-btn" onClick={onClickScroll}>
						{t('Подробнее')}
					</button>
				</div>
			</div>
			<div className="image" />
		</section>
	)
}

export default MainInfo;
