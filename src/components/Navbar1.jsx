
import React,{useRef} from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {Link} from 'react-router'

const Navbar1 = () => {
  const navRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.first', {
      y: -120,
      opacity: 0,
      duration: 0.8
    })
    .from('.nav-link', {
      x: 140,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6
    });
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
      className="w-full h-20 px-6 flex items-center justify-between bg-slate-950 text-slate-100"
    >
      {/* Logo */}
      <div className="first flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-sky-400 flex items-center justify-center text-sm font-bold">
          Q
        </div>
        <span className="text-3xl font-semibold">QuizMaster</span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-3">
        <Link className="nav-link px-6 py-1.5 rounded-full border border-sky-400 text-xl" to="/login">
          Login
        </Link>
        <Link className="nav-link px-6 py-1.5 rounded-full bg-sky-400 text-slate-950 text-xl font-medium" to="/register">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar1