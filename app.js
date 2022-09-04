

// zoom
const pageContent = document.querySelector('.page-content');
// запрет body увеличивать высоту body больше чем содержимое сайта
const content = document.querySelector('#main');
// получаем Body из DOM
const bodyNode = document.body || document.getElementsByTagName('body')[0];
const zoom = (page) => {
    if (window.innerWidth < 1024) {
        return null
    }
    // Ограничение высоты body
    bodyNode.style.height = `${content.offsetHeight * (window.innerWidth / 1024)}px`;
    page.style.transform = `scale(${window.innerWidth / 1024})`;
    page.style.transformOrigin = "center 0";

}   

zoom(pageContent)

window.addEventListener('resize', () => {zoom(pageContent)})



// tikers
const tickers = document.querySelectorAll('.ticker');


window.onscroll = () => {
    tickers.forEach((ticker) => {
        if(isElementInViewport(ticker)) setTicker(ticker)
    })
}


// бегущая строка (ticker)
function setTicker(ticker){
    let tickerY = ticker.getBoundingClientRect().top + ticker.scrollTop;
    ticker.style.transform = "matrix(1, 0, 0, 1, "+tickerY+", 0)";
}

// функция проверка элемента в зоне видимости
function isElementInViewport(elem){
    let rect = elem.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    )
}

function isElementInViewportCenter(elem){
    let rect = elem.getBoundingClientRect();
    return (
        (rect.bottom - (rect.height / 2)) <= ((window.innerHeight || document.documentElement.clientHeight) / 2)
    )
}


// GSAP + scrollMagic + smoothScroll

// Анимация аватара Марьяна 
const avaAnimated = document.querySelector('#avatar');
const avaBefore = document.querySelector('#dialogAnimBlockBefore');

gsap.registerPlugin(ScrollTrigger)

if (window.innerWidth < 600) {
    gsap.to(avaAnimated, {
        scrollTrigger: {
            trigger: avaAnimated,
            start: "center center",
            end: "center 15%",
            scrub: 0.2,
        }, 
        y: () => `+=${165 + avaBefore.offsetHeight}`,
        scale: 0.24,
        ease: "none",
        duration: 3
    })
} else{
    gsap.to(avaAnimated, {
        scrollTrigger: {
            trigger: avaAnimated,
            start: "center center",
            end: "center 15%",
            scrub: 0.2,
        }, 
        x: -208,
        y: 171, 
        scale: 0.16,
        ease: "none",
        duration: 3
    })
}



// Машина скорой помощи что выезжает сбоку с мигалкой
const car = document.querySelector('#carAnim');

gsap.fromTo(car,  {
    x: "550",
},
{
    scrollTrigger: {
        trigger: car,
        start: "center bottom",
        end: "center center",
        scrub: 0.1,
    }, 
    x: 0,
})

gsap.fromTo(car,  {
    x: 0,
},
{
    scrollTrigger: {
        trigger: car,
        start: "center 15%",
        end: "center top",
        scrub: 0.1,
    }, 
    x: -600,
})

// Голова миры в итогах 
const mira = document.querySelector('#miraHead');
const miraContainer = document.querySelector('#miraContainer');


if (window.innerWidth >= 600) {
    gsap.fromTo(mira, {opacity: 0}, {
        scrollTrigger: {
            trigger: miraContainer,
            start: "top center",
            end: "bottom center",
            scrub: 0.1,
        }, 
        opacity: 10,
        y: () => `+=${miraContainer.offsetHeight - mira.offsetHeight}`,
        ease: 'linear'
    })
}



// Анимация разговора с репликами
const man1 = document.querySelector('#talk-1');
const man2 = document.querySelector('#talk-2');
const talkBox = document.querySelector('#talk');
const talking = document.querySelector('#talkText');
const speechs = talking.querySelectorAll('.talk__speech');

// При ширине ниже 600 мужики видны сразу
if (window.innerWidth < 600) {
    // Первый мужчина
    gsap.to(man1, {
        scrollTrigger: {
            trigger: talkBox,
            start: "top center",
            end: "bottom center",
            scrub: 0.1,
        }, 
        y: () => `+=${talkBox.offsetHeight - man1.offsetHeight}`,
        ease: 'linear'
    })
    // Второй мужчина
    gsap.to(man2, {
        scrollTrigger: {
            trigger: talkBox,
            start: "top center",
            end: "bottom center",
            scrub: 0.1,
        },
        y: () => `+=${talkBox.offsetHeight - man2.offsetHeight}`,
        ease: 'linear'
    })
} else{
    // При ширине больше 600 мужики появляются плавно из opacity: 0
        // Первый мужчина
    gsap.fromTo(man1, {opacity: 0}, {
        scrollTrigger: {
            trigger: talkBox,
            start: "top center",
            end: "bottom center",
            scrub: 0.1,
        }, 
        opacity: 10,
        y: () => `+=${talkBox.offsetHeight - man1.offsetHeight}`,
        ease: 'linear'
    })
    // Второй мужчина
    gsap.fromTo(man2, {opacity: 0}, {
        scrollTrigger: {
            trigger: talkBox,
            start: "top center",
            end: "bottom center",
            scrub: 0.1,
        }, 
        opacity: 10,
        y: () => `+=${talkBox.offsetHeight - man2.offsetHeight}`,
        ease: 'linear'
    })
}


// Сам разговор

// реплики видны сразу при ширине больше 600px 
if (window.innerWidth >= 600) {
    speechs.forEach(speech => gsap.fromTo(speech, {opacity: 0}, {
        scrollTrigger: {
            trigger: speech,
            start: "top center",
            end: "bottom center",
            scrub: 0.1,
        }, 
        opacity: 1,
        ease: 'linear'
    }))
}


