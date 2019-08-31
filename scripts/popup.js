export  class Popup {
    constructor(container) {
      this.container = container;
    }
  
    open(content) {
      this.container.insertAdjacentHTML('afterbegin', content);
      this.container.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
      this.container.classList.add('popup_is-opened');
    }
  
    close() {
      this.container.classList.remove('popup_is-opened');
  
      while (this.container.firstChild) {
          this.container.firstChild.remove();
      }
    }
  }