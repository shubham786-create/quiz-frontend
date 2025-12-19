import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import math from "../pictures/math.jpg"
import english from "../pictures/english.jpg"
import ca from "../pictures/ca.jpg"
import cs from "../pictures/cs.jpg"
import gk from "../pictures/gk.jpg"
import science from "../pictures/science.png"
import programming from "../pictures/programming.png"

gsap.registerPlugin(ScrollTrigger)

const Carousel = () => {

  const sectionRef = useRef(null)

  useGSAP(() => {


    const entryTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',             
        toggleActions: 'play none none none'
      }
    })

    entryTl
      .from('.carousel-title', {
        y: 60,
        opacity: 0,
        duration: 0.8
      })
      .from('.anim', {
        y: 80,
        opacity: 0,
        duration: 1
      }, '-=0.3')


    gsap.to('.anim', {
      xPercent: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',     
        end: '+=1200',
        scrub: 1,
      }
    })

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="w-full bg-slate-950 overflow-hidden"
    >

      <h2 className="carousel-title text-4xl font-semibold text-white pl-20 py-25">
        Explore Subjects --&gt;
      </h2>

      <div className="anim flex gap-20 w-max px-20">
        <img src={math} className="imageCarousel" alt="" />
        <img src={english} className="imageCarousel" alt="" />
        <img src={ca} className="imageCarousel" alt="" />
        <img src={cs} className="imageCarousel" alt="" />
        <img src={gk} className="imageCarousel" alt="" />
        <img src={science} className="imageCarousel" alt="" />
        <img src={programming} className="imageCarousel" alt="" />
      </div>

    </section>
  )
}

export default Carousel
