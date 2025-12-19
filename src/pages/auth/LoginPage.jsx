import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Container from "@/components/layout/Container";
import LoginForm from "@/features/auth/components/LoginForm";
import "./LoginPage.css";

const LoginPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/users" replace />;
  }

  return (
    <div className="login-page">
      <Container>
        <div className="login-page__content">
          <LoginForm />
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
