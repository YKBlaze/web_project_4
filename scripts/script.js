const modalEditButton = document.querySelector(`.profile__edit-button`);
const modalAddButton = document.querySelector(`.profile__add-button`);
const pageOverlay = document.querySelector(`.page__overlay`);
const elements = document.querySelector(`.elements`);
const page = document.querySelector(`.page__wrapper`);
const profileName = document.querySelector(`.profile__name`);
const profileAboutMe = document.querySelector(`.profile__about-me`);
const modals = [
  {
    title: "Edit Profile",
    identifier: "edit-profile",
    inputName: "Name",
    inputValue: "About-me",
    error: "Characters limit exceeded",
    submit: "Save"
  },
  {
    title: "New Place",
    identifier: "new-place",
    inputName: "Title",
    inputValue: "Image URL",
    error: "Invalid title or URL",
    submit: "Create"
  }
];
const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
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
function initiateModals(){
  for (let i = 0; i <modals.length; i++)
  {
    const modalTemplate = document.querySelector(`#modal`).content;
    const modal = modalTemplate.querySelector('.modal').cloneNode(true);
    const modalInputName = modal.querySelector('.modal__name');
    const modalInputValue = modal.querySelector('.modal__about-me');
    const modalTitle = modal.querySelector('.modal__title');
    const modalButton = modal.querySelector('.modal__save');
    const modalError = modal.querySelector('.modal__error');
    modalButton.disabled = true;
    modalTitle.textContent = modals[i].title; 
    modalError.textContent = modals[i].error;
    modalInputName.textContent = modals[i].inputName;
    modalInputValue.textContent = modals[i].inputValue;
    modalInputName.placeholder = modals[i].inputName;
    modalInputValue.placeholder = modals[i].inputValue;
    modalButton.textContent = modals[i].submit;
    modal.id = "modal__" + modals[i].identifier;
    page.append(modal);
  }
}
function initiateImagePopUp(num){
  const imagePopUpTemplate = document.querySelector(`#image-popup`).content;
  const imagePopUp = imagePopUpTemplate.querySelector('.image-popup').cloneNode(true);
  imagePopUp.querySelector('.image-popup__image').src = initialCards[num].link;
  imagePopUp.querySelector('.image-popup__footer').textContent = initialCards[num].name;
  imagePopUp.querySelector('.image-popup__close').disabled = true;
  imagePopUp.querySelector('.image-popup__close').addEventListener('click', (evt) => {
    imagePopUp.classList.add('image-popup_disabled');
    pageOverlay.classList.add('page__overlay_disabled');
    imagePopUp.querySelector('.image-popup__close').disabled = true;
  })
  imagePopUp.id = "image-popup-" + (num+1);
  return page.prepend(imagePopUp);
}
function initiateCard(num){
    const elementTemplate = document.querySelector(`#element`).content;
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
    const identifier = "#image-popup-" + (num+1);
    initiateImagePopUp(num);
    elementCard.id = "element-" + (num + 1);
    elementCard.querySelector(`.element__title`).textContent = initialCards[num].name;
    elementCard.querySelector('.element__image').src = initialCards[num].link;
    elementCard.querySelector('.element__like-button').addEventListener('click',(evt) =>{
      const eventTarget = evt.target;
      eventTarget.classList.toggle(`element__like-button_active`);
      });
    elementCard.querySelector('.element__delete-button').addEventListener('click',() =>{
      elementCard.remove();
    })
    elementCard.querySelector('.element__image-button').addEventListener('click',(evt) =>{
      const imagePopUp = document.querySelector(identifier);
      imagePopUp.classList.remove('image-popup_disabled');
      imagePopUp.querySelector('.image-popup__close').disabled = false;
      pageOverlay.classList.remove('page__overlay_disabled');
    });
    
    return elements.prepend(elementCard);
}
function initiateCards(){
   for (let i = 0; i < initialCards.length; i++)
   {
    initiateCard(i);
   }
}
function handleEnter(evt) {
  const modalSave = document.querySelector('.modal__save');
    if (evt.keyCode === 13) {
      evt.preventDefault();
      modalSave.click();
      console.log(page);
      page.removeEventListener('keyup', handleEnter);
    }
}
function openEditForm(evt){
  const modalEditOpen = document.querySelector(`#modal__edit-profile`);
  const modalClose = modalEditOpen.querySelector('.modal__close');
  const modalSave = modalEditOpen.querySelector('.modal__save');
  const modalName = modalEditOpen.querySelector(`.modal__name`);
  const modalAboutMe = modalEditOpen.querySelector(`.modal__about-me`);
  const modalError = modalEditOpen.querySelector(`.modal__error`);
  pageOverlay.classList.remove('page__overlay_disabled');
  modalSave.disabled = false;
  modalEditOpen.classList.remove('modal_disabled');
  modalName.value = profileName.textContent;
  modalAboutMe.value = profileAboutMe.textContent;
  page.addEventListener('keyup', handleEnter);
  modalClose.addEventListener('click',(evt) => {modalEditOpen.classList.add('modal_disabled'); pageOverlay.classList.add('page__overlay_disabled'); modalSave.disabled = true;});
  modalSave.addEventListener('click', function handleEditSubmit(evt) {
    evt.preventDefault();
    if (modalName.value.length < 23 && modalAboutMe.value.length < 45) {
        profileName.innerText = modalName.value;
        profileAboutMe.innerText = modalAboutMe.value;
        modalEditOpen.classList.add('modal_disabled');
        modalSave.disabled = true;
        pageOverlay.classList.add('page__overlay_disabled');
    }
    else {
    return modalError.classList.remove('modal__error_disabled');
    }
  });

}
function openCreateForm(evt) {
  const modalAddOpen = document.querySelector(`#modal__new-place`);
  pageOverlay.classList.remove('page__overlay_disabled');
  const modalClose = modalAddOpen.querySelector('.modal__close');
  const modalSave = modalAddOpen.querySelector('.modal__save');
  const modalName = modalAddOpen.querySelector(`.modal__name`);
  const modalAboutMe = modalAddOpen.querySelector(`.modal__about-me`);
  const modalError = modalAddOpen.querySelector(`.modal__error`);
  modalName.value = "";
  modalAboutMe.value = "";
  modalError.classList.add('modal__error_disabled');
  modalSave.disabled = false;
  modalAddOpen.classList.remove('modal_disabled');
  modalClose.addEventListener('click',(evt) => {modalAddOpen.classList.add('modal_disabled'); pageOverlay.classList.add('page__overlay_disabled'); modalSave.disabled = true;});
  modalSave.addEventListener('click', function handleAddSubmit(evt) {
    evt.preventDefault(); 
    if (modalName.value.length > 0 && modalName.value.length < 70 && modalAboutMe.value.length > 0) {
       const initialCardsUpdated = [
      {
        name: "",
        link: ""
      }
    ];
      initialCardsUpdated.name = modalName.value;
      initialCardsUpdated.link = modalAboutMe.value;
      initialCards.push(initialCardsUpdated);
      modalAddOpen.classList.add('modal_disabled');
      pageOverlay.classList.add('page__overlay_disabled');
      initiateCard(initialCards.length-1);
      modalSave.disabled = true;
    }
    else{
    return modalError.classList.remove('modal__error_disabled');
    }
    evt.stopImmediatePropagation();
  });
}
initiateCards();
initiateModals();
modalEditButton.addEventListener('click', openEditForm);
modalAddButton.addEventListener('click', openCreateForm);
