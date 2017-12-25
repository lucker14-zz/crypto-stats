var container = document.querySelector('.container__assets')
var all_funds_ele = document.querySelector('h1 span')
var all_funds = 0

var my_data = [{
    'symbol': 'BTC',
    'id': 'bitcoin',
    'volume': 0.0092,
    'value': 0
},{
    'symbol': 'ETH',
    'id': 'ethereum',
    'volume': 0.2063,
    'value': 0
}, {
    'symbol': 'LTC',
    'id': 'litecoin',
    'volume': 0.20325812,
    'value': 0
}, {
    'symbol': 'MIOTA',
    'id': 'iota',
    'volume': 1.99800000,
    'value': 0
}, {
    'symbol': 'XLM',
    'id': 'stellar',
    'volume': 33.96600000,
    'value': 0
}, {
    'symbol': 'XRP',
    'id': 'ripple',
    'volume': 7.99200000,
    'value': 0
}, {
    'symbol': 'ADA',
    'id': 'cardano',
    'volume': 16.98300000,
    'value': 0
}, {
    'symbol': 'ETN',
    'id': 'electroneum',
    'volume': 20,
    'value': 0
}]

var element = '<div class="item symbol"></div> <div class="item volume"></div> <div class="value"></div>'

function get_value_by_id(id){
  // construct an HTTP request
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.coinmarketcap.com/v1/ticker/' + String(id) + '/', true);
  // xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  // send the collected data as JSON
  xhr.send();

  console.log(xhr)

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      console.log(xhr.response); //Outputs a DOMString by default
      var data = JSON.parse(xhr.response)
      console.log('//////////////////////////')
      console.log(data)
      return data
    }
  }


}

function get_whole_list(){
  // construct an HTTP request
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.coinmarketcap.com/v1/ticker/', true);
  // xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  // send the collected data as JSON
  xhr.send();

  console.log(xhr)

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
    //Outputs a DOMString by default
      var data = JSON.parse(xhr.response)
      console.log('//////////////////////////')
      console.log(data)
      for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < my_data.length; j++) {
              if (data[i].id == my_data[j].id) {
                console.log('@#$%&*@#$%&*()@#$%^&*(')
                console.log(my_data[j].volume)
                console.log(parseFloat(data[i].price_usd))
                my_data[j].value = my_data[j].volume * parseFloat(data[i].price_usd)
              }
          }
      }
      console.log(my_data)
        my_data.forEach(function(item, index){

            var ele = document.createElement('div')
            ele.classList.add('container')
            ele.classList.add('container__asset')
            ele.innerHTML = '<div class="item symbol">' + item.symbol + '</div> <div class="item volume">' + item.volume + '</div> <div class="value"> ' + Math.round(item.value * 100) / 100 + ' USD </div>'

            container.appendChild(ele)

            all_funds += item.value

        })
        all_funds_ele.innerText = Math.round(all_funds * 100) / 100
    }
  }


}

get_whole_list()

