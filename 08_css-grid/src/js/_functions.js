// Данный файл - лишь собрание подключений готовых компонентов.
// Рекомендуется создавать отдельный файл в папке components и подключать все там

// Определение операционной системы на мобильных
import { mobileCheck } from "./functions/mobile-check";
console.log(mobileCheck())

// Определение ширины экрана
// import { isMobile, isTablet, isDesktop } from './functions/check-viewport';
// if (isDesktop()) {
//   console.log('...')
// }

// Троттлинг функции (для ресайза, ввода в инпут, скролла и т.д.)
// import { throttle } from './functions/throttle';
// let yourFunc = () => { console.log('throttle') };
// let func = throttle(yourFunc);
// window.addEventListener('resize', func);

// Фикс фулскрин-блоков
// import './functions/fix-fullheight';

// Реализация бургер-меню
import { burger } from './functions/burger';

// Реализация остановки скролла (не забудьте вызвать функцию)
// import { disableScroll } from './functions/disable-scroll';

// Реализация включения скролла (не забудьте вызвать функцию)
// import { enableScroll } from './functions/enable-scroll';

// Реализация модального окна
// import GraphModal from 'graph-modal';
// const modal = new GraphModal();

// Реализация табов
// import GraphTabs from 'graph-tabs';
// const tabs = new GraphTabs('tab');

// Получение высоты шапки сайта (не забудьте вызвать функцию)
// import { getHeaderHeight } from './functions/header-height';

// Подключение плагина кастом-скролла
// import 'simplebar';

// Подключение плагина для позиционирования тултипов
// import { createPopper, right} from '@popperjs/core';
// createPopper(el, tooltip, {
//   placement: 'right'
// });

// Подключение свайпера
// import Swiper, { Navigation, Pagination } from 'swiper';
// Swiper.use([Navigation, Pagination]);
// const swiper = new Swiper(el, {
//   slidesPerView: 'auto',
// });

// Подключение анимаций по скроллу
// import AOS from 'aos';
// AOS.init();

// Подключение параллакса блоков при скролле
// import Rellax from 'rellax';
// const rellax = new Rellax('.rellax');

// Подключение плавной прокрутки к якорям
// import SmoothScroll from 'smooth-scroll';
// const scroll = new SmoothScroll('a[href*="#"]');

// Подключение событий свайпа на мобильных
// import 'swiped-events';
// document.addEventListener('swiped', function(e) {
//   console.log(e.target);
//   console.log(e.detail);
//   console.log(e.detail.dir);
// });

import { validateForms } from './functions/validate-forms';
const rules1 = [
  {
    errorFieldCssClass: 'is-invalid',
    errorFieldStyle: {
      border: '1px solid red',
    },
    errorLabelCssClass: 'is-label-invalid',
    errorLabelStyle: {
      color: 'red',
      textDecoration: 'underlined',
    },
    ruleSelector: '.form-name',
    rules: [
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Введите 2 и более символов',

      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Введите не более 30 символов',
      },
      {
        rule: 'customRegexp',
        value: /[А-Яа-яЁё]/,

        errorMessage: 'Недопустимый формат',

      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните имя!'
      }

    ]
  },
  {
    ruleSelector: '.form-email',
    rules: [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните email!'
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите 2 и более символов',
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Введите не более 30 символов',
      },
      {
        rule: 'customRegexp',
        value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        errorMessage: 'Недопустимый формат',
      }
    ]
  },
];

const rules2 = [
  {
    // errorLabelCssClass: 'just-validate-error-label',
    // errorLabelStyle: {
    //   color: 'blue',
    // },

    ruleSelector: '.about-form__input',
    rules: [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните email!'
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите 2 и более символов',
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Введите не более 30 символов',
      },
      {
        rule: 'customRegexp',
        value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        errorMessage: 'Недопустимый формат',
      }
    ]
  },
];

const afterForm = () => {
   console.log('Произошла отправка');
};

validateForms('.contacts-block__form', rules1, afterForm);
validateForms('.about-form', rules2, afterForm);
