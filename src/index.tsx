import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import awsConfig from './aws-exports';
import Amplify from 'aws-amplify';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from './routes/account';
import NotesAppBar from './NotesAppBar';
import HomePage from "./routes/home";
import DiagramPage from "./routes/diagrams";
import BoardsPage from "./routes/boards";
import NotesPage from './routes/notes';
import TaskPage from './routes/tasks';
import AppBarClippedDrawer from './AppBarClippedDrawer';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsConfig.oauth.redirectSignIn.split(",");

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsConfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
  }
}

Amplify.configure(updatedAwsConfig);


ReactDOM.render(
  <React.StrictMode>
    <Authenticator>
      {({signOut, user}) => (
        
        <BrowserRouter>
        <Routes>
          {/* <Route path="/edit" element={<AppBarClippedDrawer />} /> */}
          <Route path="notes/*" element={null} />
          <Route path="/*" element={<NotesAppBar signOut={signOut} />} />
        </Routes>
        <Routes>
          <Route path="notes">
            <Route path=":noteId" element={<NotesPage signOut={signOut}/>} />
            <Route path="" element={<NotesPage signOut={signOut}/>} />
          </Route>
          <Route path="/account" element={<Account />} />
          <Route path="/diagrams" element={<DiagramPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
      )}
    </Authenticator>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
