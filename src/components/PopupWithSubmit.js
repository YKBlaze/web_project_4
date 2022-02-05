import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
     setAction(action) {
         this._submitHandler = action;
     }

     setEventListeners(){
        super.setEventListeners();
         this._popup.addEventListener('submit', (e) => {
            e.preventDefault(); 
            this._submitHandler();
         });   
     }
     open(){
        super.open();
        this._submitButtonDefault = this._submitButton.textContent;
    }
}