import {Button, Label, Textarea, TextInput} from "flowbite-react";
import {MdTitle} from "react-icons/md";
import {useState} from "react";
import {UpdateClass} from "../../fetch_components/fetchComponents.jsx";

const CreateClass = (data) => {
    const code = data.data.code
    const setClasses = data.data.setClasses
    const teacher_id = data.data.teacher_id
    const teacher_name = data.data.teacher_name
    const setEditclassmodal = data.data.setEditclassmodal
    const [title, setTitle] = useState(data.data.name)
    const [description, setDescription] = useState(data.data.description)
    return (

        <form
            onSubmit={(event) => {
                event.preventDefault();
                let data = {
                    code:code,
                    name:title,
                    description:description,
                    teacher_id:teacher_id,
                    teacher_name:teacher_name
                }
                let response = UpdateClass(data)
                response.then(
                    (response) => {
                        response.json().then(
                            (value) => {
                                setClasses(value)
                                setEditclassmodal(false);
                            }
                        )
                    }
                )

            }}
        >
            <div className="space-y-6">
                <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                    Edit Class</h3>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="title" className={'text-lg'} value="Class Name"/>
                    </div>
                    <TextInput
                        icon={MdTitle}
                        id="title"
                        name={'title'}
                        placeholder="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="description" className={'text-lg'} value="Description"/>
                        </div>
                        <Textarea id="description" name={'description'} value={description} onChange={
                            (event) => {
                                setDescription(event.target.value)
                            }
                        } placeholder="Add description ..." required rows={4}/>
                    </div>

                    <div className="w-full mt-8">
                        <Button type={'submit'}>
                            <b style={{fontSize: 'medium'}}>Edit</b>
                        </Button>
                    </div>

                </div>
            </div>
        </form>

    )

}

export default CreateClass;