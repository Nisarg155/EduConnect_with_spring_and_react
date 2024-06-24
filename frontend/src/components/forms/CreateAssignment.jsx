import {Button, Label, TextInput, Textarea} from "flowbite-react";
import { Datepicker } from "flowbite-react";
import {useState} from "react";
import Switch from "react-switch";
const CreateAssignment = () => {
    const [switch1, setSwitch1] = useState(false)
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create Assignment</h3>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="title" className={'font-medium'} value="Assignment Title"/>
                </div>
                <TextInput id="title"  name={'title'} placeholder="xyz" required/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="description" className={'font-medium'} value="Description"/>
                </div>
                <Textarea id="description" name='description' type="textarea" required/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="Submission" className={'font-medium'} value="Submission Date"/>
                </div>
                <Datepicker  id={'Submission'} name={'Submission'} minDate={new Date()} autoHide={true}  title={'Submission Date'}/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="late_sub_switch" className={'font-medium'} value="Submission After last date "/>
                </div>
                <Switch id={'late_sub_switch'} name={'late_sub_switch'} checked={switch1}
                        onChange={() => setSwitch1(!switch1)}/>
            </div>

            <div className="w-full">
                <Button type={"submit"}> <b>Create</b>  </Button>
            </div>
        </div>
    )
}

export default CreateAssignment