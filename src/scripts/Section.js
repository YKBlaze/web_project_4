export default class Section {
    constructor({ items, renderer } , classSelector) {
        this._items = items;
        this._renderer = renderer;
        this._selector = document.querySelector(classSelector);
    }
    renderItems(){
        this._items.forEach(element => {
            this._element = this._renderer(element);
        })  
    }
    addItem (element){
       this._selector.prepend(element);
    }

}