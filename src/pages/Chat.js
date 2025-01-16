
// import React, { useState, useEffect, useRef } from "react";
// import {CiLight,CiSettings,CiHome,CiUser,CiCloudMoon,CiCalendar,CiDatabase,CiExport} from 'react-icons/ci'
// import {
//   Container,
//   Row,
//   Col,
//   Dropdown,
//   Button,
//   Form,
//   Spinner,
//   InputGroup,
//   Card,
// } from "react-bootstrap";
// import axios from "axios";
// import { colors } from "../components/style/Colors";
// import { useUser } from "../store/context/UserContext"
// import Navbar from '../components/Navbar'

// const PrivateGPTPage = () => {
//   const [databases, setDatabases] = useState([]); // List of databases
//   const [sessions, setSessions] = useState([]); // List of sessions for the selected database
//   const [selectedDatabase, setSelectedDatabase] = useState(""); // Selected database
//   const [selectedSession, setSelectedSession] = useState(""); // Selected session ID
//   const [fileType, setFileType] = useState("JSON"); // File export type
//   const [question, setQuestion] = useState(""); // Input question
//   const { userId } = useUser();
//   const [wholedatabase,setWholeDatabase]=useState([])
  


//   const [data, setData] = useState([]); // State to store JSON data
//   const [newQuery, setNewQuery] = useState(""); // State for new query
//   const [newAnswer, setNewAnswer] = useState(""); // State for new answer
//   const [isDarkMode, setIsDarkMode] = useState(false); // Set initial theme state to dark mode

//   const userI = userId ? userId.toString() : null;

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode); // Toggle between light and dark modes
//   };

//   const chatEndRef = useRef(null);


//   const handleLogout = () => {
//     // Clear authentication data (e.g., token)
//     localStorage.removeItem("authToken"); // Clear token from local storage
//     // sessionStorage.removeItem("authToken"); // Clear token from session storage (if used)
    
//     // Redirect to login page
//     window.location.href = "/";
//   };

//   // Fetch all databases on component mount
//   useEffect(() => {

//     if (!userI) {
//       console.error("User ID is not defined");
//       return;
//     }
  
//     const payload = {
//       user_id: userI,  // Send the user_id as part of the JSON body
//     };
  
//     axios
//       .post("http://192.168.0.111:5000/databases", payload, {
//         headers: {
//           "Content-Type": "application/json",  // Set content type as JSON
//         },
//       })
//       .then((res) => {
//         setWholeDatabase(res.data.databases)
//         const databaseNames = res.data.databases.map((db) => db.database_name);
//         setDatabases(databaseNames); // Update state with database names
//         console.log("Database names:", databaseNames);
//       })
//       .catch((err) => {
//         console.error("Error fetching databases:", err);
//         // setUploadError("Failed to fetch databases. Please try again later.");
//       });
//   }, []);



//   useEffect(() => {
//     if (selectedDatabase) {
//       const payload = {
//         user_id: userI,  // Send the user_id as part of the JSON body
//       };
      
//       axios
//         .post("http://192.168.0.111:5000/get_sessions_by_user_id", payload, {
//           headers: {
//             "Content-Type": "application/json", // Specify the content type as JSON
//           },
//         })
//         .then((response) => {
//           setSessions(response.data.sessions)
//           console.log("Response data:", response.data); // Handle the response
//         })
//         .catch((error) => {
//           console.error("Error sending request:", error); // Handle errors
//         });
//     }
//   }, [selectedDatabase]);


//   const handleSessionSelect = async (event) => {
//     const sessionId = event.target.value;
//     setSelectedSession(sessionId);
  
//     try {
//       const res = await axios.get(`http://localhost:5000/api/sessions/${sessionId}`);
//       setData(res.data.queries); // Update the conversation with session queries
//     } catch (err) {
//       console.error("Error fetching session data:", err);
//     }
//   };
  
//   const handleAddQuery = async (e) => {
//     e.preventDefault();
  
//     // if (!selectedSession) {
//     //   alert("Please select a session first.");
//     //   return;
//     // }

//     // console.log(question)
    
