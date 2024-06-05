import {Button, Table} from "flowbite-react";
import {useLocation} from "react-router-dom";


const Teacher_Material_Details = () => {
    const {state} = useLocation();
    const urls = state.urls;
    const file_names = state.file_names;
    return (
        <div className="overflow-x-auto  justify-center" style={{ padding:'5rem' }}>
            <Table striped className={'shadow border-gray-500  rounded-lg '}  >
                <Table.Head className={ 'justify-between' }>
                    <Table.HeadCell style={{fontSize: 'medium' }}>Files</Table.HeadCell>
                    <Table.HeadCell>
                        <span className={'sr-only'}> Delete </span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className={'divide-y'}>
                    {

                        urls.map((url, i) => (
                            <Table.Row   key={i}
                                       className="font-medium  bg-white dark:border-gray-700 dark:bg-gray-800">

                                <Table.Cell  style={{ fontSize:'medium' }} >
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
    )
}

export default Teacher_Material_Details;