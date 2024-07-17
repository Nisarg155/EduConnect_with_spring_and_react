import {Button, Card, Modal} from "flowbite-react";
import {HiPlus} from "react-icons/hi";
import JoinClass from "../../forms/JoinClass.jsx";
import {useEffect, useState} from "react";
import {Grid, Hourglass} from "react-loader-spinner";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";


const StudentHome = () => {
    const user = useSelector(state => state.User)
    const [joinmodal, setJoinmodal] = useState(false)
    const [classes, setClasses] = useState([]);
    const [isclassempty, setIsclasspresent] = useState(false)
    const [isloading, setIsloading] = useState(true)
    const [codes, setCodes] = useState(new Set())

    const toggleModal = () => {
        setJoinmodal(!joinmodal);
    }
    const removeClass = async (code) => {
        const res = await fetch(`https://educonnectwithspringandreact-production.up.railway.app/api/RemoveClass/${user.uid}/${code}`,{
            method:'DELETE'
        })
        res.json().then(
            (value) => {
                setClasses(value)
                setCodes(prev => new Set([...prev].filter(x => x !== code)))
            }
        ).catch(
            () => {
                setIsclasspresent(true)
                setClasses([])
                setCodes(new Set())
            }
        )
    }

    const join_class = async (code) => {

        const res = await fetch(`https://educonnectwithspringandreact-production.up.railway.app/api/JoinClass/${user.uid}/${code}/${user.username}`, {
            method: 'POST',
        });

        res.json().then(
            (value) => {
                setClasses(value)
                value.map( (data) => {
                    setCodes(prevState => new Set([...prevState, data.class_id]))
                })
                setJoinmodal(false);
            }
        )
    }
    useEffect(() => {
        const response = fetch(`https://educonnectwithspringandreact-production.up.railway.app/api/get_classes_student/${user.uid}`)
        response.then(
            (response) => {
                response.json().then(
                    (value) => {
                        value.map((classes) => {
                            setCodes(prevcodes => new Set([...prevcodes,classes.class_id]))
                        })
                        setClasses(value)
                        setIsloading(false)
                        setIsclasspresent(false)
                    }
                ).catch( () => {
                    setIsloading(false)
                    setIsclasspresent(false)
                })
            }
        )
    }, []);
    return (
        <div>
            <div className="flex flex-wrap gap-2 mt-6 justify-end">
                <Button gradientMonochrome="info" className={'lg:mr-40 mr-8 '} onClick={toggleModal}>
                    <HiPlus className="mr-2 h-5 w-5"/> <b style={{fontSize: 'medium'}}>Join Class</b>
                </Button>
            </div>

            <Modal show={joinmodal} onClose={toggleModal}>
                <Modal.Header>
                    Join Class
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={
                        async (event) => {
                            event.preventDefault();
                            let formData = new FormData(event.target);
                            const code = formData.get('code');
                            if(codes.has(code))
                            {
                                toast.warn("Class already exists!");
                                setJoinmodal(false)
                                return
                            }
                            let response = await fetch(`https://educonnectwithspringandreact-production.up.railway.app/api/verify_code/${code}`);
                            response.json().then(
                                (value) => {
                                    if (value) {
                                        join_class(code);
                                    }
                                    else{
                                        toast.error("Class Not Found");
                                        setJoinmodal(false)
                                    }
                                }
                            )

                        }
                    }>
                        <JoinClass/>
                    </form>
                </Modal.Body>
            </Modal>
            {
                isloading ?
                    <div style={{justifyContent: 'center', display: 'flex', flexWrap: 'wrap', marginTop: '18rem'}}>
                        <Hourglass
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="hourglass-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            colors={['#306cce', '#72a1ed']}
                        /></div> :
                    isclassempty
                        ?
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
                                            <h3 className="text-5xl md:text-8xl font-extrabold leading-tighter tracking-tighter mb-4">Join
                                                Class </h3>
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
                                                        <span>
                                                            <b>
                                                              by :- {card.teacher_name}
                                                            </b>
                                                        </span>
                                                            <Button className={'shadow'} color="failure"
                                                                    onClick={(event) => {
                                                                        event.preventDefault();
                                                                        removeClass(card.class_id);
                                                                    }
                                                                    }
                                                            >
                                                                <b style={{fontSize: 'medium'}}>
                                                                    Leave
                                                                </b>
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
            <ToastContainer position="top-center"
                            theme="dark"
                            draggablePercent={60}
            />
        </div>
    )
}

export default StudentHome;