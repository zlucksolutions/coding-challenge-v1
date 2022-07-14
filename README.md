# Space X

This is a sample demo app to display the past launches.

## Features

- List past launches with infinite scroll
- Search past launches by misison name or rocket name
- View all the details of launch
- Compare any two launches

## Run

Before running the project make sure to install the packages

```sh
npx install
or
yarn install
```

**Run the project**
For Android:

```sh
npx react-native run-android
```

For iOS:

```sh
npx react-native run-ios
```

## What more can be done?

With some more amount of time we could have been able to implement search from GraphQL server and also, there are lot of details available for every launches. With some more time would also have been able to implement the tailwind css, as well as display some more information regarding the launches.

## Problems encountered

After making initial road map and project structure for the SpaceX app, faced issues regarding the filter/search using GraphQL query instead of the local search. Also, queries getting failed when try getting first stage data of rocket was an enormous obstacle.

## License

MIT
