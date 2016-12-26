(function(){
  'use strict';

  angular.module('CheckOffApp', [])
    .controller('ToBuyController', ToBuyController)
    .controller('BoughtController', BoughtController)
    .provider('CheckOffService',CheckOffServiceProvider);


    ToBuyController.$inject = ['CheckOffService'];
    function ToBuyController (CheckOffService){
      var toBuy = this;
      toBuy.items = CheckOffService.getToBuyItems();
      toBuy.message = "Everything is bought";
      toBuy.removeItem = function(itemIndex){
            CheckOffService.removeItem(itemIndex);
      };
    };//end of ToBuyController

    BoughtController.$inject = ['CheckOffService'];
    function BoughtController (CheckOffService){
      var bought = this;
      bought.message = "Nothing bought yet.";
      bought.items = CheckOffService.getBoughtItems();
    };// end of BoughtController

    function CheckOffService(){
      var service = this;
      var toBuyList = [
        {name: "cookie",quantity: 10},
        {name: "apple",quantity: 10},
        {name: "orange",quantity: 10},
        {name: "pineapple",quantity: 10},
        {name: "salad",quantity: 10},];
      var alreadyBoughtList = [];
      service.getToBuyItems = function () {
        return toBuyList;
      };

      service.getBoughtItems = function () {
        return alreadyBoughtList;
      }

      service.removeItem = function (itemIndex) {
          alreadyBoughtList.push(toBuyList[itemIndex]);
          toBuyList.splice(itemIndex,1);
      };
    };//end of CheckOffService

    function CheckOffServiceProvider() {
      var provider = this;
      provider.defaults = {};
      provider.$get = function () {
        var checkOff = new CheckOffService();
        return checkOff;
      }
    };//end of CheckOffServiceProvider

})()
