// import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import "../../App.css";
// import { signInWithGoogle, signInWithEmailAndPassword } from "../../services/firebaseAuth";

// const Login = () => {
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   const handleLogin = () => {
//     signInWithEmailAndPassword(loginEmail, loginPassword);
//   };

//   return (
//     <div className="container-fluid" style={{ marginTop: "10%" }}>
//       <div className="row">
//         <div className="col col-2"></div>
//         <div className="col col-8">
//           <div className="row">
//             <div className="col col-6">
//               <Card>
//                 <Card.Body>
//                   <Card.Title>User Login</Card.Title>
//                   <div>
//                     <Form.Group className="mb-3" controlId="formBasicEmail">
//                       <Form.Label>Email address</Form.Label>
//                       <Form.Control
//                         type="email"
//                         placeholder="Enter email"
//                         value={loginEmail}
//                         onChange={(e) => setLoginEmail(e.target.value)}
//                       />
//                       <Form.Text className="text-muted">
//                         We'll never share your email with anyone else.
//                       </Form.Text>
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formBasicPassword">
//                       <Form.Label>Password</Form.Label>
//                       <Form.Control
//                         type="password"
//                         placeholder="Password"
//                         value={loginPassword}
//                         onChange={(e) => setLoginPassword(e.target.value)}
//                       />
//                     </Form.Group>
//                     <hr style={{ margin: "5%" }} />

//                     <div className="d-grid gap-2">
//                       <Button
//                         variant="outline-success"
//                         type="submit"
//                         onClick={handleLogin}
//                       >
//                         Login
//                       </Button>
//                       <Button
//                         variant="outline-primary"
//                         onClick={signInWithGoogle}
//                       >
//                         <i className="fab fa-google"></i>Sign-in with Google
//                       </Button>
//                     </div>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </div>
//           </div>
//         </div>
//         <div className="col-col-2"></div>
//       </div>
//     </div>
//   );
// };

// export default Login;
// Login.jsx
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { signInWithEmailAndPassword, signInWithGoogle } from "../../services/firebaseAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(email, password);
  };

  return (
    <div className="container-fluid" style={{ marginTop: "10%" }}>
      <div className="row">
        <div className="col col-2"></div>
        <div className="col col-8">
          <div className="row">
            <div className="col col-6">
              <Card>
                <Card.Body>
                  <Card.Title>User Login</Card.Title>
                  <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <hr style={{ margin: "5%" }} />

                    <div className="d-grid gap-2">
                      <Button
                        variant="outline-success"
                        type="submit"
                        onClick={handleLogin}
                      >
                        Login
                      </Button>
                      <Button
                        variant="outline-primary"
                        onClick={signInWithGoogle}
                      >
                        <i className="fab fa-google"></i>Sign-in with Google
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <div className="col-col-2"></div>
      </div>
    </div>
  );
};

export default Login;
