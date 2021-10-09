import {get, post} from "./api_helper"
import * as url from "./url_helper"
import i18n from "i18next";

export const getNews = () => get(url.GET_NEWS.replace(':lang', i18n.language))

export const getMembers = () => get(url.GET_MEMBERS)

export const getPhotos = () => get(url.GET_PHOTOS)

export const getVideos = () => get(url.GET_VIDEOS)

export const getMusic = () => get(url.GET_MUSIC)

export const getAbout = () => get(url.GET_ABOUT.replace(':lang', i18n.language))

export const sendFeedback = (data) => post(url.POST_EMAIL, data)
