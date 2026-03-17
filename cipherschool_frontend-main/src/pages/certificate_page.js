import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../config";
import { apiService } from "../utils/api";
import { getUser } from "../utils/auth";

function CertificatePage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useMemo(() => getUser(), []);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const response = await apiService.certificates.list();
      setCertificates(response.data || []);
    } catch (error) {
      Swal.fire("Error", "Unable to load certificates", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div className="gfg-container mt-4">
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold mb-3">Certificate Policy</h4>
              <p className="text-muted mb-2">
                Certificates are issued only by admins after course enrollment and successful test completion.
              </p>
              <ul className="text-muted mb-0 ps-3">
                <li>Enroll in courses and finish assessments.</li>
                <li>Pass required tests (minimum qualifying score).</li>
                <li>Admin verifies eligibility and issues your certificate.</li>
              </ul>
              <div className="alert alert-info mt-3 mb-0" role="alert">
                Logged in as: <strong>{user?.fullName || user?.email || "Student"}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="gfg-header m-0">My Certificates</h2>
            <button className="btn btn-outline-secondary btn-sm" onClick={fetchCertificates}>
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-warning" role="status" />
            </div>
          ) : (
            <div className="row g-3">
              {certificates.map((certificate) => (
                <div className="col-md-6" key={certificate._id}>
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="fw-bold">{certificate.course}</h5>
                      <p className="text-muted mb-1">
                        Score: <strong>{certificate.score}%</strong>
                      </p>
                      <p className="text-muted">
                        Issued: {new Date(certificate.createdAt).toLocaleDateString()}
                      </p>
                      <a
                        href={`${API_BASE_URL}${certificate.url}`}
                        className="btn btn-outline-dark btn-sm"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View PDF
                      </a>
                    </div>
                  </div>
                </div>
              ))}
              {!certificates.length && (
                <div className="col-12 text-center py-4 text-muted">
                  No certificates issued yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CertificatePage;
