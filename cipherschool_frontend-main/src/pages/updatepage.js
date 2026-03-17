import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiService } from "../utils/api";
import { getUser, persistAuth } from "../utils/auth";

const initialForm = {
  fullName: "",
  street: "",
  homeAddress: "",
  state: "",
  country: "",
  aboutMe: "",
  gitHub: "",
  linkedIn: "",
  faceBook: "",
  twitter: "",
  instagram: "",
  website: "",
  highestEducation: "",
  currentStatus: "",
  intrest1: "",
  intrest2: "",
  intrest3: "",
  intrest4: "",
};

function Updatepage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const loggedUser = useMemo(() => getUser(), []);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loggedUser?._id || loggedUser._id !== id) {
      navigate("/home");
      return;
    }

    const loadUser = async () => {
      setLoading(true);
      try {
        const response = await apiService.users.updateData(id);
        const data = response.data || {};
        setForm({
          fullName: data.fullName || "",
          street: data.street || "",
          homeAddress: data.homeAddress || "",
          state: data.state || "",
          country: data.country || "",
          aboutMe: data.aboutMe || "",
          gitHub: data.gitHub || "",
          linkedIn: data.linkedIn || "",
          faceBook: data.faceBook || "",
          twitter: data.twitter || "",
          instagram: data.instagram || "",
          website: data.website || "",
          highestEducation: data.highestEducation || "",
          currentStatus: data.currentStatus || "",
          intrest1: data.intrest1 || "",
          intrest2: data.intrest2 || "",
          intrest3: data.intrest3 || "",
          intrest4: data.intrest4 || "",
        });
      } catch (error) {
        Swal.fire("Error", "Unable to load profile data", "error");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, loggedUser?._id, navigate]);

  const saveProfile = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await apiService.users.update(id, form);
      const updatedUser = { ...loggedUser, ...form };
      persistAuth({ token: localStorage.getItem("token"), user: updatedUser });
      Swal.fire("Saved", "Profile updated successfully", "success");
      navigate(`/profilepage/${id}`);
    } catch (error) {
      Swal.fire("Failed", error.response?.data?.error || "Unable to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="gfg-container py-5 text-center">
        <div className="spinner-border text-warning" role="status" />
      </div>
    );
  }

  return (
    <div className="gfg-container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="gfg-header m-0">Edit Profile</h2>
        <button className="btn btn-outline-secondary" onClick={() => navigate(`/profilepage/${id}`)}>
          Cancel
        </button>
      </div>

      <form className="card border-0 shadow-sm" onSubmit={saveProfile}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              className="form-control"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Country</label>
            <input
              className="form-control"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Street</label>
            <input
              className="form-control"
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Home Address</label>
            <input
              className="form-control"
              value={form.homeAddress}
              onChange={(e) => setForm({ ...form, homeAddress: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">State</label>
            <input
              className="form-control"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Highest Education</label>
            <input
              className="form-control"
              value={form.highestEducation}
              onChange={(e) => setForm({ ...form, highestEducation: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Current Status</label>
            <input
              className="form-control"
              value={form.currentStatus}
              onChange={(e) => setForm({ ...form, currentStatus: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Website</label>
            <input
              className="form-control"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">GitHub</label>
            <input
              className="form-control"
              value={form.gitHub}
              onChange={(e) => setForm({ ...form, gitHub: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">LinkedIn</label>
            <input
              className="form-control"
              value={form.linkedIn}
              onChange={(e) => setForm({ ...form, linkedIn: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Facebook</label>
            <input
              className="form-control"
              value={form.faceBook}
              onChange={(e) => setForm({ ...form, faceBook: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Twitter</label>
            <input
              className="form-control"
              value={form.twitter}
              onChange={(e) => setForm({ ...form, twitter: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Instagram</label>
            <input
              className="form-control"
              value={form.instagram}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label className="form-label">About Me</label>
            <textarea
              className="form-control"
              rows={3}
              value={form.aboutMe}
              onChange={(e) => setForm({ ...form, aboutMe: e.target.value })}
            />
          </div>

          <div className="col-12 d-flex justify-content-end">
            <button className="gfg-btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Updatepage;
