import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

//redux
import { createStore } from 'redux';
import { compose } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';

const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

const store = createStore(
  moviesApp,
  //defaultState,
  enhancers
);

// Main component (will eventually use all the others)
class CineFactsApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(CineFactsApp), container);