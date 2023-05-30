/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { enableLatestRenderer } from 'react-native-maps';

axios.defaults.baseURL = 'https://ae0b-2001-1c05-3701-c400-641a-b326-fe64-3f9a.ngrok-free.app/';

enableLatestRenderer();

Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'auto',
    locationProvider: Platform.OS === 'android' ? 'playServices' : 'auto'
});

AppRegistry.registerComponent(appName, () => App);
