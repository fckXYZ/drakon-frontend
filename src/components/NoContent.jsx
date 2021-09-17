import React from "react";
import {useTranslation} from "react-i18next";

const NoContent = (props) => {
	const { t } = useTranslation();
	const { contentName } = props;

	return(
		<div className="no-content">
			<p>{t(`Нет`)} {contentName}...</p>
		</div>
	)
}

export default NoContent;
