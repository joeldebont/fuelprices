/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { enableLatestRenderer } from 'react-native-maps';

axios.defaults.baseURL = 'https://3244-94-168-74-58.ngrok-free.app/';

enableLatestRenderer();

Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'auto',
    locationProvider: Platform.OS === 'android' ? 'playServices' : 'auto'
});

AppRegistry.registerComponent(appName, () => App);
