import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

    // option ?
    // null => 아무나 출입 가능한 페이지
    // true => 로그인 유저만 출입 가능한 페이지
    // false => 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck() {

        // 서버에 request를 전송해 token을 받아 처리
        
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            dispatch(auth()).then(response => {

                // 로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        navigate('/login')
                    }
                } else { 
                    // 로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        // admin 페이지에 들어가려 할 경우
                        navigate('/')
                    } else {
                        if(option === false)
                            navigate('/')
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}