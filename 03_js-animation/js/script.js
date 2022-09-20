(() => {

  const getAnimation = () => {

    const heroTitle = document.querySelector('.hero__title');
    const heroDescr = document.querySelector('.hero__descr');
    const heroBtn = document.querySelector('.hero__btn');
    const photosAuthor = document.querySelector('.photos__author');
    const photo1 = document.querySelector('.photos-wrap__photo1');
    const photo2 = document.querySelector('.photos-wrap__photo2');
    const photo3 = document.querySelector('.photos-wrap__photo3');

    let timelineHeader = gsap.timeline();

      timelineHeader.to(heroTitle, 0.5, {
        opacity: 1,
        y: -20,
        ease: "power1.out"
      })
      .to(heroBtn, 0.5, {
        opacity: 1,
        y: -20,
        ease: "power1.out"
      }, '-=0.5')
      .to(heroDescr, 0.5, {
        opacity: 1,
        y: 0,
        ease: "power1.out"
      }, '>')
      .to(photo1, 0.6, {
        opacity: 1,
        y: 0,
      }, '-=0.4')
      .to(photo2, 0.6, {
        opacity: 1,
        y: 0,
      }, '-=0.4')
      .to(photo3, 0.6, {
        opacity: 1,
        y: 0,
      }, '-=0.4')
      .to(photosAuthor, 0.6, {
        opacity: 1,
        y: 0,
      }, '-=0.4')
  };
  getAnimation();

  const openMenu = () => {
    const menu = document.querySelector('.menu');
    const burger = document.querySelector('.burger');
    const close = document.querySelector('.close');
    const menuTop = document.querySelector('.menu__top');
    const menuNav = document.querySelector('.menu__nav');
    const social = document.querySelector('.social');
    const menuRight = document.querySelector('.menu__right');

    let timelineMenu = gsap.timeline( { paused:true });

    timelineMenu.fromTo(menu, 1.5, {
      opacity: 0,
      y: 10
    },
    {
      opacity: 1,
      y: 0,
      ease: "power1.out"
    })

    .fromTo(menuTop, 0.6, {
      opacity: 0,
      y: -50
    },
    {
      opacity: 1,
      y: 0,
      ease: "power1.out"
    }, '-=1.5')

    .fromTo(menuNav, 0.6, {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      ease: "power1.out"
    }, '-=1')

    .fromTo(social, 0.6, {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      ease: "power1.out"
    }, '-=0.2')

    .fromTo(menuRight, 0.6, {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      ease: "power1.out"
    }, '<')

    burger.addEventListener('click', function() {
      menu.classList.toggle('menu--open');

      timelineMenu.play();
    });


    close.addEventListener('click', () => {
      timelineMenu.reverse();

      setTimeout(() => {
        menu.classList.remove('menu--open')
      }, 1500);

    });

  };
  openMenu();
  })();
