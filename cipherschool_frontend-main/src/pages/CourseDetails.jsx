import { useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();

  return (
    <div style={{ padding: "40px" }}>
      <h2>Course Materials</h2>

      <p>Here are your study resources:</p>

      <div style={{ marginTop: "20px" }}>
        <h4>GeeksForGeeks</h4>
        <a
          href="https://www.geeksforgeeks.org/"
          target="_blank"
          rel="noreferrer"
        >
          Visit GFG
        </a>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h4>W3Schools</h4>
        <a
          href="https://www.w3schools.com/"
          target="_blank"
          rel="noreferrer"
        >
          Visit W3Schools
        </a>
      </div>
    </div>
  );
}

export default CourseDetails;