//     const selectedDb = wholedatabase.find(db => db.database_name === selectedDatabase);
//     // console.log(selectedDb.database_id)
//     console.log(selectedDatabase)
//     console.log(selectedSession)
//     try {
//       const res = await axios.post(
//         `http://192.168.0.111:5000/get-answer`,
//       {query:question,user_id:userI,
//         session_id: selectedSession,
//         database_id: selectedDb.database_id}
//       );
//       setData(res.data); // Update the local state with the updated session data
//       setNewQuery(""); // Clear the form
//       setNewAnswer("");
//     } catch (err) {
//       console.error("Error adding query:", err);
//     }
//     console.log(data)
//   };
  
  


//   // Scroll to the bottom of the chat whenever the conversation updates
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [data]);

 
//   // Handle database selection
//   const handleDatabaseSelect = (event) => {
//     const database = event.target.value;
//     console.log(database)
//     setSelectedDatabase(database);
//     setSelectedSession(""); // Reset session selection
//   };

  

//   // Handle exporting session data
//   const handleExport = () => {
//     if (!selectedSession) {
//       alert("Please select a session to export.");
//       return;
//     }

//     alert(`Exporting session as ${fileType}`);
//     // Add export logic if needed
//   };


// return (
//   <div
//     style={{
//       backgroundColor: isDarkMode ? "#121212" : "#fff",
//       color: isDarkMode ? "#fff" : "#121212",
//       minHeight: "100vh",
//       transition: "background-color 0.3s, color 0.3s", // Smooth transition
//     }}
//   >

// {/* <nav
//   className="navbar navbar-expand-lg"
//   style={{
//     backgroundColor: isDarkMode ? "#333" : "#f8f9fa",
//     color: isDarkMode ? "#fff" : "#000",
//     borderBottom: "1px solid #ddd",
//     marginBottom: "1rem",
//   }}
// >
//   <div className="container-fluid">
    
//     <div className="d-flex align-items-center">
//     </div>

    
//     <div className="d-flex align-items-center ms-auto">
      
//       <a
//         href="#"
//         style={{
//           color: isDarkMode ? "#FFD700" : "#333",
//           fontSize: "18px",
//           marginRight: "20px",
//           textDecoration: "none",
//         }}
//       >
//         <CiHome /> 
//       </a>
//       <a
//         href="#"
//         style={{
//           color: isDarkMode ? "#FFD700" : "#333",
//           fontSize: "18px",
//           marginRight: "20px",
//           textDecoration: "none",
//         }}
//       >
//         <CiSettings /> 
//       </a>
//       <div
//               style={{
//                 cursor: "pointer",
//                 fontSize: "18px",
//                 marginRight:'20px',
//                 color: isDarkMode ? "#FFD700" : "#333",
//               }}
//               onClick={handleLogout} // Handle logout when clicked
//             >
//               <CiExport /> 
//             </div>
//       <div
//         style={{
//           cursor: "pointer",
//           fontSize: "18px",
//           color: isDarkMode ? "#FFD700" : "#333",
//         }}
//         onClick={toggleTheme}
//       >
//         {isDarkMode ? <CiLight /> : <CiCloudMoon />}
//       </div>
//     </div>
//   </div>
// </nav> */}


//   <Navbar
//         isDarkMode={isDarkMode}
//         toggleTheme={toggleTheme}
//         handleLogout={handleLogout}
//       />

//     <Container fluid>
//       <Row>
//         {/* Sidebar */}
//         <Col
//   md={3}
//   className="border-end"
//   style={{
//     backgroundColor: isDarkMode ? "#1e1e1e" : "#f9f9f9",
//     color: isDarkMode ? "#fff" : "#121212",
//     padding: "20px",
//     boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
//   }}
// >
//   <div style={{ textAlign: "center", marginBottom: "20px" }}>
//     <h5 style={{ color: isDarkMode ? "#FFD700" : "#444", marginBottom: "10px" }}>
//       <CiDatabase style={{ fontSize: "24px", marginRight: "10px" }} />
//       Select a Database
//     </h5>
//     <Form.Group className="mb-3">
//       <Form.Select
//         value={selectedDatabase}
//         onChange={handleDatabaseSelect}
//         aria-label="Select Database"
//         style={{
//           backgroundColor: isDarkMode ? "#333" : "#fff",
//           color: isDarkMode ? "#fff" : "#121212",
//           borderRadius: "8px",
//           // border: "1px solid #888",
//           boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
//         }}
//       >
//         <option value="" disabled>Select a Database</option>
//         {databases.map((db) => (
//           <option key={db} value={db}>
//             {db}
//           </option>
//         ))}
//       </Form.Select>
//     </Form.Group>
//   </div>

