import React, { useRef } from 'react'
import student from '../pictures/student.jpg'
import quiz from "../pictures/quiz.jpg"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const IndexBody = () => {

  const bodyRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 1.5   // starts AFTER navbar animation
    })

    tl.from('.hero-title', {
      y: -180,
      opacity: 0,
      duration: 0.8
    })
    .from('.hero-sub', {
      y: 80,
      opacity: 0,
      duration: 0.8
    })
  }, { scope: bodyRef })

  return (
    <div ref={bodyRef} className='bg-slate-950'>
      <h1
        className='hero-title text-9xl text-center font-bold text-transparent pt-25 bg-clip-text'
        style={{ backgroundImage: `url(${quiz})` }}
      >
        QUIZMASTER
      </h1>

      <h1 className="hero-sub text-3xl font-semibold text-sky-400 text-center pt-10">
        Ready to outsmart the clock and the competition ?
      </h1>
    </div>
  )
}

export default IndexBody
