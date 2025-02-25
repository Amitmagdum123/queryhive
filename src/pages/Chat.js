import React, { useState, useEffect, useRef } from "react";
import {CiLight, CiFileOn,CiSettings,CiHome,CiUser,CiCloudMoon,CiCalendar,CiDatabase,CiExport,FaArrowCircleDown} from 'react-icons/ci'
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
import { AiOutlineSend } from "react-icons/ai";
import { IoChatbubbleOutline } from "react-icons/io5";
import logo from '../components/img/Query_Hive_Icon.png'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PrivateGPTPage = () => {
  const [databases, setDatabases] = useState([]); // List of databases
  const [sessions, setSessions] = useState([]); // List of sessions for the selected database
  const [selectedDatabase, setSelectedDatabase] = useState(""); // Selected database
  const [selectedSession, setSelectedSession] = useState(""); // Selected session ID
  const [fileType, setFileType] = useState("JSON"); // File export type
  const [question, setQuestion] = useState(""); // Input question
  const { userId, databaseId } = useUser();
  const [wholedatabase,setWholeDatabase]=useState([])
  const [loading, setLoading] = useState(true);
  const [message,setMessage] =useState('')
  console.log("database id=",databaseId,"userid=",userId)
  
  
  const [data, setData] = useState([]); // State to store JSON data
  const [isDarkMode, setIsDarkMode] = useState(false); // Set initial theme state to dark mode
  const [show, setShow] = useState(false);
  const userI = userId ? userId.toString() : null;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Toggle between light and dark modes
  };

  const chatEndRef = useRef(null);


  const handleLogout = () => {
    
    localStorage.removeItem("authToken"); 
   
    window.location.href = "/";
  };

  //toggle sidebar
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      .post("http://192.168.1.160:5000/databases", payload, {
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
    // if (selectedDatabase) {
      const payload = {
        user_id: userI,  // Send the user_id as part of the JSON body
        // session_id: 28,
      };
      
      axios
        .post("http://192.168.1.160:5000/get_sessions_by_user_id", payload, {
          headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
          },
        })
        .then((response) => {
          setSessions(response.data.sessions)

          console.log("Response data by session:", response.data.sessions); // Handle the response
        })
        .catch((error) => {
          console.error("Error sending request:", error); // Handle errors
        });
    // }
  }, []);





console.log(selectedSession)