//   <div style={{ textAlign: "center", marginBottom: "20px" }}>
//     <h5 style={{ color: isDarkMode ? "#FFD700" : "#444", marginBottom: "10px" }}>
//       <CiCalendar style={{ fontSize: "24px", marginRight: "10px" }} />
//       Select a Session
//     </h5>
//     <Form.Group className="mb-3">
//       <Form.Select
//         value={selectedSession}
//         onChange={handleSessionSelect}
//         style={{
//           backgroundColor: isDarkMode ? "#333" : "#fff",
//           color: isDarkMode ? "#fff" : "#121212",
//           borderRadius: "8px",
//           // border: "1px solid #888",
//           boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
//         }}
//       >
//         <option value="" disabled>Select a Session</option>
//         {sessions.map((session) => (
//           <option key={session.session_id} value={session.session_id}>
//             {session.session_id}
//           </option>
//         ))}
//       </Form.Select>
//     </Form.Group>
//   </div>

//   <div style={{ textAlign: "center", marginBottom: "20px" }}>
//     <h5 style={{ color: isDarkMode ? "#FFD700" : "#444", marginBottom: "10px" }}>
//       <CiExport style={{ fontSize: "24px", marginRight: "10px" }} />
//       Select File Type
//     </h5>
//     <Dropdown>
//       <Dropdown.Toggle
//         variant="outline-secondary"
//         id="dropdown-filetype"
//         style={{
//           backgroundColor: isDarkMode ? "#333" : "#fff",
//           color: isDarkMode ? "#fff" : "#121212",
//           borderRadius: "8px",
//           border: "1px solid #888",
//           boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
//         }}
//       >
//         {fileType}
//       </Dropdown.Toggle>
//       <Dropdown.Menu>
//         <Dropdown.Item onClick={() => setFileType("JSON")}>JSON</Dropdown.Item>
//         <Dropdown.Item onClick={() => setFileType("CSV")}>CSV</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   </div>

//   <div style={{ textAlign: "center", marginTop: "20px" }}>
//     <Button
//       className="mt-3"
//       variant="primary"
//       onClick={handleExport}
//       disabled={!selectedSession}
//       style={{
//         background: colors.primaryGradient,        //"#6200ea"
//         color: "#fff",
//         borderRadius: "8px",
//         padding: "10px 20px",
//         fontSize: "16px",
//         transition: "background-color 0.3s ease",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
//       }}
//     >
//       {/* < style={{ marginRight: "10px", fontSize: "20px" }} /> */}
//       Export
//     </Button>
//   </div>
// </Col>

//         {/* Main Content */}
//         <Col md={9}>
//           <Container
//             fluid
//             className="d-flex flex-column"
//             style={{
//               height: "88vh",
//               borderRadius: "12px",
//               overflow: "hidden",
//               boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
//               backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
//               color: isDarkMode ? "#fff" : "#121212",
//             }}
//           >
//             <Row className="flex-grow-1 overflow-auto p-2">
//               <Col>
//                 {data.map((item, index) => (
//                   <Col key={index} md={6} lg={12} className="mb-3">
//                     <Card
//                       style={{
//                         backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
//                         borderRadius: "12px",
//                         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//                       }}
//                     >
//                       <Card.Body>
//                         <Card.Title
//                           style={{
//                             backgroundColor: isDarkMode ? "#333" : "#ddd",
//                             padding: "10px",
//                             borderRadius: "50px",
//                             color: isDarkMode ? "#fff" : "#121212",
//                           }}
//                         >
//                           Query: {item.query}
//                         </Card.Title>
//                         <Card.Text style={{ color: isDarkMode ? "#bbb" : "#333" }}>
//                           <strong>Answer:</strong> {item.answer}
//                         </Card.Text>
//                         <h5 style={{ color: isDarkMode ? "#ccc" : "#444" }}>Documents:</h5>
//                         {item.docs.length > 0 ? (
//                           item.docs.map((doc, docIndex) => (
//                             <div
//                               key={docIndex}
//                               style={{
//                                 marginLeft: "20px",
//                                 color: isDarkMode ? "#ddd" : "#444",
//                               }}
//                             >
//                               <p>
//                                 <strong>Content:</strong> {doc.page_content}
//                               </p>
//                               <p>
//                                 <strong>File Path:</strong> {doc.metadata.file_path}
//                               </p>
//                               <p>
//                                 <strong>Page:</strong> {doc.metadata.page}
//                               </p>
//                             </div>
//                           ))
//                         ) : (
//                           <p>No documents available.</p>
//                         )}
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 ))}
//               </Col>
//             </Row>



