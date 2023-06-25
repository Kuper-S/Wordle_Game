import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loading from "../UserAuthPages/Loading";

function Profile() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { register, handleSubmit } = useForm();
  const { currentUser, logOut, updateEmail, updatePassword } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      await logOut();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }

    setLoading(false);
  };
  console.log(currentUser.displayName);
  console.log(currentUser.username);

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
    
    promises.push(currentUser.updateProfile({ displayName: data.username }));
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

  return (
    <div className="profile-container">
      
      <img
        className="user-image"
        src="image/UserAvatar.png"
        alt="user"
      />
      <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "50%" }}>
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
          <Form.Label>Change Username </Form.Label>
          <Form.Control
            {...register("username")}
            type="name"
            placeholder="Enter new Username"
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
        <div className="d-flex gap-2 justify-content-center align-items-center">
          <Button type="submit" className="w-100 mt-2" variant="primary">
            Update Profile
          </Button>
          <Button
            className="w-100 mt-2"
            variant="danger"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Profile;
