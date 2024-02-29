/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigation from './src/navigation/Navigation';
import { RootSiblingParent } from 'react-native-root-siblings';

function App(): JSX.Element {
  return (
    <RootSiblingParent>
      <Navigation />
    </RootSiblingParent>
  );
}

export default App;