// {/* <Row className="flex-grow-1 overflow-auto p-2">
//   <Col>
//     <div className="chat-container" style={{ height: "100%", overflowY: "auto" }}>
//       {data.map((item, index) => (
//         <div key={index} className="chat-item">
//           <div className="chat-question">
//             <strong>Question:</strong> {item.query}
//           </div>
//           <div className="chat-answer">
//             <strong>Answer:</strong> {item.answer}
//           </div>
//         </div>
//       ))}
//       <div ref={chatEndRef} />
//     </div>
//     <Form onSubmit={handleAddQuery}>
//       <Form.Group controlId="questionInput">
//         <Form.Control
//           type="text"
//           placeholder="Ask a question"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           required
//         />
//       </Form.Group>
//       <Button type="submit" variant="primary">Submit Question</Button>
//     </Form>
//   </Col>
// </Row> */}


//             {/* Input Section */}
//             <Row className="p-3 border-top">
//               <Col>
//                 <InputGroup>
//                   <Form.Control
//                     type="text"
//                     placeholder="Type your question here..."
//                     value={question}
//                     onChange={(e) => setQuestion(e.target.value)}
//                     style={{
//                       backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
//                       color: isDarkMode ? "#fff" : "#121212",
//                       borderRadius: "8px",
//                       border: "1px solid #444",
//                     }}
//                   />
//                   <Button
//                     variant="primary"
//                     onClick={handleAddQuery}
//                     style={{
//                       background: colors.primaryGradient,            //"#6200ea"
//                       borderRadius: "8px",
//                       marginLeft: "10px",
//                     }}
//                   >
//                     Submit
//                   </Button>
//                 </InputGroup>
//               </Col>
//             </Row>
//           </Container>
//         </Col>
//       </Row>
//     </Container>
//   </div>
// );
// }
// export default PrivateGPTPage;






import React, { useState, useEffect, useRef } from "react";
import {CiLight,CiSettings,CiHome,CiUser,CiCloudMoon,CiCalendar,CiDatabase,CiExport,FaArrowCircleDown} from 'react-icons/ci'
import { MdOutlineFileDownload } from "react-icons/md";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Button,
  Form,
  Spinner,
  InputGroup,
  Card,
} from "react-bootstrap";
import axios from "axios";
import { colors } from "../components/style/Colors";
import { useUser } from "../store/context/UserContext"
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";

