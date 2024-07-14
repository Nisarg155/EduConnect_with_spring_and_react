import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Badge, Button, Table} from "flowbite-react";
import {ref} from "firebase/storage";
import {HiCheck} from "react-icons/hi";
import {FaExclamation} from "react-icons/fa";
import {Hourglass} from "react-loader-spinner";

const AssignmentDetails = () => {
    const navigation = useNavigate()
    const [submissions, setSubmissions] = useState([])
    const [isloading, setIsloading] = useState(true)
    const {state} = useLocation();

    useEffect(() => {
        const res2 = fetch(`http://localhost:8080/api/get_students/${state.code}`, {
            method: 'GET'
        })
        const res = fetch(`http://localhost:8080/api/submissions_by_assignment/${state.assignment_id}`, {
            method: 'GET',
        })


        res.then((response) => {
            response.json().then(
                async (value) => {

                    const subs = [];
                    for (const valueElement of value) {
                        subs.push(valueElement.student_id)
                    }
                    setSubmissions([...value])
                    await res2.then((response) => {
                        response.json().then(
                            (value1) => {
                                const Not_subs = []
                                value1.student_id.map((id, i) => {
                                    if (subs.indexOf(id) === -1) {
                                        Not_subs.push(
                                            {
                                                student_id: id,
                                                student_name: value1.student_name[i]
                                            }
                                        )
                                    }
                                })
                                setSubmissions([...value, ...Not_subs])
                                setIsloading(false)
                            }
                        )
                    })

                }
            )
        })
    }, []);

    return (

        <div>
            <div className={'mt-8'}>
                <a className={'ml-20 hover:cursor-pointer '} style={{fontSize: "medium", color: 'blue'}} onClick={
                    () => {
                        navigation(`/ClassDetails/${state.code}`)
                    }
                }>
                    <b>
                        <u>
                            back
                        </u>
                    </b>
                </a>
            </div>

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
                        />
                    </div> :

                    <div className="overflow-x-auto  justify-center" style={{padding: '3rem'}}>
                        <Table striped className={'shadow border-gray-500  rounded-lg '}>
                            <Table.Head className={'justify-between'}>
                                <Table.HeadCell style={{fontSize: 'medium'}}> Name </Table.HeadCell>
                                <Table.HeadCell style={{fontSize: 'medium'}}>submission status </Table.HeadCell>
                                <Table.HeadCell style={{fontSize: 'medium'}}> details </Table.HeadCell>

                            </Table.Head>
                            <Table.Body className={'divide-y'}>
                                {
                                    submissions.map((submission, i) => (

                                        <Table.Row key={i}>
                                            <Table.Cell
                                                style={{fontSize: 'medium'}}>{submission.student_name}</Table.Cell>
                                            <Table.Cell style={{fontSize: 'medium'}}>
                                                {
                                                    submission.sub_date ? <div className="flex flex-wrap gap-2">

                                                        <Badge icon={HiCheck} className={'shadow font-medium'}
                                                               color={'green'}>
                                                            <b>Submitted</b>
                                                        </Badge>
                                                        {
                                                            state.last_date < (new Date(submission.sub_date)) ?
                                                                <Badge className={'shadow'} icon={FaExclamation}
                                                                       color={'failure'}>
                                                                    <b>Late</b>
                                                                </Badge> : null
                                                        }
                                                    </div> : <div className="flex flex-wrap">
                                                        <Badge
                                                            icon={FaExclamation}
                                                            className={'shadow font-medium'}
                                                            color={'warning'}>
                                                            <b>Not Submitted</b>
                                                        </Badge>
                                                    </div>
                                                }

                                            </Table.Cell>
                                            <Table.Cell style={{fontSize: 'medium'}}>
                                                {
                                                    submission.sub_date ?
                                                        <Button color={'green'} className={'font-medium border-2 shadow'}><b>Details</b></Button>
                                                        : <Button color={'green'} disabled={true} className={'font-medium border-2 shadow'}><b>Details</b></Button>
                                                }
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                }

                            </Table.Body>
                        </Table>
                    </div>
            }
        </div>
    )
}

export default AssignmentDetails;



