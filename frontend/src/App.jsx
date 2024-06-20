import Header from './components/header/header'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import Teacher_Home from "./components/pages/Teacher/Teacher_Home.jsx";
import {Home} from "./components/pages/Home.jsx";
import {Teacher_ClassDetails} from "./components/pages/Teacher/Teacher_ClassDetails.jsx";
import Teacher_Material_Details from "./components/pages/Teacher/Teacher_Material_Details.jsx";
import Student_home from "./components/pages/Student/Student_home.jsx";
import Materials_Details from "./components/pages/Materials_Details.jsx";

// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const user = useSelector(
        (state) => state.User
    )
    const role = user ? user.role : '';
    return (
        <>

            <BrowserRouter>
                <Header/>
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
                            <Route path={'/MaterialsDetails'} element={ <Materials_Details/> }/>
                        </Routes>
                    )
                }
                {
                    role === 'Student'

                    && (
                        <Routes>
                            <Route index path={'/'} element={<Student_home/>}></Route>
                            <Route path={'/ClassDetails/:code'} element={<Teacher_ClassDetails/>}/>
                            <Route path={'/MaterialsDetails'} element={ <Materials_Details/> } />
                        </Routes>
                    )
                }
                {/*</Route>*/}

            </BrowserRouter>

        </>
    )
}

export default App
