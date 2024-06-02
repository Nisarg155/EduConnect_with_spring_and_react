import {Button, Modal, Table} from "flowbite-react";
import {HiPlus} from "react-icons/hi";
import {useState} from "react";
import UploadMaterial from "../../forms/UploadMaterial.jsx";
import {useParams} from "react-router-dom";

export function Teacher_Materials() {
    const [materialModal, setMaterialModal] = useState(false)
    const onCloseModal = () => {
        setMaterialModal(false)
    }
    const [files, setFiles] = useState([])
    const class_id = useParams()
    const [issubmited, setIssubmited] = useState(false)
    return (
        <div>


            <Modal show={materialModal} size="2xl" position={'center'} className={'flex flex-row '}
                   onClose={onCloseModal} popup>
                <Modal.Header/>
                <Modal.Body>
                    <UploadMaterial props={
                        {
                            files: files,
                            setFiles: setFiles,
                            class_id: class_id.code,
                            setIssubmited:setIssubmited,
                            issubmited:issubmited,
                            setMaterialModal:setMaterialModal
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
            <div className="flex flex-wrap gap-2 mt-6 justify-end">
                <Button gradientMonochrome="info" className={'lg:mr-40 mr-8 '} onClick={
                    () => {
                        setMaterialModal(true)
                    }
                }>
                    <HiPlus className="mr-2 h-5 w-5"/> <b style={{fontSize: 'medium'}}>Add Material</b>
                </Button>
            </div>

        </div>
    )
}