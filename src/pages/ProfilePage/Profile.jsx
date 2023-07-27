import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom";
import Loading from "../UserAuthPages/Loading";
import { auth, firestore } from "../../services/firebase";

function Profile() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { register, handleSubmit } = useForm();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  console.log(currentUser.displayName);
  
  console.log('HERE PROFILE');
  
  

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return setError("password not match");
    }
  
    const promises = [];
    setLoading(true);
    setError("");
  
    if (currentUser.email !== data.email) {
      promises.push(updateEmail(data.email));
    }
    if (data.password) {
      promises.push(updatePassword(data.password));
    }
    if (currentUser.displayName !== data.username) {
      promises.push(
        auth.currentUser.updateProfile({ displayName: data.username })
      );
  
     
      const userRef = firestore.collection("users").doc(currentUser.uid);
      promises.push(userRef.update({ displayName: data.username }));
    }
    
    Promise.all(promises)
      .then(() => {
        setMessage("Profile changed successfully");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const handleToHomePage = async () => {
    navigate('/home');
  };
  

  
  return (
    <div className="profile-container">
      <h2>{currentUser?.displayName}</h2>
      <img
        className="user-image"
        src="image/UserAvatar.png"
        alt="user"
      />
      <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "80%" }}>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        {loading && <Loading />}
        <Form.Group className="my-3">
          <Form.Label>Update Password</Form.Label>
          <Form.Control
            {...register("password")}
            type="password"
            placeholder="Enter new Password"
          />
        
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label>Change Username </Form.Label>
          <Form.Control
            {...register("username")}
            type="name"
            placeholder="Enter new Username"
          />
        </Form.Group>
        
        <div className="d-xl-grid gap-2 justify-content-center">
          <Button type="submit" variant="primary" >
          Update Profile
          </Button>
          <Button variant="success" onClick={handleToHomePage} >
            HOME
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Profile;
