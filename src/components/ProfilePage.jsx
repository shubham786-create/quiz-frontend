import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import blank from "../pictures/blank.jpg";

const quickLinks = [
  { label: "Play quiz", href: "/home" },
  { label: "View leaderboard", href: "/leaderboard" },
  { label: "Browse subjects", href: "/home" },
  { label: "Complaints & feedback", href: "/contact" },
];

const ProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState("");

  const fileRef = useRef(null);

  /* ================= FETCH CURRENT USER ================= */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          "https://quiz-backend-mwqs.onrender.com/api/v1/users/getCurrentUser",
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Unauthorized");

        const result = await res.json();
        console.log(result)
        setUser(result.data);
      } catch {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  /* ================= LOGOUT ================= */
  const logout = async () => {
    try {
      const res = await fetch(
        "https://quiz-backend-mwqs.onrender.com/api/v1/users/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Logout failed");

      navigate("/");
    } catch (err) {
      console.error(err.message);
      
    }
  };

  /* ================= CHANGE IMAGE ================= */
  const changeImage = async (file) => {
    if (!file) return;

    // Optional: basic client-side validation
    if (!file.type.startsWith("image/")) {
      setImageError("Please upload a valid image file.");
      return;
    }
    const maxSizeMB = 3;
    if (file.size > maxSizeMB * 1024 * 1024) {
      setImageError(`File too large. Max size is ${maxSizeMB}MB.`);
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      setImageError("");
      setImageUploading(true);

      const res = await fetch(
        "https://quiz-backend-mwqs.onrender.com/api/v1/users/updateProfile",
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Image upload failed");
      }

      // Update user state with fresh data from backend
      setUser(data.data);
    } catch (err) {
      console.error(err.message);
      setImageError(err.message || "Failed to update profile image.");
    } finally {
      setImageUploading(false);
      // Clear file input value so selecting the same file again still triggers onChange
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-300 flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  const isPicture = Boolean(user?.profileImage?.url);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ================= PROFILE HEADER ================= */}
        <section className="grid md:grid-cols-[1.4fr,1fr] gap-6 items-center">
          <div className="rounded-3xl bg-slate-900/90 border border-sky-500/30 p-6 flex items-center gap-5">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-sky-400">
              <img
                src={isPicture ? user.profileImage.url : blank}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-sky-300">
                Profile
              </p>
              <h1 className="text-2xl font-semibold">{user.fullname}</h1>
              <p className="text-sm text-slate-400">@{user.username}</p>
            </div>
          </div>

          {/* ================= ACCOUNT DETAILS ================= */}
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 space-y-3">
            <h2 className="text-lg font-semibold">Account details</h2>

            <p>
              <span className="text-xs text-slate-400">Email</span>
              <br />
              {user.email}
            </p>

            <p>
              <span className="text-xs text-slate-400">Account type</span>
              <br />
              Standard user
            </p>

            {imageError && (
              <p className="text-xs text-red-400 mt-1">{imageError}</p>
            )}

            <div className="flex flex-wrap justify-center gap-4 pt-3">
              <Link
                to="/updateDetails"
                className="px-4 py-2 rounded-xl bg-sky-400 text-slate-950 text-sm font-semibold"
              >
                Edit profile
              </Link>

              <Link
                to="/changePassword"
                className="px-4 py-2 rounded-xl bg-sky-400 text-slate-950 text-sm font-semibold"
              >
                Change password
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-red-400 text-slate-950 text-sm font-semibold"
              >
                Log out
              </button>

              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                hidden
                onChange={(e) => changeImage(e.target.files?.[0])}
              />

              <button
                onClick={() => fileRef.current?.click()}
                disabled={imageUploading}
                className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                  imageUploading
                    ? "bg-slate-600 text-slate-300 cursor-not-allowed"
                    : "bg-sky-400 text-slate-950"
                }`}
              >
                {imageUploading ? "Uploading..." : "Change image"}
              </button>
            </div>
          </div>
        </section>

        {/* ================= QUICK LINKS ================= */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Jump back into QuizMaster
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            Use these shortcuts to continue.
          </p>

          <div className="grid gap-4 md:grid-cols-4">
            {quickLinks.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="rounded-2xl bg-slate-900 border border-slate-800 p-4 hover:border-sky-400 transition"
              >
                <span className="font-semibold">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="rounded-3xl bg-slate-900 border border-sky-500/30 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">
              Ready for the next round?
            </h2>
            <p className="text-slate-300">
              Pick a subject and continue playing.
            </p>
          </div>

          <Link
            to="/home"
            className="px-5 py-2 rounded-full bg-sky-400 text-slate-950 font-semibold"
          >
            Go to Home
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
