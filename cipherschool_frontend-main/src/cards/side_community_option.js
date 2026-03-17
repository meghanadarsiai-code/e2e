import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function Sidecommunitycard(props) {
  //use navigate
  const navigate = useNavigate();
  //to navigate to profile
  function seeprofile() {
    navigate(`/otherprofile/${props.userData._id}`);
  }
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(props.userData.fullName || "User")}&background=fd7e14&color=fff`;
  return (
    <div>
      <Card
        className="m-1  p-2"
        id="cardresult"
        onClick={() => {
          seeprofile();
        }}
      >
        <div className="row">
          <div className="col-2">
            <img
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "100px",

                border: "3px solid white",
                float: "left",
              }}
              src={props.userData.profileImg}
              alt="profile pic"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = avatarFallback;
              }}
            />
          </div>
          <div className="col-4" style={{ fontWeight: "600" }}>
            {props.userData.fullName}
          </div>
          <div className="col-6 ">
            <Button
              onClick={() => {
                seeprofile();
              }}
              style={{ width: "70%", backgroundColor: "#F3912E" }}
            >
              view
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default Sidecommunitycard;
