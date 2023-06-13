// import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import "../../App.css";
// import {
//   signInWithGoogle,
//   signInWithEmailAndPassword,
//   registerWithEmailAndPassword
// } from "../../services/firebaseAuth";


// const Login = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
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
//                         onClick={() => {
//                           signInWithEmailAndPassword(loginEmail, loginPassword);
//                         }}
//                       >
//                         Login
//                       </Button>
//                       <Button
//                         variant="outline-primary"
//                         onClick={signInWithGoogle}
//                       >
//                         <i className="fab fa-google"></i>Sign-in with Goolge
//                       </Button>
//                     </div>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </div>
//             <div className="col col-6">
//               <Card>
//                 <Card.Body>
//                   <Card.Title>User Registration</Card.Title>
//                   <Card.Text>First time visiting? register Here</Card.Text>
//                   <div>
//                     <Form.Group className="mb-3" controlId="formBasicName">
//                       <Form.Label>User Name</Form.Label>
//                       <Form.Control
//                         type="name"
//                         placeholder="Enter name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                       />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="formBasicEmail">
//                       <Form.Label>Email address</Form.Label>
//                       <Form.Control
//                         type="email"
//                         placeholder="Enter email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                       />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formBasicPassword">
//                       <Form.Label>Password (needs to be more then 6 charcters long)</Form.Label>
//                       <Form.Control
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                       />
//                     </Form.Group>
//                     <hr style={{ margin: "5%" }} />

//                     <div className="d-grid gap-2">
//                       <Button
//                         variant="outline-danger"
//                         type="submit"
//                         onClick={() => {
//                           registerWithEmailAndPassword(name, email, password);
//                         }}
//                       >
//                         Register
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
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../App.css";
import {
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword
} from "../../services/firebaseAuth";


const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </Form.Group>
                    <hr style={{ margin: "5%" }} />

                    <div className="d-grid gap-2">
                      <Button
                        variant="outline-success"
                        type="submit"
                        onClick={() => {
                          signInWithEmailAndPassword(loginEmail, loginPassword);
                        }}
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
            <div className="col col-6">
              <Card>
                <Card.Body>
                  <Card.Title>User Registration</Card.Title>
                  <Card.Text>First time visiting? Register Here</Card.Text>
                  <div>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>User Name</Form.Label>
                      <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
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
                      <Form.Label>Password (needs to be more than 6 characters long)</Form.Label>
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
                        variant="outline-danger"
                        type="submit"
                        onClick={() => {
                          registerWithEmailAndPassword(name, email, password);
                        }}
                      >
                        Register
                      </Button>
                      <Button
                        variant="outline-primary"
                        onClick={signInWithGoogle}
                      >
                        <i className="fab fa-google"></i>Register with Google
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
