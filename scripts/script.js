const modalEditButton = document.querySelector(`.profile__edit-button`);
const modalAddButton = document.querySelector(`.profile__add-button`);
const pageOverlay = document.querySelector(`.page__overlay`);
const elements = document.querySelector(`.elements`);
const profileName = document.querySelector(`.profile__name`);
const profileAboutMe = document.querySelector(`.profile__about-me`);
const modalAdd = document.querySelector(`.modal_type_add-card`);
const modalSubmitButton = modalAdd.querySelector('.modal__save');
const modalEdit = document.querySelector(`.modal_type_edit-card`);
const modalImage = document.querySelector(`.modal_type_image-card`);
const modalName = modalEdit.querySelector(`.modal__name`);
const modalAboutMe = modalEdit.querySelector(`.modal__about-me`);
const modalTitle = modalAdd.querySelector(`.modal__name`);
const modalLink = modalAdd.querySelector(`.modal__about-me`);
const modalEditSubmit = modalEdit.querySelector(`.modal__save`);
const modalAddSubmit = modalAdd.querySelector(`.modal__save`);
const elementTemplate = document.querySelector(`#element`).content;
const closeButtons = document.querySelectorAll(`.modal__close`);

const initialCards = [{
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

function openModal(modalWindow) {
    document.addEventListener('keyup', createListener);
    document.addEventListener('click', clickClose);
    document.addEventListener('keyup', clickEnter);
    modalWindow.classList.add(`modal_opened`);
    pageOverlay.classList.remove('page__overlay_disabled');
}

function closeModal(modalWindow) {
    document.removeEventListener('keyup' , createListener);
    document.removeEventListener('click' , clickClose);
    document.removeEventListener('keyup' , clickEnter);
    modalWindow.classList.remove(`modal_opened`);
    pageOverlay.classList.add('page__overlay_disabled');
}

function handleSubmitForm(evt) {
    evt.preventDefault();
    profileName.innerText = modalName.value;
    profileAboutMe.innerText = modalAboutMe.value;
    closeModal(modalEdit);
}

function handleSaveForm(evt) {
    evt.preventDefault();   
    const initialCardsUpdated = {
        name: "",
        link: "",
        alt: ""
    };
    initialCardsUpdated.name = modalTitle.value;
    initialCardsUpdated.link = modalLink.value;
    initialCardsUpdated.alt = `Photo of ${modalTitle.value}`;
    initiateCard(initialCardsUpdated);
    modalTitle.value = "";
    modalLink.value ="";
    modalSubmitButton.disabled = true;
    modalSubmitButton.classList.add('modal__save_disabled');
    closeModal(modalAdd);
}

function initiateCard(card) {
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
    elementCard.querySelector(`.element__title`).textContent = card.name;
    elementCard.querySelector('.element__image').src = card.link;
    elementCard.querySelector('.element__image').alt = card.name;
    elementCard.querySelector('.element__like-button').addEventListener('click', (evt) => {
        const eventTarget = evt.target;
        eventTarget.classList.toggle(`element__like-button_active`);
    });
    elementCard.querySelector('.element__delete-button').addEventListener('click', (evt) => {
        elementCard.remove();
    });
    elementCard.querySelector('.element__image-button').addEventListener('click', (evt) => {
        modalImage.querySelector(`.modal__image`).src = card.link;
        modalImage.querySelector(`.modal__image`).alt = card.alt;
        modalImage.querySelector(`.modal__footer`).textContent = card.name;
        openModal(modalImage);
    });
    return renderCard(elementCard);
}

function initiateCards() {
    for (let i = 0; i < initialCards.length; i++) {
        initiateCard(initialCards[i]);
    }
}

function renderCard(card){
    elements.prepend(card);
}

function createListener(evt){
    const openedPopup  = document.querySelector('.modal_opened');
    if(evt.key === "Escape"){
        closeModal(openedPopup);
    }
}

function clickClose(evt) {
        const openedPopup  = document.querySelector('.modal_opened');
        const page = document.querySelector('.page');
        const pageWrapper = document.querySelector('.page__wrapper');
        if ((evt.target === page)||(evt.target === pageWrapper)) {
          closeModal(openedPopup);
        }
}
function clickEnter(evt) {
        if (evt.key === "Enter"){
        const openedPopup  = document.querySelector('.modal_opened');
        const modalWindowButton = openedPopup.querySelector('.modal__save');
        if (!modalWindowButton.disabled){
            modalWindowButton.click();
        }
      }
}

initiateCards();
modalEditButton.addEventListener('click', () => {
    modalName.value = profileName.textContent; 
    modalAboutMe.value = profileAboutMe.textContent; 
    openModal(modalEdit);
  });

modalSubmitButton.disabled = true;
modalSubmitButton.classList.add('modal__save_disabled');
modalAddButton.addEventListener('click', () => openModal(modalAdd));
modalAddSubmit.addEventListener('click', handleSaveForm);
modalEditSubmit.addEventListener('click', handleSubmitForm);
closeButtons.forEach(button => { 
    button.addEventListener('click', () => {
       const myModal = button.closest('.modal');
       closeModal(myModal);
})});