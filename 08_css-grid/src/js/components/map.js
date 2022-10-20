  ymaps.ready(init);
    export  function init(){
          // Создание карты.
          var myMap = new ymaps.Map("map", {
              center: [55.7575,37.609],
              zoom: 13,
              controls: []
          }, {
            suppressMapOpenBlock: true,
          });

          var myPlacemark = new ymaps.Placemark([55.76953456898229,37.63998549999998], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/Subtract.svg',
            iconImageSize: [12, 12],
            iconImageOffset: [1, -12]
        });

          // Размещение геообъекта на карте.
          myMap.geoObjects.add(myPlacemark);
      }
