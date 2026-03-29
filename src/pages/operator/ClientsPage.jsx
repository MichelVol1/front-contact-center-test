import { Paper, Typography, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
    { id: 1, fullName: "Иванов Иван", phone: "+375291112233", segment: "VIP", lastContact: "2025-12-20" },
    { id: 2, fullName: "Петров Пётр", phone: "+375291112244", segment: "Standard", lastContact: "2025-12-21" },
];

const columns = [
    { field: "fullName", headerName: "ФИО", flex: 1 },
    { field: "phone", headerName: "Телефон", flex: 1 },
    { field: "segment", headerName: "Сегмент", width: 140 },
    { field: "lastContact", headerName: "Последний контакт", width: 160 },
];

export function ClientsPage() {
    return (
        <Stack spacing={2}>
            <Typography variant="h6">Клиенты</Typography>

            <Paper sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <TextField size="small" label="Поиск" placeholder="ФИО / телефон" />
                    <TextField size="small" label="Сегмент" placeholder="VIP / Standard" />
                </Stack>

                <div style={{ height: 420 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        disableRowSelectionOnClick
                        pageSizeOptions={[5, 10, 20]}
                        initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
                    />
                </div>
            </Paper>
        </Stack>
    );
}
