import { Link } from "react-router-dom";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <Container>
      <div className="not-found-page">
        <h1 className="not-found-page__code">404</h1>
        <h2 className="not-found-page__title">Page Not Found</h2>
        <p className="not-found-page__message">
          The page you are looking for does not exist.
        </p>
        <Link to="/users">
          <Button>Go to Users</Button>
        </Link>
      </div>
    </Container>
  );
};

export default NotFoundPage;
