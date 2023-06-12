import React from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
 
const Home = () => {
    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/signin");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log("Failed to sign out " + auth, error)
        });
    }
   
    return(
        <>
            <nav>
                <p>
                    Welcome Home
                </p>
 
                <div>
        			<button onClick={handleLogout}>
                        Logout
                    </button>
        		</div>
            </nav>
        </>
    )
}
 
export default Home;