import {useParams} from "react-router-dom";
import {Tabs} from "flowbite-react";
import {Teacher_Materials} from "./Teacher_Materials.jsx";
import { FaBookOpen } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import Teacher_Assignment from "./Teacher_Assignment.jsx";
export function Teacher_ClassDetails() {

    return (

        <div>
            <div style={{  }}>
                <Tabs aria-label="Tabs with underline" style="underline">
                    <Tabs.Item active title="Materials" icon={FaBookOpen}>
                        <Teacher_Materials/>
                    </Tabs.Item>
                    <Tabs.Item title="Assignment" icon={MdAssignment}>
                        <Teacher_Assignment/>
                    </Tabs.Item>
                </Tabs>
            </div>
        </div>
    )
}