import Button from "@/components/ui/Button";
import "./UserCard.css";

const UserCard = ({ user, onEdit }) => {
  return (
    <div className="user-card">
      <div className="user-card__content">
        <div className="user-card__info">
          <h3 className="user-card__username">{user.username}</h3>
          {(user.first_name || user.last_name) && (
            <p className="user-card__name">
              {user.first_name} {user.last_name}
            </p>
          )}
          <p className="user-card__id">ID: {user.id}</p>
          <div className="user-card__status">
            <span
              className={`user-card__status-badge ${
                user.is_active ? "active" : "inactive"
              }`}
            >
              {user.is_active ? "Активен" : "Неактивен"}
            </span>
          </div>
        </div>
        <div className="user-card__actions">
          <Button variant="secondary" size="sm" onClick={() => onEdit(user.id)}>
            Редактировать
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
