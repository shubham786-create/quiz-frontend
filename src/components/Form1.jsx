import React, { useState } from 'react';
import student from "../pictures/student.jpg"
import { Link, useNavigate } from 'react-router';

const Form1 = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
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
      const res = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // IMPORTANT for cookies
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message)
        throw new Error(data.message || "Login failed");

      }

      // login success
      navigate("/home");

    } catch (err) {
      setError("Wrong user credentials !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex w-full'>
        <img src={student} alt="" className='w-[50%] object-fit'/>
         <div className="min-h-screen flex items-center w-[50%] justify-center bg-slate-950 px-4">
      <div className="relative w-full max-w-md">
       
        <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-sky-500 via-cyan-400 to-fuchsia-500 opacity-60 blur-2xl" />
        
        <div className="relative rounded-3xl bg-slate-950/90 border border-slate-800/80 px-6 py-8 md:px-8 shadow-2xl">
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Login to QuizMaster
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-2">
              Continue your streak, climb the leaderboard, and unlock your potential !.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
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
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
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
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 text-slate-950 text-sm font-semibold py-2.5 shadow-lg shadow-sky-500/40 hover:from-sky-400 hover:to-cyan-300 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-[11px] text-center text-slate-500">
            You don't have an account ?{' '}
            <Link to='/register' className="text-sky-400 hover:text-sky-300 font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Form1;
