import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import {Button, Card, Modal, Popover} from "flowbite-react";
import {HiPlus} from 'react-icons/hi'
import {MdModeEdit} from "react-icons/md";
import {Grid} from "react-loader-spinner";
import {CreateClassFetch, DeleteClass} from "../../../fetch_components/fetchComponents.jsx";
import CreateClass from "../../forms/createClass.jsx";
import {FaInfoCircle, FaTrash} from "react-icons/fa";
import EditClass from "../../forms/EditClass.jsx";
import {Link} from "react-router-dom";


const Teacher_Home = () => {
    const user = useSelector(
        (state) => state.User
    )
    const [classes, setClasses] = useState([])
    const [sliding, setSliding] = useState(true)
    const [createclassmodal, setCreateclassmodal] = useState(false)
    const [editclassmodal, setEditclassmodal] = useState(false)
    const [editclassdata, setEditclassdata] = useState({})


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
        setCreateclassmodal(false)
    }

    const onCloseModalEdit = () => {
        setEditclassmodal(false);
        setEditclassdata({})
    }

    const toggleModal = () => {
        setCreateclassmodal(!createclassmodal)
    }

    const deleteClass = (data) => {
        let response = DeleteClass(data)

        response.then((response) => {

            response.json().then(
                (value) => {
                    setClasses(value)
                }
            )
        })

    }


    return (
        <div>


            <Modal show={createclassmodal} size="md" onClose={onCloseModal} popup>
                <Modal.Header/>
                <Modal.Body>
                    <form onSubmit={
                        event => {
                            event.preventDefault()
                            const formData = new FormData(event.target)
                            if (!sliding) {
                                let data = {
                                    uid: user.uid,
                                    teacher_name: user.username,
                                    name: formData.get('title'),
                                    description: formData.get('description')
                                }
                                let response = CreateClassFetch(data);
                                response.then(
                                    (response) => {
                                        response.json().then(
                                            (value) => {
                                                setClasses(value);
                                                setCreateclassmodal(false)
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


            <Modal show={editclassmodal} size="md" onClose={onCloseModalEdit} popup>
                <Modal.Header/>
                <Modal.Body>
                    <EditClass data={editclassdata}/>
                </Modal.Body>
            </Modal>


            <div className="flex flex-wrap gap-2 mt-6 justify-end">
                <Button gradientMonochrome="info" className={'lg:mr-40 mr-8 '} onClick={toggleModal}>
                    <HiPlus className="mr-2 h-5 w-5"/> <b style={{fontSize: 'medium'}}>Add Class</b>
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
                    <div>
                        {
                            classes.length === 0 ?
                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: 'center',
                                    alignItems: 'stretch'
                                }} className={"mr-4 ml-4   "}>

                                    <div className={'mt-40'}>
                                        <h1 className="text-5xl md:text-8xl font-extrabold leading-tighter tracking-tighter mb-8"
                                            data-aos="zoom-y-out"><span
                                            className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400"> <br/>No Class Found ,</span>
                                        </h1>
                                        <h3 className="text-5xl md:text-8xl font-extrabold leading-tighter tracking-tighter mb-4">Create
                                            New Class </h3>
                                    </div>
                                </div> :
                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: 'start',
                                    alignItems: 'stretch'
                                }} className={"mr-4 ml-4   "}>
                                    {
                                        classes.map((card) =>
                                            (

                                                <Card className="max-w-sm mr-8 ml-8 mb-8 mt-8 "
                                                      style={{width: "25rem", height: "15rem"}} key={card.class_id}>
                                                    <Link to={`/ClassDetails/${card.class_id}`} key={card.class_id}>
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
                                                    </Link>

                                                    <div style={{
                                                        marginBottom: '-100px',
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        justifyContent: 'space-between'
                                                    }}
                                                    >
                                                        <Button onClick={
                                                            () => {
                                                                setEditclassmodal(!editclassmodal)
                                                                setEditclassdata(
                                                                    {
                                                                        code: card.class_id,
                                                                        name: card.name,
                                                                        description: card.description,
                                                                        setClasses: setClasses,
                                                                        setEditclassmodal: setEditclassmodal,
                                                                        teacher_id: card.teacher_id,
                                                                        teacher_name: card.teacher_name
                                                                    }
                                                                )
                                                            }
                                                        }>
                                                            <b style={{fontSize: 'medium'}}>
                                                                Edit
                                                            </b>
                                                            <MdModeEdit className="ml-2 h-5 w-5"/>
                                                        </Button>
                                                        <Popover content={
                                                            <div
                                                                className="w-auto text-sm text-gray-500 dark:text-gray-400">
                                                                <div
                                                                    className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                                        <b style={{fontSize: 'medium'}}>
                                                                            {card.class_id}
                                                                        </b>
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        } placement={"bottom"}>


                                                            <Button color={'success'}>
                                                                <b style={{fontSize: 'medium'}}>
                                                                    Code
                                                                </b>
                                                                <FaInfoCircle className="ml-2 h-5 w-5"/>
                                                            </Button>
                                                        </Popover>
                                                        <Button color="failure" onClick={
                                                            () => {
                                                                deleteClass({
                                                                    uid: user.uid,
                                                                    code: card.class_id
                                                                })
                                                            }
                                                        }>
                                                            <b style={{fontSize: 'medium'}}>
                                                                Delete
                                                            </b>
                                                            <FaTrash className="ml-3 h-5 w-5"/>
                                                        </Button>
                                                    </div>
                                                </Card>
                                            )
                                        )
                                    }
                                </div>
                        }
                    </div>
            }

            <ToastContainer/>
        </div>
    );
}

export default Teacher_Home