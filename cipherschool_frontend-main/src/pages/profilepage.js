import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiService } from "../utils/api";
import { clearAuth, getUser } from "../utils/auth";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function Profilepage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedUser = useMemo(() => getUser(), []);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    try {
      const [profileRes, followersRes, followingRes] = await Promise.all([
        apiService.users.single(id),
        apiService.users.followers(id),
        apiService.users.following(id),
      ]);
      setProfile(profileRes.data);
      setFollowers(followersRes.data.followers || []);
      setFollowing(followingRes.data.following || []);
    } catch (error) {
      Swal.fire("Error", "Unable to load profile", "error");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const logout = () => {
    clearAuth();
    navigate("/home");
  };

  const avatarFallback = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=0D8ABC&color=fff`;

  const heatmapData = useMemo(() => {
    if (!profile?.activityLog || !Array.isArray(profile.activityLog)) return [];
    const counts = profile.activityLog.reduce((acc, dateString) => {
      const date = new Date(dateString).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  }, [profile]);

  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(today.getMonth() - 6); // Show last 6 months

  if (loading) {
    return (
      <div className="gfg-container py-5 text-center">
        <div className="spinner-border text-warning" role="status" />
      </div>
    );
  }

  if (!profile) {
    return <div className="gfg-container py-5 text-center text-muted">Profile not found.</div>;
  }

  return (
    <div className="gfg-container mt-4">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <img
                src={profile.profileImg}
                alt={profile.fullName}
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = avatarFallback(profile.fullName || profile.email);
                }}
              />
              <h4>{profile.fullName}</h4>
              <p className="text-muted">{profile.email}</p>
              <span className="badge bg-dark">{profile.role || "student"}</span>
              <div className="d-flex justify-content-around mt-3">
                <div>
                  <h6 className="mb-0">{followers.length}</h6>
                  <small className="text-muted">Followers</small>
                </div>
                <div>
                  <h6 className="mb-0">{following.length}</h6>
                  <small className="text-muted">Following</small>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-0 shadow-sm mt-3">
            <div className="card-body d-grid gap-2">
              <button className="btn btn-outline-dark" onClick={() => navigate("/courses")}>
                Continue Learning
              </button>
              <button className="btn btn-outline-dark" onClick={() => navigate("/certificate")}>
                My Certificates
              </button>
              {loggedUser?._id === profile._id && (
                <button
                  className="btn btn-outline-dark"
                  onClick={() => navigate(`/updatepage/${profile._id}`)}
                >
                  Edit Profile
                </button>
              )}
              {loggedUser?._id === profile._id && (
                <button
                  className="btn btn-outline-dark"
                  onClick={() => navigate(`/changepassword/${profile._id}`)}
                >
                  Change Password
                </button>
              )}
              {loggedUser?._id === profile._id && (
                <button className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <h5>About</h5>
              <p className="text-muted mb-0">{profile.aboutMe || "No bio available."}</p>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <h5>Professional Info</h5>
              <div className="row">
                <div className="col-md-6">
                  <small className="text-muted">Education</small>
                  <p>{profile.highestEducation || "Not added"}</p>
                </div>
                <div className="col-md-6">
                  <small className="text-muted">Current Status</small>
                  <p>{profile.currentStatus || "Not added"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <h5>Activity Heatmap</h5>
              <div className="activity-heatmap-wrapper mt-3">
                <CalendarHeatmap
                  startDate={startDate}
                  endDate={today}
                  values={heatmapData}
                  classForValue={(value) => {
                    if (!value) return "color-empty";
                    return `color-github-${Math.min(value.count, 4)}`;
                  }}
                  titleForValue={(value) => {
                    if (!value) return "No contributions";
                    return `${value.count} contributions on ${value.date}`;
                  }}
                  showWeekdayLabels={true}
                />
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5>Followers and Following</h5>
              <div className="row">
                <div className="col-md-6">
                  <h6 className="mt-2">Followers</h6>
                  <ul className="list-group list-group-flush">
                    {followers.slice(0, 6).map((entry, index) => (
                      <li className="list-group-item px-0" key={`${entry.email}-${index}`}>
                        {entry.fullName}
                      </li>
                    ))}
                    {!followers.length && (
                      <li className="list-group-item px-0 text-muted">No followers</li>
                    )}
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6 className="mt-2">Following</h6>
                  <ul className="list-group list-group-flush">
                    {following.slice(0, 6).map((entry, index) => (
                      <li className="list-group-item px-0" key={`${entry.email}-${index}`}>
                        {entry.fullName}
                      </li>
                    ))}
                    {!following.length && (
                      <li className="list-group-item px-0 text-muted">No following</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profilepage;
