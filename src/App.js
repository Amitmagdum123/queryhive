import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Ingestion from './pages/Ingestion'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { UserProvider } from "./store/context/UserContext";
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'


let App=()=>{
  return(
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route
          path="/Ingestion"
          element={
            <ProtectedRoute>
              <Ingestion />
            </ProtectedRoute>
          }
        />
          <Route
          path="/Chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}
export default App