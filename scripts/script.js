import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { openModal, closeModal} from "./utils.js";
const modalEditButton = document.querySelector(`.profile__edit-button`);
const modalAddButton = document.querySelector(`.profile__add-button`);
const elements = document.querySelector(`.elements`);
const profileName = document.querySelector(`.profile__name`);
const profileAboutMe = document.querySelector(`.profile__about-me`);
const modalAdd = document.querySelector(`.modal_type_add-card`);
const modalSubmitButton = modalAdd.querySelector('.modal__save');
const modalEdit = document.querySelector(`.modal_type_edit-card`);
const modalName = modalEdit.querySelector(`.modal__name`);
const modalAboutMe = modalEdit.querySelector(`.modal__about-me`);
const modalTitle = modalAdd.querySelector(`.modal__name`);
const modalLink = modalAdd.querySelector(`.modal__about-me`);
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
    closeModal(modalAdd);
}

function initiateCard(data) {
    prependCard(data);
}

function prependCard(data) {
    const card = new Card(data, elementTemplate);
    elements.prepend(card.render());
}

initialCards.forEach((data) => {
    prependCard(data);
})


modalEditButton.addEventListener('click', () => {
    modalName.value = profileName.textContent; 
    modalAboutMe.value = profileAboutMe.textContent; 
    openModal(modalEdit);
    editCard.resetValidation();
  });

modalAddButton.addEventListener('click', () =>{
    openModal(modalAdd);
    addCard.resetValidation();
}) 
modalAdd.addEventListener('submit', handleSaveForm);
modalEdit.addEventListener('submit', handleSubmitForm);
closeButtons.forEach(button => { 
    button.addEventListener('click', () => {
       const myModal = button.closest('.modal');
       closeModal(myModal);
})});


const formSettings = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save",
    inactiveButtonClass: "modal__save_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  }

const editCard = new FormValidator(formSettings, modalEdit);
editCard.enableValidation();
const addCard = new FormValidator(formSettings, modalAdd);
addCard.enableValidation();