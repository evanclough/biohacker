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

  const components = {
    Header() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Activity size={50}/>
          <Text>biohacker</Text>
        </View>
      );
    },
    Footer() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>
             &copy; 2024 Evan Clough - This web app is licensed under the <a href="https://www.gnu.org/licenses/gpl-3.0.html">GPLv3</a>.
          </Text>
        </View>
      );
    }
  };

  const formFields = {
   signUp: {
      email: {
          order:1
      },
      preferred_username: {
          order: 2
      },
      name: {
          order: 3
      },
      password: {
          order: 4
      },
      confirm_password: {
          order: 5
      }
   },
  };

  return (
    <Authenticator components={components} style = {{color: "black"}} formFields={formFields} signUpAttributes={['email', 'name', 'preferred_username', 'password', 'confirm_password']}>
      {({ signOut, user }) => (
        <Biohacker signOut={signOut} user={user} params={params}/>
      )}
  </Authenticator>
  );
}

export default App;
