import React, { useState } from "react";
import { useNavigate } from "react-router";


const ChangeProfileImage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!image) {
      setError("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", image); // MUST match multer field name

    try {
      setLoading(true);

      const res = await fetch(
        "https://quiz-backend-mwqs.onrender.com/api/v1/users/updateAccount",
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.errors || "Image update failed");
      }

      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-slate-950 px-4">
        <form
          onSubmit={submitHandler}
          className="bg-slate-900 p-6 rounded-2xl w-full max-w-md space-y-4"
        >
          <h2 className="text-lg text-sky-400 font-semibold">
            Change Profile Image
          </h2>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-white"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-4 py-2 border border-slate-600 text-white rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-sky-400 text-slate-950 rounded"
            >
              {loading ? "Updating..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangeProfileImage;
