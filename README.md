# Project Documentation


## PCCW Weather app project
Senior Frontend Engineer Technical Assessment


Production status: [![Netlify Status](https://api.netlify.com/api/v1/badges/258deb66-88de-47dc-b283-ce6ebf9ba25c/deploy-status)](https://app.netlify.com/sites/weather-app-pccw/deploys)


Website domain: https://weather-app-pccw.netlify.app/


### Features implemented

- Form for the user input to enter the town/city.
- Fetch weather data from WeatherAPI based on user input.
- User input is cleared on every search submission.
- User input validations: field is required, max search length is limited to 30 characters.
- Display weather information: temperature, weather description,humidity, UV (_this is an extra value_),
and wind speed.
- Error handling for invalid inputs (_client-side_) or API request failures (_server-side_).
- Applied styling for a clean and user-friendly interface.
- Used illustrations for no data or error handling.
- Used icons and images to decorate weather information.

#### Search History: 

- Display all previously searched cities in a dropdown list. Clicking on a city displays its weather information. In addition, previous searches are filtered by user input to reduce dropdown list size and improve UX.
- Users can clear their search history by clicking the clear history button.
- Search history data is saved in local storage, and the application store is hydrated on init using the existing data from local storage.

#### Favorite Cities: 

- Users can add cities as favorites and quickly preview them. Users can load more information by selecting their favorite city. Users can delete their preferred city from the list by clicking the remove button.
- If at least one favorite city has been saved, the online application will begin by loading the most recent saved city data.
- Data for the favorite city list is updated on the application's initial load.
- Favorites list data is saved in local storage, and the application store is hydrated on init with the existing data from local storage.


### Technologies used

- Tailwind and SCSS
- Axios
- Typescript
- React & Vite
- Redux toolkit
- Redux-thunks
- Local Storage
- Vitest
	- React ting library
- SEO
	- Semantic html
	- CSP rules meta tag
- Eslint and prettier configuration including pre-commit checks using husky and lint-staged
- Git rebase strategy and conventional commits to keep git history polished and clean.
- NVM (secure node version)

Notes: 
 - No CI/CD workflows implemented since this is not going to be set on a real cloud server.
 - Recent search history also saves values that may produce "no location found" error. 
 - Website is not indexable by search engine crawlers

### Project Architecture
<img src="https://res.cloudinary.com/dvyxq82nf/image/upload/v1719839396/ibuxesbmwpezigejq67x.png" />

### Localhost setup steps 

1. Navigate to the project directory and create local environmental variables
```
cp env-local-demo .env.local
```
2. Install the dependencies using the following command:
```
npm install
```
3. Build the project using the following command:
```
npm run build
```
4. Start the project using the following command:
```
npm run preview
```
5. Open the browser and navigate to http://localhost:4173
6. The web app will now be running on localhost.

## Project development


### Development

1. Install the dependencies using the following command:
```
npm install
```
2. Start the development server using the following command:
```
npm run dev
```
3. Open the browser and navigate to http://localhost:3000

### Run tests

1. Navigate to the project directory
2. Install the dependencies using the following command:
```
npm install
```
3. Run the tests using the following command:
```
npm run test
```
4. The tests will now be executed and the results will be displayed in the console.


### Proposed Feature: 

We utilize the Navigator Browser API (https://w3c.github.io/geolocation/#dom-navigator-geolocation) to get latitude and longitude of the user. Then we can fetch the current user's location by utilizing the weather api domain https://api.weatherapi.com/?q=lat,long. This way we can get the weather data of the user's current location on initial application render.