import React from 'react';
import * as SplashScreen from 'expo-splash-screen'
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/Store';
import Router from './src/Router';

class App extends React.Component{
  constructor(props) {
    super(props)
  }
  
  componentDidMount(){
    SplashScreen.hideAsync();
  }
  render(){
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;