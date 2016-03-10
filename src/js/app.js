

var AppViewModel = function() {
  var self = this;
  self.zip = ko.observable('');

  this.getMarketData = function() {
  console.log(this.zip());
  var marketDataArr = [];
  var marketsURL = "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + this.zip();
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: marketsURL,
        dataType: 'jsonp',
        success: function(data) {
          var id, name, address, schedule, googleLink, products;
          $.each(data.results, function(index, marketData) {
            name = marketData.marketname;
            console.log(marketData.marketname);
            getMarketDetails(marketData, name);
          });
        }
    });

    getMarketDetails = function(marketData, name) {
      id = marketData.id;
      $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,
        dataType: 'jsonp',
        success: function(marketDetails) {
          googleLink = marketDetails.marketdetails.GoogleLink;
          address = marketDetails.marketdetails.Address;
          schedule = marketDetails.marketdetails.Schedule;
          products = marketDetails.marketdetails.Products;
          marketDataArr.push({'name' : name, 'googleLink' : googleLink, 'address' : address, 'schedule' : schedule,
                            'products' : products});
          console.log(marketDataArr);
        }
      });
    }
  }
}

ko.applyBindings(new AppViewModel());
