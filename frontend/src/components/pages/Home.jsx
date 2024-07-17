
export function Home()
{



    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: 'center',
            alignItems: 'center'

        }} className={"mr-4 ml-4 sm:flex sm:flex-wrap  sm:justify-center  "}>

            <div className={'mt-40'}>
                <h1 className="text-5xl md:text-8xl font-extrabold leading-tighter tracking-tighter mb-8"
                    data-aos="zoom-y-out"><span
                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400"> <br/>Welcome to EduConnect ,</span>
                </h1>
                <h3 className="text-5xl md:text-8xl font-extrabold leading-tighter tracking-tighter mb-4">Please Sign in to Continue</h3>
            </div>
        </div>
    )
}
