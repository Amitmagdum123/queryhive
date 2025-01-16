// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Row, Col, Form, Button, Card, Navbar, Nav, InputGroup, Alert,ListGroup } from "react-bootstrap";
// import { useDropzone } from "react-dropzone";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../store/context/UserContext";
// import CustomButton from "../components/CustomButton";
// import { colors } from "../components/style/Colors";
// import { BsTrash3, BsPencilSquare } from "react-icons/bs";
// // import Navbar from "../components/Navbar";

// // Main Component
// const Ingestion = () => {
//   // State variables
//   const [databases, setDatabases] = useState([]); // List of databases
//   const [selectedDatabase, setSelectedDatabase] = useState(""); // Active database
//   const [newDatabaseName, setNewDatabaseName] = useState(""); // New database name
//   const [files, setFiles] = useState([]); // Files to upload
//   const [uploadError, setUploadError] = useState(""); // File upload errors
//   const [analytics, setAnalytics] = useState({ documents: 0, size: 0 }); // Analytics data
//   const { userId } = useUser();
//   const [datbase_id,setdabase_id]=useState(0)
//   const [wholedatabase,setWholeDatabase]=useState([])
//   const userI = userId ? userId.toString() : null;

//   const navigate=useNavigate()
//   // Dropzone for file drag-and-drop
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: ".zip, .txt, .pdf, .docx, .csv",
//     onDrop: (acceptedFiles) => setFiles(acceptedFiles),
//   });


//   const fetchDatabases = () => {
//     // Ensure userId is properly set
//     if (!userI) {
//       console.error("User ID is not defined");
//       return;
//     }
  
//     const payload = {
//       user_id: userI,  // Send the user_id as part of the JSON body
//     };
  
//     axios
//       .post("http://192.168.1.170:5000/databases", payload, {
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
//   };
  

//   useEffect(() => {
//     fetchDatabases(); // Fetch databases when the component loads
//   }, [userI]);

  

//   const handleCreateDatabase = async () => {
//     if (!newDatabaseName.trim()) {
//       alert("Database name cannot be empty");
//       return;
//     }
  
//     const payload = {
//       user_id: userId.toString(), // Ensure user_id is a string
//       database_name: newDatabaseName.trim(), // Ensure database_name is a string
//     };
  
//     try {
//       const response = await axios.post("http://192.168.1.170:5000/create_database", payload, {
//         headers: {
//           "Content-Type": "application/json", // Ensure proper content type
//         },
//       });
  
//       var database_id = response.data.database_id; // Access the database_id here
//       console.log("Database ID:", database_id);
//       setdabase_id(database_id)

  
//       // Refresh the list of databases or any other logic
//       fetchDatabases(); 
//       setNewDatabaseName(""); // Clear input
//       alert("Database created successfully!");
//     } catch (err) {
//       console.error("Error creating database:", err);
//       alert("Error creating database. Please try again.");
//     }
//   };
  



//   // Handle file ingestion
//   const handleIngest = () => {
//     if (!selectedDatabase) {
//       setUploadError("Please select a database first.");
//       return;
//     }
//     if (files.length === 0) {
//       setUploadError("No files selected for upload.");
//       return;
//     }

//     // Find the database_id from wholedatabase based on selectedDatabase
//     const selectedDb = wholedatabase.find(db => db.database_name === selectedDatabase);

//     if (!selectedDb) {
//       setUploadError("Database not found.");
//       return;
//     }

//     const formData = new FormData();
//     files.forEach((file) => formData.append("files", file));
//     // formData.append("database", selectedDatabase);
//     formData.append("user_id", userI);  // Include user_id
//     // formData.append("database_id", datbase_id);
//     formData.append("database_id", selectedDb.database_id);

//     axios
//       .post("http://192.168.1.170:5000/ingest", formData)
//       .then((res) => {
//         alert("Files uploaded successfully!");
//         // setAnalytics(res.data.stats); // Update analytics
//         setFiles([]); // Clear file list
//         setUploadError(""); // Clear any errors
//       })
//       .catch((err) => {
//         console.error("Upload error:", err);
//         setUploadError("Error uploading files. Please try again.");
//       });
//   };




//   const handleDeleteDatabase = async () => {
//     if (!selectedDatabase) {
//       alert("Please select a database to delete");
//       return;
//     }

//     const selectedDb = wholedatabase.find((db) => db.database_name === selectedDatabase);

