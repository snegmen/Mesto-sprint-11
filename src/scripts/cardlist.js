import {Card} from './card.js';
import {Api} from './api.js';
export default class CardList {
    constructor(config) {
      this.config = config;
      this.container = document.querySelector(config.renderContainer);
      this.render();
      this.container.addEventListener('click', this.clickHandler.bind(this));
    }
    addCard(name, link) {
      const {cardElement} = new Card(name, link, this.config);
      this.container.appendChild(cardElement);
    }
    render() {
      const serverAPI = new Api(this.config);
      serverAPI.loadUserInfo();
      serverAPI.getInitialCards()
        .then((res) => {
            if (res) {
                for (let i = 0; i < res.length; i++) {
                    this.addCard(res[i].name, res[i].link);
                }
            } else {
              return Promise.reject(`Нет данных`);
            }
        })
        .catch((err) => {
            console.log('Ошибка render', err);
        });
      }
      clickHandler(event) {
        if (event.target.classList.contains(this.config.cardDeleteIcon.slice(1))) { Card.remove(event.target, this.config.cardPlace); }
        if (event.target.classList.contains(this.config.cardLikeIcon.slice(1))) { Card.like(event.target, this.config.likeClassToToggle); }
    }
  }