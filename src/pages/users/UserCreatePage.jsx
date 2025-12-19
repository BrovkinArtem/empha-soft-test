import Container from "@/components/layout/Container";
import UserForm from "@/features/users/components/UserForm";
import "./UserCreatePage.css";

const UserCreatePage = () => {
  return (
    <div className="user-create-page">
      <Container>
        <UserForm />
      </Container>
    </div>
  );
};

export default UserCreatePage;