//     try {
//       await axios.post(
//         "http://192.168.1.170:5000/delete_database",
//         { database_id: selectedDb.database_id, user_id:userI },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       fetchDatabases();
//       setSelectedDatabase("");
//       alert("Database deleted successfully!");
//     } catch (err) {
//       console.error("Error deleting database:", err);
//       alert("Error deleting database. Please try again.");
//     }
//   };

//   const handleUpdateDatabase = async () => {
//     if (!selectedDatabase) {
//       alert("Please select a database to update");
//       return;
//     }

//     if (!newDatabaseName.trim()) {
//       alert("New database name cannot be empty");
//       return;
//     }

//     const selectedDb = wholedatabase.find((db) => db.database_name === selectedDatabase);

//     try {
//       await axios.post(
//         "http://192.168.1.170:5000/update_database",
//         {
//           user_id:userI,
//           database_id: selectedDb.database_id,
//           updated_database_name: newDatabaseName.trim(),
//         },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       fetchDatabases();
//       setNewDatabaseName("");
//       alert("Database updated successfully!");
//     } catch (err) {
//       console.error("Error updating database:", err);
//       alert("Error updating database. Please try again.");
//     }
//   };
  

//   let fun=()=>{
//     navigate('/Chat')
//   }
  

// return (
//  <div style={{ backgroundColor: colors.PrimaryBackgroundColor, minHeight: "100vh" }}>
//    {/* <Navbar
//         isDarkMode={isDarkMode}
//         toggleTheme={toggleTheme}
//         handleLogout={handleLogout}
//       /> */}
//   {/* Main Content */}
//   <Container style={{ padding: "2rem" }}>
//     <Row>
//       {/* Sidebar */}
//       {/* <Col
//         md={3}
//         className="p-3 rounded shadow"
//         style={{ backgroundColor: colors.SecondaryBackgroundColor, borderRadius: "10px", height: "calc(87vh - 4rem)" }}
//       >
//         <h4 className="mb-4 text-center" style={{ color: "#343a40" }}>
//           Database Management
//         </h4>

        
//         <Form.Group className="mb-4">
//           <Form.Label style={{ fontWeight: "bold", color: "#495057" }}>
//             Select a Database
//           </Form.Label>
//           <Form.Select
//             value={selectedDatabase}
//             onChange={(e)=>setSelectedDatabase(e.target.value)}
//             aria-label="Select Database"
//             style={{ borderRadius: "10px" }}
//           >
//             <option value="" disabled>
//               Select a Database
//             </option>
//             {databases.map((db) => (
//               <option key={db} value={db}>
//                 {db}
//               </option>
//             ))}
//           </Form.Select>
//         </Form.Group>

        
//         <Form.Group className="mb-4">
//           <Form.Label style={{ fontWeight: "bold", color: "#495057" }}>
//             New Database Name
//           </Form.Label>
//           <InputGroup>
//             <Form.Control
//               type="text"
//               placeholder="Enter Database Name"
//               value={newDatabaseName}
//               onChange={(e) => setNewDatabaseName(e.target.value)}
//               style={{ borderRadius: "10px" }}
//             />
//           </InputGroup>
//         </Form.Group>

//         <Button
//           variant="primary"
//           className="w-100 mb-3 rounded-pill"
//           onClick={handleCreateDatabase}
//           style={{ borderRadius: "10px",background:colors.primaryGradient }}
//         >
//           Create Database
//         </Button>
//         <Button
//           onClick={fun}
//           // variant="outline-secondary"
//           className="w-100 rounded-pill"
//           style={{ borderRadius: "10px",background:colors.primaryGradient }}
//         >
//           Start Querying
//         </Button>
//       </Col> */}




//           <Col
//             md={3}
//             className="p-3 rounded shadow"
//             style={{
//               backgroundColor: colors.SecondaryBackgroundColor,
//               borderRadius: "10px",
//               height: "calc(87vh - 4rem)",
//             }}
//           >
//             <h4 className="mb-4 text-center" style={{ color: "#343a40" }}>
//               Database Management
//             </h4>

           
//             <Form.Group className="mb-4">
//               <Form.Label style={{ fontWeight: "bold", color: "#495057" }}>Select a Database</Form.Label>
//               <Form.Select
//                 value={selectedDatabase}
//                 onChange={(e) => setSelectedDatabase(e.target.value)}
//                 aria-label="Select Database"
//                 style={{ borderRadius: "10px" }}
//               >
//                 <option value="" >
//                   Select a Database
//                 </option>
//                 {databases.map((db) => (
//                   <option key={db} value={db}>
//                     {db}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

            
//             <Form.Group className="mb-4">
//               <Form.Label style={{ fontWeight: "bold", color: "#495057" }}>New Database Name</Form.Label>
//               <InputGroup>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Database Name"
//                   value={newDatabaseName}
//                   onChange={(e) => setNewDatabaseName(e.target.value)}
//                   style={{ borderRadius: "10px" }}
//                 />
//               </InputGroup>

