// Navbar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import blank from "../pictures/blank.jpg";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Fetch current user to get profile image (same API as ProfilePage)
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch(
          "https://quiz-backend-mwqs.onrender.com/api/v1/users/getCurrentUser",
          { credentials: "include" }
        );

        if (!res.ok) {
          // not logged in
          setUser(null);
          return;
        }

        const result = await res.json();
        setUser(result.data);
      } catch (err) {
        console.error("Navbar user fetch error:", err.message);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const base = "text-xl px-4 py-1.5 rounded-full transition";
  const inactive = "text-slate-100 hover:bg-slate-900";
  const active = "bg-sky-400 text-slate-950 font-medium";

  const profileUrl = user?.profileImage?.url || blank;

  return (
    <nav className="w-full h-25 px-6 flex items-center justify-between bg-slate-950 text-slate-100">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-sky-400 flex items-center justify-center text-sm font-bold">
          Q
        </div>
        <span className="text-3xl font-semibold">QuizMaster</span>
      </div>

      {/* Links + Profile */}
      <div className="flex items-center gap-3">
        <NavLink
          to="/home"
          end
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          About Us
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Contact Us
        </NavLink>

        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Leaderboard
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Profile
        </NavLink>

        {/* Profile avatar */}
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="overflow-hidden border-2 border-sky-500 w-15 h-15 rounded-full"
        >
          {!loadingUser && (
            <img
              src={profileUrl}
              alt="profile"
              className="w-full h-full object-cover"
            />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
