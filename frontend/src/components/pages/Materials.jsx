import {Button, Card, Modal, Table} from "flowbite-react";
import {HiPlus} from "react-icons/hi";
import {useEffect, useState} from "react";
import UploadMaterial from "../forms/UploadMaterial.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {FaTrash} from "react-icons/fa";
import {deleteObject, getStorage, ref} from "firebase/storage";
import {getAuth} from "firebase/auth";
import {useSelector} from "react-redux";
import {TbListDetails} from "react-icons/tb";

export function Materials() {
    const [materialModal, setMaterialModal] = useState(false)
    const onCloseModal = () => {
        setMaterialModal(false)
    }
    const [files, setFiles] = useState([])
    const class_id = useParams()
    const [issubmited, setIssubmited] = useState(false)
    const [materials, setMaterials] = useState([])
    const navigate = useNavigate();
    const storage = getStorage();
    const user = useSelector(state => state.User)

    const handle_navigation = (data) => {

        if (user.role === 'Teacher' || user.role === 'Student') {
            navigate('/MaterialsDetails', {
                state: data
            })
        }
    }
    const deleteMaterial = (id, file_names) => {
        const auth = getAuth();
        const uid = auth.currentUser.uid;

        file_names.map((name) => {
            const Ref = ref(storage, `Materials/${class_id.code}/${name}`)
            deleteObject(Ref).then(() => {

                }
            )
        })
        const responses = fetch(`http://localhost:8080/api/materials/${class_id.code}/${id}`, {
            method: 'DELETE'
        })
        responses.then(
            (responses) => {
                responses.json().then(
                    (value) => {
                        setMaterials(value);
                    }
                )
            }
        )
    }
    useEffect(() => {
        const response = fetch(`http://localhost:8080/api/materials/${class_id.code}`, {})
        response.then(
            response => {
                response.json().then(
                    (value) => {
                        setMaterials(value)
                    }
                )
            }
        )
    }, []);

    return (
        <div>

            {/*Models */}
            <Modal show={materialModal} size="2xl" position={'center'} className={'flex flex-row '}
                   onClose={onCloseModal} popup>
                <Modal.Header/>
                <Modal.Body>
                    <UploadMaterial props={
                        {
                            files: files,
                            setFiles: setFiles,
                            class_id: class_id.code,
                            setIssubmited: setIssubmited,
                            issubmited: issubmited,
                            setMaterialModal: setMaterialModal,
                            setMaterials: setMaterials
                        }
                    }/>
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
                                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
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
            {/*<Modal  show={materialModal} size="xl" position={'centre-right'} onClose={onCloseModal} popup >*/}
            {/*    <Modal.Header/>*/}

            {/*</Modal>*/}
            {
                user.role === 'Teacher' ?
                    <div className="flex flex-wrap gap-2 mt-6 justify-end">
                        <Button gradientMonochrome="info" className={'lg:mr-40 mr-8 '} onClick={
                            () => {
                                setMaterialModal(true)
                            }
                        }>
                            <HiPlus className="mr-2 h-5 w-5"/> <b style={{fontSize: 'medium'}}>Add Material</b>
                        </Button>
                    </div> : null
            }
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: 'start',
                alignItems: 'stretch'
            }} className={"mr-4 ml-4   "}>
                {
                    materials.map((material) =>
                        (

                            <Card className="max-w-sm mr-8 ml-8 mb-8 mt-8 "
                                  style={{width: "25rem", height: "15rem"}} key={material.code}>
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white "
                                    style={{marginTop: "-100px"}}>
                                    {material.title}
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
                                        {material.description}
                                    </p>
                                </div>
                                <div style={{
                                    marginBottom: '-100px'
                                }}
                                     className={'flex flex-wrap gap-2 justify-end'}
                                >
                                    <Button onClick={
                                        () => {
                                            const data = {

                                                code: material.class_id,
                                                urls: material.urls,
                                                file_names: material.file_names
                                            }
                                            handle_navigation(data)
                                        }
                                    }>
                                        <TbListDetails className="mr-3 h-5 w-5"/>
                                        <b style={{fontSize: 'medium'}}>
                                            Details
                                        </b>
                                    </Button>

                                    {
                                        user.role === 'Teacher' ?
                                            <Button color="failure" onClick={
                                                () => {
                                                    deleteMaterial(material.code, material.file_names)
                                                }
                                            }>
                                                <FaTrash className="mr-3 h-5 w-5"/>
                                                <b style={{fontSize: 'medium'}}>
                                                    Delete
                                                </b>
                                            </Button> :
                                            null
                                    }
                                </div>


                            </Card>
                        )
                    )
                }
            </div>
        </div>
    )
}