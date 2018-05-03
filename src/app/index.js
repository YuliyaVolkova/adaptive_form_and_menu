import 'normalize.css';
import '../assets/styles/index.main.less';
import svg4everybody from 'svg4everybody';
import 'select2';
import 'select2/dist/css/select2.css';
import 'daterangepicker';
import 'daterangepicker/daterangepicker.css';
import moment from 'moment';
svg4everybody();
const $ = require('jquery');

$(document).ready(() => {

  const $menuLeft = $('.menu__left');
  const $menuRight = $('.menu__right');
  const toggleActiveClass = e => {
    e.preventDefault();
    e.stopPropagation(); 
    const $parentLi = e.target.closest('li');
    if($($parentLi).hasClass('is-active')) {
      $($parentLi).removeClass('is-active');
    }
    else {
      $($menuLeft).children().removeClass('is-active');
      $($menuRight).children().removeClass('is-active');
      $($parentLi).addClass('is-active');
    }
  };
  $menuLeft.on('click', toggleActiveClass);
  $menuRight.on('click', toggleActiveClass);

  const returnDateInput = $('input[name="returnDate"]');
  const currentDay = moment().format('DD.MM.YYYY');
  const currencyInput = $('#currency');

  if($('.select-js-unload'))
    $('.select-js-unload').remove();
  
  $('#departure-date').daterangepicker({
    'singleDatePicker': true,
    'showDropdowns': true,
    'locale': {
      'format': 'DD.MM.YYYY',
      'separator': ' . ',
      'applyLabel': 'Apply',
      'cancelLabel': 'Cancel',
      'weekLabel': 'W',
      'daysOfWeek': [
        'Su',
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa',
      ],
      'monthNames': [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      'firstDay': 1,
    },
    'parentEl': '#depart-date-wr',
    'startDate': `${currentDay}`,
    'minDate': `${currentDay}`,
    'opens': 'center',
  }, function(start) {
    console.log(`New Departure date selected: ${start.format('DD.MM.YYYY')}`);
  });

  const setCurrency = currency => {
    if (!currency.id) { return currency.text; }
    return $(`<span class="option-class${currency.element.value}"> ${currency.text}</span>`);
  };

  currencyInput.select2({

    dropdownPosition: 'below',
    placeholder: 'Rub',
    templateResult: setCurrency,
    templateSelection: setCurrency,
    escapeMarkup: function(m) { return m; },
    minimumResultsForSearch: Infinity,
    theme: 'light',

  }).on('select2:open', () => {
    const requireHeight = $('body').height(),
      windowD = $(window),
      viewportBottom = windowD.scrollTop() + windowD.height();     
    if (viewportBottom < requireHeight) 
    {         
      $('html, body').animate({
        scrollTop: currencyInput.offset().top - 10,
      }, 700);
    }
  });

  if(!$('input[name="roundtrip"]').is(':checked')) {
    returnDateInput.prop('disabled', true);
    returnDateInput.closest('.form__label_date').addClass('is-disabled');
  }

  $('input[name="roundtrip"]').click( function() {
    if($(this).is(':checked')) {
      returnDateInput.prop('disabled', false);
      $('#return-date').daterangepicker({
        'singleDatePicker': true,
        'showDropdowns': true,
        'locale': {
          'format': 'DD.MM.YYYY',
          'separator': ' . ',
          'applyLabel': 'Apply',
          'cancelLabel': 'Cancel',
          'weekLabel': 'W',
          'daysOfWeek': [
            'Su',
            'Mo',
            'Tu',
            'We',
            'Th',
            'Fr',
            'Sa',
          ],
          'monthNames': [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          'firstDay': 1,
        },
        'parentEl': '#return-date-wr',
        'startDate': `${currentDay}`,
        'minDate': `${currentDay}`,
        'opens': 'center',
      }, function(start) {
        console.log(`New Return date selected: ${start.format('DD.MM.YYYY')}`);
      });
      returnDateInput.closest('.form__label_date').removeClass('is-disabled');
    }

    else {
      returnDateInput.val('');
      returnDateInput.prop('disabled', true);
      returnDateInput.closest('.form__label_date').addClass('is-disabled');
    }
  });
});
//function requireAll(r) { r.keys().forEach(r); }
//requireAll(require.context('../assets/images/sprites/to_sprite/', true));