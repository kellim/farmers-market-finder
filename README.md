# Farmers Market Finder

This project uses the Google Maps API and USDA National Farmers Market Directory API to create a mashup where visitors can search for Farmers Markets in the US by entering a zip code, then Farmers Markets near that zip code will be shown on the map. You can click on a marker or an item in the result list to view more info about the market such as address, schedule, and products.

## Demo

Use the app online at https://kellim.github.io/farmers-markets  

![Farmers Market Finder - Animated gif demo](demo/demo.gif)

## Run Project Locally

To run the project locally:
* Clone this repository.
* Update `YOUR_KEY_GOES_HERE` in the following line in `src\index.html` with your [Google Maps JavaScript API key](https://developers.google.com/maps/documentation/javascript/get-api-key):<br>
`<script async defer src="http://maps.googleapis.com/maps/api/js?v=3?key=YOUR_KEY_GOES_HERE&callback=init" onerror="mapLoadError()"></script>`
* Install [Node.js](https://nodejs.org) on your computer if you don't already have it installed.
* Install [Grunt](http://gruntjs.com) on your computer. See the [Getting Started](http://gruntjs.com/getting-started) guide for more information.
* Install the following Grunt Plugins for this project:
  * [cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
  * [uglify](https://github.com/gruntjs/grunt-contrib-uglify)
  * [copy](https://github.com/gruntjs/grunt-contrib-copy)
* The source files to edit are located in the `src` directory. When you make changes to those files that you want to be in your production code, go to the Node.js command prompt and type `grunt`, which will run all of the plugins for this project. All of the files in the `src` directory will be processed and output to the `dist` directory.
* Finally, open `index.html` in the `dist` directory in a web browser.

## Technologies Used
* JavaScript
* [jQuery](https://jquery.com)
* [Bootstrap](http://getbootstrap.com)
* [Knockout](https://knockoutjs.com)

## APIs Used
* [USDA National Farmers Market Directory API](https://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html)
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial)

## Contributions

This project was created as an assignment for the Udacity Front-End Nanodegree, so I will not be accepting any contributions. 

## License

The code in this project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

Note that you will be responsible for following terms of service of the third party APIs used in this app. 