// here we get data using selcted session.

  useEffect(()=>{
    if(message===''){
      setData([])
    }
    
    if (!selectedSession || selectedSession === '') return;
    if(!selectedSession==''){
    const payload={
      user_id:userI,
      session_id:selectedSession
    }

   
    axios.post("http://192.168.1.160:5000/get_session_json",payload).then((res)=>{
      console.log("selected sessions data",res.data.sessions)
      setMessage('')
      if(res.data.sessions.length > 0){
        setData(res.data.sessions)
        console.log(res.data.sessions)
      }
      else{
        setData((prevData) => [...prevData])
      }
    })
  }
  else{
    console.log("send session_id")
  }
    
  },[selectedSession,setData])


  const handleSessionSelect = async (event) => {
    const sessionId = event.target.value;
    setSelectedSession(sessionId);
    
  };
  
 
  const handleAddQuery = async (e) => {
    e.preventDefault();
  
    // if (!selectedDatabase || !selectedSession) {
    //   alert("Please select a database and session first.");
    //   return;
    // }
  
    const selectedDb = wholedatabase.find(
      (db) => db.database_name === selectedDatabase
    );
  
    if (!selectedDb) {
      alert("Selected database not found.");
      return;
    }
    if (question===''){
      return;
    }
    setLoading(false)

    let sessionIdToUse = selectedSession;

    if (!selectedSession) {
      // Create a new session if none is selected
      try {
        const newSessionResponse = await axios.post("http://192.168.1.160:5000/create_session", {
          user_id: userId,
          database_name: selectedDatabase,
        })
  
        // console.log(newSessionResponse.data)
        // const newSessionId =newSessionResponse.data.session_id
        // setSelectedSession(newSessionId);
        // console.log(newSessionResponse.data.session_id)

        console.log(question)
        console.log('when creating new session ',newSessionResponse.data)
        setMessage(newSessionResponse.data.message)
        const newSessionId = newSessionResponse.data.session_id;
        const newSessionName = newSessionResponse.data.session_name;
        sessionIdToUse = newSessionId; // Store the new session ID
        setSelectedSession(newSessionId); // Update the state
        console.log(newSessionName)
        // console.log("here we go",sessions)
        // setSessions((prev) => [...prev, { id: newSessionId, name: `Session ${sessions.length + 1}` }]);
        setSessions(prev => [...prev, { 
          session_id: newSessionId, 
          session_name:question
        }]);


        
        alert(`A new session has been created: ${newSessionId}`);
      } catch (error) {
        console.error("Error creating a new session:", error);
        alert("Failed to create a new session.");
        return;
      }
    }

  
    if(!selectedSession){
      alert("not passing selectedsessionid")
    }
    console.log("amit")
    // Optimistically add the new question to the data
    const newQuery = {
      query: question,
      answer: "Fetching answer...", // Placeholder until the backend responds
      docs: [], // Empty placeholder for documents
    };
    setData((prevData) => [...prevData, newQuery]); // Update UI immediately  ...prevData,
  
    try {
     
    console.log("what the ",selectedSession,"session",sessionIdToUse)

      const res = await axios.post(
        `http://192.168.1.160:5000/get-answer`,
        {
          query: question,
          user_id: userI,
          session_id: sessionIdToUse.toString(),       // selectedSession.toString()
          database_id: selectedDb.database_id.toString(),
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
      );
  
      console.log("data after get-answer",res.data)    
      // const prevousdata=res.data
      
      
      // setData((prevousdata)=>[...prevousdata,{query:question,answer:res.data.answer,docs:res.data.source_documents}])
      // setData((prevousdata) =>
      //   prevousdata.map((item) =>
      //     item.query === question
      //       ? {
      //           ...item,
      //           answer: res.data.answer || "No answer found",
      //           docs: res.data.source_documents || [],
      //         }
      //       : item
      //   )
      // );
       setData((prevousdata) => {
        // Check if the question already exists in the state
        const existingQueryIndex = prevousdata.findIndex((item) => item.query === question);
      
        if (existingQueryIndex !== -1) {
          // Update the existing question with the new answer and documents
          const updatedData = [...prevousdata];
          updatedData[existingQueryIndex] = {
            ...updatedData[existingQueryIndex],
            answer: res.data.answer || "No answer found",
            docs: res.data.source_documents || [],
          };
          return updatedData;
        }
      
        // Add a new entry if the question does not exist
        return [
          ...prevousdata,
          {
            query: question,
            answer: res.data.answer || "No answer found",
            docs: res.data.source_documents || [],
          },
        ];
      });
      
    } catch (err) {
      console.error("Error adding query:", err);
  
      // Update the latest query with an error message
      setData((prevousdata) =>
        prevousdata.map((item) =>
          item.query === question
            ? { ...item, answer: "Failed to fetch answer." }
            : item
        )
      );
    }
    console.log("data after setdata")

  
    // Clear the input field
    setQuestion(""); // Assuming `question` is the input state variable
    setLoading(true)
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

  let NewSession=async()=>{
    try{
    const newSessionResponse = await axios.post("http://192.168.1.160:5000/create_session", {
      user_id: userId,
      database_name: selectedDatabase,
    })

    console.log(question,)
    const newSessionId = newSessionResponse.data.session_id;
    // sessionIdToUse = newSessionId; // Store the new session ID
    setSelectedSession(newSessionId); // Update the state
    // console.log(newSessionName)
    // console.log("here we go",sessions)
    // setSessions((prev) => [...prev, { id: newSessionId, name: `Session ${sessions.length + 1}` }]);
    setSessions(prev => [...prev, { 
      session_id: newSessionId, 
      // name: `Session ${sessions.length + 1}` 
      session_name:"new session"
    }]);
    


    
    alert(`A new session has been created: ${newSessionId}`);
  } catch (error) {
    console.error("Error creating a new session:", error);
    alert("Failed to create a new session.");
    return;
  }
  }


return (
  <div
    style={{
      backgroundColor: isDarkMode ? "#121212" : "#fff",
      color: isDarkMode ? "#fff" : "#121212",
      minHeight: "100vh",
      transition: "background-color 0.3s, color 0.3s", // Smooth transition
      fontFamily:colors.fontFamily1,
    }}
  >
  <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        handleLogout={handleLogout}
      />

    <Container fluid>
      <Row style={{margin:"0px"}}>
      <Col
  md={2} 
  className="border-end"
  style={{
    backgroundColor: isDarkMode ? "#1e1e1e" : "#f9f9f9",
    color: isDarkMode ? "#fff" : "#121212",
    // padding: "20px",
    boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
    fontWeight:"10px",
  }}
>
  <div style={{ marginBottom: "20px" }}>  {/*#FFD700 */}
    {/* <h5 style={{ color: isDarkMode ? "#FFD700" : "#444", marginBottom: "10px",width:"100%",height:"10vh",display:"flex",justifyContent:"center",alignContent:"center"}} className="d-flex justify-content-center align-items-center">
      <CiDatabase style={{ fontSize: "30px", marginRight: "10px" }}  />
      {selectedDatabase}
    </h5> */}
     <Button style={{ color: isDarkMode ? "#76b900" : "#444", marginBottom: "10px",background:"transparent",border:"0px solid #76b900" }} onClick={NewSession} >
    <img
    src={logo} // Replace with your image path
    alt="Logo"
    style={{
      padding:"5px",
      width: "30px", // Set image width
      height: "30px", // Set image height
      objectFit: "contain", // Ensures the image scales properly
      marginLeft:"-15px"
    }}/>
    QueryHive
      
      {/* start session */}
   
      {/* <IoMdAdd style={{ fontSize: "15px", marginRight: "10px" }} /> */}
    </Button>
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

  <div style={{  marginBottom: "20px",display:"flex",flexDirection:"column",alignItems:"center" }}>

<Form.Group className="mb-3" style={{width:"100%"}}>
  <div
    style={{
      // backgroundColor: isDarkMode ? "#333" : "#fff",
      color: isDarkMode ? "#fff" : "#121212",
      borderRadius: "8px",
      // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      height: "60vh", // Adjust the height to fit your sidebar
      overflowY: "auto", // Scrolls vertically if there are more sessions
      // padding: "10px",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      marginTop:"10px"
    }}
  >
    <div
      style={{
        fontWeight: "bold",
        paddingBottom: "10px",
        fontSize: "16px",
        color: isDarkMode ? "#fff" : "#121212",
      }}
    >
      Recents
      
    </div>
    {sessions.map((session) => (
      <div
        key={session.session_id}
        onClick={() => handleSessionSelect({ target: { value: session.session_id } })}
        style={{
          padding: "6px",
          // borderBottom: "1px solid #ddd",
          cursor: "pointer",
          backgroundColor: isDarkMode ? "#444" : "#f9f9f9",
          fontSize: "14px",
          color: isDarkMode ? "#fff" : "#121212",
          transition: "background-color 0.2s ease",
          display:"flex",
          gap:"5px",
          alignItems:"center"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = isDarkMode ? "#555" : "#ddd";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = isDarkMode ? "#444" : "#f9f9f9";
        }}
      >
        <IoChatbubbleOutline style={{fontSize:"10px"}}/>
        {session.session_name}
      </div>
    ))}
  </div>
</Form.Group>
  </div>
    </Col>

     
        

        {/* Main Content */}
        <Col md={10}>
          <Container
            fluid
            className="d-flex flex-column"
            style={{
              height: "88vh",
              borderRadius: "12px",
              overflow: "hidden",
              marginRight:"-23px",
              // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
              backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",  //#d5d6d4
              color: isDarkMode ? "#fff" : "#121212",
            }}
          >
            <Row className="flex-grow-1 overflow-auto p-2">
              <Col>
              {data && data.length > 0 ? (
  data.map((item, index) => (
    <Col
      key={index}
      md={6}
      lg={12}
      className="mb-3"
      ref={index === data.length - 1 ? chatEndRef : null}
      style={{display:"flex",
        justifyContent:"center",
        alignItems:"center"}}
    >
      <Card
        style={{
          backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
          borderRadius: "12px",
          border: "0px",
          width:"70%",
        }}
      >
        {/* <Card.Body>
          <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
          <Card.Title
            style={{
              
              display: "flex",
              justifyContent: "end",
              color: isDarkMode ? "#121212" : "#444",
              fontSize: "12px",
            }}
          >
            <div style={{display: "inline-block",background: isDarkMode ? item.query ? "#76b900" : "transparent":"#eee",padding: "10px",
              borderRadius: "10px",boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", }}>
            {item.query || []}
            </div>
          </Card.Title>
          
          <Card.Text
            style={{ color: isDarkMode ? "#bbb" : "#333", fontSize: "12px",background:isDarkMode ? "#121212" : "#eee",padding:"10px",borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              border:isDarkMode ? "1px solid #76b900" : "1px solid #bbb"
            }}
          >
            <strong></strong> {item.answer || []}
          </Card.Text>
          </div>
          {item.docs && item.docs.length > 0 ? (
  [...new Set(item.docs.map((doc) => doc.metadata.source || ""))].map(
    (uniqueSource, index) => {
      const pdfName = uniqueSource.split("\\").pop();
      return (
        <div
          key={index}
          style={{
            color: isDarkMode ? "#ddd" : "#444",
            display:"flex",
            marginTop:"10px"
              
          }}
        >
          <button
            style={{
              padding: "10px",
              margin: "5px 0",
              backgroundColor: isDarkMode ? "#333" : "#fff", //#eee
              color: isDarkMode ? "#fff" : "#000",
              border: "1px solid gray",
              borderRadius: "50px",
              cursor: "pointer",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              gap:"5px",
              fontSize:"10px"

            }}
            onClick={() => window.open(uniqueSource, "_blank")}
          >
            <CiFileOn />
            {pdfName}
          </button>
          
        </div>
        
      );
    }
  )
) : (
  <p></p>
)}

        </Card.Body> */}

            <Card.Body>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                
                <Card.Title
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    color: isDarkMode ? "#121212" : "#444",
                    fontSize: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      background: isDarkMode
                        ? item.query
                          ? "#76b900"
                          : "transparent"
                        : "#eee",
                      padding: "10px",
                      borderRadius: "10px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {item.query || []}
                  </div>
                </Card.Title>

                <Card.Text
                  style={{
                    color: isDarkMode ? "#bbb" : "#333",
                    fontSize: "12px",
                    background: isDarkMode ? "#121212" : "#eee",
                    padding: "10px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                    border: isDarkMode ? "1px solid #76b900" : "1px solid #bbb",
                  }}
                >
                  {/* {item.answer || []} */}
                  {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.answer || []}</ReactMarkdown> */}

                  <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        table: ({ children }) => (
                          <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                              {children}
                            </table>
                          </div>
                        ),
                        th: ({ children }) => (
                          <th style={{ padding: "8px", border: "1px solid gray", background: isDarkMode ? "#333" : "#ddd" }}>
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td style={{ padding: "8px", border: "1px solid gray", background: isDarkMode ? "#222" : "#fff" }}>
                            {children}
                          </td>
                        ),
                        ul: ({ children }) => <ul style={{ paddingLeft: "20px" }}>{children}</ul>,
                        ol: ({ children }) => <ol style={{ paddingLeft: "20px" }}>{children}</ol>,
                      }}
                    >
                      {item.answer || ""}
                  </ReactMarkdown>
                  
                  {item.docs && item.docs.length > 0 && (
                    <div style={{ marginTop: "10px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "5px",alignItems:"start" }}>
                        {[...new Set(item.docs.map((doc) => doc.metadata.source || ""))].map(
                          (uniqueSource, index) => {
                            const pdfName = uniqueSource.split("\\").pop();
                            return (
                              <button
                                key={index}
                                style={{
                                  padding: "10px",
                                  backgroundColor: isDarkMode ? "#333" : "#fff",
                                  color: isDarkMode ? "#fff" : "#000",
                                  border: "1px solid gray",
                                  borderRadius: "50px",
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "start",
                                  alignItems: "center",
                                  gap: "5px",
                                  fontSize: "10px",
                                }}
                                onClick={() => window.open(uniqueSource, "_blank")}
                              >
                                <CiFileOn />
                                {pdfName}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
                </Card.Text>
              </div>
            </Card.Body>

                  </Card>
                </Col>
              ))
            ) : (
              <p></p>
            )}
              </Col>
            </Row>

            <Row
              className="p-3"
              style={{
                height: data.length === 0 ? "100vh" : "auto", // Adjust height when no data
                display: data.length === 0 ? "flex" : "block", // Use flex when no data
                justifyContent: data.length === 0 ? "center" : "flex-start", // Center vertically
                alignItems: data.length === 0 ? "center" : "stretch", // Center horizontally
              }}
            >
              <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <InputGroup style={{ width: "70%" }}>
                  <Form.Control
                    type="text"
                    placeholder="Type your question here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if(loading===true){
                        handleAddQuery(e);
                      } // Call function when Enter is pressed
                      }
                    }}
                    style={{
                      backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
                      color: isDarkMode ? "#fff" : "#121212",
                      borderRadius: "8px",
                      border: isDarkMode ? "1px solid #76b900" : "1px solid #444",
                    }}
                  /> 
                  <Button
                    variant="primary"
                    onClick={handleAddQuery}
                    disabled={!loading}
                    style={{
                      background: isDarkMode ? "#76b900" : "#fff",
                      borderRadius: "8px",
                      marginLeft: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid #444",
                    }}
                  >
                    <AiOutlineSend style={{ color: "black" }} />
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













