import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ChangePassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        'https://quiz-backend-mwqs.onrender.com/api/v1/users/changePassword',
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
      setError( 'invalid Old password or something went wrong !');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <div className=" h-screen bg-slate-950 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 h-2/3 flex flex-col justify-between rounded-2xl p-6 w-[60%] space-y-4"
        >
          <h2 className="text-xl text-sky-400 font-semibold">
            Change Password
          </h2>

          <p className='p-2 text-red-500 font-semibold'>{error}</p>

          <input
            type="password"
            placeholder="Old password"
            value={form.oldPassword}
            onChange={(e) =>
              setForm({ ...form, oldPassword: e.target.value })
            }
            required
            className=" w-[60%] p-2 rounded bg-white border border-slate-700"
          />

          <input
            type="password"
            placeholder="New password"
            value={form.newPassword}
            onChange={(e) =>
              setForm({ ...form, newPassword: e.target.value })
            }
            required
            className="w-[60%] p-2 rounded bg-white border border-slate-700"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="px-4 py-2 border border-slate-600 text-white rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-sky-400 text-slate-950 rounded"
            >
              {loading ? 'Updating...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
