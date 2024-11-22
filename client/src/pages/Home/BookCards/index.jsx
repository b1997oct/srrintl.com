import React from 'react'
import './book.scss'


export default function BookCards({ data, loading }) {
  return (
    <div>
      <div className='books-wraper'>
        {data.map(d => {
          let { sno, title, author, genre, yop, isbn, image, _id } = d

          return <div key={_id} className='book-card'>
            {image ?
              <img loading='lazy' className='cover' src={image} alt={title} />
              : <div className='cover'>No Cover Found</div>}
            <h3>{title}</h3>
            <p>Author : {author}</p>
            <p>Genre : {genre}</p>
            <p>Year Of Publish : {yop}</p>
            <p>isbn : {isbn}</p>
          </div>
        })}

        {loading && Array.from({ length: 4 }).map((d, i) => {
          return <div key={i}>
            <div className='skt cover skt-animate' />
            <p className='skt'></p>
            <p style={{ width: "90%" }} className='skt'></p>
            <p style={{ width: "60%" }} className='skt'></p>
            <p style={{ width: "30%" }} className='skt'></p>
          </div>
        })}
      </div>
      
    </div>
  )
}
