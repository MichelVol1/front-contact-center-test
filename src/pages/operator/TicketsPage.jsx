import { useMemo, useState } from "react";
import { Paper, Typography, Stack, TextField, MenuItem, Chip, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
    { id: 501, createdAt: "2025-12-22 16:10", channel: "Call", customer: "Иванов Иван", status: "New", priority: "High", subject: "Не проходит платеж" },
    { id: 502, createdAt: "2025-12-22 16:22", channel: "Chat", customer: "Петров Пётр", status: "In Progress", priority: "Medium", subject: "Тарифы и подключение" },
    { id: 503, createdAt: "2025-12-22 16:41", channel: "Email", customer: "Сидорова Анна", status: "Resolved", priority: "Low", subject: "Смена данных профиля" },
];

function statusChip(status) {
    if (status === "New") return <Chip size="small" color="warning" label="New" />;
    if (status === "In Progress") return <Chip size="small" color="info" label="In Progress" />;
    if (status === "Resolved") return <Chip size="small" color="success" label="Resolved" />;
    return <Chip size="small" label={status} />;
}

export function TicketsPage() {
    const [q, setQ] = useState("");
    const [status, setStatus] = useState("All");
    const [priority, setPriority] = useState("All");

    const filtered = useMemo(() => {
        return rows.filter((r) => {
            const hitQ =
                !q ||
                r.customer.toLowerCase().includes(q.toLowerCase()) ||
                r.subject.toLowerCase().includes(q.toLowerCase()) ||
                String(r.id).includes(q);

            const hitStatus = status === "All" || r.status === status;
            const hitPriority = priority === "All" || r.priority === priority;

            return hitQ && hitStatus && hitPriority;
        });
    }, [q, status, priority]);

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "createdAt", headerName: "Создано", width: 170 },
        { field: "channel", headerName: "Канал", width: 110 },
        { field: "customer", headerName: "Клиент", flex: 1, minWidth: 180 },
        {
            field: "status",
            headerName: "Статус",
            width: 140,
            renderCell: (params) => statusChip(params.value),
            sortable: false,
        },
        { field: "priority", headerName: "Приоритет", width: 120 },
        { field: "subject", headerName: "Тема", flex: 1.2, minWidth: 240 },
    ];

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Обращения</Typography>

            <Paper sx={{ p: 2 }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
                    <TextField
                        size="small"
                        label="Поиск"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="ID / клиент / тема"
                        sx={{ minWidth: 260 }}
                    />

                    <TextField
                        size="small"
                        select
                        label="Статус"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        sx={{ minWidth: 200 }}
                    >
                        {["All", "New", "In Progress", "Resolved"].map((v) => (
                            <MenuItem key={v} value={v}>{v}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        size="small"
                        select
                        label="Приоритет"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        sx={{ minWidth: 200 }}
                    >
                        {["All", "High", "Medium", "Low"].map((v) => (
                            <MenuItem key={v} value={v}>{v}</MenuItem>
                        ))}
                    </TextField>
                </Stack>

                <Box sx={{ height: 520 }}>
                    <DataGrid
                        rows={filtered}
                        columns={columns}
                        disableRowSelectionOnClick
                        pageSizeOptions={[5, 10, 20]}
                        initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
                    />
                </Box>
            </Paper>
        </Stack>
    );
}
