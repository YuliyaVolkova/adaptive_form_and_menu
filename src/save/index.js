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

  const formSearch = $('#search-form');
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
    'opens': 'left',
  }, function(start) {
    console.log(`New date range selected: ${start.format('DD.MM.YYYY')}`);
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

    // however much room you determine you need to prevent jumping
    const requireHeight = 600,
      windowD = $(window),
      viewportBottom = windowD.scrollTop() + windowD.height();

    // figure out if we need to make changes
    if (viewportBottom < requireHeight) 
    {           
      // animate to just above the select2, now with plenty of room below
      $('html, body').animate({
        scrollTop: currencyInput.offset().top - 10,
      }, 700);
    }
  });
  
  const timeout = setInterval(function() {
    if($('input[name="roundtrip"]:checked').length) 
      return returnDateInput.prop('disabled', false);
    else {
      returnDateInput.val('');
      returnDateInput.prop('disabled', true);
    }
  }, 50);
   
  formSearch.on('submit', e => {
    e.preventDefault();
    clearInterval(timeout);
  });
});
//function requireAll(r) { r.keys().forEach(r); }
//requireAll(require.context('../assets/images/sprites/to_sprite/', true));