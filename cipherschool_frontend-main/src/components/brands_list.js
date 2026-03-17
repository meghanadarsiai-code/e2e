import Carousel from "react-bootstrap/Carousel";
import "./brands_list.css";

function BrandList() {
  return (
    <div className="row m-2 mt-5 mb-5" id="brandlist">
      <div className="col-12 text-center mb-4">
        <h2 className="gfg-header" style={{ fontSize: "2rem" }}>
          Trusted by Creators from
        </h2>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-10">
          <Carousel indicators={false} controls={false} interval={3000}>
            <Carousel.Item>
              <div className="row align-items-center justify-content-center text-center">
                <div className="col-3">
                  <img className="img-fluid p-2" style={{ maxHeight: "60px", filter: "grayscale(100%)", opacity: "0.7" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png" alt="Google" />
                </div>
                <div className="col-3">
                  <img className="img-fluid p-2" style={{ maxHeight: "60px", filter: "grayscale(100%)", opacity: "0.7" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png" alt="Amazon" />
                </div>
                <div className="col-3">
                  <img className="img-fluid p-2" style={{ maxHeight: "60px", filter: "grayscale(100%)", opacity: "0.7" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Oyorooms-branding.svg/1200px-Oyorooms-branding.svg.png" alt="Oyo" />
                </div>
                <div className="col-3">
                  <img className="img-fluid p-2" style={{ maxHeight: "60px", filter: "grayscale(100%)", opacity: "0.7" }} src="https://corporate.walmart.com/_download?id=0000016d-f8b2-d758-a1ed-f8b290f10000" alt="Walmart" />
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="row align-items-center justify-content-center text-center">
                <div className="col-3">
                  <img className="img-fluid p-2" style={{ maxHeight: "60px", filter: "grayscale(100%)", opacity: "0.7" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Adobe_Corporate_logo.svg/2560px-Adobe_Corporate_logo.svg.png" alt="Adobe" />
                </div>
                <div className="col-3">
                  <img className="img-fluid p-2" style={{ maxHeight: "60px", filter: "grayscale(100%)", opacity: "0.7" }} src="https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/2560px-Swiggy_logo.svg.png" alt="Swiggy" />
                </div>
                <div className="col-3">
                  <img className="img-fluid p-2" style={{ maxHeight: "60px", filter: "grayscale(100%)", opacity: "0.7" }} src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Dream11_Logo_2023.png" alt="Dream11" />
                </div>
                <div className="col-3">
                  <img className="img-fluid p-2" style={{ maxHeight: "60px", filter: "grayscale(100%)", opacity: "0.7" }} src="https://www.vectorlogo.zone/logos/apple/apple-ar21.png" alt="Apple" />
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default BrandList;
