import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import {Button, Card, Modal} from "flowbite-react";
import {HiPlus} from 'react-icons/hi'
import {Grid} from "react-loader-spinner";
import CreateClassFetch from "../../../fetch_components/fetchComponents.jsx";
import CreateClass from "../../forms/createClass.jsx";




const Teacher_Home = () => {
    const user = useSelector(
        (state) => state.User
    )
    const [classes, setClasses] = useState([])
    const [sliding, setSliding] = useState(true)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        try {


            let response = fetch(`http://localhost:8080/api/classes/get_all/${user.uid}/${user.role}`, {
                method: 'GET',
            });

            response.then(
                (response) => {
                    response.json().then(
                        (value) => {
                            setClasses(value);
                            setSliding(false)
                        }
                    )
                }
            )
        } catch (error) {
            toast(error.code)
        }
    }, []);

    const onCloseModal = () => {
        setOpenModal(false)
    }

    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    return (
        <div>




            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={
                        event => {
                            event.preventDefault()
                            const formData = new FormData(event.target)
                            if(!sliding) {
                                let data = {
                                    uid:user.uid ,
                                    teacher_name:user.username,
                                    name:formData.get('title'),
                                    description:formData.get('description')
                                }
                                let response =  CreateClassFetch(data);
                                response.then(
                                    (response) => {
                                        response.json().then(
                                            (value) => {
                                                setClasses(value);
                                                setOpenModal(false)
                                            }
                                        )
                                    }
                                )
                            }
                        }
                    }>
                        <CreateClass/>
                    </form>
                </Modal.Body>
            </Modal>



            <div className="flex flex-wrap gap-2 mt-6 justify-end">
                <Button gradientMonochrome="info" className={'lg:mr-40 mr-8 '} onClick={toggleModal}>
                    <HiPlus className="mr-2 h-5 w-5"/> <b>Add Class</b>
                </Button>
            </div>

            {
                sliding ?
                    <div style={{justifyContent: 'center', display: 'flex', flexWrap: 'wrap', marginTop: '18rem'}}>
                        <Grid
                            visible={true}
                            height="120"
                            width="120"
                            color="#05a7ed"
                            ariaLabel="grid-loading"
                            radius="12.5"
                            wrapperStyle={{}}
                            wrapperClass="grid-wrapper"
                        /></div> :
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "start", alignItems: 'stretch'}}
                         className={"mr-4 ml-4   "}>
                        {
                            classes.length === 0 ?
                                <div className={'mt-40'}>
                                    <h1 className="text-5xl md:text-8xl font-extrabold leading-tighter tracking-tighter mb-8"
                                        data-aos="zoom-y-out"><span
                                        className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400"> <br/>No Class Found ,</span>
                                    </h1>
                                    <h3 className="text-5xl md:text-8xl font-extrabold leading-tighter tracking-tighter mb-4">Create
                                        New Class </h3>
                                </div> :

                                classes.map((card, index) =>
                                    (
                                        <Card className="max-w-sm mr-8 ml-8 mb-8 mt-8 "
                                              style={{width: "25rem", height: "15rem"}} key={index}>

                                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white "
                                                style={{marginTop: "-100px"}}>
                                                {card.name}
                                            </h5>

                                            <div>
                                                <p className="font-normal text-gray-700 dark:text-gray-400 break-words "
                                                   style={{
                                                       display: 'flex',
                                                       flexWrap: 'wrap',
                                                       wordBreak: "break-word",
                                                       wordWrap: 'break-word',
                                                       height: '70px'
                                                   }}>
                                                    {card.description}
                                                </p>
                                            </div>

                                            <div style={{marginBottom: '-100px'}}>
                                                <Button>
                                                    Read more
                                                    <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor"
                                                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </Button>
                                            </div>
                                        </Card>


                                    )
                                )
                        }
                    </div>
            }

            <ToastContainer/>
        </div>
    );
}

export default Teacher_Home