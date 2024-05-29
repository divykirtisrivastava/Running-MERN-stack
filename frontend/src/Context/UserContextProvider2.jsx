import React, { useState } from 'react'
import UserContext from './UserContext'
export default function UserContextProvider2({children}){
    let [list,setList]=useState('')
  return (
  <UserContext.Provider value={{list,setList}}>
    {children}
  </UserContext.Provider>
  )
}
