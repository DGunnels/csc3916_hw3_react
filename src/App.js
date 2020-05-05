import React from 'react';
import './App.css';
import MovieHeader from './components/movieheader.js';
import MovieList from './components/movielist.js';
import MovieHome from './components/moviehome.js';
import Movie from './components/movie.js';
import Authentication from './components/authentication';
import {HashRouter,Route} from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './stores/store'

function App() {
  return (
      <div className="App">
        <Provider store={store}>
          <HashRouter>
            <div className="Wrap">
              <MovieHeader />
              <Route exact path="/" render={()=><MovieHome />}/>
              <Route exact path="/movielist" render={()=><MovieList />}/>
              <Route exact path="/movie/:movieId" render={()=><Movie />}/>
              <Route path="/signin" render={() => <Authentication />} />
              
            </div>
          </HashRouter>
        </Provider>
      </div>
  );
}

export default App;
