'use strict'
$(document).ready(function(){
  const btcAdress = `bc1qpu40zga7savkyz9nrn3h9cgr5rwpeyd0m7xnfz`;
  const ltcAdress = `ltc1qe354g7nnfmt3e0vp2p5lzsedk50rdk3mqzatg0`;
  const ethAdress = `0x5b8Eb98858C8c9040Ea6E3839025C983A671e4cf`;

  function getRates() {
    return $.ajax({
      // BTC, ETH, LTC
      url: `https://min-api.cryptocompare.com/data/price?fsym=EUR&tsyms=BTC,ETH,LTC`,
      type: 'GET',
      dataType: 'json',
    });
  }

  function generateUrl(cryptoCr, adress, amount, rate) {
    const valueInCrypto = amount * rate;
    return `https://chart.googleapis.com/chart?cht=qr&chl=${cryptoCr}%3A${adress}%3Famount%3D${valueInCrypto}&choe=UTF-8&chs=230x230`;
  }

  function generateBySquareUrl(amount) {
    return `https://ilfiron.com/payquicker/code.php?t=0&s=256&r=0&v=2&invoiceid=&amount=${amount}&iban=SK6583300000002001438820&bic=FIOZSKBAXXX&vs=9999&cs=&ss=&paynote=TodayIsYourLuckyDay`
  }

  function setNewQrs(amount) {
    getRates().then(function (rate) {
      const btcUrl = generateUrl('bitcoin', btcAdress, amount, rate.BTC);
      const ltcUrl = generateUrl('litecoin', ltcAdress, amount, rate.LTC);
      const ethUrl = generateUrl('ethereum', ethAdress, amount, rate.ETH);
      const bySquareUrl = generateBySquareUrl(amount);
      $('.btc').attr('src', btcUrl);
      $('.ltc').attr('src', ltcUrl);
      $('.eth').attr('src', ethUrl);
      $('.paybysquare').attr('src', bySquareUrl);

    })
  }

  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  // handler for clicking on buttons
  $('.donation-things__buttons__btn').click(function() {
    // handle selection
    $('.active').removeClass('active');
    $(this).addClass('active');

    // handle generation of qr codes
    if ($(this)[0].classList[1] === 'other') {
      const inputValue = $('.donate-amount').val();

      if (inputValue) {
        setNewQrs(inputValue);
      }
      $('.donate-amount').on('input', function() {
        const amountInEur = $(this).val();
        delay(function(){
          setNewQrs(amountInEur);
        }, 500 );
      })
    } else {
      const amountInEur = $(this).val();
      setNewQrs(amountInEur);
    }
  });
});