const PrivateGPTPage = () => {
  const [databases, setDatabases] = useState([]); // List of databases
  const [sessions, setSessions] = useState([]); // List of sessions for the selected database
  const [selectedDatabase, setSelectedDatabase] = useState(""); // Selected database
  const [selectedSession, setSelectedSession] = useState(""); // Selected session ID
  const [fileType, setFileType] = useState("JSON"); // File export type
  const [question, setQuestion] = useState(""); // Input question
  const { userId, databaseId } = useUser();
  const [wholedatabase,setWholeDatabase]=useState([])
  const navigate=useNavigate()
  console.log(databaseId)
  


  const [data, setData] = useState([]); // State to store JSON data
  const [newQuery, setNewQuery] = useState(""); // State for new query
  const [newAnswer, setNewAnswer] = useState(""); // State for new answer
  const [isDarkMode, setIsDarkMode] = useState(false); // Set initial theme state to dark mode

  const userI = userId ? userId.toString() : null;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Toggle between light and dark modes
  };

  const chatEndRef = useRef(null);


  const handleLogout = () => {
    // Clear authentication data (e.g., token)
    localStorage.removeItem("authToken"); // Clear token from local storage
    // sessionStorage.removeItem("authToken"); // Clear token from session storage (if used)
    
    // Redirect to login page
    window.location.href = "/";
  };

  // Fetch all databases on component mount
  useEffect(() => {

    if (!userI) {
      console.error("User ID is not defined");
      return;
    }
  console.log(databaseId)
    const payload = {
      user_id: userI,  // Send the user_id as part of the JSON body
      databaseId:databaseId
    };
  
    axios
      .post("http://192.168.1.170:5000/databases", payload, {
        headers: {
          "Content-Type": "application/json",  // Set content type as JSON
        },
      })
      .then((res) => {
        setWholeDatabase(res.data.databases)
        const databaseNames = res.data.databases.map((db) => db.database_name);
        setDatabases(databaseNames); // Update state with database names
        console.log("Database names:", databaseNames);


        const defaultDb = res.data.databases.find(
          (db) => db.database_id === databaseId
        );
        if (defaultDb) {
          setSelectedDatabase(defaultDb.database_name);
        }
      })
      .catch((err) => {
        console.error("Error fetching databases:", err);
        // setUploadError("Failed to fetch databases. Please try again later.");
      });
  }, []);



  useEffect(() => {
    if (selectedDatabase) {
      const payload = {
        user_id: userI,  // Send the user_id as part of the JSON body
      };
      
      axios
        .post("http://192.168.1.170:5000/get_sessions_by_user_id", payload, {
          headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
          },
        })
        .then((response) => {
          setSessions(response.data.sessions)
          console.log("Response data:", response.data); // Handle the response
        })
        .catch((error) => {
          console.error("Error sending request:", error); // Handle errors
        });
    }
  }, [selectedDatabase]);


  const handleSessionSelect = async (event) => {
    const sessionId = event.target.value;
    setSelectedSession(sessionId);
  
    try {
      const res = await axios.get(`http://localhost:5000/api/sessions/${sessionId}`);
      setData(res.data.queries); // Update the conversation with session queries
    } catch (err) {
      console.error("Error fetching session data:", err);
    }
  };
  
  // const handleAddQuery = async (e) => {
  //   e.preventDefault();
  
  //   // if (!selectedSession) {
  //   //   alert("Please select a session first.");
  //   //   return;
  //   // }

  //   // console.log(question)
    
  //   const selectedDb = wholedatabase.find(db => db.database_name === selectedDatabase);
  //   // console.log(selectedDb.database_id)
  //   console.log(selectedDatabase)
  //   console.log(selectedSession)
  //   try {
  //     const res = await axios.post(
  //       `http://192.168.0.111:5000/get-answer`,
  //     {query:question,user_id:userI,
  //       session_id: selectedSession,
  //       database_id: selectedDb.database_id}
  //     );
  //     setData(res.data); // Update the local state with the updated session data
  //     setNewQuery(""); // Clear the form
  //     setNewAnswer("");
  //   } catch (err) {
  //     console.error("Error adding query:", err);
  //   }
  //   console.log(data)
  // };
  
  // const handleAddQuery = async (e) => {
  //   e.preventDefault();
  
  //   if (!selectedDatabase || !selectedSession) {
  //     alert("Please select a database and session first.");
  //     return;
  //   }
  
  //   const selectedDb = wholedatabase.find(
  //     (db) => db.database_name === selectedDatabase
  //   );
  
  //   if (!selectedDb) {
  //     alert("Selected database not found.");
  //     return;
  //   }
  
  //   try {
  //     const res = await axios.post(
  //       `http://192.168.0.111:5000/get-answer`,
  //       {
  //         query: question,
  //         user_id: userI,
  //         session_id: selectedSession,
  //         database_id: selectedDb.database_id,
  //       }
  //     );
  
  //     // Check if the response has data and append it
  //     if (res.data) {
  //       const newQuery = {
  //         query: question,
  //         answer: res.data.answer || "Answer will be fetched", // Placeholder if answer is not in res.data
  //         docs: res.data.docs || [], // Placeholder if no docs in res.data
  //       };
        
  //       // Update the local state by appending the new query
  //       setData((prevData) => [...prevData, newQuery]);
  //     }
  
  //     // Clear the input field
  //     setQuestion(""); // Assuming `question` is the input state variable
  //   } catch (err) {
  //     console.error("Error adding query:", err);
  //   }
  // };

  const handleAddQuery = async (e) => {
    e.preventDefault();
  
    if (!selectedDatabase || !selectedSession) {
      alert("Please select a database and session first.");
      return;
    }
  
    const selectedDb = wholedatabase.find(
      (db) => db.database_name === selectedDatabase
    );
  
    if (!selectedDb) {
      alert("Selected database not found.");
      return;
    }
  
    // Optimistically add the new question to the data
    const newQuery = {
      query: question,
      answer: "Fetching answer...", // Placeholder until the backend responds
      docs: [], // Empty placeholder for documents
    };
    setData((prevData) => [...prevData, newQuery]); // Update UI immediately
  
    try {
      const res = await axios.post(
        `http://192.168.1.170:5000/get-answer`,
        {
          query: question,
          user_id: userI,
          session_id: selectedSession,
          database_id: selectedDb.database_id,
        }
      );
  
      // Update the latest query with the actual response
      setData((prevData) =>
        prevData.map((item) =>
          item.query === question
            ? {
                ...item,
                answer: res.data.answer || "No answer available",
                docs: res.data.docs || [],
              }
            : item
        )
      );
    } catch (err) {
      console.error("Error adding query:", err);
  
      // Update the latest query with an error message
      setData((prevData) =>
        prevData.map((item) =>
          item.query === question
            ? { ...item, answer: "Failed to fetch answer." }
            : item
        )
      );
    }
  
    // Clear the input field
    setQuestion(""); // Assuming `question` is the input state variable
  };


  // Scroll to the bottom of the chat whenever the conversation updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

 
  // Handle database selection
  const handleDatabaseSelect = (event) => {
    const database = event.target.value;
    console.log(database)
    setSelectedDatabase(database);
    setSelectedSession(""); // Reset session selection
  };

  

  // Handle exporting session data
  const handleExport = () => {
    if (!selectedSession) {
      alert("Please select a session to export.");
      return;
    }

    alert(`Exporting session as ${fileType}`);
    // Add export logic if needed
  };


  let fun=()=>{
    navigate('/Ingestion')
  }


