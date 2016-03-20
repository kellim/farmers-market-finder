var Market = function(data, marker) {
  this.marketId = data.marketId;
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
  // Latitude and Longitude for center of US.
  this.US_LAT = 37.8;
  this.US_LNG = -101.5;

  // Display Google Map on the page.
  this.initializeMap = function()  {
    var mapOptions = {
      center: new google.maps.LatLng(self.US_LAT,self.US_LNG),
      mapTypeControl: false,
      streetViewControl: false,
      zoom: 6
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
  this.sidebarMaximized = ko.observable(true);
  this.bounds = new google.maps.LatLngBounds();
  this.infowindow = new google.maps.InfoWindow({
      content: ''
  });

  // Markets get filtered by entered search filter
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

  // When a visitor selects a market, this sets currentMarket to the
  // market that was clicked on, changes the map icon color, and calls
  // a function to open InfoWindow.
  this.setCurrentMarket = function(market) {
    // First reset the map icon color for previous currentMarket
    if (typeof self.currentMarket().marker !== 'undefined') {
      self.currentMarket().marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
    }
    self.currentMarket(market);
    market.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
    self.openInfoWindow(market.marker);
  }

  // Set the map center and zoom level
  this.setMapLoc = function(lat, lng, zoomLevel) {
    self.map.setCenter({ lat,lng });
    self.map.setZoom(zoomLevel);
  }

  // Visitor clicks Enter New Zip Code button, and app is reset so they can
  // try a new zip code.
  this.changeZip = function() {
    self.zip('');
    self.removeMarkers();
    self.setMapLoc(self.US_LAT, self.US_LNG, 6);
    self.bounds = new google.maps.LatLngBounds();
    self.marketList.removeAll();
    self.numResults = -1;
    this.marketQuery('');
  }

  // Called by loadMarketDetails to create a marker.
  this.addMarker = function(lat, lng) {
    marker = new google.maps.Marker({
      map: self.map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      animation: google.maps.Animation.DROP,
      position: {lat: lat, lng: lng}
    });
    self.bounds.extend(marker.getPosition());
    return marker;
  }

  // Create one Info Window which will get opened by current market.
  this.openInfoWindow = function(marker) {
    var infoWinContent = $("#info-window-container").html();
    self.infowindow.open(self.map, marker);
    self.infowindow.setContent(infoWinContent);
    if (self.sidebarMaximized() && jQuery(window).width() <= 768) {
      self.toggleSidebar();
    }
  }

  // Called by loadMarketDetails after all markers have been placed. It makes the
  // map fit all the markers on it.
  this.goToMarkers = function() {
    self.map.fitBounds(self.bounds);
  }

  // Filter markers as user enters text into search filter box
  this.filterMarkers = function() {
    console.log('filterMarkers');
    $.each(self.marketList(), function(i, market) {
      if (market.marketName().toLowerCase().indexOf(self.marketQuery()) >= 0) {
        market.marker.setVisible(true);
      } else {
        market.marker.setVisible(false);
      }
    });
  }

  // Called by changeZip when resetting app to remove all the markers from the map.
  this.removeMarkers = function() {
    $.each(self.marketList(), function(i, market) {
      market.marker.setMap(null);
    });
  }

  // Toggle the sidebar on and off
  this.toggleSidebar = function() {
    if (self.sidebarMaximized()) {
      self.sidebarMaximized(false);
    } else {
      self.sidebarMaximized(true);
    }
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
      var googleLink = decodeURIComponent(details.marketdetails.GoogleLink);
      // Using regex to remove <br> tags in returned API content.
      var address = $.trim(details.marketdetails.Address.replace(/<br\s*\/?\s*>/g,"\n"));
      var schedule = $.trim(details.marketdetails.Schedule.replace(/<br\s*\/?\s*>/g,"\n"));
      var products = $.trim(details.marketdetails.Products.replace(/<br\s*\/?\s*>/g,"\n"));
      // Remove ';' from the end of schedule if it's there.
      if (schedule.match(';$')) {
          schedule = schedule.slice(0, -1);
      }
      // Replacing the ; separating products with * looks better.
      products = products.replace(/;/g, ' *');
      // Extract latitude and longitude from Google link returned by API.
      var latitude = googleLink.slice(googleLink.indexOf('=') + 1, googleLink.indexOf(','));
      latitude = parseFloat(latitude);
      var longitude = googleLink.slice(googleLink.indexOf(',') + 2, googleLink.indexOf('(') -1);
      longitude = parseFloat(longitude);
      var marker = self.addMarker(latitude, longitude);
      var marketItem = { 'marketId' : marketId, 'marketName' : marketName,
          'latitude' : latitude, 'longitude' : longitude, 'address' : address,
          'schedule' : schedule, 'products' : products, 'marker' : marker };
      self.createMarketItem(marketItem);
      google.maps.event.addListener(marketItem.marker, 'click', (function(marketItem) {
        return function() {
          $.each(self.marketList(), function(i, market) {
            if (market.marketId === marketItem.marketId) {
              self.setCurrentMarket(market);
            }
          });
        }
      })(marketItem));
      var marketListLen = $(self.marketList()).length;
      // Do to AJAX being async, this check has to be done here so we can
      // fit all the map markers on the map once all markers have been
      // placed and added to marketList.
      if (marketListLen === self.numResults) {
        self.goToMarkers();
      }
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

