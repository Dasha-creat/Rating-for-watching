import { phone, mail, global, telegram, vk } from '../../shared/assets/index'

export const CDT = [
    {title: "ИТхаб-Екатеринбург"},
    {title: "Екатеринбург, Чкалова 3"}
  ]

export const workingHours = [
    {day: "Пн-Пт:", time: "8:00-19:00"},
    {day: "Сб:", time: "9:00-18:00"},
    {day: "Вс:", time: "закрыто"}
  ]

export const contacts = [
    {imgSrc: phone, text: "+7-343-286-7859"},
    {imgSrc: mail, text: "priem.ekat@ithub.ru"},
    {imgSrc: global, text: "ekat.ithub.ru", href: "https://ekat.ithub.ru/"}
  ]

export const socialMedia = [
    {type: "telegram", imgSrc: telegram, text: "Eka_BIT", href: "https://t.me/Eka_BIT"},
    {type: "vk", imgSrc: vk, text: "ithub.ekat", href: "https://vk.com/itcollege"}
  ]