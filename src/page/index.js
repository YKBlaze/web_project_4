import "./index.css";
import FormValidator from "../components/FormValidator.js";
import { initialCards, formSettings} from "../utils/utils.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";


const modalEditButton = document.querySelector(`.profile__edit-button`);
const modalAddButton = document.querySelector(`.profile__add-button`);
const modalAddElement = document.querySelector(`.modal_type_add-card`);
const modalEditElement = document.querySelector(`.modal_type_edit-card`);
const profileName = document.querySelector(`#title`);
const profileAboutMe = document.querySelector(`#about`);
const elementTemplate = document.querySelector(`#element`).content;


const modalImage = new PopupWithImage('.modal_type_image-card');
modalImage.setEventListeners();

const modalAdd = new PopupWithForm(`.modal_type_add-card`, (data) => {
    const initialCardsUpdated = {
        name: "",
        link: "",
        alt: ""
    };
    initialCardsUpdated.name = data.title;
    initialCardsUpdated.link = data['image-link'];
    initialCardsUpdated.alt = `Photo of ${data['image-link']}`;
    createCard(initialCardsUpdated);
    modalAdd.close();
});
modalAdd.setEventListeners();

const modalEdit = new PopupWithForm(`.modal_type_edit-card`, (data) => {
    userData.setUserInfo(data);
    modalEdit.close();
});

modalEdit.setEventListeners();

const userData = new UserInfo({
    name: '.profile__name', job: '.profile__about-me'
});

const initialCardsRender = new Section({items: initialCards, renderer: (element)=>{
    createCard(element);
}}, ".elements");
initialCardsRender.renderItems();



modalEditButton.addEventListener('click', () => {
    const data = userData.getUserInfo();
    profileName.value = data.name;
    profileAboutMe.value = data.job;
    modalEdit.open();
    editCardValidator.resetValidation();
  });

modalAddButton.addEventListener('click', () =>{
    modalAdd.open();
    addCardValidator.resetValidation();
});


const editCardValidator = new FormValidator(formSettings, modalEditElement);
editCardValidator.enableValidation();
const addCardValidator = new FormValidator(formSettings, modalAddElement);
addCardValidator.enableValidation();

function createCard(InitialCards) {
    const card = new Card(InitialCards, elementTemplate, modalImage.open)
    initialCardsRender.addItem(card.render());
}