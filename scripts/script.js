const modalEditButton = document.querySelector(`.profile__edit-button`);
const modalAddButton = document.querySelector(`.profile__add-button`);
const pageOverlay = document.querySelector(`.page__overlay`);
const elements = document.querySelector(`.elements`);
const page = document.querySelector(`.page__wrapper`);
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
const initialCards = [{
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

function openModal(modalWindow) {
    if (modalWindow.classList.contains("modal_type_edit-card")) {
        modalName.value = profileName.textContent;
        modalAboutMe.value = profileAboutMe.textContent;
    }
    modalWindow.classList.toggle(`modal_disabled`);
    pageOverlay.classList.toggle('page__overlay_disabled');
}

function closeModal(modalWindow) {
    modalWindow.classList.toggle(`modal_disabled`);
    pageOverlay.classList.toggle('page__overlay_disabled');
}

function handleSubmitForm(evt) {
    evt.preventDefault();
    profileName.innerText = modalName.value;
    profileAboutMe.innerText = modalAboutMe.value;
    closeModal(modalEdit);
}

function handleSaveForm(evt) {
    const initialCardsUpdated = [{
        name: "",
        link: ""
    }];
    initialCardsUpdated.name = modalTitle.value;
    initialCardsUpdated.link = modalLink.value;
    initialCards.push(initialCardsUpdated);
    initiateCard(initialCards.length - 1);
    closeModal(modalAdd);
}

function initiateCard(card) {
    const elementTemplate = document.querySelector(`#element`).content;
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
    elementCard.querySelector(`.element__title`).textContent = initialCards[card].name;
    elementCard.querySelector('.element__image').src = initialCards[card].link;
    elementCard.querySelector('.element__image').alt = initialCards[card].name;
    elementCard.querySelector('.element__like-button').addEventListener('click', (evt) => {
        const eventTarget = evt.target;
        eventTarget.classList.toggle(`element__like-button_active`);
    });
    elementCard.querySelector('.element__delete-button').addEventListener('click', (evt) => {
        elementCard.remove();
    });
    elementCard.querySelector('.element__image-button').addEventListener('click', (evt) => {
        modalImage.querySelector(`.modal__image`).src = initialCards[card].link;
        modalImage.querySelector(`.modal__image`).alt = initialCards[card].alt;
        modalImage.querySelector(`.modal__footer`).textContent = initialCards[card].name;
        openModal(modalImage);
    });
    return elements.prepend(elementCard);
}

function initiateCards() {
    for (let i = 0; i < initialCards.length; i++) {
        initiateCard(i);
    }
}
initiateCards();
modalEditButton.addEventListener('click', () => openModal(modalEdit));
modalEditClose.addEventListener('click', () => closeModal(modalEdit))
modalAddButton.addEventListener('click', () => openModal(modalAdd));
modalAddClose.addEventListener('click', () => closeModal(modalAdd));
modalImage.querySelector(`.modal__image-close`).addEventListener('click', () => closeModal(modalImage));
modalAddSubmit.addEventListener('click', handleSaveForm);
modalEditSubmit.addEventListener('click', handleSubmitForm);