import React, { useState } from 'react';
import student from "../pictures/student.jpg"
import { Link, useNavigate } from 'react-router';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    fullname: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch("https://quiz-backend-mwqs.onrender.com/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log(data)

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // registration success
      navigate("/home");

    } catch (err) {
      setError("something went wrong while registering or user already exists !");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className='flex w-full'>
      <img src={student} className='w-[50%] object-fit' />
       <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 w-[50%]">
      <div className="relative w-full max-w-md">
     
        <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-emerald-500 via-sky-500 to-fuchsia-500 opacity-60 blur-2xl" />

        <div className="relative rounded-3xl bg-slate-950/90 border border-slate-800/80 px-6 py-8 md:px-8 shadow-2xl">
          <div className="mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 mb-2">
              Join the arena
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Create your QuizMaster account
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-2">
              Save your progress, track your stats, and compete on the leaderboard.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={changeHandler}
                required
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="aradhya_dev"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={changeHandler}
                required
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={changeHandler}
                required
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                 fullname
              </label>
              <input
                type="text"
                name="fullname"
                value={form.fullname}
                onChange={changeHandler}
                required
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="shubham pandey"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl bg-linear-to-r from-emerald-500 to-sky-400 text-slate-950 text-sm font-semibold py-2.5 shadow-lg shadow-emerald-500/40 hover:from-emerald-400 hover:to-sky-300 transition disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-4 text-[11px] text-center text-slate-500">
            Already have an account?{' '}
            <Link to='/login' className="text-emerald-400 hover:text-emerald-300 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
   </div>
  );
};

export default RegisterForm;
