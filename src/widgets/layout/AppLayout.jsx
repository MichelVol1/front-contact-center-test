import { Outlet, NavLink } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Box,
    IconButton,
    Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// ширина бокового меню
const drawerWidth = 260;

// меню оператора
const operatorMenu = [
    { to: "/operator/dashboard", label: "Дашборд" },
    { to: "/operator/calls", label: "Звонки" },
    { to: "/operator/clients", label: "Клиенты" },
    { to: "/operator/tickets", label: "Обращения" },
    { to: "/operator/kb", label: "База знаний" },
];

const managerMenu = [
    { to: "/manager/", label: "Дашборд" },
    { to: "/manager/quality", label: "Качество" },
    { to: "/manager/reports", label: "Отчёты" },
    { to: "/manager/planning", label: "Планирование" },
];


const role = "manager";

export function AppLayout() {
    const menu = role === "manager" ? managerMenu : operatorMenu;

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
                {/* отступ под AppBar */}
                <Toolbar />
                <Divider />
                <List>
                    {menu.map((item) => (
                        <ListItemButton
                            key={item.to}
                            component={NavLink}
                            to={item.to}
                            sx={{
                                "&.active": { bgcolor: "action.selected" },
                            }}
                        >
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                {/* отступ под AppBar */}
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}
