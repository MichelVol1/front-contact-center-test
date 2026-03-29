// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Paper,
    TextField,
    Button,
    Stack,
    Typography,
} from "@mui/material";


export function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // TODO: заменить на реальный запрос к бэкенду
            // const res = await api.post("/auth/login/", { login, password });
            // const { token, user } = res.data;

            // Временная логика определения роли:
            // например, все логины, содержащие "mgr", считаем менеджерами
            const role =
                login.toLowerCase().includes("mgr") ||
                login.toLowerCase().includes("manager")
                    ? "manager"
                    : "operator";

            const fakeUser = {
                id: 1,
                name: login || "Demo User",
                role,
            };

            setAuth({ token: "demo-token", user: fakeUser });

            if (role === "manager") {
                navigate("/manager/dashboard", { replace: true });
            } else {
                navigate("/operator/dashboard", { replace: true });
            }
        } catch (e) {
            // здесь можно показать ошибку авторизации
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "100vh", bgcolor: "background.default" }}
        >
            <Paper sx={{ p: 4, width: 360 }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Typography variant="h5" textAlign="center">
                            Вход в систему
                        </Typography>

                        <TextField
                            label="Логин"
                            size="small"
                            fullWidth
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />

                        <TextField
                            label="Пароль"
                            type="password"
                            size="small"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? "Входим..." : "Войти"}
                        </Button>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                            textAlign="center"
                        >
                            Для демо роль определяется автоматически по логину
                            (например, user `manager1` попадёт в интерфейс руководителя).
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Stack>
    );
}
