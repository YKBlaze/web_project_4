const modal = document.querySelector(`.modal`);
const modalEditButton = document.querySelector(`.profile__edit-button`);
const modalCloseButton = document.querySelector(`.modal__close`);
const modalSaveButton = document.querySelector(`.modal__save`);
const profileName = document.querySelector(`.profile__name`);
const profileAboutMe = document.querySelector(`.profile__about-me`);
const modalName = document.querySelector(`.modal__name`);
const modalAboutMe = document.querySelector(`.modal__about-me`);
const pageOverlay = document.querySelector(`.page__overlay`);

modalEditButton.addEventListener('click', function displayModal(evt) {
    modalName.value = profileName.innerText;
    modalAboutMe.value = profileAboutMe.innerText;
    modal.classList.remove('modal_disabled');
    pageOverlay.classList.remove('page__overlay_disabled');
});
modalCloseButton.addEventListener('click', function hideModal(evt) {
    modal.classList.add('modal_disabled');
    pageOverlay.classList.add('page__overlay_disabled');
});
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.innerText = modalName.value;
    profileAboutMe.innerText = modalAboutMe.value;
    modal.classList.add('modal_disabled');
    pageOverlay.classList.add('page__overlay_disabled');
}
modalSaveButton.addEventListener('click', handleFormSubmit);
