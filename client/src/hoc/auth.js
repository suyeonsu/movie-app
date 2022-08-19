/* eslint-disable react-hooks/exhaustive-deps */
 import React, { useEffect } from 'react';
 import { Auth } from '../_actions/user_action';
 import { useSelector, useDispatch } from "react-redux";

 export default function (ComposedClass, reload, adminRoute = null) {
     function AuthenticationCheck(props) {

         let user = useSelector(state => state.user);
         const dispatch = useDispatch();

         useEffect(() => {

             dispatch(Auth()).then(response => {
                 if (!response.payload.isAuth) {
                     if (reload) {
                         props.history.push('/login')
                     }
                 } else {
                     if (adminRoute && !response.payload.isAdmin) {
                         props.history.push('/')
                     }
                     else {
                         if (reload === false) {
                             props.history.push('/')
                         }
                     }
                 }
             })

         }, [])

         return (
             <ComposedClass {...props} user={user} />
         )
     }
     return AuthenticationCheck
 }