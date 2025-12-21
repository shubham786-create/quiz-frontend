import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const UpdateDetails = ({ user = {} }) => {
  const navigate = useNavigate();
  function onClose(){
    navigate('/profile')
  }
  const [form, setForm] = useState({
    fullname: '',
    email: '',
  });

  // fill form only when user arrives
  useEffect(() => {
    if (user?.fullname || user?.email) {
      setForm({
        fullname: user.fullname || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        'https://quiz-backend-mwqs.onrender.com/api/v1/users/updateAccount',
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      navigate('/profile');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
    <Navbar />
    <div className="fixed inset-0 bg-slate-600 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 h-2/3 rounded-2xl p-6 w-[60%]  space-y-4  flex flex-col justify-between"
      >
        <h2 className="text-lg text-sky-500 font-semibold">Update profile</h2>

        <input
          type="text"
          value={form.fullname}
          required
          onChange={(e) =>
            setForm({ ...form, fullname: e.target.value })
          }
          placeholder="Full name"
          className="w-[60%] p-2 rounded bg-white border border-slate-700"
        />

        <input
          type="email"
          value={form.email}
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          placeholder="Email"
          className="w-[60%] p-2 rounded bg-white border border-slate-700"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border cursor-pointer text-white border-slate-600 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-sky-400 cursor-pointer text-slate-950 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default UpdateDetails;
