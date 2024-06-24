import {Tabs} from "flowbite-react";
import {Materials} from "./Materials.jsx";
import {FaBookOpen} from "react-icons/fa";
import {MdAssignment} from "react-icons/md";
import Assignment from "./Assignment.jsx";
import {useSelector} from "react-redux";

export function ClassDetails() {

    const user = useSelector(state => state.User)
    return (
        <div>
            <div style={{}}>
                <Tabs aria-label="Tabs with underline" style="underline">
                    <Tabs.Item active title="Materials" icon={FaBookOpen}>
                        <Materials/>
                    </Tabs.Item>
                    <Tabs.Item title="Assignment" icon={MdAssignment}>
                        <Assignment/>
                    </Tabs.Item>
                </Tabs>
            </div>
        </div>
    )
}