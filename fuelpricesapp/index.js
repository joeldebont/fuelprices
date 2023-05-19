/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5179/';

Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'auto',
    locationProvider: 'auto'
});

AppRegistry.registerComponent(appName, () => App);
