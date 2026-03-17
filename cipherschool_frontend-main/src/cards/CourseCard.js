import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <Card className="m-3 shadow">
      <Card.Body>
        <Card.Title>{course.name}</Card.Title>
        <Card.Text>{course.description}</Card.Text>

        <Button
          variant="dark"
          style={{ width: "100%" }}
          onClick={() => navigate(`/course/${course.id}`)}
        >
          View Materials
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;