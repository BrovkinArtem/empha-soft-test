import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import Input from "@/components/ui/Input";
import "./UserFilters.css";

const UserFilters = ({ onFilterChange }) => {
  const [usernameFilter, setUsernameFilter] = useState("");
  const debouncedUsername = useDebounce(usernameFilter, 500);

  useEffect(() => {
    onFilterChange({ username: debouncedUsername });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUsername]);

  return (
    <div className="user-filters">
      <Input
        label="Фильтр по имени пользователя"
        type="text"
        placeholder="Введите username для поиска..."
        value={usernameFilter}
        onChange={(e) => setUsernameFilter(e.target.value)}
      />
    </div>
  );
};

export default UserFilters;
