# Farmers Market Finder

This project uses the Google Maps API and USDA National Farmers Market Directory API to create a mashup where visitors can search for Farmers Markets in the US by entering a zip code, then Farmers Markets near that zip code will be shown on the map. You can click on a marker or an item in the result list to view more info about the market such as address, schedule, and products.

## Demo

Use the app online at https://farmersmarkets.kelli.app/

![Farmers Market Finder - Animated gif demo](demo/demo.gif)

## Run Project Locally

Assumes local installation of [Node.js](https://nodejs.org)

To run the project locally:

* Clone or fork this repository.
* Update `YOUR_KEY_GOES_HERE` on the following line (right above the closing body tag) in `src\index.html` with your [Google Maps JavaScript API key](https://developers.google.com/maps/documentation/javascript/get-api-key):<br>
`<script async defer src="http://maps.googleapis.com/maps/api/js?v=3?key=YOUR_KEY_GOES_HERE&callback=init" onerror="mapLoadError()"></script>`
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
* [USDA National Farmers Market Directory API](https://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html) - No API Key needed
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial) - a [Google Maps JavaScript API key](https://developers.google.com/maps/documentation/javascript/get-api-key) is required. Note: You can go to the "Application Restrictions" settings and restrict the websites that your key will work on.  

## License

The code in this project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

Note that you will be responsible for following terms of service of the third party APIs used in the code. 


