import { Dispatch, SetStateAction } from "react"
interface pinsObjectType{
    _id:string,
    pinsCount:number
    }
export const getPinsPerUser = (setUsersPins:Dispatch<SetStateAction<pinsObjectType[]>>)=>{
    fetch('/api/pins/pins_per_user')
    .then((data)=>{
        return data.json()
    })
    .then((data)=>{
        if(data.pinsPerUser.length>0 && data.isLoggedIn===true){
            setUsersPins(data.pinsPerUser)
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}