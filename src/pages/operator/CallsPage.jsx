import { useMemo, useState } from "react";
import {
    Box,
    Paper,
    Stack,
    Typography,
    Chip,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Tabs,
    Tab,
    TextField,
    Button,
    IconButton,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const mockCalls = [
    {
        id: "call-1001",
        status: "incoming",
        queue: "Support",
        customer: { name: "Иванов Иван", phone: "+375291112233", segment: "VIP" },
        topic: "Не проходит платеж",
        startedAt: null,
    },
    {
        id: "call-1002",
        status: "active",
        queue: "Sales",
        customer: { name: "Петров Пётр", phone: "+375291112244", segment: "Standard" },
        topic: "Консультация по тарифам",
        startedAt: "17:42",
    },
    {
        id: "call-1003",
        status: "wrapup",
        queue: "Support",
        customer: { name: "Сидорова Анна", phone: "+375291556677", segment: "Standard" },
        topic: "Смена данных профиля",
        startedAt: "17:31",
    },
];

function statusChip(status) {
    switch (status) {
        case "incoming":
            return <Chip size="small" color="warning" label="Входящий" />;
        case "active":
            return <Chip size="small" color="success" label="В разговоре" />;
        case "wrapup":
            return <Chip size="small" color="info" label="Завершение" />;
        default:
            return <Chip size="small" label={status} />;
    }
}

function TabPanel({ value, index, children }) {
    if (value !== index) return null;
    return <Box sx={{ pt: 2 }}>{children}</Box>;
}

export function CallsPage() {
    const [selectedId, setSelectedId] = useState(mockCalls[0].id);
    const [tab, setTab] = useState(0);

    const selected = useMemo(
        () => mockCalls.find((c) => c.id === selectedId) || mockCalls[0],
        [selectedId]
    );

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Звонки</Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 2 }}>
                {/* Левая колонка: список звонков */}
                <Paper sx={{ p: 2 }}>
                    <Stack spacing={1.5}>
                        <Typography variant="subtitle1">Очередь / активные</Typography>

                        <TextField size="small" label="Поиск" placeholder="ФИО / телефон / тема" />

                        <Divider />

                        <List disablePadding>
                            {mockCalls.map((c) => (
                                <ListItemButton
                                    key={c.id}
                                    selected={c.id === selectedId}
                                    onClick={() => setSelectedId(c.id)}
                                    sx={{ mb: 0.5, borderRadius: 1 }}
                                >
                                    <ListItemText
                                        primary={
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {c.customer.name}
                                                </Typography>
                                                {statusChip(c.status)}
                                            </Stack>
                                        }
                                        secondary={
                                            <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                                                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                    {c.customer.phone} • {c.queue} • {c.topic}
                                                </Typography>
                                                {c.startedAt ? (
                                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                        Начало: {c.startedAt}
                                                    </Typography>
                                                ) : null}
                                            </Stack>
                                        }
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    </Stack>
                </Paper>

                {/* Правая колонка: рабочая область */}
                <Paper sx={{ p: 2 }}>
                    <Stack spacing={2}>
                        {/* Верхняя панель действия */}
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                            <Stack spacing={0.5}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
                                        {selected.customer.name}
                                    </Typography>
                                    <Chip size="small" label={selected.customer.segment} />
                                    {statusChip(selected.status)}
                                </Stack>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    {selected.customer.phone} • Тема: {selected.topic}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <IconButton
                                    title="Скопировать номер"
                                    onClick={() => navigator.clipboard?.writeText(selected.customer.phone)}
                                >
                                    <ContentCopyIcon />
                                </IconButton>
                                <Button
                                    variant="contained"
                                    startIcon={<CallIcon />}
                                    disabled={selected.status !== "incoming"}
                                >
                                    Принять
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<CallEndIcon />}
                                    disabled={selected.status === "incoming"}
                                >
                                    Завершить
                                </Button>
                            </Stack>
                        </Stack>

                        <Divider />

                        {/* Вкладки */}
                        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                            <Tab label="Карточка клиента" />
                            <Tab label="Скрипт" />
                            <Tab label="Заметки" />
                        </Tabs>

                        <TabPanel value={tab} index={0}>
                            <Stack spacing={1.5}>
                                <Typography variant="subtitle1">Данные клиента </Typography>
                                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                                    <TextField size="small" label="ФИО" value={selected.customer.name} />
                                    <TextField size="small" label="Телефон" value={selected.customer.phone} />
                                    <TextField size="small" label="Сегмент" value={selected.customer.segment} />
                                    <TextField size="small" label="Очередь" value={selected.queue} />
                                </Box>
                            </Stack>
                        </TabPanel>

                        <TabPanel value={tab} index={1}>
                            <Stack spacing={1.5}>
                                <Typography variant="subtitle1">Скрипт разговора </Typography>
                                <Paper variant="outlined" sx={{ p: 2, bgcolor: "background.default" }}>
                                    <Typography variant="body2">
                                        1) Приветствие и идентификация клиента.
                                    </Typography>
                                    <Typography variant="body2">
                                        2) Уточнить проблему и контекст.
                                    </Typography>
                                    <Typography variant="body2">
                                        3) Предложить решение / эскалацию.
                                    </Typography>
                                </Paper>
                            </Stack>
                        </TabPanel>

                        <TabPanel value={tab} index={2}>
                            <Stack spacing={1.5}>
                                <Typography variant="subtitle1">Заметки оператора </Typography>
                                <TextField
                                    multiline
                                    minRows={6}
                                    placeholder="Пиши кратко: что попросил клиент, что сделал оператор, результат."
                                />
                                <Stack direction="row" spacing={1}>
                                    <Button variant="contained">Сохранить </Button>
                                    <Button variant="outlined">Создать обращение </Button>
                                </Stack>
                            </Stack>
                        </TabPanel>
                    </Stack>
                </Paper>
            </Box>
        </Stack>
    );
}
