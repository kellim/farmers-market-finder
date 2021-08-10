This project was created for Udacity's Front End Nanodegree several years ago when they taught Knockout. Some people have contacted me about this project who are using it for learning purposes and have had trouble with getting the Google Maps API setup for free. See the latest that I found out about this under the "APIs Used" section below, but I can't guarantee it will still work so I am archiving this project.

# Farmers Market Finder

This project uses the Google Maps API and USDA National Farmers Market Directory API to create a mashup where visitors can search for Farmers Markets in the US by entering a zip code, then Farmers Markets near that zip code will be shown on the map. You can click on a marker or an item in the result list to view more info about the market such as address, schedule, and products.

## Demo

Use the app online at https://farmersmarkets.kelli.app

![Farmers Market Finder - Animated gif demo](demo/demo.gif)

## Run Project Locally

Assumes local installation of [Node.js](https://nodejs.org)

To run the project locally:

* Clone or fork this repository.
* Update `YOUR_KEY_GOES_HERE` on the following line (right above the closing body tag) in `src\index.html` with your [Google Maps JavaScript API key](https://developers.google.com/maps/documentation/javascript/get-api-key):<br>
`<script async defer src="http://maps.googleapis.com/maps/api/js?v=3?key=YOUR_KEY_GOES_HERE&callback=init" onerror="mapLoadError()"></script>`  
__Note: Google now requires a billing account to be setup for using the Google Maps API. See [Get Started with Google Maps Platform](https://developers.google.com/maps/gmp-get-started) for more information.__
* Run `npm install`
* Run `npm run build` (Also run this after changes are made to code in the `src` directory - the production code will then be output to a `dist` directory.)
* Open `index.html` in the `dist` directory in a web browser.

## Technologies Used
* JavaScript
* [jQuery](https://jquery.com)
* [Bootstrap](http://getbootstrap.com)
* [Knockout](https://knockoutjs.com)
* [Grunt](http://gruntjs.com)
  * Grunt Plugins:
    * [cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
    * [uglify](https://github.com/gruntjs/grunt-contrib-uglify)
    * [copy](https://github.com/gruntjs/grunt-contrib-copy)


## APIs Used
* [USDA National Farmers Market Directory API](https://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html) - No API Key needed, but see [API Terms of Service](https://search.ams.usda.gov/farmersmarkets/v1/APITOS.html) which has text for the required attribution.
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial) - a [Google Maps JavaScript API key](https://developers.google.com/maps/documentation/javascript/get-api-key) is required.  
__Note: Google now requires a billing account to be setup for using the Google Maps API. See [Get Started with Google Maps Platform](https://developers.google.com/maps/gmp-get-started) for more information.__

Note: If you put the project online, you should restrict the websites that the Google Maps JavaScript API key will work on since this is a Front-End only app and the key will be visible in the source code. To do this, go to your project in the [Google Cloud Console](https://console.cloud.google.com) and under APIs & Services > Credentials > Choose API Key: look under Application restrictions > Website restrictions where you can add websites that the key will work on.

## License

The code in this project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

Note that you will be responsible for following terms of service of the third party APIs used in the code. 


