import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiService } from "../utils/api";
import { getUser } from "../utils/auth";

function UpdatePassword() {
  const { id } = useParams();
  const navigate = useNavigate();
  const loggedUser = useMemo(() => getUser(), []);
  const [currentPassword, setCurrentPassword] = useState("");
  const [checking, setChecking] = useState(false);

  const proceed = async (event) => {
    event.preventDefault();

    if (!loggedUser?._id || loggedUser._id !== id) {
      navigate("/home");
      return;
    }

    if (!currentPassword.trim()) {
      Swal.fire("Required", "Enter your current password to continue", "warning");
      return;
    }

    setChecking(true);
    try {
      const response = await apiService.auth.userLogin({
        email: loggedUser.email,
        password: currentPassword,
      });
      const validatedUserId = response.data?.result?.user?._id;
      if (validatedUserId !== id) {
        Swal.fire("Access denied", "Unable to verify account ownership", "error");
        return;
      }
      navigate(`/changepasscode/${id}`);
    } catch (error) {
      Swal.fire("Invalid password", "Current password is incorrect", "error");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="gfg-container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3 className="mb-3">Change Password</h3>
              <p className="text-muted">
                Confirm your current password, then set a new one in the next step.
              </p>

              <form onSubmit={proceed}>
                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
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
                  <button type="submit" className="gfg-btn-primary" disabled={checking}>
                    {checking ? "Verifying..." : "Continue"}
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

export default UpdatePassword;