return (
  <div
    style={{
      backgroundColor: isDarkMode ? "#121212" : "#fff",
      color: isDarkMode ? "#fff" : "#121212",
      minHeight: "100vh",
      transition: "background-color 0.3s, color 0.3s", // Smooth transition
    }}
  >

{/* <nav
  className="navbar navbar-expand-lg"
  style={{
    backgroundColor: isDarkMode ? "#333" : "#f8f9fa",
    color: isDarkMode ? "#fff" : "#000",
    borderBottom: "1px solid #ddd",
    marginBottom: "1rem",
  }}
>
  <div className="container-fluid">
    
    <div className="d-flex align-items-center">
    </div>

    
    <div className="d-flex align-items-center ms-auto">
      
      <a
        href="#"
        style={{
          color: isDarkMode ? "#FFD700" : "#333",
          fontSize: "18px",
          marginRight: "20px",
          textDecoration: "none",
        }}
      >
        <CiHome /> 
      </a>
      <a
        href="#"
        style={{
          color: isDarkMode ? "#FFD700" : "#333",
          fontSize: "18px",
          marginRight: "20px",
          textDecoration: "none",
        }}
      >
        <CiSettings /> 
      </a>
      <div
              style={{
                cursor: "pointer",
                fontSize: "18px",
                marginRight:'20px',
                color: isDarkMode ? "#FFD700" : "#333",
              }}
              onClick={handleLogout} // Handle logout when clicked
            >
              <CiExport /> 
            </div>
      <div
        style={{
          cursor: "pointer",
          fontSize: "18px",
          color: isDarkMode ? "#FFD700" : "#333",
        }}
        onClick={toggleTheme}
      >
        {isDarkMode ? <CiLight /> : <CiCloudMoon />}
      </div>
    </div>
  </div>
</nav> */}


  <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        handleLogout={handleLogout}
      />

    <Container fluid>
      <Row style={{margin:"10px"}}>
        {/* Sidebar */}
        <Col
  md={3} 
  className="border-end"
  style={{
    backgroundColor: isDarkMode ? "#1e1e1e" : "#f9f9f9",
    color: isDarkMode ? "#fff" : "#121212",
    padding: "20px",
    boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
  }}
>
  <div style={{ marginBottom: "20px" }}>
    <h5 style={{ color: isDarkMode ? "#FFD700" : "#444", marginBottom: "10px" }}>
      <CiDatabase style={{ fontSize: "24px", marginRight: "10px" }} />
      Select a Database
    </h5>
    <Form.Group className="mb-3">
      <Form.Select
        value={selectedDatabase}
        onChange={handleDatabaseSelect}
        aria-label="Select Database"
        style={{
          backgroundColor: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#fff" : "#121212",
          borderRadius: "8px",
          // border: "1px solid #888",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <option value="" disabled>Select a Database</option>
        {databases.map((db) => (
          <option key={db} value={db}>
            {db}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  </div>

  <div style={{  marginBottom: "20px" }}>     {/*textAlign: "center",*/}
    <h5 style={{ color: isDarkMode ? "#FFD700" : "#444", marginBottom: "10px" }}>
      <CiCalendar style={{ fontSize: "24px", marginRight: "10px" }} />
      Select a Session
    </h5>
    <Form.Group className="mb-3">
      <Form.Select
        value={selectedSession}
        onChange={handleSessionSelect}
        style={{
          backgroundColor: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#fff" : "#121212",
          borderRadius: "8px",
          // border: "1px solid #888",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <option value="" disabled>Select a Session</option>
        {sessions.map((session) => (
          <option key={session.session_id} value={session.session_id}>
            {session.session_id}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  </div>

  <div style={{  marginBottom: "20px",width:"100%" }}>
    <h5 style={{ color: isDarkMode ? "#FFD700" : "#444", marginBottom: "10px" }}>
      <MdOutlineFileDownload style={{ fontSize: "24px", marginRight: "10px" }} />
      Select File Type
    </h5>
    <div style={{textAlign:"center",width:"100%"}}>
    <Dropdown>
      <Dropdown.Toggle
        variant="outline-secondary"
        id="dropdown-filetype"
        style={{
          backgroundColor: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#fff" : "#121212",
          borderRadius: "8px",
          border: "1px solid #888",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        {fileType}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setFileType("JSON")}>JSON</Dropdown.Item>
        <Dropdown.Item onClick={() => setFileType("CSV")}>CSV</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
  </div>

  <div style={{ textAlign:"center", marginTop: "20px" }}>            {/*textAlign: "center",*/}
    <Button
      className="mt-3"
      variant="primary"
      onClick={handleExport}
      disabled={!selectedSession}
      style={{
        background: colors.primaryGradient,        //"#6200ea"
        color: "#fff",
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "16px",
        transition: "background-color 0.3s ease",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* < style={{ marginRight: "10px", fontSize: "20px" }} /> */}
      Export
    </Button>
  </div>
  {/* <Button
                onClick={fun}
                className="w-100 rounded-pill mt-3"
                style={{ borderRadius: "10px", background: colors.primaryGradient }}
              >
                Start Ingestion
              </Button> */}
</Col>

        {/* Main Content */}
        <Col md={9}>
          <Container
            fluid
            className="d-flex flex-column"
            style={{
              height: "88vh",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
              backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
              color: isDarkMode ? "#fff" : "#121212",
            }}
          >
            <Row className="flex-grow-1 overflow-auto p-2">
              <Col>
                {data.map((item, index) => (
                  <Col key={index} md={6} lg={12} className="mb-3">
                    <Card
                      style={{
                        backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <Card.Body>
                        <Card.Title
                          style={{
                            backgroundColor: isDarkMode ? "#333" : "#ddd",
                            padding: "10px",
                            borderRadius: "50px",
                            color: isDarkMode ? "#fff" : "#121212",
                          }}
                        >
                          Query: {item.query}
                        </Card.Title>
                        <Card.Text style={{ color: isDarkMode ? "#bbb" : "#333" }}>
                          <strong>Answer:</strong> {item.answer}
                        </Card.Text>
                        <h5 style={{ color: isDarkMode ? "#ccc" : "#444" }}>Documents:</h5>
                        {item.docs.length > 0 ? (
                          item.docs.map((doc, docIndex) => (
                            <div
                              key={docIndex}
                              style={{
                                marginLeft: "20px",
                                color: isDarkMode ? "#ddd" : "#444",
                              }}
                            >
                              <p>
                                <strong>Content:</strong> {doc.page_content}
                              </p>
                              <p>
                                <strong>File Path:</strong> {doc.metadata.file_path}
                              </p>
                              <p>
                                <strong>Page:</strong> {doc.metadata.page}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>No documents available.</p>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Col>
            </Row>
            {/* Input Section */}
            <Row className="p-3 border-top">
              <Col>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Type your question here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    style={{
                      backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
                      color: isDarkMode ? "#fff" : "#121212",
                      borderRadius: "8px",
                      border: "1px solid #444",
                    }}
                  />
                  <Button
                    variant="primary"
                    onClick={handleAddQuery}
                    style={{
                      background: colors.primaryGradient,            //"#6200ea"
                      borderRadius: "8px",
                      marginLeft: "10px",
                    }}
                  >
                    Submit
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  </div>
);
}
export default PrivateGPTPage;