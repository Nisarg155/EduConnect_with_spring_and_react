import {useParams} from "react-router-dom";
import {Accordion, Button, Modal} from "flowbite-react";
import {HiPlus} from "react-icons/hi";
import {useState} from "react";
import CreateAssignment from "../../forms/CreateAssignment.jsx";
import {CreateAssignmentFetch} from "../../../fetch_components/fetchComponents.jsx";


const Teacher_Assignment = () => {
    const class_id = useParams()
    const [createModal, setCreateModal] = useState(false)
    const [assignments, setAssignments] = useState([])

    const toggleCreateModal = () => {
        setCreateModal(!createModal);
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
                                const data = {
                                    class_id: class_id.code,
                                    title: formData.get('title'),
                                    description: formData.get('description'),
                                    sub_date: formData.get('Submission'),
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
                            <Accordion key={assignment.unique_code} className={'shadow'} >
                                <Accordion.Panel>
                                    <Accordion.Title className={'font-medium'}>
                                        <b>
                                            {assignment.title}
                                        </b>
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        {
                                            assignment.description
                                        }
                                    </Accordion.Content>
                                    <Accordion.Content>
                                        <button>
                                            hello
                                        </button>
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

export default Teacher_Assignment;