import React from "react";
import {useTranslation} from "react-i18next";

const Pagination = (props) => {
	const { callbackNext, callbackPrev, pagesCount, activePage } = props;
	const { t } = useTranslation();

	const onCallbackPrev = () => {
		window.scrollTo(0, 0);
		callbackPrev()
	}
	const onCallbackNext = () => {
		window.scrollTo(0, 0);
		callbackNext()
	}

	const renderPages = () => {
		let amount = [];
		for (let i = 1; i <= pagesCount; i++) {
			amount.push(i)
		}

		return amount.map((index) => {
			return (
				<div key={`pagination-page-${index}`} className={`page-element ${activePage === index ? 'active' : ''}`} />
			)
		})
	}

	return (
		<div className="pagination">
			<div className="pages-counter">
				{renderPages()}
			</div>
			<div className="buttons-block">
				<button
					className="button prev"
					onClick={() => onCallbackPrev()}
					disabled={activePage === 1}
				>
					{t('Назад')}
				</button>
				<button
					className="button next"
					onClick={() => onCallbackNext()}
					disabled={activePage >= pagesCount}
				>
					{t('Далее')}
				</button>
			</div>
		</div>
	)
}

export default Pagination;
