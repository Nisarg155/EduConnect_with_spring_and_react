import {Button, Table} from "flowbite-react";
import {useLocation, useNavigate} from "react-router-dom";
import {getStorage, ref, getDownloadURL} from "firebase/storage";
import {saveAs} from 'file-saver'


const Materials_Details = () => {

    const {state} = useLocation();
    const regex = /\.(jpg|jpeg|png|gif|webp|html|css|txt|mp4|webm|pdf)$/i;
    const storage = getStorage();
    const urls = state.urls;
    const file_names = state.file_names;
    const navigation = useNavigate();
    const manage_download = (file_ref, file_name) => {

        getDownloadURL(file_ref)
            .then((url) => {

                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                    saveAs(blob, file_name);
                };
                xhr.open('GET', url);
                xhr.send();


            })
            .catch((error) => {

            });
    }
    return (
        <div>
            <div className={'mt-8'}>
                <a className={'ml-20 hover:cursor-pointer '} style={{fontSize: "medium", color: 'blue'}} onClick={
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

                                        <div className={'flex flex-wrap  justify-center'}>
                                            <Button color={'green'} className={'mr-4 border-2 shadow'}
                                                    onClick={
                                                        (event) => {
                                                            event.preventDefault();
                                                            const file_ref = ref(storage, `Materials/${state.code}/${file_names[i]}`)
                                                            manage_download(file_ref, file_names[i])
                                                        }
                                                    }>
                                                <b>
                                                    Download
                                                </b>
                                            </Button>

                                            {
                                                regex.test(file_names[i]) ?
                                                    <Button className={'ml-4 border-2 shadow'} color={'cyan'}
                                                            href={url.toString()} target={'_blank'}>
                                                        <b>
                                                            View
                                                        </b>
                                                    </Button>
                                                    : null
                                            }
                                        </div>

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

export default Materials_Details;