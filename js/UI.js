var BitcoinH = BitcoinH || {};

BitcoinH.UI = {};

//show a notification in the message area
BitcoinH.UI.notify = function(message, type){
    document.getElementById('updates-area').innerHTML = '<div class="update-' + type + '">Block '+ Math.ceil(this.stackers.block) + ': ' + message+'</div>' + document.getElementById('updates-area').innerHTML;
  };


//refresh visual stackers stats
BitcoinH.UI.refreshStats = function() {
  //modify the dom
  document.getElementById('stat-block').innerHTML = Math.ceil(this.stackers.block);
  document.getElementById('stat-distance').innerHTML = Math.floor(this.stackers.distance) + '/' + BitcoinH.FINAL_DISTANCE;
  document.getElementById('stat-plebs').innerHTML = this.stackers.plebs;
  document.getElementById('stat-ostriches').innerHTML = this.stackers.ostriches;
  document.getElementById('stat-food').innerHTML = Math.ceil(this.stackers.food);
  document.getElementById('stat-sats').innerHTML = this.stackers.sats;
  document.getElementById('stat-zappower').innerHTML = this.stackers.zappower;
  document.getElementById('stat-weight').innerHTML = Math.ceil(this.stackers.weight) + '/' + this.stackers.capacity;
  //update stackers position
  var stackersElement = document.getElementById('stackers');
  var progress = this.stackers.distance / BitcoinH.FINAL_DISTANCE;
  stackersElement.style.right = (380 * progress) + 'px';
  stackersElement.style.left = 'auto';
};

//show attack
BitcoinH.UI.showAttack = function(zappower, gold) {
    var attackDiv = document.getElementById('attack');
    attackDiv.classList.remove('hidden');
    //keep properties
    this.zappower = zappower;
    this.gold = gold;
    document.getElementById('attack-description').innerHTML = 'Zappower: ' + zappower;
    //init once
    if(!this.attackInitiated) {
      //fight
      document.getElementById('fight').addEventListener('click', this.fight.bind(this));
      //run away
      document.getElementById('runaway').addEventListener('click', this.runaway.bind(this));
      this.attackInitiated = true;
    }
  };
  //fight
  BitcoinH.UI.fight = function(){
    var zappower = this.zappower;
    var gold = this.gold;
    var damage = Math.ceil(Math.max(0, zappower * 2 * Math.random() - this.stackers.zappower));
    //check there are survivors
    if(damage < this.stackers.plebs) {
      this.stackers.plebs -= damage;
      this.stackers.sats += gold;
      this.notify(damage + ' people were killed fighting', 'negative');
      this.notify('Found some sweet sats!' + gold);
    }
    else {
      this.stackers.plebs = 0;
      this.notify('Everybody died in the fight', 'negative');
    }
    //resume journey
    document.getElementById('attack').classList.add('hidden');
    this.game.resumeJourney();
  };
  //runing away from enemy
  BitcoinH.UI.runaway = function(){
    var zappower = this.zappower;
    var damage = Math.ceil(Math.max(0, zappower * Math.random()/2));
    //check there are survivors
    if(damage < this.stackers.plebs) {
      this.stackers.plebs -= damage;
      this.notify(damage + ' people were killed running', 'negative');
    }
    else {
      this.stackers.plebs = 0;
      this.notify('Everybody died running away', 'negative');
    }
    //remove event listener
    document.getElementById('runaway').removeEventListener('click');
    //resume journey
    document.getElementById('attack').classList.add('hidden');
    this.game.resumeJourney();
  };

  //show shop
BitcoinH.UI.showShop = function(products){
    //get shop area
    var shopDiv = document.getElementById('shop');
    shopDiv.classList.remove('hidden');
    //init the shop just once
    if(!this.shopInitiated) {
      //event delegation
      shopDiv.addEventListener('click', function(e){
        //what was clicked
        var target = e.target || e.src;
        //exit button
        if(target.tagName == 'BUTTON') {
          //resume journey
          shopDiv.classList.add('hidden');
          BitcoinH.UI.game.resumeJourney();
        }
        else if(target.tagName == 'DIV' && target.className.match(/product/)) {
          BitcoinH.UI.buyProduct({
            item: target.getAttribute('data-item'),
            qty: target.getAttribute('data-qty'),
            price: target.getAttribute('data-price')
          });
        }
      });
      this.shopInitiated = true;
    }
    //clear existing content
    var prodsDiv = document.getElementById('prods');
    prodsDiv.innerHTML = '';
    //show products
    var product;
    for(var i=0; i < products.length; i++) {
      product = products[i];
      prodsDiv.innerHTML += '<div class="product" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty + ' ' + product.item + ' - ' + product.price + ' sats' + '</div>';
    }
  };
  //buy product
  BitcoinH.UI.buyProduct = function(product) {
    //check we can afford it
    if(product.price > BitcoinH.UI.stackers.sats) {
      BitcoinH.UI.notify('Not enough sats', 'negative');
      return false;
    }
    BitcoinH.UI.stackers.sats -= product.price;
    BitcoinH.UI.stackers[product.item] += +product.qty;
    BitcoinH.UI.notify('Bought ' + product.qty + ' x ' + product.item, 'positive');
    //update weight
    BitcoinH.UI.stackers.updateWeight();
    //update visuals
    BitcoinH.UI.refreshStats();
  };