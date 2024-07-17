import {useEffect, useRef, useState} from 'react';
import {Button, Label, Modal, TextInput} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore'
import app from "../../firebase/config.jsx";
import {AddUser, DeleteUser} from "../../redux/reducer/loginslice.jsx";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FetchComponents} from "../../fetch_components/fetchComponents.jsx";
import {HiMail} from "react-icons/hi";
import {Link, useNavigate} from "react-router-dom";
import {browserSessionPersistence, setPersistence} from 'firebase/auth';

const auth = getAuth(app);
await setPersistence(auth, browserSessionPersistence);
const firestore_database = getFirestore(app)
const Navbar = () => {
    const navigation = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false)
    const [username, setUsername] = useState('')
    const user = useSelector((state) => state.User)
    const dispatch = useDispatch();
    const login = useRef(null);
    const signup = useRef(null);
    const [email, setEmail] = useState('');

    function onCloseModal() {
        setOpenModal(false);
        setEmail('');
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSignUpModal = () => {
        setSignupModal(!signupModal);
        setOpenModal(true)
        setEmail('')
    }

    const notification = (message) => {
        toast.success(message, {
            autoClose: 3000
        })
    }

    const check_auth = async (obj) => {
        const email = obj.email;
        const password = obj.password;
        const username = obj.username;
        let role = obj.role;


        if (!signupModal) {
            login.current.style.opacity = 0.5
            await signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const dbref = doc(firestore_database, "User", userCredential.user.uid)
                    let snapshot = await getDoc(dbref)
                    if (!snapshot.exists()) throw Error("Error Retrieving  Role")

                    // Signed in
                    const user = userCredential.user;
                    const usr = {
                        uid: userCredential.user.uid,
                        username: user.displayName,
                        email: user.email,
                        role: snapshot.data().role
                    }
                    console.log(usr);
                    login.current.style.opacity = .5
                    let message = `Welcome Back , ${user.displayName}`
                    dispatch(AddUser(usr))
                    setOpenModal(false);
                    setEmail('')
                    notification(message)
                    // ...
                })
                .catch((error) => {
                    login.current.style.opacity = 1
                    toast.error(error.code)
                });
        } else {
            signup.current.style.opacity = 0.5
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up
                    updateProfile(auth.currentUser, {
                        displayName: username,
                    }).then(async () => {

                        // Profile updated!
                        const user = userCredential.user;
                        const usr = {
                            uid: user.uid,
                            username: username,
                            email: user.email,
                            role: role
                        }
                        console.log(usr)
                        const docref = doc(firestore_database, 'User', user.uid);
                        const obj = {
                            email: user.email,
                            role: role
                        }
                        FetchComponents({
                            uid: userCredential.user.uid,
                            username: username,
                            role: role
                        })
                        await setDoc(docref, obj)
                        signup.current.style.opacity = 1
                        let message = `Welcome Back , ${user.displayName}`
                        dispatch(AddUser(usr));
                        setOpenModal(false)
                        setSignupModal(false)
                        setUsername('')
                        setEmail('')
                        notification(message)
                    }).then(

                    )
                        .catch((error) => {
                            // An error occurred
                            signup.current.style.opacity = 1
                            toast.error(error.code);
                        });
                })
                .catch((error) => {
                    signup.current.style.opacity = 1
                    toast.error(error.code)
                });

        }
    }


    return (
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        <div>


            {/*//sign in model*/}
            <Modal show={openModal} name={'signIn model'} size="md" onClose={onCloseModal} popup>
                <Modal.Header/>
                <Modal.Body>
                    <form onSubmit={
                        (event) => {
                            event.preventDefault();
                            const data = new FormData(event.target);
                            if (signupModal && (data.get('role') === 'none')) {
                                toast.error("Please Select Role")
                                return
                            }
                            const obj = {
                                role: data.get('role') ?? '',
                                username: data.get('username') ?? '',
                                email: data.get('email') ?? '',
                                password: data.get('password') ?? ''
                            }

                            check_auth(obj)


                        }
                    }>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white"><b>Sign in to
                                EduConnect </b></h3>

                            {
                                signupModal ? (
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="username" value="Your username"/>
                                        </div>
                                        <TextInput
                                            addon="@"
                                            id="username"
                                            placeholder="xyz"
                                            value={username}
                                            onChange={(event) => setUsername(event.target.value)}
                                            name={'username'}
                                            required
                                        />
                                    </div>
                                ) : null
                            }

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your email"/>
                                </div>
                                <TextInput
                                    id="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    name={'email'}
                                    rightIcon={HiMail}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Your password"/>
                                </div>
                                <TextInput id="password" type="password" name={'password'} required/>
                            </div>
                            <div className="flex justify-between">
                            </div>
                            <div className="flex justify-between">

                                {
                                    signupModal ?
                                        <div>
                                            <label htmlFor={"role"}/>
                                            <select name={"role"} id={"role"}>
                                                <option value={"none"}>Select Role</option>
                                                <option value={"Teacher"}>Teacher</option>
                                                <option value={"Student"}>Student</option>
                                            </select>
                                        </div>
                                        :
                                        null
                                }

                            </div>
                            <div className="w-full">

                                {
                                    signupModal ? <Button type={'submit'} ref={signup}>SignUp</Button> :
                                        <Button type={'submit'} ref={login}>Log in to your account</Button>
                                }

                            </div>

                            {
                                signupModal ?
                                    <div
                                        className="flex justify-between text-xl font-medium text-gray-500 dark:text-gray-300">
                                        Have Account?&nbsp;
                                        <a href="" onClick={(event) => {
                                            event.preventDefault();
                                            document.getElementById('password').value = null;
                                            toggleSignUpModal()
                                        }}
                                           className="text-cyan-700 hover:underline dark:text-cyan-500">
                                            Login
                                        </a>
                                    </div>
                                    : <div
                                        className="flex justify-between text-xl font-medium text-gray-500 dark:text-gray-300">
                                        Not registered?&nbsp;
                                        <a href="" onClick={(event) => {
                                            event.preventDefault();
                                            document.getElementById('password').value = null;
                                            toggleSignUpModal()
                                        }} className="text-cyan-700 hover:underline dark:text-cyan-500">
                                            Create account
                                        </a>
                                    </div>
                            }

                        </div>
                    </form>
                </Modal.Body>
            </Modal>


            <nav className="relative bg-black shadow-lg">
                <div className="container px-5 py-4 mx-auto">
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="flex items-center justify-between">
                            <Link to={'/'} className={'no-underline text-white'}>
                                <b className={'font-medium'}>
                                    EduConnect
                                </b>
                            </Link>
                            {
                                user ?
                                    <div className="flex lg:hidden">
                                        <button onClick={toggleMenu} type="button"
                                                className="text-gray-100 hover:text-gray-200 focus:outline-none"
                                                aria-label="toggle menu">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                                                 viewBox="1 0 24 24" stroke="currentColor" strokeWidth="2">
                                                {isOpen ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M6 18L18 6M6 6l12 12"/>
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M4 8h16M4 16h16"/>
                                                )}
                                            </svg>
                                        </button>
                                    </div> : null
                            }

                        </div>


                        {
                            user ?
                                (
                                    <div className={`lg:flex lg:items-center lg:mx-8 ${isOpen ? 'block' : 'hidden'}`}>
                                        <div className="flex flex-col lg:flex-row lg:items-center">

                                            <a href={'/'}
                                               className="px-3 py-2 mx-3 mt-2 text-gray-100 hover:bg-gray-600 rounded-md lg:mt-0">Home</a>
                                            <a onClick={
                                                async () => {
                                                    await signOut(auth).then(
                                                        async () => {
                                                            await navigation('/')
                                                            dispatch(DeleteUser(null))
                                                        }
                                                    )
                                                }
                                            }
                                               className="px-3 py-2 mx-3 mt-2 text-gray-100 hover:bg-gray-600 hover:cursor-pointer rounded-md lg:mt-0">Sign-out</a>

                                        </div>
                                        <div className="flex items-center mt-4 lg:mt-0">

                                            <button type="button" className="flex items-center focus:outline-none"
                                                    aria-label="toggle profile dropdown">
                                                <div
                                                    className="w-8 h-8 overflow-hidden border-2 border-gray-100 rounded-full">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                                                        className="object-cover w-full h-full" alt="avatar"/>
                                                </div>
                                                <h3 className="mx-2 text-gray-100 lg:hidden">{user.username}</h3>
                                            </button>
                                        </div>
                                    </div>
                                ) :
                                <Button onClick={() => setOpenModal(true)} color="blue"> <b>Sign In</b> </Button>
                        }


                    </div>
                </div>
            </nav>
            <ToastContainer position="top-center"
                            theme="dark"
                            draggablePercent={60}
            />
        </div>

    );
};

export default Navbar;
