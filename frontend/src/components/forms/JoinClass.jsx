import {Button, Label, TextInput} from "flowbite-react";

const JoinClass = () => {
    return (
        <div className="space-y-6">
            <div>
                <div className="mb-2 block font-medium ">
                    <Label htmlFor="code" value="Class Code"/>
                </div>
                <TextInput
                    id="code"
                    name={'code'}
                    required
                />
            </div>

            <div className="w-full">
                <Button type={'submit'}>
                    <b>
                        Join
                    </b></Button>
            </div>

        </div>
    )
}

export default JoinClass;