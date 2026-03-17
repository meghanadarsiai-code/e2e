import { Button } from "bootstrap";
import Card from "react-bootstrap/Card";
import "./platform_option.css";
const Platform = () => {
  return (
    <div className="row">
      <div className="col-md-6 col-sm-12 p-3">
        <div className="gfg-card h-100 text-white" style={{ background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', border: 'none', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-center p-4">
            <h5 className="text-warning mb-2" style={{ fontWeight: '600' }}>Unlock your learning potential</h5>
            <h3 className="mb-4">Best platform for students</h3>
            <button className="gfg-btn-primary w-100">
              For Students <i className="fa-solid fa-graduation-cap ms-2"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-12 p-3">
        <div className="gfg-card h-100 text-white" style={{ background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1580894732930-0babd100d356?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60')", backgroundSize: 'cover', backgroundPosition: 'center', border: 'none', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-center p-4">
            <h5 className="text-warning mb-2" style={{ fontWeight: '600' }}>Empowering students</h5>
            <h3 className="mb-4">Be the mentor you never had</h3>
            <button className="gfg-btn-primary w-100">
              For Creators <i className="fa-solid fa-chalkboard-user ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Platform;
