import React, { useContext } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation} from 'react-router-dom';

//facebook sign in




const Login = () => {

 const [loggedInUser, setLoggedInUser] = useContext(userContext);


 const history = useHistory();
 const location = useLocation();
 let { from } = location.state || { from: { pathname: "/" } };


  //google sign in
  const app = initializeApp(firebaseConfig);
    const handleGoogleSingIn = () =>{
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
     
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const {displayName, email} = result.user;
     const signedInUser = {name : displayName, email};
     setLoggedInUser(signedInUser);
     history.replace(from)
    // ...
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });


  //facebook sign in



    }


    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={ handleGoogleSingIn}>Google sign in</button><br/>
        </div>
    );
};

export default Login;