export class Api {
    constructor({ server, cohort, token, contentType }) {
      this.baseURL = `${server}/${cohort}`;
      this.headers = {
          authorization: token,
          'Content-Type': contentType
      };
    }
  
    getInitialCards() {
      return fetch(`${this.baseURL}/cards`, {
        headers: this.headers
      })
      .then((res) =>  {
        if (res.ok) return res.json();
      })
      .then((result) => {
        if (result) {
          return result;
          } else {
            return Promise.reject(`Ошибка`);
        }
      })
      .catch((err) => {
        console.log('Нет соединения с сервером', err);
      });
    }
    loadUserInfo() {
      fetch(`${this.baseURL}/users/me`, {
        headers: this.headers
        })
        .then((res) =>  {
          if (res.ok) return res.json();
        })
        .then((result) => {
          if (result) {
            document.querySelector('.user-info__photo').style.backgroundImage = `url(${result.avatar})`;
            document.querySelector('.user-info__name').textContent = result.name;
            document.querySelector('.user-info__job').textContent = result.about;
          } else {
            return Promise.reject(`Ошибка`);
          }
        })
        .catch((err) => {
          console.log('Соединение установлено, но данные пользователя не получены', err);
        });
    }
    editUserInfo(name, about) {
      return fetch(`${this.baseURL}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({name, about})
      });
    }
    addCardOnServer(name, link) {
      return fetch(`${this.baseURL}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({name,link})
      });
    }
  }