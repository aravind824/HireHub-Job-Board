import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  getProfile,
  updateProfile,
  uploadResume,
  uploadProfilePicture,
} from "../services/userService";


export default function Profile() {


  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);


const fetchProfile = async () => {
  try {
    const { data } = await getProfile();
    setUser(data.user);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchProfile();
}, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleResumeUpload = async () => {
  if (!resumeFile) {
    alert("Please choose a PDF");
    return;
  }

  setUploadingResume(true);

  const formData = new FormData();

  formData.append("resume", resumeFile);

  try {
    const { data } = await uploadResume(formData);

    alert(data.message);
    setUser(data.user);

  } catch (err) {
    alert(err.response?.data?.message || "Upload Failed");
  } finally {
    setUploadingResume(false);
  }
};

const saveProfile = async () => {
  setSaving(true);

  try {
    const response = await updateProfile(user);

    alert(response.data.message);

    setUser(response.data.user);

    setEditing(false);
  } catch (err) {
    alert(err.response?.data?.message || "Something went wrong");
  } finally {
    setSaving(false);
  }
};

const handleProfileUpload = async () => {
  if (!profileImage) {
    alert("Choose an image");
    return;
  }
  setUploadingImage(true);
  

  const formData = new FormData();
  formData.append("profileImage", profileImage);

  try {
    const { data } = await uploadProfilePicture(formData);

    alert(data.message);
    setUser(data.user);

  } catch (err) {
    alert(err.response?.data?.message || "Upload failed");
  } finally {
    setUploadingImage(false);
  }
};



  if (loading) {
    return <LoadingSpinner />;
  }



  return ( 
    <>
    <Navbar />

    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        My Profile
      </h1>

      <div className="bg-white shadow-xl rounded-xl p-8">

        <div className="flex justify-center mb-6">
            <img
            src={
                user.profilePicture
                ? `http://localhost:5000${user.profilePicture}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border"
            />
        </div>

        <div className="mt-4 flex items-center gap-3 justify-center">


        </div>

        <div className="flex items-center justify-center gap-4 mt-4">
            <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProfileImage(e.target.files[0])}
                />

                <label
                htmlFor="profileImage"
                className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-md font-medium"
                >
                Choose Image
                </label>

                <span className="text-gray-600">
                {profileImage ? profileImage.name : "No file selected"}
                </span>

                <button
                onClick={handleProfileUpload}
                disabled={uploadingImage}

                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
                >
                  {uploadingImage ? "Uploading..." : "Upload Image"}
                </button>
        </div>

        <div className="space-y-5">

          <div>
            <label className="font-bold">Name</label>

            <input
              className="w-full border rounded p-2 mt-1"
              name="name"
              value={user.name}
              disabled={!editing}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="font-bold">Email</label>

            <input
              className="w-full border rounded p-2 mt-1"
              name="email"
              value={user.email}
              disabled={!editing}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="font-bold">Phone</label>

            <input
              className="w-full border rounded p-2 mt-1"
              name="phone"
              value={user.phone || ""}
              disabled={!editing}
              onChange={handleChange}
              placeholder="Not Added Yet"
            />
          </div>

          <div>
            <label className="font-bold">Bio</label>

            <textarea
              className="w-full border rounded p-2 mt-1"
              rows="4"
              name="bio"
              value={user.bio || ""}
              disabled={!editing}
              onChange={handleChange}
              placeholder="Not Added Yet"
            />
          </div>

          <div>
            <label className="font-bold">Resume</label>

            <p className="mt-2">
                {user.resume ? (
                    <a
                        href={`http://localhost:5000${user.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                    >
                        View Resume
                    </a>
                ) : (
                  "Not Uploaded"
                )}
        </p>

        <div className="mt-4 flex items-center gap-4 flex-wrap">

            <label className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded cursor-pointer transition">
                Choose Resume
                <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setResumeFile(e.target.files[0])}
                />
            </label>

            <span className="text-gray-600">
                {resumeFile ? resumeFile.name : "No file selected"}
            </span>

            <button
                onClick={handleResumeUpload}
                disabled={uploadingResume}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
            >
                {uploadingResume ? "Uploading..." : "Upload Resume"}
            </button>

        </div>
    </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {!editing ? (
            <button
              disabled={saving}
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              Edit Profile
            </button>
          ) : (
            <div className="space-x-3">

              <button
                onClick={saveProfile}
                disabled={saving}
                className="bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              

              <button

                disabled={saving}
                onClick={() => {
                  setEditing(false);
                  fetchProfile();
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded"
              >
                Cancel
              </button>

            </div>
          )}

        </div>

      </div>
    </div>

    <Footer />
    </>
  );
}