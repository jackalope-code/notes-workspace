import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import awsconfig from './aws-exports';
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
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

console.log("aws config" , awsconfig);
Amplify.configure(awsconfig);


ReactDOM.render(
  <React.StrictMode>
    <Authenticator>
      {({signOut, user}) => (
        
        <BrowserRouter>
        <Routes>
          {/* <Route path="/edit" element={<AppBarClippedDrawer />} /> */}
          <Route path="notes/*" element={null} />
          <Route path="/*" element={<NotesAppBar />} />
        </Routes>
        <Routes>
          <Route path="notes">
            <Route path=":noteId" element={<NotesPage />} />
            <Route path="" element={<NotesPage />} />
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
