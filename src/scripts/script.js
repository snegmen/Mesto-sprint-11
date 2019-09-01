/*классы*/
import CardList from '../blocks/places-list/cardlist.js';  
import {Popup} from '../blocks/popup/popup.js';
import {Api} from './api.js';
import closeImage from '../images/close.svg';

/*переменные*/
let nodeURL='https://praktikum.tk';
if (NODE_ENV==='development') {
    nodeURL='http://praktikum.tk';
}

const config = {
  renderContainer: `.places-list`,

  buttonToEditUserInfo: `.user-info__button_edit`,
  buttonToAddNewCard: `.user-info__button`,
  buttonToEditAvatar:`.user-info__photo`, 

  cardPlace: `.place-card`,
  cardImageElement: `.place-card__image`,
  cardDeleteIcon: `.place-card__delete-icon`,
  cardLikeIcon: `.place-card__like-icon`,
  cardDescription: `.place-card__description`,
  cardTitle: `.place-card__name`,
  likeClassToToggle: `.place-card__like-icon_liked`,
  cardImageUrl: `imageURL`,
  cardLikeCount:`.place-card__like-count`,
  cardLikeWrap:`.place-card__like-wrap`,
  cohort: `cohort1`,
  token: `62ef6548-a9a1-463d-81a0-72acf196616a`,
  server: nodeURL,
  contentType: `application/json`

};

const popUpInnerHTML = {
  addCardUser: `<div class="popup__content">
  <img src="${closeImage}" alt="" class="popup__close">
  <h3 class="popup__title">Новое место</h3>
  <form class="popup__form" name="new">
    <div class="input-container">
      <input id="namecard" type="text" required minlength="2" maxlength="30" name="name" class="popup__input popup__input_username" placeholder="Название">
      <span id="error-namecard" class="popup__error" ></span>
    </div>
    <div class="input-container">
      <input id="link" type="url" required name="link" class="popup__input popup__input_job" placeholder="Ссылка на картинку">
      <span id="error-link" class="popup__error popup__error_hidden"></span>
    </div>
      <button type class="button popup__button popup__button_edit popup__button_disabled">+</button>
      <button type class="button popup__button popup__button_edit popup__button_edit-load">Загрузка...</button>
  </form>
</div>`,
  editUserInfo: `<div class="popup__content">
  <img src="${closeImage}" alt="" class="popup__close">
  <h3 class="popup__title">Редактировать профиль</h3>
  <form class="popup__form" name="edit">
    <div class="popup__container">
      <input id="username" type="text" required minlength="2" maxlength="30" name="username" class="popup__input popup__input_type_name" placeholder="Имя">
      <span id="error-username" class="popup__error popup__error_hidden"></span>
    </div>
    <div class="popup__container">
      <input id="job" type="text" required minlength="2" maxlength="30" name="job" class="popup__input popup__input_type_link-url" placeholder="О себе">
      <span id="error-job" class="popup__error popup__error_hidden"></span>
    </div>
      <button type class="button popup__button popup__button_edit">Сохранить</button>
      <button type class="button popup__button popup__button_edit popup__button_edit-load">Загрузка...</button>
  </form>
</div>`,
  showPicture: `<div class="popup__content-picture">
    <img src="${closeImage}" alt="" class="popup__close">
    <img class="popup__picture" src="">
  </div>`,
  editAvatar: `<div class="popup__content">
  <img src="${closeImage}" alt="" class="popup__close">
  <h3 class="popup__title">Обновить аватар</h3>
  <form class="popup__form" name="avatar">
    <div class="popup__container">
      <input id="avatar" type="url" required name="link" class="popup__input popup__input_job" placeholder="Ссылка на аватар">
      <span id="error-link" class="popup__error popup__error_hidden"></span>
    </div>
      <button type class="button popup__button popup__button_edit-save popup__button_disabled">Сохранить</button>
      <button type class="button popup__button popup__button_edit popup__button_edit-load">Загрузка...</button>
  </form>
</div>`
};

const placesList = new CardList(config);
const popUp = new Popup (document.querySelector('.popup'));
const serverAPI = new Api(config);
const openFormButton = document.querySelector(config.buttonToAddNewCard);
const openFormEditButton = document.querySelector(config.buttonToEditUserInfo);
const openAvatarEditButton = document.querySelector(config.buttonToEditAvatar); 


