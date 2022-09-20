document.addEventListener('DOMContentLoaded',function() {
  document.querySelector('#burger').addEventListener('click',function() {
    document.querySelector('#menu').classList.toggle('is-active')
    document.querySelector('.burger-icon').classList.toggle('is-active')
  });

    document.querySelectorAll('.tabs__btn').forEach(function(tabsBtn) {
      tabsBtn.addEventListener ('click', function(event) {
        const path = event.currentTarget.dataset.path

        document.querySelectorAll('.tab-content').forEach(function(tabContent) {
            tabContent.classList.remove('tab-content-active')
        });
        document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active')
      });
    });
  });

  const swiper = new Swiper('.swiper-container', {

     loop: true,

    pagination: {
      el: '.swiper-pagination',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    scrollbar: {
      hide: true,
    },

    autoHeight: true,

    ally: {
      enabled: true,
    }
  });
