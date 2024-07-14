import Header from './components/header/header'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import Teacher_Home from "./components/pages/Teacher/Teacher_Home.jsx";
import {Home} from "./components/pages/Home.jsx";
import {ClassDetails} from "./components/pages/ClassDetails.jsx";
import Student_home from "./components/pages/Student/Student_home.jsx";
import Materials_Details from "./components/pages/Materials_Details.jsx";
import AssignmentDetails from "./components/pages/Teacher/AssignmentDetails.jsx";

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
                            <Route path={'/ClassDetails/:code'} element={<ClassDetails/>}/>
                            <Route path={'/MaterialsDetails'} element={ <Materials_Details/> }/>
                            <Route path={'/AssignmentDetails'} element={ <AssignmentDetails/> }/>
                        </Routes>
                    )
                }
                {
                    role === 'Student'

                    && (
                        <Routes>
                            <Route index path={'/'} element={<Student_home/>}></Route>
                            <Route path={'/ClassDetails/:code'} element={<ClassDetails/>}/>
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
