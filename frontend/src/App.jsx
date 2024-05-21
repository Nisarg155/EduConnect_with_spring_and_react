import Header from './components/header/header'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import Teacher_Home from "./components/pages/Teacher/Teacher_Home.jsx";
import {Home} from "./components/pages/Home.jsx";
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const user = useSelector(
      (state) => state.User
  )
  const role = user ? user.role : '' ;
  return (
    <>

        <Header />
        <BrowserRouter>
            <Routes >
                {
                    role === '' && <Route  path={'/'} element={<Home/>} />
                }
                {

                    role === 'Teacher'
                    &&
                        <Route index path={'/'}  element={ <Teacher_Home/> }/>
                }
                {/*</Route>*/}
            </Routes>
        </BrowserRouter>

    </>
  )
}

export default App