//               {selectedDatabase ? (<>
//               <div className="d-flex justify-content-evenly">
//                 <Button
//                   variant="danger"
//                   className="w-45 mt-3 rounded-pill shadow-lg"
//                   onClick={handleDeleteDatabase}
//                   style={{
//                     borderRadius: "20px",
//                     background: "linear-gradient(to right, #ff6a6a, #ff4040)",
//                     border: "none",
//                     color: "#fff",
//                     fontWeight: "bold",
//                     padding: "10px 20px",
//                     transition: "transform 0.3s ease",
//                   }}
//                   onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
//                   onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
//                 >
//                   <BsTrash3 /> Delete
//                 </Button>

//                 <Button
//                   variant="info"
//                   className="w-45 mt-3 rounded-pill shadow-lg"
//                   onClick={handleUpdateDatabase}
//                   style={{
//                   borderRadius: "20px",
//                   background: "linear-gradient(to right, #4facfe, #00f2fe)",
//                   border: "none",
//                   color: "#fff",
//                   fontWeight: "bold",
//                   padding: "10px 20px",
//                   transition: "transform 0.3s ease",
//                   }}
//                   onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
//                   onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
//                 >
//                   <BsPencilSquare /> Update
//                 </Button>
//                 </div>
//                 </>):(<>
//                 <Button
//                 variant="primary"
//                 className="w-100 mt-3 rounded-pill"
//                 onClick={handleCreateDatabase}
//                 style={{ background: colors.primaryGradient }}
//               >
//                 Create Database
//               </Button>
//                 </>  
//             )}
              
//             </Form.Group>

//             <Button
//               onClick={fun}
//               className="w-100 rounded-pill"
//               style={{ borderRadius: "10px", background: colors.primaryGradient }}
//             >
//               Start Querying
//             </Button>
//           </Col>

//       {/* Main Section */}
//       <Col md={9}>
//         {/* Upload Section */}
//         <Container>
//           <Card
//             className="shadow"
//             style={{ borderRadius: "15px", overflow: "hidden" }}
//           >
//             <Card.Body>
//               <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
//                 Upload and Ingest Files
//               </Card.Title>

//               {/* Drag and Drop Area */}
//               <div
//                 {...getRootProps()}
//                 className="p-4 text-center border rounded"
//                 style={{
//                   border: "2px dashed #6c757d",
//                   borderRadius: "10px",
//                   backgroundColor: "#f8f9fa",
//                   cursor: "pointer",
//                   transition: "background-color 0.3s ease",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = "#e9ecef";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = "#f8f9fa";
//                 }}
//               >
//                 <input {...getInputProps()} />
//                 {files.length === 0 ? (
//                   <p className="text-muted mb-2">
//                     Drag and drop files here or click to browse.
//                   </p>
//                 ) : (
//                   <ListGroup>
//                     {files.map((file, index) => (
//                       <ListGroup.Item key={index}>{file.name}</ListGroup.Item>
//                     ))}
//                   </ListGroup>
//                 )}
//                 <Button
//                   variant="outline-primary"
//                   className="mt-3"
//                   style={{ borderRadius: "10px" }}
//                 >
//                   Browse files
//                 </Button>
//               </div>

//               {/* Error Alert */}
//               {uploadError && (
//                 <Alert variant="danger" className="mt-3">
//                   {uploadError}
//                 </Alert>
//               )}

//               {/* Start Ingestion Button */}
//               <div className="d-flex justify-content-center align-items-center">
//               <Button
//                 onClick={handleIngest}
//                 // variant="primary"
//                 className="mt-3 w-50 rounded-pill"
//                 style={{
//                   width: "100%",
//                   background: colors.primaryGradient,
//                   borderRadius: "10px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Start Ingestion
//               </Button>
//               </div>
//             </Card.Body>
//           </Card>
//         </Container>

