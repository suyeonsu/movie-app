import { Axios } from 'axios'
import React from 'react'
import { USER_SERVER } from '../../../Config'
import { useSelector } from 'react-redux'
import { Menu } from 'antd'

function RightMenu(props) {
    const user = useSelector(state => state.user)

    const logoutHandler = () => {
        Axios.get(`${USER_SERVER}/logout`)
            .then(response => {
                if (response.status === 200) {
                    props.history.push('/login')
                } else {
                    alert('Logout Failed')
                }
            })
    }

    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key='mail'>
                    <a href='/login'>Sign In</a>
                </Menu.Item>
                <Menu.Item key='app'>
                    <a href='/register'>Sign Up</a>
                </Menu.Item>
            </Menu>
        )
        
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key='logout'>
                    <a onClick={logoutHandler}>Logout</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default RightMenu