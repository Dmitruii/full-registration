import React, {useContext, useEffect, useState} from 'react'
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";

function App() {

    const {store} = useContext(Context)
    const [users, setUsers] = useState<Array<IUser>>([])

    useEffect(() => {
        if(localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers()
            setUsers(response.data)
        } catch (e) {
            console.log(e)
        }
    }
    if (store.isLoading) {
        return <h1>Loading...</h1>
    }

    if (!store.isAuth) {
        return <LoginForm />
    }

    return (
        <div className="App">
            <h1>{store.isAuth ? `User is authorized` : `Registration`}</h1>
            <h1>{store.user.isActivated ? `Account is activated` : `Activate account!!!`}</h1>
            <button onClick={() => store.logout()}>Exit</button>
            <div>
                <button onClick={() => getUsers()}>Get users</button>
            </div>
            <div>
                <h1>Users</h1>
                {users.map(user => (
                    <h1 key={user.id}>{user.email}</h1>
                ))}
            </div>
        </div>
    )
}

export default observer(App)
