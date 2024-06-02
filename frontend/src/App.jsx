import Header from './components/header/header'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import Teacher_Home from "./components/pages/Teacher/Teacher_Home.jsx";
import {Home} from "./components/pages/Home.jsx";
import {Teacher_ClassDetails} from "./components/pages/Teacher/Teacher_ClassDetails.jsx";

// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const user = useSelector(
        (state) => state.User
    )
    const role = user ? user.role : '';
    return (
        <>

            <Header/>
            <BrowserRouter>
                {
                    role === '' && (
                        <Routes>
                            <Route path={'/'} element={<Home/>}/>
                        </Routes>
                    )
                }
                {

                    role === 'Teacher'
                    && (
                        <Routes>
                            <Route index path={'/'} element={<Teacher_Home/>}/>
                            <Route path={'/ClassDetails/:code'} element={<Teacher_ClassDetails/>}/>
                        </Routes>
                    )
                }
                {/*</Route>*/}

            </BrowserRouter>

        </>
    )
}

export default App
