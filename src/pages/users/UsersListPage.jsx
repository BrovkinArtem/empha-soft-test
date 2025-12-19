import Container from "@/components/layout/Container";
import UserList from "@/features/users/components/UserList";
import "./UsersListPage.css";

const UsersListPage = () => {
  return (
    <div className="users-list-page">
      <Container>
        <UserList />
      </Container>
    </div>
  );
};

export default UsersListPage;


