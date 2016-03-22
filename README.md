# Concentrator Single Page App, CSPA
Responsive SPA for admin-panel

## Basic functionality
Basic forms are encapsulated in 
> /app/shared

## Extending functionality
Application specific components are encapsulated in 
> /app/concentrator

## Localization


## Styling
Done through

## Build
Production distribution is done through Node and gulp.
> npm install
> gulp build

Development versions start a small testing server *(localhost:4000/#)* with REST dummy *(localhost:4000/REST/)* with livereload *(requires browser plugin)*
> gulp devEnv

Difference between *production* and *development* is the injection of livereload.

### Build Dependencies
Dependencies are listed in *gulpfile.js* and copied 1 for one. 

## Dependencies
### NPM
build dependencies are managed through NPM

### Bower
Front-end dependencies are managed with Bower

###
