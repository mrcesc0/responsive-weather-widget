# Responsive Weather Widget

Create a responsive widget, mobile first (desktop version > 768) that shows the forecasts for the cities of London, Milan, Bangkok, Los Angeles, Nairobi consuming APIs of services like Yahoo, OpenWeatherMap etc...

 - Developed with javascript/jquery (no react). :white_check_mark:
 - No styling frameworks, such as Bootstrap... :white_check_mark:
 - Sass o Less allowed :white_check_mark:

The widget has the following elements:

 - City name :white_check_mark:
 - Temperature in C° :white_check_mark:
 - Condition icons (cloudy, sunny etc) :x: *(Images not provided by Yahoo service. It would take too much time to map 47 conditions as specified in https://developer.yahoo.com/weather/documentation.html#codes)*
 - Weather of the week :white_check_mark:
 - Pagination :white_check_mark:
 - Carousel (no plugin) :white_check_mark:
 - Waves on the bottom that follow the smartphone movements (through gyroscope only on supported devices) :x: (no time for this task)

Example:
[https://cdn.dribbble.com/users/124059/screenshots/2021508/dribbb.gif](https://cdn.dribbble.com/users/124059/screenshots/2021508/dribbb.gif)


## Installation

    npm i

## Development

    npm start
Project will be running at http://localhost:3000/<br/>
(**ESlint** and **Prettier** extensions for vscode are recommended)

## Debugging with Visual Studio Code
Just press **F5** to get the Chrome debugger attached to vscode editor.<br/>
(Be sure to have the **Debugger for Chrome** extension on vscode)

## Build & Serve

    npm run build && npm run serve
The build will be running at http://localhost:5000/<br/>

## Developed & Tested with:
OS: **macOS Catalina Version 10.15.6**<br/>
Browser: **Google Chrome Version 87.0.4280.88 (Build ufficiale) (x86_64)**<br/>
NodeJS: **v12.16.0**<br/>
NPM: **6.14.9**
