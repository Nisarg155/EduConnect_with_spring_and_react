import {Button, Table} from "flowbite-react";
import {useLocation, useNavigate} from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";


const Teacher_Material_Details = () => {
    const {state} = useLocation();
    const urls = state.urls;
    const file_names = state.file_names;
    const navigation = useNavigate();
    return (
        <div>
            <div className={ 'mt-8'}  >
                <a className={'ml-20 hover:cursor-pointer '} style={{ fontSize:"medium" , color:'blue' }}  onClick={
                    () => {
                        navigation(`/ClassDetails/${state.code}`)
                    }
                }>
                    <b>
                        <u>
                            back
                        </u>
                    </b>
                </a>
            </div>

            <div className="overflow-x-auto  justify-center" style={{padding: '3rem'}}>
                <Table striped className={'shadow border-gray-500  rounded-lg '}>
                    <Table.Head className={'justify-between'}>
                        <Table.HeadCell style={{fontSize: 'medium'}}>Files</Table.HeadCell>
                        <Table.HeadCell>
                            <span className={'sr-only'}> Delete </span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className={'divide-y'}>
                        {

                            urls.map((url, i) => (
                                <Table.Row key={i}
                                           className="font-medium  bg-white dark:border-gray-700 dark:bg-gray-800">

                                    <Table.Cell style={{fontSize: 'medium'}}>
                                        <b>
                                            {file_names[i]}</b>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {/*<a*/}
                                        {/*    */}
                                        {/*    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">*/}
                                        {/*    Delete*/}
                                        {/*</a>*/}
                                        <Button color={'info'}>
                                            <a href={url.toString()} target={'_blank'}>
                                                <b>
                                                    View
                                                </b>

                                            </a>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
            </div>
        </div>

    )
}

export default Teacher_Material_Details;