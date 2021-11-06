import React from "react";
import ReactDOM from "react-dom";

// @ts-ignore
import {App} from "./react/app";

import "./style.scss"

export const react = ReactDOM.render(
    <App/>,
    document.getElementById("root")
)

// <________________________________________________________________________________>

const options = {rootMargin: "-150px"};

const addFadeInClass = (entry) => {
    if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in__start")
    }
}

const callbackFideIn = (entries) => {
    entries.forEach(addFadeInClass)
}

const observerFideIn = new IntersectionObserver(callbackFideIn, options);

const fadeItems = document.querySelectorAll('.animate-fade-in');

const setObserverFideIn = (i) => {
    observerFideIn.observe(i)
}

fadeItems.forEach(setObserverFideIn);

// <________________________________________________________________________________>


const header = document.querySelector(".header");

const parallaxUpItems = document.querySelectorAll(".animate-parallax-up");
const parallaxDownItems = document.querySelectorAll(".animate-parallax-down");

window.addEventListener("scroll", () => {

    const scrollOffset = window.pageYOffset;

    if (scrollOffset > 50) {
        header.classList.add("header__fixed");
    } else {
        header.classList.remove("header__fixed");
    }

    parallaxUpItems.forEach((item) => {
        const box = item.getBoundingClientRect();

        const value = (box.top);

        // console.log(value, item.parentNode.classList[0])
        item.style.top = value * 0.1 + "px";
    })

    parallaxDownItems.forEach((item) => {
        const box = item.getBoundingClientRect();

        const value = box.top;

        item.style.top = -value * 0.1 + "px";
    })
})

//<________________________________________________________________________________>


const menuItems = document.querySelectorAll(".anchor-item");

const setListener = (menuItem) => {
    menuItem.addEventListener('click', (e) => {
        e.preventDefault();

        const blockId = menuItem.href.replace(/[\w, \W](?=[\w, \W]*#)/gy, "");
        const block = document.querySelector(blockId);

        block.scrollIntoView({block: "start", behavior: "smooth"})
    })
}

menuItems.forEach(setListener);
