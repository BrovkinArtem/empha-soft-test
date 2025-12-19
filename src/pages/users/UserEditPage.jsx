import { useParams } from "react-router-dom";
import Container from "@/components/layout/Container";
import UserForm from "@/features/users/components/UserForm";
import "./UserEditPage.css";

const UserEditPage = () => {
  const { id } = useParams();

  return (
    <div className="user-edit-page">
      <Container>
        <UserForm userId={id} />
      </Container>
    </div>
  );
};

export default UserEditPage;


