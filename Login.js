import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Axios for API requests
import { useUser } from '../store/context/UserContext';
import CustomButton from "../components/CustomButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { setUserId: setUserContextId } = useUser();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error message
    setSuccessMessage(""); // Reset success message

    try {
      // Replace this URL with your actual backend endpoint
      const response = await axios.post("http://192.168.1.170:5000/login", {
        user_name: email,
        password: password,
      });

      // Assume backend returns an ID in the response data
      const userId = response.data.user_id;
      localStorage.setItem("authToken", userId);
      setSuccessMessage(`Login successful! Your ID: ${userId}`);
      // console.log("User ID:", userId);
      setUserContextId(userId);

      navigate('/Ingestion')

      
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
      }}
    >
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <div
            className="p-4 shadow rounded"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h2 className="text-center mb-4" style={{ color: "#6a11cb",fontWeight:'bold' }}>
              Login
            </h2>
            <p className="text-center mb-4 text-muted">
              Login to access your account
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  className="rounded-pill"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  className="rounded-pill"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-center align-items-center">
              {/* <Button
                variant="primary"
                type="submit"
                className="w-50 rounded-pill"
                style={{
                  background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                  border: "none",
                }}
              >
                Login
              </Button> */}
              <CustomButton type="submit">Login</CustomButton>
              </div>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
            <p className="text-center mt-3 text-muted">
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{ color: "#6a11cb", fontWeight: "bold" }}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
