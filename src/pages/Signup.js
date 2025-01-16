// import React from "react";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";

// const Signup = () => {
//   return (
//     <Container
//       className="d-flex align-items-center justify-content-center"
//       style={{
//         height: "100vh",
//         // background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
//       }}
//     >
//       <Row className="w-100">
//         <Col md={6} className="mx-auto">
//           <div
//             className="p-4 shadow rounded"
//             style={{
//               background: "rgba(255, 255, 255, 0.9)",
//               backdropFilter: "blur(10px)",
//             }}
//           >
//             <h2
//               className="text-center mb-4"
//               style={{ color: "#6a11cb", fontWeight: "bold" }}
//             >
//               Create Your Account
//             </h2>
//             <p className="text-center mb-4 text-muted">
//               Join us and start your journey!
//             </p>
//             <Form>
//               <Form.Group controlId="formBasicName" className="mb-3">
//                 <Form.Label>User Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your user name"
//                   className="rounded-pill"
//                 />
//               </Form.Group>
//               {/* <Form.Group controlId="formBasicEmail" className="mb-3">
//                 <Form.Label>Email Address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter your email"
//                   className="rounded-pill"
//                 />
//               </Form.Group> */}
//               <Form.Group controlId="formBasicPassword" className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Enter your password"
//                   className="rounded-pill"
//                 />
//               </Form.Group>
//               <div className="d-flex justify-content-center align-items-center">
//               <Button
//                 variant="success"
//                 type="submit"
//                 className="w-50 rounded-pill"
//                 style={{
//                   // background: "linear-gradient(135deg, #ff6f61 0%, #ff9a9e 100%)",
//                   background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
//                   border: "none",
//                 }}
//               >
//                 Sign Up
//               </Button>
//               </div>
//             </Form>
//             <p className="text-center mt-3 text-muted">
//               Already have an account?{" "}
//               <Link
//                 to="/"
//                 style={{
//                   color: "#6a11cb",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Login
//               </Link>
//             </p>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Signup;







import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import CustomButton from "../components/CustomButton";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const data = { user_name: userName, password };

    try {
      const response = await axios.post("http://192.168.1.170:5000/signup", data);

      if (response.status === 201) {
        setSuccessMessage("Signup successful! Welcome aboard!");
        setErrorMessage("");
      }
    } catch (error) {
      if (error.response) {
        // Handle known errors (like user already exists)
        if (error.response.status === 409) {
          setErrorMessage(error.response.data.message || "User already exists.");
        } else {
          setErrorMessage("Signup failed. Please try again.");
        }
      } else {
        // Handle network or other unknown errors
        setErrorMessage("An error occurred. Please try again later.");
      }
      setSuccessMessage("");
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
            <h2
              className="text-center mb-4"
              style={{ color: "#6a11cb", fontWeight: "bold" }}
            >
              Create Your Account
            </h2>
            <p className="text-center mb-4 text-muted">
              Join us and start your journey!
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName" className="mb-3">
                <Form.Label>Enter Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Email"
                  className="rounded-pill"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  className="rounded-pill"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {errorMessage && (
                <p className="text-center text-danger">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-center text-success">{successMessage}</p>
              )}
              <div className="d-flex justify-content-center align-items-center">
                {/* <Button
                  variant="success"
                  type="submit"
                  className="w-50 rounded-pill"
                  style={{
                    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                    border: "none",
                  }}
                >
                  Sign Up
                </Button> */}
                <CustomButton type="submit">Sign Up</CustomButton>
              </div>
            </Form>
            <p className="text-center mt-3 text-muted">
              Already have an account?{" "}
              <Link
                to="/"
                style={{
                  color: "#6a11cb",
                  fontWeight: "bold",
                }}
              >
                Login
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
