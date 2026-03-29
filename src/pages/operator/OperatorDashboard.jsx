import {
    Grid,
    Paper,
    Typography,
    Stack,
    Chip,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
} from "@mui/material";

function StatCard({ title, value, hint }) {
    return (
        <Paper sx={{ p: 2 }}>
            <Stack spacing={0.5}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {title}
                </Typography>
                <Typography variant="h4">{value}</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {hint}
                </Typography>
            </Stack>
        </Paper>
    );
}

export function OperatorDashboard() {
    const events = [
        {
            time: "17:32",
            type: "incoming_call",
            text: "Входящий звонок от +375 29 111 22 33 (клиент: Иванов И.).",
        },
        {
            time: "17:28",
            type: "ticket_updated",
            text: "Обращение T-512 переведено в статус «В работе».",
        },
        {
            time: "17:15",
            type: "status_changed",
            text: "Ваш статус изменён на «Готов к приёму звонков».",
        },
    ];

    const recentTickets = [
        {
            id: "T-512",
            client: "Иванов Иван",
            subject: "Не проходит платёж",
            status: "В работе",
        },
        {
            id: "T-509",
            client: "Петров Пётр",
            subject: "Вопрос по тарифу",
            status: "Ожидание клиента",
        },
        {
            id: "T-503",
            client: "Сидорова Анна",
            subject: "Проблема с личным кабинетом",
            status: "Решено",
        },
    ];

    const kbHints = [
        "Скрипт приветствия для входящих звонков",
        "Частые причины отказа оплаты",
        "Инструкция: смена тарифа клиенту",
    ];

    return (
        <Grid container spacing={2}>
            {/* KPI карточки */}
            <Grid item xs={12} md={3}>
                <StatCard
                    title="Активные звонки"
                    value="1"
                    hint="Сейчас в работе"
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <StatCard
                    title="В очереди"
                    value="4"
                    hint="Ожидают оператора"
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <StatCard
                    title="Обработано сегодня"
                    value="23"
                    hint="Звонки и обращения"
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <StatCard
                    title="Средн. AHT"
                    value="4:18"
                    hint="Среднее время обработки"
                />
            </Grid>

            {/* Статус смены + лента событий */}
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: "100%" }}>
                    <Stack spacing={1.5}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="h6">Статус смены</Typography>
                            <Chip
                                color="success"
                                label="Готов к приёму звонков"
                                size="small"
                            />
                        </Stack>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            Текущая смена: 09:00–18:00. Следующий перерыв через 35 минут.
                        </Typography>

                        <Divider />

                        <Typography variant="subtitle2">Лента событий (demo)</Typography>
                        <Stack spacing={0.75}>
                            {events.map((e, idx) => (
                                <Stack key={idx} direction="row" spacing={1}>
                                    <Typography
                                        variant="caption"
                                        sx={{ color: "text.secondary", minWidth: 46 }}
                                    >
                                        {e.time}
                                    </Typography>
                                    <Typography variant="body2">{e.text}</Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                </Paper>
            </Grid>

            {/* Последние обращения */}
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: "100%" }}>
                    <Stack spacing={1.5}>
                        <Typography variant="h6">Последние обращения</Typography>
                        <List dense>
                            {recentTickets.map((t) => (
                                <ListItem key={t.id} disableGutters>
                                    <ListItemText
                                        primary={
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{ fontWeight: 500 }}
                                                >
                                                    {t.id} • {t.client}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {t.status}
                                                </Typography>
                                            </Stack>
                                        }
                                        secondary={
                                            <Typography
                                                variant="caption"
                                                sx={{ color: "text.secondary" }}
                                            >
                                                {t.subject}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Box textAlign="right">
                            <Button size="small">Открыть список обращений</Button>
                        </Box>
                    </Stack>
                </Paper>
            </Grid>

            {/* Подсказки из базы знаний */}
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: "100%" }}>
                    <Stack spacing={1.5}>
                        <Typography variant="h6">Быстрые подсказки</Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            Популярные статьи базы знаний для типичных обращений.
                        </Typography>
                        <Stack spacing={1}>
                            {kbHints.map((title, idx) => (
                                <Button
                                    key={idx}
                                    variant="outlined"
                                    size="small"
                                    sx={{ justifyContent: "flex-start" }}
                                    fullWidth
                                >
                                    {title}
                                </Button>
                            ))}
                        </Stack>
                    </Stack>
                </Paper>
            </Grid>
        </Grid>
    );
}
