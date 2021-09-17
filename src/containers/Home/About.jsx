import React, {useEffect, useLayoutEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import drakon from '../../assets/images/bg-main-logo.png'
import moment from "moment";

import { getMembers as fetchMembers } from "../../helpers/backend-helper";
import Loader from "../../components/Spinner";
import {SERVER_PATH} from "../../common/serverPath";

const About = (props) => {
	const { t, i18n } = useTranslation();
	const [activeMember, setActiveMember] = useState(null);
	const [members, setMembres] = useState([]);
	const [loading, setLoading] = useState(true);
	const [size, setSize] = useState(window.innerWidth);

	const getMembers = () => {
		setLoading(true)
		fetchMembers()
			.then((data) => {
				setMembres(data);
				setLoading(false);
			})
	}

	useEffect(() => {
		getMembers()
	}, []);

	useEffect(() => {
		setActiveMember(members[0])
	}, [members]);

	useLayoutEffect(() => {
		function updateSize() {
			setSize(window.innerWidth);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	const renderMembers = () => {
		if (!members.length) {
			return;
		}
		return members.map((member) => {
			return (
				<figure className={`member${member === activeMember ? ' active' : ''}`}
				        onClick={() => setActiveMember(member)}
				        key={`member-figure-${members.indexOf(member)}`}
				>
					<div className="image">
						<img src={SERVER_PATH + member.file} alt={member.nickname} />
					</div>
					<figcaption className="name">
						<p>
							{member.name}
						</p>
						<div className="dot" />
					</figcaption>
				</figure>
			)
		})
	}

	const renderMembersMobile = () => {
		if (!members.length) {
			return;
		}
		let membersForRender;
		if (members.indexOf(activeMember) === 0) {
			membersForRender = members.slice(0, 2);
		} else if (members.indexOf(activeMember) === members.length - 1) {
			membersForRender = members.slice(members.length - 2)
		} else {
			membersForRender = members.slice(members.indexOf(activeMember) - 1, members.indexOf(activeMember) + 2);
		}
		const addMargin = (member) => {
			if (members.indexOf(member) === 0 && member === activeMember) {
				return ' margin-left'
			}
			if (members.indexOf(member) === members.length - 1 && member === activeMember) {
				return ' margin-right'
			}
			return ''
		}
		return membersForRender.map((member) => {
			return (
				<figure className={`member${addMargin(member)}${member === activeMember ? ' active' : ''}`}
				        onClick={() => setActiveMember(member)}
				        key={`member-in-members-list-${members.indexOf(member)}`}
				>
					<div className="image">
						<img src={SERVER_PATH + member.file} alt={member.nickname} />
					</div>
					<figcaption className="name">
						<p>
							{member.name}
						</p>
						<div className="dot" />
					</figcaption>
				</figure>
			)
		})

	}

	return (
		<section className="about">
			<div className="section-header">
				<h2 className="section-title">
					{t('О группе')}
				</h2>
			</div>
			<div className="main-info">
				<div className="info">
					<div className="image">
						<img src={drakon} alt="Drakon" />
					</div>
					<p className="text">
						Цитадель - московский Heavy Metal проект, выделяющийся мощной подачей, сильными текстами и яркими живыми выступлениями! Группа Цитадель, как старый добрый дом, под сводом которого собрались, спустя десятилетие, старые друзья, прошедшие долгий и тернистый путь, приобретя новый жизненный опыт. С одной стороны, различие, с другой стороны, единомыслие внутри коллектива и стало продолжением истории группы Цитадель, после длительного перерыва. Мы будем строить новые, крепкие крепостные стены тяжелого рока. Поднимем знамя честной музыки. Мы рады приветствовать Всех, кто присоединится и станет стражником нашей Цитадели. Не мы придумали Heavy-Metal, но мы его сохраним и приумножим!!!
					</p>
				</div>
				{
					!activeMember ?
						<Loader /> :
						<div className="member" style={{ backgroundImage: `url("${SERVER_PATH + activeMember.file}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
							<div className="member-left-block">
								<p className="nickname">
									{activeMember.nickname}
								</p>
								<ul className="perks">
									{
										activeMember.perks.map((perk) => (
											<li className="perk" key={`perk-${activeMember.perks.indexOf(perk)}`}>
												&#8212; {perk}
											</li>
										))
									}
								</ul>
							</div>
							<div className="member-right-block">
								<p className="name">
									{activeMember.name}
								</p>
								<p className="birth">
									{moment(activeMember.birthday).format('DD.MM.YYYY')}
								</p>
							</div>
						</div>
				}
			</div>
			{
				members.length ?
					<div className="slider-container">
						<div className="slider">
							{
								size > 704 ?
									renderMembers() :
									renderMembersMobile()
							}
						</div>
					</div> :
					null
			}

		</section>
	)
}

export default About;
