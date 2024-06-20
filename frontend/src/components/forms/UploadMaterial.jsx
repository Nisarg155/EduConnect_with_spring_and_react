import {Button, FileInput, Label, Progress, Textarea, TextInput} from "flowbite-react";
import {MdTitle} from "react-icons/md";
import {getAuth} from "firebase/auth";
import {getStorage, ref, uploadBytes , getDownloadURL} from "firebase/storage";
import {useState} from "react";
import {UploadMaterialFetch} from "../../fetch_components/fetchComponents.jsx";
const UploadMaterial = (props) => {
    // eslint-disable-next-line react/prop-types
    const files = props.props.files    // eslint-disable-next-line react/prop-types
    const setfiles = props.props.setFiles
    // eslint-disable-next-line react/prop-types
    const setMaterials = props.props.setMaterials
// eslint-disable-next-line react/prop-types
    const setIssubmited = props.props.setIssubmited
    // eslint-disable-next-line react/prop-types
    const setMaterialModal = props.props.setMaterialModal
    // eslint-disable-next-line react/prop-types
    const storage = getStorage();
    const [progressbar, setProgressbar] = useState(0.0)
    const upload = async (data) => {
        setIssubmited(true)
        let length = data.files.length
        let progress = 0;
        let urls = [];
        let file_names = [];
         for (const file of data.files) {
             const storageRef = ref(storage, `Materials/${data.code}/${file.name}`)
             await uploadBytes(storageRef, file).then(async () => {
                 progress = progress + 1;
                 setProgressbar(progress / length * 100);
                 await getDownloadURL(storageRef).then(
                     (url) => {
                         file_names.push((file.name).toString())
                         urls.push(url);
                     }
                 )
             });
         }
         let upload_data = {
             uid: data.uid,
             code: data.code,
             title: data.title,
             description: data.description,
             urls:urls,
             file_names:file_names
         }
         const response= await UploadMaterialFetch(upload_data)
        response.json().then(
            (value) => {
                setMaterials(value)
            }
        )
    }
    return (
        <div>
            <form onSubmit={
                async (event) => {
                    event.preventDefault()
                    const formData = new FormData(event.target)
                    const auth = getAuth();
                    const user = auth.currentUser;
                    let data = {
                        // eslint-disable-next-line react/prop-types
                        uid: user.uid,
                        // eslint-disable-next-line react/prop-types
                        code: props.props.class_id,
                        title: formData.get('title'),
                        description: formData.get('description'),
                        files: files
                    }

                      await upload(data);

                    setIssubmited(false)
                    setProgressbar(0)
                    setfiles([])
                    setMaterialModal(false)
                }
            }>
                <div className="space-y-8 overflow-x-auto">
                    <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                        Add Materials</h3>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" className={'text-lg'} value="Class Name"/>
                        </div>
                        <TextInput
                            icon={MdTitle}
                            id="title"
                            name={'title'}
                            placeholder="title"
                            required
                        />
                    </div>
                    <div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" className={'text-lg'} value="Description"/>
                            </div>
                            <Textarea id="description" name={'description'}
                                      placeholder="Add description ..." required rows={2}/>
                        </div>
                        <div className="flex w-full mt-8 items-center justify-center">
                            <Label
                                htmlFor="dropzone-file"
                                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    <svg
                                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                                        800x400px)</p>
                                </div>
                                <FileInput id="dropzone-file" multiple onChange={
                                    async (event) => {
                                        let obj = event.target.files;
                                        let file = [...files]
                                        for (const key of Object.keys(obj)) {
                                            file.push(obj[key])
                                        }
                                        await setfiles(file)
                                    }
                                } className="hidden"/>
                            </Label>
                        </div>
                        <div className="w-full mt-8">
                            <Button type={'submit'}>
                                <b style={{fontSize: 'medium'}}>Add
                                </b>
                            </Button>

                            <Progress progress={progressbar} className={'mt-8'} progressLabelPosition="inside"
                                      size="xl"
                                      labelProgress
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UploadMaterial;