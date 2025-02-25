// import React, { useState } from "react";
// import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import CustomButton from "../components/CustomButton";

// const Signup = () => {
//   const [Email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     if (!validateForm()) return;
//     setLoading(true);

//     const data = { user_name: Email, password };

//     try {
//       const response = await axios.post("http://192.168.1.164:5000/signup", data);

//       if (response.status === 201) {
//         setSuccessMessage("Signup successful! Welcome aboard!");
//         setErrorMessage("");
//       }
//     } catch (error) {
//       if (error.response) {
//         // Handle known errors (like user already exists)
//         if (error.response.status === 409) {
//           setErrorMessage(error.response.data.message || "User already exists.");
//         } else {
//           setErrorMessage("Signup failed. Please try again.");
//         }
//       } else {
//         // Handle network or other unknown errors
//         setErrorMessage("An error occurred. Please try again later.");
//       }
//       setSuccessMessage("");
//     }finally{
//       setLoading(false);
//     }
//   };


//   const validateForm = () => {
//     // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userName)) {
//     //   setErrorMessage("Please enter a valid email address.");
//     //   return false;
//     // }

//     if (!Email.includes("@")) {
//       setErrorMessage("Email must include '@'");
//       return false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
//       setErrorMessage("Please enter a valid email address.");
//       return false;
//     } else {
//       setErrorMessage(""); // Clear the error when email is valid
//     }

//     if (password.length < 8) {
//       setErrorMessage("Password must be at least 8 characters long.");
//       return false;
//     }
//     return true;
//   };

//   return (
//     <Container
//       className="d-flex align-items-center justify-content-center"
//       style={{
//         height: "100vh",
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
//             <Form onSubmit={handleSubmit}>
//               <Form.Group controlId="formBasicName" className="mb-3">
//                 <Form.Label>Enter Email</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your Email"
//                   className="rounded-pill"
//                   value={Email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formBasicPassword" className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Enter your password"
//                   className="rounded-pill"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </Form.Group>
//               {errorMessage && (
//                 // <p className="text-center text-danger">{errorMessage}</p>
//                  <Alert variant="danger" className="mt-3">{errorMessage}</Alert>
               
//               )}
//               {successMessage && (
//                 // <p className="text-center text-success">{successMessage}</p>
//                 <Alert variant="success" className="mt-3">{successMessage}</Alert>
//               )}
//               <div className="d-flex justify-content-center align-items-center">
//                 {/* <Button
//                   variant="success"
//                   type="submit"
//                   className="w-50 rounded-pill"
//                   style={{
//                     background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
//                     border: "none",
//                   }}
//                 >
//                   Sign Up
//                 </Button> */}
//                 {/* <CustomButton type="submit">Sign Up</CustomButton> */}
//                 <CustomButton type="submit" disabled={loading}>
//                     {loading ? "Signing Up..." : "Sign Up"}
//                 </CustomButton>
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






import React, { use, useState, } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { colors } from "../components/style/Colors";

const Signup = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const data = { user_name: Email, password };

    try {
      const response = await axios.post("http://192.168.1.160:5000/signup", data);

      if (response.status === 201) {
        setSuccessMessage("Signup successful! Welcome aboard!");
        setErrorMessage("");
        // Navigate("/")
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setErrorMessage(error.response.data.message || "User already exists.");
        } else {
          setErrorMessage("Signup failed. Please try again.");
        }
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
      setSuccessMessage("");
      
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    // Enhanced email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!Email.includes("@")) {
      setErrorMessage("Email must include '@'.");
      return false;
    } else if (Email.includes("..") || Email.includes("@@")) {
      setErrorMessage("Email cannot contain consecutive '.' or '@'.");
      return false;
    } else if (Email.startsWith(".") || Email.endsWith(".")) {
      setErrorMessage("Email cannot start or end with '.'.");
      return false;
    } else if (!emailPattern.test(Email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    } else {
      setErrorMessage("");
    }

    // Enhanced password validation
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character."
      );
      return false;
    }

    return true;
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        fontFamily:colors.fontFamily1,
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
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <Alert variant="danger" className="mt-3">
                  {errorMessage}
                </Alert>
              )}
              {successMessage && (
                <Alert variant="success" className="mt-3">
                  {successMessage}
                </Alert>
              )}
              <div className="d-flex justify-content-center align-items-center">
                <CustomButton type="submit" disabled={loading}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </CustomButton>
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
