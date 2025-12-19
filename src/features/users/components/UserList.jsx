import { useState, useMemo, useCallback } from "react";
import { useGetUsersQuery } from "@/store/api/apiSlice";
import UserCard from "./UserCard";
import UserFilters from "./UserFilters";
import UserSort from "./UserSort";
import UserForm from "./UserForm";
import Modal from "@/components/ui/Modal";
import Loading from "@/components/common/Loading";
import Button from "@/components/ui/Button";
import "./UserList.css";

const UserList = () => {
  const [filters, setFilters] = useState({ username: "" });
  const [sortOrder, setSortOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const queryParams = useMemo(() => {
    const params = {};

    if (filters.username) {
      params.search = filters.username;
    }

    if (sortOrder) {
      params.ordering = sortOrder === "asc" ? "id" : "-id";
    }

    return params;
  }, [filters, sortOrder]);

  const {
    data: usersData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUsersQuery(queryParams);

  const sortedUsers = useMemo(() => {
    if (!usersData) return [];

    let users = Array.isArray(usersData) ? usersData : usersData.results || [];

    if (filters.username) {
      const searchTerm = filters.username.toLowerCase();
      users = users.filter((user) =>
        user.username?.toLowerCase().includes(searchTerm)
      );
    }

    if (sortOrder) {
      users = [...users].sort((a, b) => {
        if (sortOrder === "asc") {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      });
    }

    return users;
  }, [usersData, sortOrder, filters.username]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const handleSortChange = useCallback((newOrder) => {
    setSortOrder(newOrder);
  }, []);

  const handleCreateUser = useCallback(() => {
    setEditingUserId(null);
    setIsModalOpen(true);
  }, []);

  const handleEditUser = useCallback((userId) => {
    setEditingUserId(userId);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingUserId(null);
  }, []);

  if (isLoading) {
    return (
      <div className="user-list user-list--loading">
        <Loading size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="user-list user-list--error">
        <p className="user-list__error-message">
          Ошибка загрузки пользователей:{" "}
          {error?.data?.detail || error?.message || "Неизвестная ошибка"}
        </p>
        <Button onClick={() => refetch()}>Попробовать снова</Button>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-list__header">
        <h1 className="user-list__title">Список пользователей</h1>
        <Button variant="primary" onClick={handleCreateUser}>
          Создать пользователя
        </Button>
      </div>

      <div className="user-list__controls">
        <UserFilters onFilterChange={handleFilterChange} />
        <UserSort sortOrder={sortOrder} onSortChange={handleSortChange} />
      </div>

      {sortedUsers.length === 0 ? (
        <div className="user-list__empty">
          <p>Пользователи не найдены</p>
          {filters.username && (
            <p className="user-list__empty-hint">
              Попробуйте изменить фильтр поиска
            </p>
          )}
        </div>
      ) : (
        <div className="user-list__grid">
          {sortedUsers.map((user) => (
            <UserCard key={user.id} user={user} onEdit={handleEditUser} />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          editingUserId ? "Редактировать пользователя" : "Создать пользователя"
        }
      >
        <UserForm userId={editingUserId} onSuccess={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default UserList;
