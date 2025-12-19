import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/store/api/apiSlice";
import { setCredentials, checkAuth } from "@/store/slices/authSlice";
import { loginSchema } from "@/utils/validation/schemas";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Loading from "@/components/common/Loading";
import "./LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap();

      const token =
        result.token ||
        result.auth_token ||
        result.access_token ||
        result.data?.token ||
        result.data?.auth_token;

      if (token) {
        dispatch(setCredentials({ token }));
        navigate("/users", { replace: true });
      } else {
        dispatch(checkAuth());
        navigate("/users", { replace: true });
      }
    } catch {
      // Error is handled by RTK Query error state
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <h2 className="login-form__title">Вход в систему</h2>

      {error && (
        <div className="login-form__error">
          {error.data?.detail ||
            error.data?.message ||
            error.data?.non_field_errors?.[0] ||
            (error.status === 401 && "Неверное имя пользователя или пароль") ||
            (error.status === 400 && "Неверный формат данных") ||
            (error.status === 500 && "Ошибка сервера. Попробуйте позже") ||
            `Ошибка входа (${error.status || "unknown"}). Проверьте данные.`}
        </div>
      )}

      <Input
        label="Имя пользователя"
        type="text"
        error={errors.username?.message}
        {...register("username")}
        disabled={isLoading}
        autoComplete="username"
      />

      <Input
        label="Пароль"
        type="password"
        error={errors.password?.message}
        {...register("password")}
        disabled={isLoading}
        autoComplete="current-password"
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isLoading}
        className="login-form__submit"
      >
        {isLoading ? (
          <>
            <Loading size="sm" />
            <span style={{ marginLeft: "8px" }}>Вход...</span>
          </>
        ) : (
          "Войти"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
