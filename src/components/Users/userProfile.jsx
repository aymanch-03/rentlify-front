
import { useDispatch, useSelector } from 'react-redux'


import { useEffect } from "react"
import { getUser } from "../../redux/features/userSlice";
import image from "../../assets/1946429.png"
import UpdateUserForm from './UpdateUserForm';


export default function UserProfile(props) {


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser(props.id))
    }, [dispatch])

    const data = useSelector((state) => state.user.user);
console.log(data)
    return (
        <div className="m-8 pr-[200px]">
            <div className="inline-flex">

                <div className="w-[300px]">
                    <img className="w-[180px] h-[180px] rounded-s-full" src={image} alt="Profil Image" />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-semibold uppercase">{data?.last_name + " " + data?.first_name}</h1>
                    <p className="text-slate-500">
                        <a href="" className="text-blue-600/75">{data?.email}</a>
                        {" "}- {data?.role}
                    </p>
                </div>
            </div>            
            {data ? (
                <UpdateUserForm data={data}/>
              ) : (
                <div>Loading...</div>
              )}
        </div>
    )
}