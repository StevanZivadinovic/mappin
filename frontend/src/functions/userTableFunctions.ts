import { Dispatch, SetStateAction } from "react"
interface pinsObjectType{
    _id:string,
    pinsCount:number
    }
export const getPinsPerUser = (setUsersPins:Dispatch<SetStateAction<pinsObjectType[]>>)=>{
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/pins/pins_per_user`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
    })
    .then((data)=>{
        return data.json()
    })
    .then((data)=>{
        console.log(data)
        if(data.pinsPerUser.length>0 && data.isLoggedIn===true){
            setUsersPins(data.pinsPerUser)
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}