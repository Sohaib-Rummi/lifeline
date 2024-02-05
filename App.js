import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Route from './src/app/navigations/Route';
import { AuthContentApi } from './src/app/api/AuthContentApi';
import { AppContentApi } from './src/app/api/AppContentApi';
import { enableLatestRenderer } from 'react-native-maps';
import Toast from 'react-native-toast-message';
enableLatestRenderer();
const App = () => {
  return (
    <AuthContentApi>
      <AppContentApi>
        <Route />
        <Toast
          position='bottom'
        />
      </AppContentApi>
    </AuthContentApi>
  );
}



export default App;
