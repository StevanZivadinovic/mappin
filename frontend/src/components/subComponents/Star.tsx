import React from 'react'

const Star = ({numberOfStars}) => {
  const renderTimes = Array.from({ length: numberOfStars });
  return (
    <div className="div">
      {
        renderTimes.map((a,i)=>{
         return <img key={i} width="15" height="15" src="https://img.icons8.com/emoji/48/star-emoji.png" alt="star-emoji"/>
        })
      }
    </div>
  )
}

export default Star