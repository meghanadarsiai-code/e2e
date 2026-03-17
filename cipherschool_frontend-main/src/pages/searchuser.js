import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apiService } from "../utils/api";

function SearchUser() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const searchUsers = async (value) => {
    setQuery(value);
    if (!value.trim()) {
      setUsers([]);
      return;
    }
    setLoading(true);
    try {
      const response = await apiService.users.search(value.trim());
      setUsers(response.data || []);
    } catch (error) {
      Swal.fire("Error", "Unable to search users", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gfg-container mt-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h3 className="mb-3">Search Users</h3>
          <input
            className="form-control mb-3"
            placeholder="Search by name, email, or country"
            value={query}
            onChange={(e) => searchUsers(e.target.value)}
          />

          {loading && <div className="text-muted">Searching...</div>}

          {!loading && users.length === 0 && query.trim() && (
            <div className="text-muted">No users found.</div>
          )}

          <div className="list-group">
            {users.map((user) => (
              <button
                key={user._id}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                onClick={() => navigate(`/otherprofile/${user._id}`)}
              >
                <span>
                  <strong>{user.fullName}</strong>
                  <br />
                  <small className="text-muted">{user.email}</small>
                </span>
                <span className="badge bg-light text-dark border">
                  {user.role || "student"}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchUser;
