import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Button, Stack, Typography, Alert } from "@mui/material";
import { useAuthStore } from "../../features/auth/authStore";
import { http } from "../../shared/api/http";

export function LoginPage() {
    const [login, setLogin]       = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading]   = useState(false);
    const [error, setError]       = useState(null);

    const authLogin = useAuthStore((s) => s.login);
    const navigate  = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Реальный запрос — MSW перехватит его в dev-режиме
            const res = await http.post("/auth/login/", { username: login, password });
            const { user } = res.data;

            authLogin({ token: null, user }); // token = null, т.к. используем Django session

            navigate(user.role === "manager" ? "/manager/dashboard" : "/operator/dashboard", {
                replace: true,
            });
        } catch (err) {
            setError(
                err.response?.status === 401
                    ? "Неверный логин или пароль"
                    : "Ошибка сервера. Попробуйте позже."
            );
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

                        {error && <Alert severity="error">{error}</Alert>}

                        <TextField
                            label="Логин"
                            size="small"
                            fullWidth
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                            autoFocus
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

                        <Button type="submit" variant="contained" fullWidth disabled={loading}>
                            {loading ? "Входим..." : "Войти"}
                        </Button>

                        <Typography variant="caption" color="text.secondary" textAlign="center">
                            Демо: логин <strong>operator</strong> или <strong>manager</strong>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Stack>
    );
}