//         {/* Analytics Section */}
//         {/* <Card className="shadow mt-4" style={{ borderRadius: "15px" }}>
//           <Card.Body>
//             <h3
//               className="mb-4"
//               style={{
//                 fontWeight: "bold",
//                 color: "#343a40",
//               }}
//             >
//               Analytics for Database: {selectedDatabase || "N/A"}
//             </h3>
//             <p style={{ fontSize: "1rem", color: "#495057" }}>
//               <strong>Number of Documents:</strong> {analytics.documents}
//             </p>
//             <p style={{ fontSize: "1rem", color: "#495057" }}>
//               <strong>Total Size:</strong> {analytics.size} MB
//             </p>
//           </Card.Body>
//         </Card> */}
//       </Col>
//     </Row>
//   </Container>
// </div>

// );
// }

// export default Ingestion;












import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card, Navbar, Nav, InputGroup, Alert,ListGroup } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/context/UserContext";
import { colors } from "../components/style/Colors";
import { FaLessThan } from "react-icons/fa";



// Main Component
const Ingestion = () => {
  // State variables
  const [databases, setDatabases] = useState([]); // List of databases
  const [selectedDatabase, setSelectedDatabase] = useState(""); // Active database
  const [newDatabaseName, setNewDatabaseName] = useState(""); // New database name
  const [files, setFiles] = useState([]); // Files to upload
  const [uploadError, setUploadError] = useState(""); // File upload errors
  const { userId,setDatabaseId } = useUser();
  const [datbase_id,setdabase_id]=useState(0)
  const [wholedatabase,setWholeDatabase]=useState([])
  const [isDatabaseCreated, setIsDatabaseCreated] = useState(false);
  const userI = userId ? userId.toString() : null;

  const navigate=useNavigate()
  // Dropzone for file drag-and-drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".zip, .txt, .pdf, .docx, .csv",
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
  });


  const fetchDatabases = () => {
    // Ensure userId is properly set
    if (!userI) {
      console.error("User ID is not defined");
      return;
    }
  
    const payload = {
      user_id: userI,  // Send the user_id as part of the JSON body
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
      })
      .catch((err) => {
        console.error("Error fetching databases:", err);
        // setUploadError("Failed to fetch databases. Please try again later.");
      });
  };
  

  useEffect(() => {
    fetchDatabases(); // Fetch databases when the component loads
  }, [userI]);

  

  const handleCreateDatabase = async () => {
    if (!newDatabaseName.trim()) {
      alert("Database name cannot be empty");
      return;
    }
  
    const payload = {
      user_id: userId.toString(), // Ensure user_id is a string
      database_name: newDatabaseName.trim(), // Ensure database_name is a string
    };
  
    try {
      const response = await axios.post("http://192.168.1.170:5000/create_database", payload, {
        headers: {
          "Content-Type": "application/json", // Ensure proper content type
        },
      });
  
      var database_id = response.data.database_id; // Access the database_id here
      console.log("Database ID:", database_id);
      setdabase_id(database_id)
      setDatabaseId(database_id);

  
      // Refresh the list of databases or any other logic
      fetchDatabases(); 
      setNewDatabaseName(""); // Clear input
      
      {<Alert variant="success" className="mt-3">Database created successfully!</Alert>}
    } catch (err) {
      console.error("Error creating database:", err);
      alert("Error creating database. Please try again.");
    }
    if(database_id){
      setIsDatabaseCreated(true);
    }
  };
  



  // Handle file ingestion
  const handleIngest = () => {
    if (files.length === 0) {
      setUploadError("No files selected for upload.");
      return;
    }

    // Find the database_id from wholedatabase based on selectedDatabase
    // const selectedDb = wholedatabase.find(db => db.database_name === selectedDatabase);

    // if (!selectedDb) {
    //   setUploadError("Database not found.");
    //   return;
    // }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    // formData.append("database", selectedDatabase);
    formData.append("user_id", userI);  // Include user_id
    // formData.append("database_id", datbase_id);
    formData.append("database_id", datbase_id);

    axios
      .post("http://192.168.1.170:5000/ingest", formData)
      .then((res) => {
        // alert("Files uploaded successfully!");
        {<Alert variant="success" className="mt-3">Files uploaded successfully!</Alert>}
        const userResponse = window.confirm("Do you want to proceed to the next page?");
    
    if (userResponse) {
      // Navigate to the next page
      // Replace this with your actual navigation logic, e.g., using React Router
      window.location.href = "/Chat"; // Example navigation
    } else {
      // Reset UI to the "Create Database" state
      setIsDatabaseCreated(false); // Reset the flag
      setFiles([]); // Clear file list
      setUploadError(""); // Clear any errors
    }
      })
      .catch((err) => {
        console.error("Upload error:", err);
        setUploadError("Error uploading files. Please try again.");
      });
  };




  const handleDeleteDatabase = async () => {
    if (!selectedDatabase) {
      alert("Please select a database to delete");
      return;
    }

    const selectedDb = wholedatabase.find((db) => db.database_name === selectedDatabase);

    try {
      await axios.post(
        "http://192.168.1.170:5000/delete_database",
        { database_id: selectedDb.database_id, user_id:userI },
        { headers: { "Content-Type": "application/json" } }
      );

      fetchDatabases();
      setSelectedDatabase("");
      alert("Database deleted successfully!");
    } catch (err) {
      console.error("Error deleting database:", err);
      alert("Error deleting database. Please try again.");
    }
  };

  const handleUpdateDatabase = async () => {
    if (!selectedDatabase) {
      alert("Please select a database to update");
      return;
    }

    if (!newDatabaseName.trim()) {
      alert("New database name cannot be empty");
      return;
    }

    const selectedDb = wholedatabase.find((db) => db.database_name === selectedDatabase);

    try {
      await axios.post(
        "http://192.168.1.170:5000/update_database",
        {
          user_id:userI,
          database_id: selectedDb.database_id,
          updated_database_name: newDatabaseName.trim(),
        },
        { headers: { "Content-Type": "application/json" } }
      );

      fetchDatabases();
      setNewDatabaseName("");
      alert("Database updated successfully!");
    } catch (err) {
      console.error("Error updating database:", err);
      alert("Error updating database. Please try again.");
    }
  };
  

  let fun=()=>{
    navigate('/Chat')
  }
  

