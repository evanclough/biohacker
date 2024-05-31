import { 
  Authenticator,
  useTheme,
  Text,
  Image,
  View,
 } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import Biohacker from './Biohacker';

import { Outlet } from "react-router-dom";
import { Activity } from 'react-feather';

function App(params) {

  return (
      <Biohacker signOut={{}} user={{}} params={params}/>
  );
}

export default App;
