import Button from "@/components/ui/Button";
import "./UserSort.css";

const UserSort = ({ sortOrder, onSortChange }) => {
  const handleSort = () => {
    const newOrder =
      sortOrder === "asc" ? "desc" : sortOrder === "desc" ? null : "asc";
    onSortChange(newOrder);
  };

  const getSortLabel = () => {
    if (sortOrder === "asc") return "↑ ID (по возрастанию)";
    if (sortOrder === "desc") return "↓ ID (по убыванию)";
    return "ID (без сортировки)";
  };

  return (
    <div className="user-sort">
      <Button
        variant="secondary"
        size="sm"
        onClick={handleSort}
        className="user-sort__button"
      >
        Сортировка: {getSortLabel()}
      </Button>
    </div>
  );
};

export default UserSort;

