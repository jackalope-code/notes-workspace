import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator} from '@aws-amplify/ui-react';
import './App.css';
import { setEnvironmentData } from 'worker_threads';
import { access } from 'fs';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import '@aws-amplify/ui-react/styles.css';
import { Link } from 'react-router-dom';
import { AuthProps } from './routes/account';
import NotesAppBar from './NotesAppBar';


function App() {
  // user.signInUserSession.accessToken.jwtToken
  // if (!isPassedToWithAuthenticator) {
  //   throw new Error(`isPassedToWithAuthenticator was not provided from Amplify withAuthenticator wrapper.`);
  // }
  const [accessToken, setAccessToken] = useState<String | null>(null);


  return (
    <div>This App component should not be used anymore.</div>
  );
}

export default App;

//export default App;
