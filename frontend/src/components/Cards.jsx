import React from 'react'
import Card from './card'


const Cards = () => {

    const contributers = [
        {
            user: "Shubham",
            Role: "Full Stack (Mern & Flask Backend) Developer",
            discription:"A versatile professional proficient in both front-end and back-end web development, capable of designing, implementing, and maintaining end-to-end web applications."
    },
        {
            user: "Satyam",
            Role: "Frontend (React) Developer",
            discription:"A versatile professional proficient in both front-end and back-end web development, capable of designing, implementing, and maintaining end-to-end web applications."
    },
        {
            user: "Suraj",
            Role: "Frontend (React) Developer",
            discription:"A versatile professional proficient in both front-end and back-end web development, capable of designing, implementing, and maintaining end-to-end web applications."
    }
]
    


  return (
      <div>
          <Card  contributers={contributers}/>
    </div>
  )
}

export default Cards