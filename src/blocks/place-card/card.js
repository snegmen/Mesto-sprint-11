export class Card {
    constructor(name, link, config) {
      this.config = config;
      this.cardElement = this.create(name, link);
    }
  
    create(name, link) {
        const cardContainer = document.createElement('div');
        const cardImage = document.createElement('div');
        const cardIconDelete = document.createElement('button');
        const cardDescription = document.createElement('div');
        const cardName = document.createElement('h3');
        const cardLikeIcon = document.createElement('button');
        const cardLikeWrap = document.createElement('div');
        const cardLikeCount = document.createElement('p'); 
  
        cardContainer.classList.add(this.config.cardPlace.slice(1));
        cardImage.classList.add(this.config.cardImageElement.slice(1));
        cardImage.style.backgroundImage = `url(${link})`;
        cardContainer.appendChild(cardImage);
        cardImage.setAttribute(this.config.cardImageUrl, link);
  
        cardIconDelete.classList.add(this.config.cardDeleteIcon.slice(1));
        cardImage.appendChild(cardIconDelete);
        
        cardDescription.classList.add(this.config.cardDescription.slice(1));
        cardContainer.appendChild(cardDescription);
        
        cardName.classList.add(this.config.cardTitle.slice(1));
        cardName.textContent = name;
        cardDescription.appendChild(cardName);
        
        cardLikeWrap.classList.add(this.config.cardLikeWrap.slice(1));
        cardDescription.appendChild(cardLikeWrap);
  
        cardLikeIcon.classList.add(this.config.cardLikeIcon.slice(1));
        cardLikeWrap.appendChild(cardLikeIcon);
  
        cardLikeCount.classList.add(this.config.cardLikeCount.slice(1));
        cardLikeCount.textContent = '0';
        cardLikeWrap.appendChild(cardLikeCount);
  
        return cardContainer;
    }
    static like(element, classToToggle) {
      element.classList.toggle(classToToggle.slice(1));
    }
    static remove(element, parentNode) {
      const elementToDelete = element.closest(parentNode);
      elementToDelete.parentNode.removeChild(elementToDelete);
    }
  }