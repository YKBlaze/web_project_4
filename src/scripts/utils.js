const pageOverlay = document.querySelector(`.page__overlay`);

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
    pageOverlay.classList.remove('page__overlay_disabled');
}

export function closeModal(modalWindow) {
    document.removeEventListener('keyup' , closeByEscape);
    document.removeEventListener('click' , clickClose);
    modalWindow.classList.remove(`modal_opened`);
    pageOverlay.classList.add('page__overlay_disabled');
}
