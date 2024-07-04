import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios'
export default function UserContextProvider2({children}){
    let [list,setList]=useState('')
  let [auth, setAuth]= useState({
    token: localStorage.getItem('token') || null,
    isAutherzed : !!localStorage.getItem('token'),
    username: '',
    id:''
  })

    let login = async (username, password)=>{
      let result = await axios.post('http://127.0.0.1:4000/api/clientLogin', {username, password})
      console.log(result)
      localStorage.setItem('token', result.data.token)
      setAuth({token:result.data.token, isAutherzed:true, username: username, id:result.data.id})
      return true
    }

    let logOut = ()=>{
      localStorage.removeItem('token')
      setAuth({token:null ,isAutherzed:false, username: ''})
    }

  async  function profile(){
      let token = localStorage.getItem('token')
      // try {
        if(token){
          let result = await axios.get('http://127.0.0.1:4000/api/profile')
          // console.log(result)
        setAuth({token:token, isAutherzed:true, username: result.data.username, id:result.data.id})
          
        }
        
      // } catch (error) {
      //   logOut()
      // }
    }
  async  function getGoogleProfile(){
      let token = localStorage.getItem('token')
      // try {
        if(token){
          let result = await axios.get('http://127.0.0.1:4000/auth/verify')
          let username  = result.data.email.split('@')[0]
          console.log(result)
          if(username){
            createClientTable(username)
          }
        setAuth({token:token, isAutherzed:true, username: username, id:result.data.id})

          
        }
        
      // } catch (error) {
      //   logOut()
      // }
    }
    async function createClientTable(username){
      await axios.get(`http://localhost:4000/api/createClient/${username}`)
    }
    useEffect(()=>{
      let token = localStorage.getItem('token')
      if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        // profile()
        getGoogleProfile()
      }
    }, [])


  return (
  <UserContext.Provider value={{list,setList, login, logOut, auth, getGoogleProfile}}>
    {children}
  </UserContext.Provider>
  )
}
