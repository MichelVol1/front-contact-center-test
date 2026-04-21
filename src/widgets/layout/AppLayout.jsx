import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
    AppBar, Toolbar, Typography, Drawer,
    List, ListItemButton, ListItemText,
    Box, IconButton, Divider, Button, Chip
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthStore } from "C:/Users/Mike/WebstormProjects/front-contact-center/src/features/auth/authStore.js";
import { http } from "C:/Users/Mike/WebstormProjects/front-contact-center/src/shared/api/http.js";

const drawerWidth = 260;

const operatorMenu = [
    { to: "/operator/dashboard", label: "Дашборд" },
    { to: "/operator/calls",     label: "Звонки" },
    { to: "/operator/clients",   label: "Клиенты" },
    { to: "/operator/tickets",   label: "Обращения" },
    { to: "/operator/kb",        label: "База знаний" },
];

const managerMenu = [
    { to: "/manager/dashboard", label: "Дашборд" },
    { to: "/manager/quality",   label: "Качество" },
    { to: "/manager/reports",   label: "Отчёты" },
    { to: "/manager/planning",  label: "Планирование" },
];

export function AppLayout() {
    const user    = useAuthStore((s) => s.user);
    const logout  = useAuthStore((s) => s.logout);
    const navigate = useNavigate();

    const menu = user?.role === "manager" ? managerMenu : operatorMenu;

    const handleLogout = async () => {
        try {
            await http.post("/auth/logout/");
        } catch { /* игнорируем ошибку */ }
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
                <Toolbar sx={{ gap: 1 }}>
                    <IconButton color="inherit" edge="start">
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        Contact Center
                    </Typography>

                    {/* Имя и роль пользователя */}
                    {user && (
                        <Chip
                            label={`${user.name} · ${user.role === "manager" ? "Менеджер" : "Оператор"}`}
                            size="small"
                            sx={{ color: "inherit", borderColor: "rgba(255,255,255,0.4)", mr: 1 }}
                            variant="outlined"
                        />
                    )}

                    {/* Кнопка выхода */}
                    <IconButton color="inherit" onClick={handleLogout} title="Выйти">
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
                }}
            >
                <Toolbar />
                <Divider />
                <List>
                    {menu.map((item) => (
                        <ListItemButton
                            key={item.to}
                            component={NavLink}
                            to={item.to}
                            sx={{ "&.active": { bgcolor: "action.selected" } }}
                        >
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}