import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} from "@/store/api/apiSlice";
import { createUserSchema, updateUserSchema } from "@/utils/validation/schemas";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Loading from "@/components/common/Loading";
import "./UserForm.css";

const UserForm = ({ userId = null, onSuccess }) => {
  const isEditMode = !!userId;

  const {
    data: userData,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetUserQuery(userId, { skip: !isEditMode });

  const [createUser, { isLoading: isCreating, error: createError }] =
    useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating, error: updateError }] =
    useUpdateUserMutation();

  const isLoading = isCreating || isUpdating || isLoadingUser;
  const error = createError || updateError;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(isEditMode ? updateUserSchema : createUserSchema),
    defaultValues: isEditMode
      ? {
          username: userData?.username || "",
          first_name: userData?.first_name || "",
          last_name: userData?.last_name || "",
          is_active: userData?.is_active ?? true,
        }
      : {
          username: "",
          first_name: "",
          last_name: "",
          password: "",
          is_active: true,
        },
  });

  useEffect(() => {
    if (isEditMode && userData) {
      reset({
        username: userData.username || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        password: "",
        is_active: userData.is_active ?? true,
      });
    }
  }, [userData, isEditMode, reset]);

  const onSubmit = async (data) => {
    try {
      const prepareData = (formData) => {
        const prepared = { ...formData };
        
        if (prepared.first_name && prepared.first_name.trim() === "") {
          delete prepared.first_name;
        }
        if (prepared.last_name && prepared.last_name.trim() === "") {
          delete prepared.last_name;
        }
        
        if (isEditMode && (!prepared.password || prepared.password.trim() === "")) {
          delete prepared.password;
        }
        
        return prepared;
      };

      const preparedData = prepareData(data);

      if (isEditMode) {
        await updateUser({ id: userId, ...preparedData }).unwrap();
      } else {
        await createUser(preparedData).unwrap();
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/users", { replace: true });
      }
    } catch (err) {
      // Error is handled by RTK Query error state
    }
  };

  if (isEditMode && isLoadingUser) {
    return (
      <div className="user-form user-form--loading">
        <Loading size="lg" />
      </div>
    );
  }

  if (isEditMode && isErrorUser) {
    return (
      <div className="user-form user-form--error">
        <p>Ошибка загрузки пользователя</p>
        {onSuccess && (
          <Button onClick={onSuccess}>Закрыть</Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-form">
      {error && (
        <div className="user-form__error-message">
          {error.data?.detail ||
            error.data?.message ||
            error.data?.username?.[0] ||
            error.data?.password?.[0] ||
            (typeof error.data === "object" &&
              Object.entries(error.data)
                .map(([key, value]) => {
                  if (Array.isArray(value)) {
                    return `${key}: ${value.join(", ")}`;
                  }
                  return `${key}: ${value}`;
                })
                .join("; ")) ||
            "Ошибка при сохранении пользователя"}
        </div>
      )}

      <Input
        label="Имя пользователя *"
        type="text"
        error={errors.username?.message}
        {...register("username")}
        disabled={isLoading}
        autoComplete="username"
      />

      <Input
        label="Имя"
        type="text"
        error={errors.first_name?.message}
        {...register("first_name")}
        disabled={isLoading}
        autoComplete="given-name"
      />

      <Input
        label="Фамилия"
        type="text"
        error={errors.last_name?.message}
        {...register("last_name")}
        disabled={isLoading}
        autoComplete="family-name"
      />

      <Input
        label={isEditMode ? "Пароль (оставьте пустым, чтобы не менять)" : "Пароль *"}
        type="password"
        error={errors.password?.message}
        {...register("password")}
        disabled={isLoading}
        autoComplete={isEditMode ? "new-password" : "new-password"}
      />

      <div className="user-form__checkbox">
        <label className="user-form__checkbox-label">
          <input
            type="checkbox"
            {...register("is_active")}
            disabled={isLoading}
            className="user-form__checkbox-input"
          />
          <span>Активен</span>
        </label>
        {errors.is_active && (
          <span className="user-form__error">{errors.is_active.message}</span>
        )}
      </div>

      <div className="user-form__actions">
        {onSuccess && (
          <Button
            type="button"
            variant="secondary"
            onClick={onSuccess}
            disabled={isLoading}
          >
            Отмена
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="user-form__submit"
        >
          {isLoading ? (
            <>
              <Loading size="sm" />
              <span style={{ marginLeft: "8px" }}>
                {isEditMode ? "Сохранение..." : "Создание..."}
              </span>
            </>
          ) : (
            isEditMode ? "Сохранить" : "Создать"
          )}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;

