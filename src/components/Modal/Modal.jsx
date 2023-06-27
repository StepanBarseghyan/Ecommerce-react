import {useDispatch, useSelector} from "react-redux";
import {selectUsers} from "../../store/slices/users/usersSlice";
import {fetchEditUser} from "../../store/slices/users/userAPI";
import { useRef, useState } from "react";
import s from './Modal.module.css'

export const Modal = ({id,setModal}) => {
    const imgFile = useRef(null)
    const [ava,setAva] = useState('')
    const {usersData} = useSelector(selectUsers)
    const user = usersData.find(user=> user.id === id)
    const dispatch = useDispatch()
    
    const changeFile = (e) => {
        const reader = new FileReader()
        e.target.files[0] && reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setAva(reader.result)
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const {
            firstname,
            lastname,
        } = event.target

        const data = {
            id,
            firstname:firstname.value,
            lastname:lastname.value,
            avatar:imgFile.current.files.length ? ava : user.avatar
        }

        dispatch(fetchEditUser(data))
        setModal(false)
    }
    return (
        <div className={s.modal__body} onClick={()=> setModal(false)}>
            <div className={s.modal__content} onClick={(e)=> e.stopPropagation()} >
                <h1>Edit User</h1>
                <form className={s.editForm} onSubmit={(event) => {handleSubmit(event)}}>
                    <input type="text" name='firstname' defaultValue={user?.firstname} placeholder='fname'/>
                    <input type="text" name='lastname' defaultValue={user?.lastname} placeholder='lname'/>
                    <input ref={imgFile} type="file" name='avatar' accept="image/*" className={s.file_input} onChange={(e)=>changeFile(e)} />
                    <button>Edit</button>

                </form>
            </div>
        </div>
    )
}