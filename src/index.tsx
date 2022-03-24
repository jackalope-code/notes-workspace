import { Authenticator } from '@aws-amplify/ui-react';
import React from 'react';
import ReactDOM from 'react-dom';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import Amplify from 'aws-amplify';


Amplify.configure(awsconfig);

ReactDOM.render(
<React.StrictMode>
    <Authenticator>
        {({signOut, user}) => (
            <h1>Hello react app!</h1>
        )}
    </Authenticator>
</React.StrictMode>,
document.getElementById('root'));