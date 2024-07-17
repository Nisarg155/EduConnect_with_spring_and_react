export function FetchComponents(user)
{

    if(user.role === 'Teacher') {
        fetch('https://educonnectwithspringandreact-production.up.railway.app/api/teacher/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teacher_id: user.uid,
                name: user.username
            })
        })
    }
    else if(user.role === 'Student')
    {
        fetch('https://educonnectwithspringandreact-production.up.railway.app/api/student/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                student_id:user.uid,
                name:user.username
            })
        })

    }
}

export const CreateClassFetch = (data) => {
    return fetch(`https://educonnectwithspringandreact-production.up.railway.app/api/classes/create/${data.uid}/${data.teacher_name}`
        ,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(
                {
                    class_id: "",
                    name: data.name,
                    description: data.description,
                    teacher_id: "",
                    teacher_name: ""
                }
            )
        }
        );
}

export const DeleteClass = (data) => {

    return fetch(`https://educonnectwithspringandreact-production.up.railway.app/api/classes/delete/${data.code}/${data.uid}` , {
        method:'DELETE'
    })
}

export const UpdateClass = (data) => {

    return fetch('https://educonnectwithspringandreact-production.up.railway.app/api/classes/edit' , {
        method:'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(
            {
                class_id: data.code,
                name: data.name,
                description: data.description,
                teacher_id: data.teacher_id,
                teacher_name: data.teacher_name
            }
        )
    })

}


export const UploadMaterialFetch  = async (data) =>
{


    return fetch('https://educonnectwithspringandreact-production.up.railway.app/api/material/upload' ,{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
    })
}

export const CreateAssignmentFetch  = async (data,code) => {
    return  fetch(`https://educonnectwithspringandreact-production.up.railway.app/api/Assignment/${code}`,{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
    })

}




