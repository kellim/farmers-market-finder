var Market = function(data, marker) {
  this.marketName = ko.observable(data.marketName);
  this.address = ko.observable(data.address);
  this.schedule = ko.observable(data.schedule);
  this.products = ko.observable(data.products);
  this.latitude = ko.observable(data.latitude);
  this.longitude = ko.observable(data.longitude);
  this.marker = data.marker;
}

var AppViewModel = function() {
  var self = this;

  // Display Google Map on the page.
  this.initializeMap = function()  {
    var mapOptions = {
      // Center Google Maps on Seattle
      center:new google.maps.LatLng(47.6063889,-122.3308333),
      mapTypeControl: false,
      zoom: 9
    };
  self.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
  this.initializeMap();

  this.zip = ko.observable('');
  this.marketList = ko.observableArray([]);
  this.loadMarketsError = ko.observable('');
  this.loadMarketDetailsError = ko.observable('');
  this.currentMarket = ko.observableArray([]);
   // numResults set to -1 as it is compared to marketList length to determine
   // if results should be visible. It is set to 0 in loadMarkets.
  this.numResults = ko.observable(-1);
  this.marketQuery = ko.observable('');

  // Markets filtered by entered search filter
  this.filteredMarkets = ko.computed(function() {
    var search = self.marketQuery().toLowerCase();
    return ko.utils.arrayFilter(self.marketList(), function (item) {
      return item.marketName().toLowerCase().indexOf(search) >= 0;
      });
  });

  // Called by loadMarketDetails to create an array of
  // Market objects.
  this.createMarketItem = function(marketItem) {
    self.marketList.push(new Market(marketItem));
  }

  // Visitor clicks on a market in the results, and this sets currentMarket to
  // the market that was clicked on.
  this.setCurrentMarket = function(market) {
    self.currentMarket(market);
    console.log(self.currentMarket().marketName(), self.currentMarket().address());
  }

  // Visitor clicks Enter New Zip Code button, and app is reset so they can
  // try a new zip code.
  this.changeZip = function() {
    self.zip('');
    self.removeMarkers();
    self.marketList.removeAll();
    self.numResults = -1;
    this.marketQuery('');
  }
  // Called by loadMarketDetails to create a marker, then it gets
  // added to marketList[], the array of Market objects.
  this.addMarker = function(latitude, longitude) {
    marker = new google.maps.Marker({
      map: self.map,
      animation: google.maps.Animation.DROP,
      position: {lat: latitude, lng: longitude}
    });
    // console.log(marker);
    return marker;
  }

  // Called by changeZip when resetting app to remove all the markers.
  this.removeMarkers = function() {
    $.each(self.marketList(), function(i, market) {
      market.marker.setMap(null);
    });
  }

  // Gets market name and ID data from Farmer's Market API
  // and calls loadMarketDetails() to get each market's full details.
  this.loadMarkets = function() {
    self.numResults = 0;

    var loadData = $.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + this.zip(),
      dataType: 'jsonp'
    });
    loadData.done(function(data) {
      var id, marketName;
      self.numResults = $(data.results).length;
      $.each(data.results, function(i, marketData) {
        marketName = marketData.marketname;
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
  // address, schedule, products, latitude and longitude and calls
  // createMarketItem() to put a new Market object in an array for each result.
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
      latitude = parseFloat(latitude);
      longitude = googleLink.slice(googleLink.indexOf(',') + 2, googleLink.indexOf('(') -1);
      longitude = parseFloat(longitude);
      var marker = self.addMarker(latitude, longitude);
      var marketItem = {'marketId' : marketId, 'marketName' : marketName,
          'latitude' : latitude, 'longitude' :longitude, 'address' : address,
          'schedule' : schedule, 'products' : products, 'marker' : marker};
      self.createMarketItem(marketItem);
    });
    loadDetails.fail(function() {
      self.loadMarketDetailsError = "Error Loading Market Details."
    });
  }
}

// Callback function for Google Maps API
var init = function(){
  ko.applyBindings(new AppViewModel());
}

