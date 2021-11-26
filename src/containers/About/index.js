import React from "react";
import {useTranslation} from "react-i18next";
import ScrollToTop from "../../components/ScrollToTop";

const About = () => {
	const { t } = useTranslation();

	return (
		<section className="page page-about">
			<ScrollToTop />
			<div className="section-header">
				<h3 className="small-header">
					{t('Пару слов')}
				</h3>
				<h2 className="big-header">
					{t('О группе')}
				</h2>
			</div>
			<div className="about-text">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus et dolor vitae lacinia. Nullam ultricies gravida lacus, nec porttitor ex semper et. Praesent eleifend luctus pellentesque. Morbi eleifend dolor sed cursus condimentum. Proin iaculis varius lacus, non fermentum neque faucibus eget. Integer quis odio placerat risus volutpat ornare non sit amet erat. Etiam et arcu dictum, hendrerit ipsum ut, ullamcorper tortor.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus et dolor vitae lacinia. Nullam ultricies gravida lacus, nec porttitor ex semper et. Praesent eleifend luctus pellentesque. Morbi eleifend dolor sed cursus condimentum. Proin iaculis varius lacus, non fermentum neque faucibus eget. Integer quis odio placerat risus volutpat ornare non sit amet erat. Etiam et arcu dictum, hendrerit ipsum ut, ullamcorper tortor.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus et dolor vitae lacinia. Nullam ultricies gravida lacus, nec porttitor ex semper et. Praesent eleifend luctus pellentesque. Morbi eleifend dolor sed cursus condimentum. Proin iaculis varius lacus, non fermentum neque faucibus eget. Integer quis odio placerat risus volutpat ornare non sit amet erat. Etiam et arcu dictum, hendrerit ipsum ut, ullamcorper tortor.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus et dolor vitae lacinia. Nullam ultricies gravida lacus, nec porttitor ex semper et. Praesent eleifend luctus pellentesque. Morbi eleifend dolor sed cursus condimentum. Proin iaculis varius lacus, non fermentum neque faucibus eget. Integer quis odio placerat risus volutpat ornare non sit amet erat. Etiam et arcu dictum, hendrerit ipsum ut, ullamcorper tortor.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus et dolor vitae lacinia. Nullam ultricies gravida lacus, nec porttitor ex semper et. Praesent eleifend luctus pellentesque. Morbi eleifend dolor sed cursus condimentum. Proin iaculis varius lacus, non fermentum neque faucibus eget. Integer quis odio placerat risus volutpat ornare non sit amet erat. Etiam et arcu dictum, hendrerit ipsum ut, ullamcorper tortor.
				</p>
			</div>
		</section>
	)
}

export default About;
