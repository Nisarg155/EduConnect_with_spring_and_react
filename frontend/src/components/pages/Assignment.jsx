import {useParams} from "react-router-dom";
import {Accordion, Badge, Button, FileInput, Label, Modal, Progress, Table} from "flowbite-react";
import {HiPlus} from "react-icons/hi";
import {useEffect, useState} from "react";
import CreateAssignment from "../forms/CreateAssignment.jsx";
import {CreateAssignmentFetch} from "../../fetch_components/fetchComponents.jsx";
import moment from 'moment';
import {TbListDetails} from "react-icons/tb";
import {FaTrash} from "react-icons/fa";
import {useSelector} from "react-redux";
import {MdOutlineFileUpload} from "react-icons/md";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";


const Assignment = () => {
    const class_id = useParams()
    const [createModal, setCreateModal] = useState(false)
    const [assignments, setAssignments] = useState([])
    const user = useSelector(state => state.User)
    const [uploadmodal, setUploadmodal] = useState(false)
    const [files, setFiles] = useState([])
    const [current_assignment, setCurrent_assignment] = useState(null)
    const [issubmited, setIssubmited] = useState(false)
    const [progressbar, setProgressbar] = useState(0.0)
    const storage = getStorage();

    useEffect(() => {
        let res = fetch(`http://localhost:8080/api/get_assignments/${class_id.code}`, {
            method: 'GET',
        })

        res.then(
            (responses) => {
                responses.json().then(
                    (value) => {
                        setAssignments(value);
                    }
                )
            }
        )
    }, []);
    const toggleCreateModal = () => {
        setCreateModal(!createModal);
    }

    const toggleUpdateModal = () => {
        setUploadmodal(!uploadmodal)
        setCurrent_assignment(null)
    }


    const manage_upload = async () => {
        setIssubmited(true)
        let length = files.length
        let progress = 0
        const urls = []
        const file_names = []

        for(const file of files)
        {
            const storageRef = ref(storage, `Assignments/${class_id.code}/${current_assignment}/${file.name}`)
            await uploadBytes(storageRef, file).then(async () => {
                progress = progress + 1;
                setProgressbar(progress / length * 100);
                await getDownloadURL(storageRef).then(
                    (url) => {
                        file_names.push((file.name).toString())
                        urls.push(url);
                    }
                )
            })

        }
    }
    const CreateAss = async (data) => {

        let lst_sub = false;
        if (data.late_sub !== null) {
            lst_sub = true;
        }
        const new_data = {
            title: data.title,
            description: data.description,
            sub_date: data.sub_date,
            late_sub: lst_sub
        }
        const responses = CreateAssignmentFetch(new_data, class_id.code)
        await responses.then(
            (responses) => {
                responses.json().then((value) => {
                    setAssignments(value)
                })
            }
        )
    }

    return (
        <div>
            <div className="flex flex-wrap gap-2 mt-6 justify-end">
                <Button gradientMonochrome="info" className={'lg:mr-40 mr-8 '} onClick={
                    () => {
                        setCreateModal(true)
                    }
                }>
                    <HiPlus className="mr-2 h-5 w-5"/> <b style={{fontSize: 'medium'}}>Add Assignment</b>
                </Button>
            </div>

            <Modal show={uploadmodal} size={'2xl'} onClose={toggleUpdateModal} popup>
                <Modal.Header> Upload Assignments</Modal.Header>
                <Modal.Body>
                    <form onSubmit={
                        async (event) => {
                            event.preventDefault()
                            await manage_upload()

                            setIssubmited(false)
                            setProgressbar(0.0)
                            setCurrent_assignment(null)
                            setFiles([])
                            setUploadmodal(false)
                        }
                    }>
                        <div className="flex w-full mt-8 items-center justify-center">
                            <Label
                                htmlFor="dropzone-file"
                                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    <svg
                                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                                        800x400px)</p>
                                </div>
                                <FileInput id="dropzone-file" multiple onChange={
                                    async (event) => {
                                        let obj = event.target.files;
                                        let file = [...files]
                                        for (const key of Object.keys(obj)) {
                                            file.push(obj[key])
                                        }
                                        await setFiles(file)
                                    }
                                } className="hidden"/>
                            </Label>
                        </div>
                        <div className="w-full mt-8">
                            <Button type={'submit'}>
                                <b style={{fontSize: 'medium'}}>Add
                                </b>
                            </Button>

                            <Progress progress={progressbar} className={'mt-8'} progressLabelPosition="inside"
                                      size="xl"
                                      labelProgress
                            />
                        </div>
                    </form>

                    {
                        issubmited ? null : <div className={'overflow-x-auto mt-8 '}>
                            <Table striped>
                                <Table.Head>
                                    <Table.HeadCell style={{fontSize: 'medium'}}>Files</Table.HeadCell>
                                    <Table.HeadCell>
                                        <span className={'sr-only'}> Delete </span>
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className={'divide-y'}>
                                    {

                                        files.map((file, i) => (
                                            <Table.Row key={i}
                                                       className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                                <Table.Cell>{file.name}</Table.Cell>
                                                <Table.Cell>
                                                    <a
                                                        onClick={
                                                            async (event) => {
                                                                event.preventDefault()
                                                                let file = [...files];
                                                                file.splice(i, 1);
                                                                await setFiles(file)
                                                            }
                                                        }
                                                        className="font-medium text-cyan-600 hover:cursor-pointer hover:underline dark:text-cyan-500">
                                                        Delete
                                                    </a>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                    }
                </Modal.Body>
            </Modal>

            <Modal show={createModal} size="md" onClose={
                toggleCreateModal
            } popup>
                <Modal.Header/>
                <Modal.Body>
                    <form
                        onSubmit={
                            (event) => {
                                event.preventDefault();
                                const formData = new FormData(event.target);
                                const dateString = formData.get('Submission');
                                const date = moment(dateString, 'MMMM D, YYYY'); // Parse with specific format
                                const formattedDate = date.format('YYYY-MM-DD');
                                const dt = new Date(formattedDate);
                                const last_date = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 23, 59, 59)
                                const data = {
                                    class_id: class_id.code,
                                    title: formData.get('title'),
                                    description: formData.get('description'),
                                    sub_date: last_date,
                                    late_sub: formData.get('late_sub_switch')
                                }

                                CreateAss(data)
                                setCreateModal(false)
                            }
                        }>
                        <CreateAssignment/>
                    </form>
                </Modal.Body>
            </Modal>
            <div className={'p-6'}>
                {
                    (
                        assignments.map((assignment) => (
                            <Accordion key={assignment.unique_code} className={'shadow mb-4'}>
                                <Accordion.Panel>
                                    <Accordion.Title className={'font-medium'}>
                                        <div className={'flex flex-wrap gap-3'}>
                                            <b>
                                                {assignment.title}
                                            </b>

                                            <Badge color="info" size="sm"  className={'shadow'}>
                                                Submitted
                                            </Badge>
                                        </div>

                                    </Accordion.Title>
                                    <Accordion.Content>
                                        {
                                            assignment.description
                                            // ((new Date()).getTime() >= new Date(assignment.lastdate).getTime()).toString()
                                        }
                                    </Accordion.Content>
                                    <Accordion.Content>
                                        {
                                            user.role === 'Teacher' ?
                                                <div className={'flex flex-wrap justify-end gap-2'}>
                                                    <Button color={'info'}>
                                                        <TbListDetails className={'mr-2 h-5 w-5'}/>
                                                        <b>
                                                            Details
                                                        </b>
                                                    </Button>
                                                    <Button color={'failure'}>
                                                        <FaTrash className="mr-2 h-5 w-5"/>
                                                        <b>
                                                            Delete
                                                        </b>
                                                    </Button>
                                                </div> :
                                                <div className={'flex-wrap flex justify-end'}>
                                                    {
                                                        !assignment.latesubmisssion ? <Button onClick={
                                                            () => {
                                                                setCurrent_assignment(assignment.unique_code)
                                                                setUploadmodal(true)
                                                            }

                                                        }

                                                        >
                                                            <MdOutlineFileUpload className="mr-2 h-5 w-5"/>
                                                            <b>
                                                                Upload
                                                            </b>
                                                        </Button> : (new Date(assignment.lastdate).getTime() >= (new Date()).getTime()) ?
                                                            <Button onClick={
                                                                () => {
                                                                    setCurrent_assignment(assignment.unique_code)
                                                                    setUploadmodal(true)
                                                                }

                                                            }
                                                            >
                                                                <MdOutlineFileUpload className="mr-2 h-5 w-5"/>
                                                                <b>
                                                                    Upload
                                                                </b>
                                                            </Button> : <Button disabled={true}>
                                                                <MdOutlineFileUpload className="mr-2 h-5 w-5"/>
                                                                <b>
                                                                    Upload
                                                                </b>
                                                            </Button>
                                                    }
                                                </div>
                                        }
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                        ))
                    )
                }
            </div>

        </div>


    )
}

export default Assignment;