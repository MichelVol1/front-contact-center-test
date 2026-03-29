import {
    Grid,
    Paper,
    Typography,
    Stack,
    Box,
    Chip,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";

const metrics = [
    {
        title: "Принято звонков",
        value: "247",
        change: "+12%",
        trend: "up",
        icon: PhoneInTalkIcon,
        color: "success.main",
        hint: "За последние 24 часа",
    },
    {
        title: "Пропущенных звонков",
        value: "18",
        change: "-5%",
        trend: "down",
        icon: PhoneMissedIcon,
        color: "error.main",
        hint: "Снижение на 5% vs вчера",
    },
    {
        title: "Среднее время ответа",
        value: "23 сек",
        change: "-8%",
        trend: "down",
        icon: AccessTimeIcon,
        color: "info.main",
        hint: "Улучшение на 8%",
    },
    {
        title: "Операторов онлайн",
        value: "12 / 15",
        change: "80%",
        trend: "neutral",
        icon: PeopleIcon,
        color: "primary.main",
        hint: "Текущая смена",
    },
];

// Мок-данные операторов
const operators = [
    {
        id: 1,
        name: "Петрова Мария",
        avatar: "PM",
        calls: 42,
        avgTime: "4:12",
        satisfaction: 4.8,
        status: "online",
    },
    {
        id: 2,
        name: "Иванов Сергей",
        avatar: "ИС",
        calls: 38,
        avgTime: "5:03",
        satisfaction: 4.5,
        status: "online",
    },
    {
        id: 3,
        name: "Сидоров Алексей",
        avatar: "СА",
        calls: 35,
        avgTime: "4:45",
        satisfaction: 4.6,
        status: "busy",
    },
    {
        id: 4,
        name: "Козлова Ольга",
        avatar: "КО",
        calls: 31,
        avgTime: "5:20",
        satisfaction: 4.3,
        status: "online",
    },
    {
        id: 5,
        name: "Новиков Дмитрий",
        avatar: "НД",
        calls: 29,
        avgTime: "6:10",
        satisfaction: 4.1,
        status: "break",
    },
];

// Мок-данные по каналам обращений
const channels = [
    { name: "Телефония", count: 247, percentage: 62 },
    { name: "Чат", count: 89, percentage: 22 },
    { name: "Email", count: 52, percentage: 13 },
    { name: "Социальные сети", count: 12, percentage: 3 },
];

// Мок-данные почасовой нагрузки (упрощённый график)
const hourlyLoad = [
    { hour: "09:00", calls: 12 },
    { hour: "10:00", calls: 18 },
    { hour: "11:00", calls: 25 },
    { hour: "12:00", calls: 31 },
    { hour: "13:00", calls: 28 },
    { hour: "14:00", calls: 35 },
    { hour: "15:00", calls: 29 },
    { hour: "16:00", calls: 33 },
    { hour: "17:00", calls: 36 },
];


const dailyTrend = [
    { day: "Пн", calls: 180 },
    { day: "Вт", calls: 195 },
    { day: "Ср", calls: 210 },
    { day: "Чт", calls: 230 },
    { day: "Пт", calls: 247 },
];

// Мок-heatmap загрузки по дням/часам (0–100)
const heatmapData = [
    { day: "Пн", hours: [20, 35, 60, 75, 50] },
    { day: "Вт", hours: [25, 40, 65, 80, 55] },
    { day: "Ср", hours: [30, 45, 70, 85, 60] },
    { day: "Чт", hours: [35, 50, 72, 88, 63] },
    { day: "Пт", hours: [40, 55, 78, 92, 70] },
];

function StatCard({ title, value, change, trend, icon: Icon, color, hint }) {
    return (
        <Paper sx={{ p: 2.5 }}>
            <Stack spacing={1.5}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: `${color.replace(".main", ".lighter")}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Icon sx={{ color, fontSize: 28 }} />
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        {trend === "up" && (
                            <TrendingUpIcon fontSize="small" sx={{ color: "success.main" }} />
                        )}
                        {trend === "down" && (
                            <TrendingDownIcon fontSize="small" sx={{ color: "success.main" }} />
                        )}
                        <Typography
                            variant="body2"
                            sx={{
                                color: trend === "neutral" ? "text.secondary" : "success.main",
                                fontWeight: 600,
                            }}
                        >
                            {change}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack spacing={0.5}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        {value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {hint}
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
}

function StatusChip({ status }) {
    const statusConfig = {
        online: { label: "Онлайн", color: "success" },
        busy: { label: "Занят", color: "warning" },
        break: { label: "Перерыв", color: "default" },
        offline: { label: "Оффлайн", color: "error" },
    };

    const config = statusConfig[status] || statusConfig.offline;
    return <Chip size="small" label={config.label} color={config.color} />;
}

export function ManagerDashboard() {
    const maxCallsHourly = Math.max(...hourlyLoad.map((h) => h.calls));
    const maxCallsDaily = Math.max(...dailyTrend.map((d) => d.calls));

    return (
        <Stack spacing={3}>
            <Typography variant="h5">Панель руководителя</Typography>

            {/* KPI метрики */}
            <Grid container spacing={2}>
                {metrics.map((metric, idx) => (
                    <Grid item xs={12} sm={6} md={3} key={idx}>
                        <StatCard {...metric} />
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={2}>
                {/* График почасовой нагрузки */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2.5 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6">Почасовая нагрузка</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Количество обработанных звонков по часам (сегодня)
                            </Typography>

                            <Box sx={{ pt: 2 }}>
                                <Stack spacing={1.5}>
                                    {hourlyLoad.map((item) => (
                                        <Stack
                                            key={item.hour}
                                            direction="row"
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{ minWidth: 50, color: "text.secondary" }}
                                            >
                                                {item.hour}
                                            </Typography>
                                            <Box sx={{ flex: 1 }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={(item.calls / maxCallsHourly) * 100}
                                                    sx={{ height: 8, borderRadius: 1 }}
                                                />
                                            </Box>
                                            <Typography
                                                variant="body2"
                                                sx={{ minWidth: 40, fontWeight: 600 }}
                                            >
                                                {item.calls}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>

                {/* Распределение по каналам */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2.5 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6">Каналы обращений</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Распределение за последние 24 часа
                            </Typography>

                            <Stack spacing={2} sx={{ pt: 1 }}>
                                {channels.map((channel) => (
                                    <Stack key={channel.name} spacing={1}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography variant="body2">{channel.name}</Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography
                                                    variant="body2"
                                                    sx={{ fontWeight: 600 }}
                                                >
                                                    {channel.count}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{ color: "text.secondary" }}
                                                >
                                                    ({channel.percentage}%)
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <LinearProgress
                                            variant="determinate"
                                            value={channel.percentage}
                                            sx={{ height: 6, borderRadius: 1 }}
                                        />
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            {/* Дополнительные визуализации: тренд и heatmap */}
            <Grid container spacing={2}>
                {/* Линейный тренд по дням (спарклайн) */}
                {/* Линейный тренд по дням (спарклайн) */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2.5 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6">Тренд по принятым звонкам</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Динамика за последние 5 рабочих дней
                            </Typography>

                            <Box
                                sx={{
                                    mt: 1,
                                    height: 180,                // фиксированная высота для графика
                                    display: "flex",
                                    alignItems: "flex-end",
                                    gap: 2,
                                    px: 1,
                                }}
                            >
                                {dailyTrend.map((d) => {
                                    const ratio = maxCallsDaily ? d.calls / maxCallsDaily : 0;
                                    const barHeight = 20 + ratio * 100; // базовая высота + пропорция

                                    return (
                                        <Stack
                                            key={d.day}
                                            alignItems="center"
                                            justifyContent="flex-end"
                                            spacing={0.5}
                                            sx={{ flex: 1 }}
                                        >
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    height: barHeight,
                                                    maxHeight: "100%",
                                                    borderRadius: 1,
                                                    bgcolor: "primary.main",
                                                    opacity: 0.9,
                                                }}
                                            />
                                            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                {d.day}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                {d.calls}
                                            </Typography>
                                        </Stack>
                                    );
                                })}
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>


                {/* Heatmap загрузки по дням и часам */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2.5 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6">Загрузка по дням и часам</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Чем темнее ячейка, тем больше звонков в этот интервал
                            </Typography>

                            <Box sx={{ overflowX: "auto" }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align="center">10:00</TableCell>
                                            <TableCell align="center">12:00</TableCell>
                                            <TableCell align="center">14:00</TableCell>
                                            <TableCell align="center">16:00</TableCell>
                                            <TableCell align="center">18:00</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {heatmapData.map((row) => (
                                            <TableRow key={row.day}>
                                                <TableCell>{row.day}</TableCell>
                                                {row.hours.map((val, idx) => (
                                                    <TableCell key={idx} align="center">
                                                        <Box
                                                            sx={{
                                                                width: 28,
                                                                height: 20,
                                                                borderRadius: 0.75,
                                                                bgcolor: "primary.main",
                                                                opacity: 0.2 + (val / 100) * 0.8,
                                                            }}
                                                        />
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            {/* Таблица операторов */}
            <Paper sx={{ p: 2.5 }}>
                <Stack spacing={2}>
                    <Typography variant="h6">Производительность операторов (топ-5)</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Рейтинг по количеству обработанных звонков за сегодня
                    </Typography>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Оператор</TableCell>
                                    <TableCell>Статус</TableCell>
                                    <TableCell align="right">Звонков</TableCell>
                                    <TableCell align="right">Среднее время</TableCell>
                                    <TableCell align="right">Удовлетворённость</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {operators.map((op) => (
                                    <TableRow key={op.id} hover>
                                        <TableCell>
                                            <Stack direction="row" spacing={1.5} alignItems="center">
                                                <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main" }}>
                                                    {op.avatar}
                                                </Avatar>
                                                <Stack spacing={0}>
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {op.name}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                        ID: {op.id}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <StatusChip status={op.status} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {op.calls}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="body2">{op.avgTime}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Stack
                                                direction="row"
                                                spacing={0.5}
                                                alignItems="center"
                                                justifyContent="flex-end"
                                            >
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {op.satisfaction}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                    / 5.0
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Paper>
        </Stack>
    );
}
