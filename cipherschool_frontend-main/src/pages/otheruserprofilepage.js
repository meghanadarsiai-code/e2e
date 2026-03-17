import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiService } from "../utils/api";

function OtherUserProfilepage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const avatarFallback = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=7A4DFF&color=fff`;

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const response = await apiService.users.single(id);
        setProfile(response.data);
      } catch (error) {
        Swal.fire("Error", "Unable to load user profile", "error");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <div className="gfg-container py-5 text-center">
        <div className="spinner-border text-warning" role="status" />
      </div>
    );
  }

  if (!profile) {
    return <div className="gfg-container py-5 text-center text-muted">User not found.</div>;
  }

  return (
    <div className="gfg-container mt-4">
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="card border-0 shadow-sm">
        <div className="card-body d-flex align-items-center gap-3 flex-wrap">
          <img
            src={profile.profileImg}
            alt={profile.fullName}
            className="rounded-circle"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = avatarFallback(profile.fullName || profile.email);
            }}
          />
          <div>
            <h3 className="mb-1">{profile.fullName}</h3>
            <p className="text-muted mb-2">{profile.email}</p>
            <p className="mb-0">{profile.aboutMe || "No bio available."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherUserProfilepage;
