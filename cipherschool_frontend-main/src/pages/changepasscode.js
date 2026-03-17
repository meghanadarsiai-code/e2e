import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiService } from "../utils/api";
import { clearAuth, getUser } from "../utils/auth";

function ChangePasscode() {
  const { id } = useParams();
  const navigate = useNavigate();
  const loggedUser = useMemo(() => getUser(), []);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const updatePassword = async (event) => {
    event.preventDefault();

    if (!loggedUser?._id || loggedUser._id !== id) {
      navigate("/home");
      return;
    }

    if (password.length < 6) {
      Swal.fire("Weak Password", "Use at least 6 characters", "warning");
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Mismatch", "New password and confirm password do not match", "error");
      return;
    }

    setSaving(true);
    try {
      await apiService.users.update(id, { password });
      clearAuth();
      Swal.fire("Updated", "Password changed successfully. Please login again.", "success");
      navigate("/home");
    } catch (error) {
      Swal.fire("Failed", error.response?.data?.error || "Could not update password", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="gfg-container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3 className="mb-3">Set New Password</h3>
              <form onSubmit={updatePassword}>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(`/profilepage/${id}`)}
                  >
                    Cancel
                  </button>
                  <button className="gfg-btn-primary" disabled={saving}>
                    {saving ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasscode;
