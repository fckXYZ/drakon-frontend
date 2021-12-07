import React, {useEffect, useState} from "react";
import i18n from "i18next";

const Lang = () => {
	const [selectedLang, setSelectedLang] = useState("")

	useEffect(() => {
		const currentLanguage = localStorage.getItem("I18N_LANGUAGE")
		setSelectedLang(currentLanguage)
	}, [])

	const changeLanguageAction = (lang) => {
		i18n.changeLanguage(lang)
		localStorage.setItem("I18N_LANGUAGE", lang)
		setSelectedLang(lang)
	}

	const toggleLang = () => {
		if (selectedLang === 'ru') {
			changeLanguageAction('en')
		} else {
			changeLanguageAction('ru')
		}
	}

	return (
		<div className={`lang ${selectedLang}`} onClick={toggleLang}>
		</div>
	)
}

export default Lang;
