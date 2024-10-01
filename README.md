# 🎬 MovieHub

MovieHub is an interactive movie website built with **React** and **Redux**, where users can explore, search, and filter movies by various criteria, such as category and rating. Users can also view upcoming and trending movies, save their favorites, and see detailed information like trailers, actors, budget, and revenue. All movie data is fetched from a third-party API.

## 🛠️ Features

- **Search Movies**: Search for any movie by title.
- **Filter by Category and Rating**: Narrow down movies based on categories like genre, and filter by rating.
- **Upcoming and Trending Movies**: Discover upcoming blockbusters and trending hits.
- **Save Favorite Movies**: Bookmark your favorite movies to easily revisit later.
- **Detailed Movie Pages**: Get in-depth details such as:
  - Watch trailers
  - View actors and their roles
  - See budget and revenue stats
- **Responsive Design**: Enjoy seamless browsing on any device.

## 🚀 Technologies Used

- **React**: Built with modern React features like hooks (`useState`, `useEffect`, `useMemo`) for managing component state and effects.
- **Redux**: Global state management for managing movie data, search filters, and user saved movies.
- **React Router**: Handles navigation and routing within the app.
- **Redux Thunk**: Used for handling asynchronous actions such as fetching movie data from the API.
- **Movie Database API**: Integration with a third-party API to fetch movie details.
- **CSS Modules**: Scoped CSS for styling components with no class name collisions.
  
## 🔑 Key React Concepts Used

- **React Hooks**: 
  - `useState` for managing local component states.
  - `useEffect` for fetching data and performing side effects.
  - `useMemo` for memoizing expensive computations (e.g., filtering movies).
- **Redux**:
  - Store and actions for centralized global state management.
  - **Reducers** to handle complex state transitions.
  - **Selectors** to efficiently select data from the store.
- **React Router**: Dynamic routing to different pages such as Home, Movie Details, and Saved Movies.

## 🎥 Demo

You can check out a live demo of the project [Youtube Link](https://youtu.be/dct1IEBMP5Y?si=KIEzsunYYx_vCgln)
