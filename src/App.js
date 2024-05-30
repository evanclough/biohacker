import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App({ signOut, user }) {

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
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
  </Authenticator>
  );
}

export default App;
