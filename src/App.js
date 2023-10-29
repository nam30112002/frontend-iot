import Home from "./home/Home";
import SignIn from "./login/SignIn";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUp from "./signup/SignUp";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element = {<Home/>} />
          <Route path="/login" element ={<SignIn/>} />
          <Route path="/signup" element ={<SignUp/>} />
          {/* Các tuyến đường khác */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
