import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
 
const SignupPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    
    const onSubmit = async (e) => {
      e.preventDefault()
      
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }
    const handleGoogleSignUp = async () => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
    
      try {
        await signInWithPopup(auth, provider);
        console.log('signInWithPopup', provider , user);
        navigate('/');
      } catch (error) {
        console.log('Error signing up with Google:', error.message);
      }
    };
    
 
  return (
    <main >        
        <section>
            <div>
                <div>                  
                    <h1> FocusApp </h1>                                                                            
                    <form>                                                                                            
                        <div>
                        
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"                                
                            />
                        </div>

                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>                                             
                        
                        <button
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Sign up                                
                        </button>
                        <button onClick={handleGoogleSignUp}>Sign Up with Google</button>                                            
                    </form>
                    <p>
                        Already have an account?{' '}
                        <NavLink to="/signin" >
                            Sign in
                        </NavLink>
                    </p>                   
                </div>
            </div>
        </section>
    </main>
  )
}
 
export default SignupPage