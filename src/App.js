import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Biohacker from './Biohacker';

import { Outlet } from "react-router-dom";

function App(params) {

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
    <Authenticator formFields={formFields} signUpAttributes={['email', 'name', 'preferred_username', 'password', 'confirm_password']}>
      {({ signOut, user }) => (
        <Biohacker signOut={signOut} user={user} params={params}/>
      )}
  </Authenticator>
  );
}

export default App;
