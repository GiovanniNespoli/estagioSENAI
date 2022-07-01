import React from 'react';

import GlobalStyle from './styles/global'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ToastContainer from './components/ToatContainer';

import { AuthProvider } from './hooks/AuthContext';


const App: React.FC = () => {

  return (
    <>
      <AuthProvider>
        <SignIn />
        {/* <SignUp /> */}
      </AuthProvider>
      
      <ToastContainer />

      <GlobalStyle />
    </>
  )
}



export default App;
