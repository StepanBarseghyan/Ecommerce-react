import s from './AdminPage.module.css'
import {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { selectUsers, sort } from '../../store/slices/users/usersSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong, faLock, faPenToSquare, faSortDown,faTrash,faUnlock,faUser,faUserSlash } from '@fortawesome/free-solid-svg-icons';
import {fetchAddBlockUser, fetchDelBlockUser, fetchDeleteUser} from "../../store/slices/users/userAPI";
import {Modal} from "../../components/Modal/Modal";
import {Link} from "react-router-dom";


export default function AdminPage(){
    const {usersData,currentUser,blockedUsers } = useSelector(selectUsers)
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [id, setId] = useState(null)
    const [dir,setDir] = useState('asc')
    const [prevKey,setPrevKey] = useState('')
  

    const showModal = (id) => {
        setId(id)
        setModal(true)
    }
    function blockUser(id){
        const user = usersData.find(e=> e.id === id)
        user &&  dispatch(fetchAddBlockUser(user))
    }
    function unBlockUser(id){
        const user = blockedUsers.find(e=> e.id === id)
        if(!user) return
         dispatch(fetchDelBlockUser(id))
    }

    function sortBy(key){
        if(prevKey !== key){
            const sortedUsers = [...usersData].sort((a,b) =>  a[key] > b[key] ? 1 : -1 )
            dispatch(sort(sortedUsers))
            setDir('desc')
            setPrevKey(key)
            return 
        }
        if(dir === 'asc'){
        const sortedUsers = [...usersData].sort((a,b) =>  a[key] > b[key] ? 1 : -1 )
        dispatch(sort(sortedUsers))
        setDir('desc')
        }
        if(dir === 'desc'){
        const sortedUsers = [...usersData].sort((a,b) =>  a[key] < b[key] ? 1 : -1 )
        dispatch(sort(sortedUsers))
        setDir('asc')
        }
    }

    const deleteUser = (id) => {
        dispatch(fetchDeleteUser(id))
    }
    return(
        <>
            <Link className={s.goToShop} to='/homePage'>Go to shop  <FontAwesomeIcon icon={faArrowRightLong} /></Link>
        <h1 className={s.admin__title}>Dashboard</h1>
    <div className={s.blocks}>
        <div className={s.block}>
        <FontAwesomeIcon icon={faUser} className={s.users__icon}/>
        <p className={s.block__usersCount}>{usersData.length}</p>
        <p className={s.block__title}>Users</p>
        </div>
        <div className={s.block}>
        <FontAwesomeIcon icon={faUserSlash} className={s.blockedUsers__icon} />
        <p className={s.block__usersCount}>{blockedUsers.length}</p>
        <p className={s.block__title}>Blocked Users</p>
        </div>
    </div>
        <table className={s.users__table}>
            <thead>
                <tr>
                    <th onClick={()=> sortBy('id')}>ID <FontAwesomeIcon icon={faSortDown} /></th>
                    <th>Avatar</th>
                    <th onClick={()=> sortBy('firstname')}>Firstname <FontAwesomeIcon icon={faSortDown} /></th>
                    <th onClick={()=> sortBy('lastname')}>Lastname <FontAwesomeIcon icon={faSortDown} /></th>
                    <th onClick={()=> sortBy('login')}>Login <FontAwesomeIcon icon={faSortDown} /></th>
                    <th onClick={()=> sortBy('email')}>Email <FontAwesomeIcon icon={faSortDown} /></th>
                    <th onClick={()=> sortBy('password')}>Password <FontAwesomeIcon icon={faSortDown} /></th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {usersData.map(user=> (
                    <tr key={user?.id}>
                        <td>#{user?.id}</td>
                        <td> <img src={user?.avatar} alt="" /></td>
                        <td>{user?.firstname}</td>
                        <td>{user?.lastname}</td>
                        <td>{user?.login}</td>
                        <td>{user?.email}</td>
                        <td>{user?.password.split('').fill('*',2,-2) }</td>
                        <td>
                            <button className={`${s.table_btn} ${s.blockBtn}`} onClick={() => blockUser(user?.id)}><FontAwesomeIcon icon={faLock} /></button>
                            <button className={`${s.table_btn} ${s.unBlockBtn}`} onClick={() => unBlockUser(user?.id)}><FontAwesomeIcon icon={faUnlock} /></button>
                            <button className={`${s.table_btn} ${s.editBtn}`} onClick={() => showModal(user?.id)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                            <button className={`${s.table_btn} ${s.deleteBtn}`} onClick={()=>deleteUser(user?.id)}><FontAwesomeIcon icon={faTrash} /></button>
                        </td>
                    </tr>
                ) )}
            </tbody>
        </table>
            {
                modal && <Modal id={id} setModal={setModal}/>
            }
        </>
    )
}