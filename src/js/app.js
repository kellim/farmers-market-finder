var Market = function(data) {
  this.marketName = ko.observable(data.marketName);
  this.address = ko.observable(data.address);
  this.schedule = ko.observable(data.schedule);
  this.products = ko.observable(data.products);
  this.latitude = ko.observable(data.latitude);
  this.longitude = ko.observable(data.longitude);
}

var AppViewModel = function() {
  var self = this;
  self.zip = ko.observable('');
  self.marketList = ko.observableArray();
  self.loadMarketsError = ko.observable('');
  self.loadMarketDetailsError = ko.observable('');

  // Called when AJAX function in loadMarketDetails() is successful
  // to add a marketItem with data from the API to marketList()
  self.createMarketItem = function(marketItem) {
    self.marketList.push(new Market(marketItem));
    console.log(self.marketList());
  }

  // Gets market name and ID data from Farmer's Market API
  // and calls loadMarketDetails() to get each market's full details.
  this.loadMarkets = function() {
    self.marketList.removeAll();
    var loadData = $.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + this.zip(),
      dataType: 'jsonp'
    });
    loadData.done(function(data) {
      var id, marketName;
      $.each(data.results, function(i, marketData) {
        marketName = marketData.marketname;
        console.log(marketData.marketname);
        marketId = marketData.id;
        // Remove number (distance) preceding name in data returned by API
        marketName = marketName.slice(marketName.indexOf(' ') + 1);
        self.loadMarketDetails(marketId, marketName);
      });
    });
    loadData.fail(function() {
      self.loadMarketsError = "Error Loading Market Data."
    });
  };

  // Called by loadMarkets() to get each market's full details since the initial
  // AJAX call only provides a market's name and ID. This function gets the
  // address, schedule, products, latitude and longitude and updates
  // self.marketDetails[].
  this.loadMarketDetails = function(marketId, marketName) {
    var loadDetails = $.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id="
      + marketId,
      dataType: 'jsonp'
    });
    loadDetails.done(function(details) {
      var address, schedule, googleLink, products, latitude, longitude;
      googleLink = decodeURIComponent(details.marketdetails.GoogleLink);
      address = details.marketdetails.Address;
      schedule = details.marketdetails.Schedule;
      products = details.marketdetails.Products;
      // Extract latitude and longitude from Google link returned by API.
      latitude = googleLink.slice(googleLink.indexOf('=') + 1, googleLink.indexOf(','));
      longitude = googleLink.slice(googleLink.indexOf(',') + 2, googleLink.indexOf('(') -1);
      var marketItem = {'marketId' : marketId, 'marketName' : marketName, 'latitude' : latitude, 'longitude' : longitude,
                        'address' : address, 'schedule' : schedule, 'products' : products};
      self.createMarketItem(marketItem);
    });
    loadDetails.fail(function() {
      self.loadMarketDetailsError = "Error Loading Market Details."
    });
  }
}
ko.applyBindings(new AppViewModel());