import {Button, Label, Textarea, TextInput} from "flowbite-react";
import {MdTitle} from "react-icons/md";
import { useState} from "react";

const CreateClass =  () => {
    const [title, setTitle] = useState('')

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                Create New Class</h3>
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
                    <Textarea id="description" name={'description'} placeholder="Add description ..." required rows={4}/>
                </div>

                <div className="w-full mt-8">
                    <Button type={'submit'}   id={'create_class_submit'} > <b>Create</b></Button>
                </div>

            </div>
        </div>
    )

}

export default CreateClass;