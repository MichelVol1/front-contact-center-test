import { useState } from "react";
import {
    Paper,
    Typography,
    Stack,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Chip,
    Grid,
    Divider,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import ScheduleIcon from "@mui/icons-material/Schedule";

// Мок-данные готовых отчётов
const recentReports = [
    {
        id: "rep-001",
        name: "Ежедневный отчёт 27.12.2025",
        date: "2025-12-27 18:30",
        period: "26.12.2025 - 27.12.2025",
        type: "performance",
        format: "Excel",
        size: "2.4 MB",
        status: "ready",
    },
    {
        id: "rep-002",
        name: "Недельный отчёт",
        date: "2025-12-27 15:45",
        period: "21.12.2025 - 27.12.2025",
        type: "client_activity",
        format: "PDF",
        size: "1.8 MB",
        status: "ready",
    },
    {
        id: "rep-003",
        name: "Отчёт по операторам",
        date: "2025-12-27 14:20",
        period: "Декабрь 2025",
        type: "operators",
        format: "Excel",
        size: "3.1 MB",
        status: "processing",
    },
];

const reportTypes = [
    { value: "performance", label: "Производительность (звонки/обращения)" },
    { value: "operators", label: "Работа операторов (KPI)" },
    { value: "client_activity", label: "Активность клиентов" },
    { value: "billing", label: "Биллинг и платежи" },
    { value: "quality", label: "Контроль качества (оценки)" },
];

const formats = ["Excel", "PDF", "CSV"];

function ReportTypeChip({ type }) {
    const colors = {
        performance: "info",
        operators: "primary",
        client_activity: "success",
        billing: "warning",
        quality: "secondary",
    };
    return <Chip label={type} size="small" color={colors[type] || "default"} />;
}

function StatusChip({ status }) {
    if (status === "ready") {
        return <Chip icon={<FileDownloadDoneIcon />} label="Готов" color="success" size="small" />;
    }
    if (status === "processing") {
        return <Chip icon={<ScheduleIcon />} label="Формируется" color="warning" size="small" />;
    }
    return <Chip label={status} size="small" />;
}

export function ReportsPage() {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [reportType, setReportType] = useState("");
    const [format, setFormat] = useState("Excel");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        // имитация генерации отчёта
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        alert("Отчёт сформирован! (demo)");
    };

    return (
        <Stack spacing={3}>
            <Typography variant="h5">Отчёты</Typography>

            {/* Форма генерации отчёта */}
            <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Typography variant="h6">Сформировать новый отчёт</Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Тип отчёта</InputLabel>
                                <Select
                                    value={reportType}
                                    label="Тип отчёта"
                                    onChange={(e) => setReportType(e.target.value)}
                                >
                                    <MenuItem value="">Выберите тип</MenuItem>
                                    {reportTypes.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Формат</InputLabel>
                                <Select value={format} label="Формат" onChange={(e) => setFormat(e.target.value)}>
                                    {formats.map((fmt) => (
                                        <MenuItem key={fmt} value={fmt}>
                                            {fmt}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Дата от"
                                type="date"
                                size="small"
                                fullWidth
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Дата по"
                                type="date"
                                size="small"
                                fullWidth
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>

                    <Divider />

                    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                            Отчёт будет готов через 1–3 минуты.
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            onClick={handleGenerate}
                            disabled={!reportType || loading}
                        >
                            {loading ? "Формируется..." : "Сформировать отчёт"}
                        </Button>
                    </Stack>
                </Stack>
            </Paper>

            {/* Недавние отчёты */}
            <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Typography variant="h6">Недавние отчёты</Typography>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Название</TableCell>
                                    <TableCell>Тип</TableCell>
                                    <TableCell>Период</TableCell>
                                    <TableCell>Формат</TableCell>
                                    <TableCell>Размер</TableCell>
                                    <TableCell>Статус</TableCell>
                                    <TableCell align="right">Действия</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recentReports.map((report) => (
                                    <TableRow key={report.id} hover>
                                        <TableCell>
                                            <Stack spacing={0}>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {report.name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {report.date}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <ReportTypeChip type={report.type} />
                                        </TableCell>
                                        <TableCell>{report.period}</TableCell>
                                        <TableCell>{report.format}</TableCell>
                                        <TableCell>{report.size}</TableCell>
                                        <TableCell>
                                            <StatusChip status={report.status} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                startIcon={<DownloadIcon />}
                                                disabled={report.status !== "ready"}
                                            >
                                                Скачать
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Paper>

            {/* Быстрые отчёты */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Быстрые отчёты
                </Typography>
                <Grid container spacing={2}>
                    {[
                        { title: "Сегодня", period: "27.12.2025", type: "performance" },
                        { title: "Вчера", period: "26.12.2025", type: "performance" },
                        { title: "Неделя", period: "21–27.12", type: "operators" },
                        { title: "Месяц", period: "Декабрь", type: "client_activity" },
                    ].map((preset, idx) => (
                        <Grid item xs={12} sm={6} md={3} key={idx}>
                            <Paper
                                sx={{
                                    p: 2.5,
                                    height: "100%",
                                    "&:hover": { bgcolor: "action.hover" },
                                    cursor: "pointer",
                                }}
                                variant="outlined"
                            >
                                <Stack spacing={1}>
                                    <Typography variant="h6" sx={{ fontSize: "1.15rem" }}>
                                        {preset.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {preset.period}
                                    </Typography>
                                    <ReportTypeChip type={preset.type} />
                                    <Button size="small" variant="contained" fullWidth startIcon={<DownloadIcon />}>
                                        Скачать
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Stack>
    );
}
