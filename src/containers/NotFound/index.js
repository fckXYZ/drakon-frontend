import React from "react";
import {useTranslation} from "react-i18next";

const NotFound = () => {
	const { t } = useTranslation();

	return(
		<div className="section not-found">
			<div className="logo" />
			<h2 className="title">
				{t('Страница не найдена!')}
			</h2>
		</div>
	)
}

export default NotFound;
