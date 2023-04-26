import React from 'react'
import { useState, useEffect } from 'react'

function Services() {
    const [user, setUser] = useState([]);
    // const [showService, setShowService] = useState(false);
    const [vendorList, setVendorList] = useState([])

    useEffect(()=>{
        getData()
      }, [])
      const getData = async ()=>{
        const res = await fetch("http://localhost:3001/users")
        const data = await res.json()
        console.log(data)
        setUser(data)
      }
      const addEvent = async () =>{
        if(vendorList.length !== 0){
            const res = await fetch('http://localhost:3001/Events', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(vendorList)
        })
        window.location.reload();
        alert("Event added")
        }
      }
      const getEvent = async ()=>{
        const res = await fetch("http://localhost:3001/Events")
        const data = await res.json()
        console.log(data)
      }
  return (
    <div>
        <h1> Services Available</h1>
        <p>Select services</p>
        <button onClick={()=>addEvent()}>Add Event</button>
        <button onClick={()=>getEvent()}>Get Event</button>
      {user.map((use)=>{
         if (use.role === "vendor"){
            return (
                <div key={use.id}>
                    <label htmlFor={use.userName}><h3>{use.service} --- {use.userName}
                     <input onChange={(e) =>{if(e.target.checked){
                        setVendorList([...vendorList,use.username])
                     }}  } type="checkbox" id={use.username}/></h3></label>
                </div>
            )
        }
    })}
    </div>
  )
}
export default Services