/* функции */
// открытие форм
function openForm(event) {
  if (event.target.classList.contains('user-info__button')) {
    popUp.open(popUpInnerHTML.addCardUser);

    const form = document.forms.new;

    form.addEventListener('input', checkForm);
    form.addEventListener('submit', addUserCard);
  }
    if (event.target.classList.contains('user-info__button_edit')) {
    popUp.open(popUpInnerHTML.editUserInfo);

    const formEdit = document.forms.edit;

    formEdit.addEventListener('input', checkFormProfile);
    formEdit.addEventListener('submit', editFormProfile);

    formEdit.elements.username.value = document.querySelector('.user-info__name').textContent;
    formEdit.elements.job.value = document.querySelector('.user-info__job').textContent; 
  }
  if (event.target.classList.contains('user-info__photo')) {
    popUp.open(popUpInnerHTML.editAvatar);

    const formAvatar = document.forms.avatar;

    formAvatar.addEventListener('input', checkFormAvatar);
    formAvatar.addEventListener('submit', editAva); 
  }
}

//добавление карточки пользователем 
function addUserCard (event) {
  event.preventDefault();

  const form = document.forms.new;
  const name = form.elements.name;
  const link = form.elements.link;

  renderLoading(true);
  serverAPI.addCardOnServer(name.value, link.value)
  .then((res) => {
    if(res.ok) {
      placesList.addCard(name.value, link.value);
      
      form.reset();
      popUp.close();
    }
  })
  .catch(() => {
    console.log('Нет соединения с сервером, попробуйте позже');
  });
}

// редактировать профиль
function editFormProfile(event) {
  event.preventDefault();
  
  const formEdit = document.forms.edit;
  const usName = formEdit.elements.username.value;
  const usAbaut = formEdit.elements.job.value;

  renderLoading(true);
  serverAPI.editUserInfo(usName, usAbaut)
  .then((res) => {
    if (res.ok) {
      document.querySelector('.user-info__name').textContent = usName;
      document.querySelector('.user-info__job').textContent = usAbaut;
      popUp.close();
    }
  })
  .catch(() => {
    console.log('Нет соединения с сервером, попробуйте позже');
  });
}

// кнопка Загрузка
function renderLoading (isLoading) {
  const buttonSave = document.querySelector('.popup__button_edit');
  const buttonLoad = document.querySelector('.popup__button_edit-load');

  if (isLoading) {
    buttonLoad.classList.add('popup__button_edit-load_visible');
    buttonSave.classList.add('popup__button_edit_hidden');
  } else {
      buttonLoad.classList.remove('popup__button_edit-load_visible');
      buttonSave.classList.remove('popup__button_edit_hidden');
    }
  }

// popup изображения
function viewPicture(event) {
  document.querySelector('.popup__picture').src = event.target.getAttribute('imageUrl');
  popUp.container.classList.add('popup_is-opened');
}

// обработчик событий на карточке
function clickHandler(event) {
  if (event.target.classList.contains('place-card__image')) { 
    popUp.open(popUpInnerHTML.showPicture);
    viewPicture(event); 
  }
}

// проверка формы карточки
function checkForm() {
  const form = document.forms.new;
  const formButton = popUp.container.querySelector('.popup__button');
  let placeNameField = validate(form.elements.name); 
  let linkField = validate(form.elements.link);  

  if (placeNameField && linkField) {
    formButton.removeAttribute('disabled');
    formButton.classList.remove('popup__button_disabled');
  } else {
    formButton.setAttribute('disabled', true);
    formButton.classList.add('popup__button_disabled');
  }
}

// проверка формы профиля
function checkFormProfile() {
  const formEdit = document.forms.edit;
  const formButtonEdit = popUp.container.querySelector('.popup__button');
  let userNameField = validate(formEdit.elements.username); 
  let aboutUserField = validate(formEdit.elements.job); 

  if (userNameField && aboutUserField) { 
    formButtonEdit.removeAttribute('disabled'); 
    formButtonEdit.classList.remove('popup__button_disabled'); 
  } else {  
    formButtonEdit.setAttribute('disabled', true); 
    formButtonEdit.classList.add('popup__button_disabled');
  }
}

// валидация
function validate(element) {
  resetError(element); 

  const errorElement = document.querySelector(`#error-${element.id}`);

  if (!element.checkValidity()) { 
    if (element.validity.typeMismatch) { 
      errorElement.textContent = 'Здесь должна быть ссылка';
      activateError(errorElement);
      return false;
    }
    if (element.validity.valueMissing) { 
      errorElement.textContent = 'Это обязятельное поле';
      activateError(errorElement);
      return false;
    }
    if (element.value.length < 2) { 
      errorElement.textContent = 'Должно быть от 2 до 30 символов';
      activateError(errorElement);
      return false;
    }
  }

  return true;
}

// активация и удаление ошибки валидации
function activateError(element) {
    element.parentNode.classList.add('popup__container_invalid');
  }

  function resetError(element) {
    element.parentNode.classList.remove('popup__container_invalid');
    element.textContent = '';
}

/* Слушатели событий */
openFormButton.addEventListener('click', openForm); 
openFormEditButton.addEventListener('click', openForm); 
openAvatarEditButton.addEventListener('click', openForm);
placesList.container.addEventListener('click', clickHandler);