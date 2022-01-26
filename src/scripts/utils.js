export function closeByEscape(evt){
    if(evt.key === "Escape"){
        const openedPopup  = document.querySelector('.modal_opened');
        closeModal(openedPopup);
    }
}

function clickClose(evt) {
    const page = document.querySelector('.page');
    const pageWrapper = document.querySelector('.page__wrapper');
    if ((evt.target === page)||(evt.target === pageWrapper)) {
      const openedPopup  = document.querySelector('.modal_opened');
      closeModal(openedPopup);
    }
}

export function openModal(modalWindow) {
    document.addEventListener('keyup', closeByEscape);
    document.addEventListener('click', clickClose);
    modalWindow.classList.add(`modal_opened`);
    document.querySelector('.page__overlay').classList.remove('page__overlay_disabled');
}

export function closeModal(modalWindow) {
    document.removeEventListener('keyup' , closeByEscape);
    document.removeEventListener('click' , clickClose);
    modalWindow.classList.remove(`modal_opened`);
    document.querySelector('.page__overlay').classList.add('page__overlay_disabled');
}

export const initialCards = [{
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    alt:  "Yosemite Valley"
},
{
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    alt:  "Lake Louise"
},
{
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    alt:  "Bald Mountains"
},
{
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    alt:  "Latemar"
},
{
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    alt:  "Vanoise National Park"
},
{
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
    alt:  "Lago di Braies"
}
];