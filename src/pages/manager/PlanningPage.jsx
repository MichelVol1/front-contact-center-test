import { useState } from "react";
import {
    Paper,
    Typography,
    Stack,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Box,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// Мок‑список операторов
const allOperators = [
    "Петрова Мария",
    "Иванов Сергей",
    "Сидоров Алексей",
    "Козлова Ольга",
    "Новиков Дмитрий",
];

// Мок‑расписание на неделю
const initialSchedule = [
    {
        day: "Понедельник",
        date: "2025-12-29",
        shifts: {
            morning: ["Петрова Мария", "Иванов Сергей"],
            day: ["Сидоров Алексей"],
            evening: ["Козлова Ольга"],
        },
    },
    {
        day: "Вторник",
        date: "2025-12-30",
        shifts: {
            morning: ["Петрова Мария"],
            day: ["Иванов Сергей", "Новиков Дмитрий"],
            evening: ["Козлова Ольга"],
        },
    },
    {
        day: "Среда",
        date: "2025-12-31",
        shifts: {
            morning: ["Сидоров Алексей"],
            day: ["Петрова Мария"],
            evening: ["Иванов Сергей"],
        },
    },
    {
        day: "Четверг",
        date: "2026-01-01",
        shifts: {
            morning: ["Козлова Ольга"],
            day: ["Сидоров Алексей"],
            evening: ["Новиков Дмитрий"],
        },
    },
    {
        day: "Пятница",
        date: "2026-01-02",
        shifts: {
            morning: ["Петрова Мария"],
            day: ["Иванов Сергей"],
            evening: ["Сидоров Алексей", "Козлова Ольга"],
        },
    },
];

const shiftLabels = {
    morning: "Утро (08:00–12:00)",
    day: "День (12:00–18:00)",
    evening: "Вечер (18:00–22:00)",
};

const shiftOrder = ["morning", "day", "evening"];

function ShiftCell({ operators }) {
    if (!operators || operators.length === 0) {
        return (
            <Typography variant="body2" color="text.secondary">
                Нет операторов
            </Typography>
        );
    }

    return (
        <Stack direction="row" spacing={0.5} flexWrap="wrap">
            {operators.map((op) => (
                <Chip key={op} label={op} size="small" sx={{ mb: 0.5 }} />
            ))}
        </Stack>
    );
}

export function PlanningPage() {
    const [schedule, setSchedule] = useState(initialSchedule);
    const [editDayIndex, setEditDayIndex] = useState(null);
    const [editShiftKey, setEditShiftKey] = useState(null);
    const [selectedOperators, setSelectedOperators] = useState([]);

    const openDialog = (dayIndex, shiftKey) => {
        setEditDayIndex(dayIndex);
        setEditShiftKey(shiftKey);
        const current = schedule[dayIndex].shifts[shiftKey] || [];
        setSelectedOperators(current);
    };

    const closeDialog = () => {
        setEditDayIndex(null);
        setEditShiftKey(null);
        setSelectedOperators([]);
    };

    const saveShift = () => {
        if (editDayIndex === null || !editShiftKey) return;

        const next = schedule.map((row, idx) => {
            if (idx !== editDayIndex) return row;
            return {
                ...row,
                shifts: {
                    ...row.shifts,
                    [editShiftKey]: selectedOperators,
                },
            };
        });

        setSchedule(next);
        closeDialog();
    };

    const toggleOperator = (name) => {
        setSelectedOperators((prev) =>
            prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
        );
    };

    const currentRow =
        editDayIndex !== null && editDayIndex >= 0 ? schedule[editDayIndex] : null;
    const currentShiftLabel = editShiftKey ? shiftLabels[editShiftKey] : "";

    return (
        <Stack spacing={3}>
            <Typography variant="h5">Планирование смен</Typography>
            <Typography variant="body2" color="text.secondary">
                Расписание смен операторов по дням недели.
            </Typography>

            {/* Период (демо) */}
            <Paper sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                        label="Неделя от"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value="2025-12-29"
                    />
                    <TextField
                        label="Неделя по"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value="2026-01-02"
                    />
                    <Box sx={{ ml: "auto" }}>
                        <Typography variant="body2" color="text.secondary">
                            Всего операторов: {allOperators.length}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>

            {/* Таблица смен */}
            <Paper sx={{ p: 2 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>День</TableCell>
                                <TableCell>Дата</TableCell>
                                <TableCell>Утро</TableCell>
                                <TableCell>День</TableCell>
                                <TableCell>Вечер</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {schedule.map((row, idx) => (
                                <TableRow key={row.day} hover>
                                    <TableCell>{row.day}</TableCell>
                                    <TableCell>{row.date}</TableCell>

                                    {shiftOrder.map((shiftKey) => (
                                        <TableCell key={shiftKey}>
                                            <Stack direction="row" spacing={1} alignItems="flex-start">
                                                <Box sx={{ flex: 1 }}>
                                                    <ShiftCell operators={row.shifts[shiftKey]} />
                                                </Box>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => openDialog(idx, shiftKey)}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Диалог редактирования смены */}
            <Dialog
                open={editDayIndex !== null && editShiftKey !== null}
                onClose={closeDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Редактирование смены</DialogTitle>
                <DialogContent dividers>
                    {currentRow && (
                        <Stack spacing={2}>
                            <Typography variant="body2" color="text.secondary">
                                {currentRow.day}, {currentRow.date}
                            </Typography>
                            <Typography variant="subtitle1">
                                {currentShiftLabel || "Смена"}
                            </Typography>

                            <Typography variant="body2">
                                Выберите операторов для этой смены:
                            </Typography>

                            <Stack spacing={1}>
                                {allOperators.map((op) => {
                                    const selected = selectedOperators.includes(op);
                                    return (
                                        <Chip
                                            key={op}
                                            label={op}
                                            variant={selected ? "filled" : "outlined"}
                                            color={selected ? "primary" : "default"}
                                            onClick={() => toggleOperator(op)}
                                            sx={{ justifyContent: "flex-start" }}
                                        />
                                    );
                                })}
                            </Stack>
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Отмена</Button>
                    <Button variant="contained" onClick={saveShift}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}
