import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src/App';

require('react-native').unstable_enableLogBox();

AppRegistry.registerComponent(appName, () => App);
