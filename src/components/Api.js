const customFetch = (url , headers) => 
    fetch(url , headers)
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .catch(console.log);

class Api{
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards(){
        return customFetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        });
    }
    getUserInfo(){
        return customFetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        });
    }
    setUserInfo(data){
        return customFetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)  
        })
    }
    createCard(data) {
        return customFetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    deleteCard(cardId) {
        return customFetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
        })
    }
    likeCard(cardId) {
        return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: 'PUT',
        })
    }
    removeLike(cardId) {
        return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
        })
    }
    updateProfile(data) {
        return customFetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        })
    }
}
export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
        authorization: "9b991f86-368d-4ef3-963c-b91580821c46",
        "Content-Type": "application/json"
    }
});