const modalEditButton = document.querySelector(`.profile__edit-button`);
const modalAddButton = document.querySelector(`.profile__add-button`);
const pageOverlay = document.querySelector(`.page__overlay`);
const elements = document.querySelector(`.elements`);
const profileName = document.querySelector(`.profile__name`);
const profileAboutMe = document.querySelector(`.profile__about-me`);
const modalAdd = document.querySelector(`.modal_type_add-card`);
const modalEdit = document.querySelector(`.modal_type_edit-card`);
const modalImage = document.querySelector(`.modal_type_image-card`);
const modalName = modalEdit.querySelector(`.modal__name`);
const modalAboutMe = modalEdit.querySelector(`.modal__about-me`);
const modalTitle = modalAdd.querySelector(`.modal__name`);
const modalLink = modalAdd.querySelector(`.modal__about-me`);
const modalEditClose = modalEdit.querySelector(`.modal__close`);
const modalAddClose = modalAdd.querySelector(`.modal__close`);
const modalEditSubmit = modalEdit.querySelector(`.modal__save`);
const modalAddSubmit = modalAdd.querySelector(`.modal__save`);

const elementTemplate = document.querySelector(`#element`).content;
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
    createListener(modalWindow);
    clickClose(modalWindow);
    modalWindow.classList.remove(`modal_disabled`);
    pageOverlay.classList.remove('page__overlay_disabled');
}

function closeModal(modalWindow) {
    modalWindow.classList.add(`modal_disabled`);
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
    const initialCardsUpdated = [{
        name: "",
        link: "",
        alt: ""
    }];
    initialCardsUpdated.name = modalTitle.value;
    initialCardsUpdated.link = modalLink.value;
    initialCardsUpdated.alt = `Photo of ${modalTitle.value}`;
    initiateCard(initialCardsUpdated);
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

function createListener(modalWindow){
    document.addEventListener('keydown', function create(event){
        if(event.key === "Escape"){
            closeModal(modalWindow);
            document.removeEventListener('keydown', create);
        }
    });
}

function clickClose(modalWindow) {
    document.addEventListener('click', function create(event) {
        const page = document.querySelector('.page');
        const pageWrapper = document.querySelector('.page__wrapper');
        if ((event.target === page)||(event.target === pageWrapper)) {
          closeModal(modalWindow);
          document.removeEventListener('click', create);
        }
      });
}

initiateCards();
modalEditButton.addEventListener('click', () => {
    modalName.value = profileName.textContent; 
    modalAboutMe.value = profileAboutMe.textContent; 
    openModal(modalEdit);
  });
modalEditClose.addEventListener('click', () => closeModal(modalEdit))
modalAddButton.addEventListener('click', () => openModal(modalAdd));
modalAddClose.addEventListener('click', () => closeModal(modalAdd));
modalImage.querySelector(`.modal__image-close`).addEventListener('click', () => closeModal(modalImage));
modalAddSubmit.addEventListener('click', handleSaveForm);
modalEditSubmit.addEventListener('click', handleSubmitForm);