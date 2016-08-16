# Farmers Market Finder
This is the _Neighborhood Map_ project for Udacity's Front-End Web Developer Nanodegree. 

This project uses the Google Maps API and USDA National Farmers Market Directory API to create a mashup where visitors can search for Farmers Markets by entering a zip code, then Farmers Markets near that zip code will be shown on the map. You can click on a marker or an item in the result list to view more info about the market such as address, schedule, and products. Technologies used include JavaScript, Knockout, jQuery, HTML, CSS, and Bootstrap.

## View Project Demo Online
View the demo online at https://kellimb.github.io/farmers-markets

## Run Project Locally
Note: I built this project on a Windows 7 PC. Instructions could vary slightly on a different OS.

To run the project locally:
* Download [this repository](https://github.com/kellim/farmers-market-finder) to your machine or Fork the repository. To simply download the files, you can click the `Download Zip` button on the GitHub page for the repository, and then it will download all the files to your computer. You'll need to unzip the files before working with them.
* Update `YOUR_KEY_GOES_HERE` in the following line in `src\index.html` with your [Google Maps JavaScript API key](https://developers.google.com/maps/documentation/javascript/get-api-key):<br>
`<script async defer src="http://maps.googleapis.com/maps/api/js?v=3?key=YOUR_KEY_GOES_HERE&callback=init" onerror="mapLoadError()"></script>`
* Install [Node.js](https://nodejs.org) on your computer if you don't already have it installed.
* Install [Grunt](http://gruntjs.com) on your computer. See the [Getting Started](http://gruntjs.com/getting-started) guide for more information.
* Install the following Grunt Plugins from the Node.js command prompt while you are in the root directory for this project:
  * [cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
  * [uglify](https://github.com/gruntjs/grunt-contrib-uglify)
  * [copy](https://github.com/gruntjs/grunt-contrib-copy)
* The source files to edit are located in the `src` directory. When you make changes to those files that you want to be in your production code, go to the Node.js command prompt and type `grunt`, which will run all of the plugins for this project. All of the files in the `src` directory will be processed and output to the `dist` directory.
* Finally, open `index.html` in the `dist` directory in a web browser.

# Resources
- [Knockout Documentation & Tutorials](http://knockoutjs.com)
- [todomvc.com - Knockout.js Example](http://todomvc.com/examples/knockoutjs)
- [Knockout Live Search Example on jsfiddle.net](https://jsfiddle.net/mythical/XJEzc)
- [Bootstrap Documentation](http://getbootstrap.com/)
- [jQuery Documentation](http://api.jquery.com/)
- [Google Maps JavaScript API Documentation](https://developers.google.com/maps/documentation/javascript)
- [Google Maps API: Get Started course on Pluralsight](https://www.pluralsight.com/courses/google-maps-api-get-started)
- [appswithmaps.net - Latitude and Longitude Finder](http://appswithmaps.net/gmaps/latlongfinder/index.html) - this lets you zoom into a place on Google Maps, then click on the `Create MapOptions for this Location` button to get mapOptions for it including the zoom level, latitude, and longitude.
- [USDA National Farmers Market Directory API Documentation](http://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html)
- [Stack Overflow - How to give text or an image a transparent background using CSS?](http://stackoverflow.com/questions/806000/how-to-give-text-or-an-image-a-transparent-background-using-css)
- [felix-kling.de - How to return data from an Ajax call?](http://felix-kling.de/blog/2011/01/14/how-to-return-data-from-an-ajax-call/)
- [Stack Overflow - Google Maps API v3: How to remove all markers?](http://stackoverflow.com/questions/1544739/google-maps-api-v3-how-to-remove-all-markers)
- [Stack Overflow - Knockout JS: Stop divs binded to visible: from flashing on screen](http://stackoverflow.com/questions/12775766/knockout-js-stop-divs-binded-to-visible-from-flashing-on-screen)
- [Stack Overflow - Binding KnockoutJS to Google Maps InfoWindow content](http://stackoverflow.com/questions/31970927/binding-knockoutjs-to-google-maps-infowindow-content)
- [davidjmcclelland.com - Google Maps: Set Zoom to Fit All Markers](http://www.davidjmcclelland.com/?p=2328)
- [knockmeout.net - Knockout.js Troubleshooting Strategies](http://www.knockmeout.net/2013/06/knockout-debugging-strategies-plugin.html)
- [Stack Overflow - Javascript, Change google map marker color](http://stackoverflow.com/questions/11064081/javascript-change-google-map-marker-color)
- [Stack Overflow - Is it possible to data-bind visible to the negation (“!”) of a boolean ViewModel property?](http://stackoverflow.com/questions/10114472/is-it-possible-to-data-bind-visible-to-the-negation-of-a-boolean-viewmodel)
- [kodingmadesimple.com - Twitter Bootstrap Search Box with Icon in NavBar Example](http://www.kodingmadesimple.com/2015/04/twitter-bootstrap-search-box-icon-navbar.html) 
- [StackOverflow - jQuery ajax (jsonp) ignores a timeout and doesn't fire the error event](http://stackoverflow.com/questions/1002367/jquery-ajax-jsonp-ignores-a-timeout-and-doesnt-fire-the-error-event)