return (
 <div style={{ backgroundColor: colors.PrimaryBackgroundColor, minHeight: "100vh" }}>
  {/* Main Content */}
  <Container style={{ padding: "2rem" }}>
    <Row>
      {/* Sidebar */}
          <Col
            md={3}
            className="p-3 rounded shadow"
            style={{
              backgroundColor: colors.SecondaryBackgroundColor,
              borderRadius: "10px",
              height: "calc(87vh - 4rem)",
            }}
          >
            <h4 className="mb-4 text-center" style={{ color: "#343a40" }}>
              Database Management
            </h4>

           
            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: "bold", color: "#495057" }}>Select a Database</Form.Label>
              <Form.Select
                value={selectedDatabase}
                onChange={(e) => setSelectedDatabase(e.target.value)}
                aria-label="Select Database"
                style={{ borderRadius: "10px" }}
              >
                <option value="" >
                  Select a Database
                </option>
                {databases.map((db) => (
                  <option key={db} value={db}>
                    {db}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>


{/* <ListGroup style={{ maxHeight: "200px", overflowY: "auto" }}>
  {databases.map((db) => (
    <ListGroup.Item 
      key={db} 
      onClick={() => setSelectedDatabase(db)}
      style={{
        cursor: "pointer",
        backgroundColor: selectedDatabase === db ? "#e9ecef" : "white",
        fontWeight: selectedDatabase === db ? "bold" : "normal",
      }}
    >
      {db}
    </ListGroup.Item>
  ))}
</ListGroup> */}


{/* 
<ListGroup
  style={{
    maxHeight: "200px",
    overflowY: "auto",
    border: "1px solid #ced4da",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  }}
>
  {databases.map((db) => (
    <ListGroup.Item
      key={db}
      onClick={() => setSelectedDatabase(db)}
      style={{
        cursor: "pointer",
        backgroundColor: selectedDatabase === db ? "#007bff" : "white",
        color: selectedDatabase === db ? "white" : "#495057",
        fontWeight: selectedDatabase === db ? "bold" : "normal",
        padding: "10px 15px",
        border: "none",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
      onMouseEnter={(e) =>
        (e.target.style.backgroundColor = selectedDatabase === db ? "#0056b3" : "#f8f9fa")
      }
      onMouseLeave={(e) =>
        (e.target.style.backgroundColor = selectedDatabase === db ? "#007bff" : "white")
      }
    >
      {db}
    </ListGroup.Item>
  ))}
</ListGroup>
{selectedDatabase && (
  <div style={{ marginTop: "10px", color: "#007bff", fontWeight: "bold" }}>
    Selected Database: {selectedDatabase}
  </div>
)} */}

            
            {/* <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: "bold", color: "#495057" }}>New Database Name</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter Database Name"
                  value={newDatabaseName}
                  onChange={(e) => setNewDatabaseName(e.target.value)}
                  style={{ borderRadius: "10px" }}
                />
              </InputGroup>

              
            </Form.Group> */}

            <Button
              onClick={fun}
              className="w-100 rounded-pill mt-3"
              style={{ borderRadius: "10px", background: colors.primaryGradient }}
            >
              Start Querying
            </Button>
          </Col> 

      {/* Main Section */}
      <Col md={9} style={{ display:"flex", alignItems:"center",justifyContent:"center"}}>
        {/* Upload Section */}
        {!isDatabaseCreated ? (<Container>
          <Card
            className="shadow"
            style={{ borderRadius: "15px", overflow: "hidden", padding:"100px"}}
          >
            <Card.Body>
              <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold", display:"flex", justifyContent:"center" }}>
                Create Database
              </Card.Title>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter Database Name"
                  value={newDatabaseName}
                  onChange={(e) => setNewDatabaseName(e.target.value)}
                  style={{ borderRadius: "10px" }}
                />
              </InputGroup>

              {/* Start Ingestion Button */}
              <div className="d-flex justify-content-center align-items-center">
              <Button
                // onClick={handleIngest}
                onClick={handleCreateDatabase}
                // variant="primary"
                className="mt-3 w-50 rounded-pill"
                style={{
                  width: "100%",
                  background: colors.primaryGradient,
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                Create Database
              </Button>
              </div>
            </Card.Body>
          </Card>
          </Container>
        ) : (
          <Container>
          <Card
            className="shadow"
            style={{ borderRadius: "15px", overflow: "hidden", padding:"100px"}}
          >
            <Card.Body>
        <Button
  onClick={() => setIsDatabaseCreated(false)} // Navigate back to Create Database
  style={{
    position: "absolute",
    top: "200px",
    left: "10px",
    backgroundColor: colors.SecondaryBackgroundColor,
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0", // Remove extra padding
    border: "none", // Optional for cleaner appearance
  }}
>
  {/* <IoArrowBackCircle
    style={{
      color: "#fff", // White color for better visibility
      // fontSize: "1.5rem", // Adjust the size of the icon
      width:"100%",
      height:"100%"
    }}
  /> */}
  <span
    style={{
      color: "gray", // White color for better visibility
      fontSize: "1.5rem", // Adjust the size of the character
      fontWeight: "bold", // Optional for a bold look
    }}
  >
    {/* {"<"} */}
    {/* &lt; */}
    <FaLessThan />
  </span>
</Button>


              <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold", display:"flex", justifyContent:"center" }}>
                Start Ingestion
              </Card.Title>

              {/* Drag and Drop Area */}
              <div
                {...getRootProps()}
                className="p-4 text-center border rounded"
                style={{
                  border: "2px dashed #6c757d",
                  borderRadius: "10px",
                  backgroundColor: "#f8f9fa",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#e9ecef";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#f8f9fa";
                }}
              >
                <input {...getInputProps()} />
                {files.length === 0 ? (
                  <p className="text-muted mb-2">
                    Drag and drop files here or click to browse.
                  </p>
                ) : (
                  <ListGroup>
                    {files.map((file, index) => (
                      <ListGroup.Item key={index}>{file.name}</ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
                <Button
                  variant="outline-primary"
                  className="mt-3"
                  style={{ borderRadius: "10px" }}
                >
                  Browse files
                </Button>
              </div>

              
              {uploadError && (
                <Alert variant="danger" className="mt-3">
                  {uploadError}
                </Alert>
              )}

              {/* Start Ingestion Button */}
              <div className="d-flex justify-content-center align-items-center">
              <Button
                onClick={handleIngest}
                // variant="primary"
                className="mt-3 w-50 rounded-pill"
                style={{
                  width: "100%",
                  background: colors.primaryGradient,
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                Start Ingestion
              </Button>
              </div>
              
            </Card.Body>
          </Card>
        </Container>)}
      </Col>
    </Row>
  </Container>
</div>

);
}

export default Ingestion;