// src/pages/operator/CallsPage.jsx
import { useState } from "react";
import { Table, Tag, Typography, Space, Input, Select, Button, Tooltip } from "antd";
import { PhoneOutlined, SearchOutlined, PlayCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CALLS = [
    { id: 1, client: "Ольга Кузнецова",  phone: "+375291234567", direction: "inbound",  duration: "3:24", status: "completed", date: "2026-04-11T10:15:00Z", ticket_id: 1 },
    { id: 2, client: "Сергей Морозов",   phone: "+375297654321", direction: "inbound",  duration: "1:45", status: "completed", date: "2026-04-11T11:02:00Z", ticket_id: 2 },
    { id: 3, client: "Неизвестный",       phone: "+375293334455", direction: "inbound",  duration: "0:32", status: "missed",    date: "2026-04-11T11:30:00Z", ticket_id: null },
    { id: 4, client: "Мария Новикова",   phone: "+375296789012", direction: "outbound", duration: "5:10", status: "completed", date: "2026-04-11T12:00:00Z", ticket_id: 3 },
    { id: 5, client: "Дмитрий Козлов",   phone: "+375295432109", direction: "inbound",  duration: "2:05", status: "completed", date: "2026-04-11T13:45:00Z", ticket_id: 6 },
    { id: 6, client: "Неизвестный",       phone: "+375291122334", direction: "inbound",  duration: "0:00", status: "missed",    date: "2026-04-11T14:20:00Z", ticket_id: null },
];

const STATUS_COLOR  = { completed: "success", missed: "error",    busy: "warning" };
const STATUS_LABEL  = { completed: "Завершён", missed: "Пропущен", busy: "Занято"  };
const DIR_COLOR     = { inbound: "blue", outbound: "green" };
const DIR_LABEL     = { inbound: "Входящий", outbound: "Исходящий" };

export function CallsPage() {
    const [search, setSearch]   = useState("");
    const [statusF, setStatusF] = useState(null);

    const filtered = CALLS.filter((c) => {
        const matchSearch = !search ||
            c.client.toLowerCase().includes(search.toLowerCase()) ||
            c.phone.includes(search);
        const matchStatus = !statusF || c.status === statusF;
        return matchSearch && matchStatus;
    });

    const columns = [
        {
            title: "Дата и время",
            dataIndex: "date",
            width: 160,
            render: (d) => new Date(d).toLocaleString("ru", {
                day: "2-digit", month: "2-digit",
                hour: "2-digit", minute: "2-digit",
            }),
        },
        {
            title: "Направление",
            dataIndex: "direction",
            width: 130,
            render: (d) => <Tag color={DIR_COLOR[d]}>{DIR_LABEL[d]}</Tag>,
        },
        {
            title: "Клиент / Номер",
            render: (_, row) => (
                <div>
                    <Text strong>{row.client}</Text>
                    <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            <PhoneOutlined style={{ marginRight: 4 }} />
                            {row.phone}
                        </Text>
                    </div>
                </div>
            ),
        },
        {
            title: "Статус",
            dataIndex: "status",
            width: 120,
            render: (s) => <Tag color={STATUS_COLOR[s]}>{STATUS_LABEL[s]}</Tag>,
        },
        {
            title: "Длительность",
            dataIndex: "duration",
            width: 110,
            align: "right",
            render: (d, row) => (
                <Text style={{ fontVariantNumeric: "tabular-nums", color: row.status === "missed" ? "#bbb" : undefined }}>
                    {d}
                </Text>
            ),
        },
        {
            title: "",
            width: 50,
            render: (_, row) =>
                row.status === "completed" ? (
                    <Tooltip title="Воспроизвести запись">
                        <Button type="text" size="small" icon={<PlayCircleOutlined />} />
                    </Tooltip>
                ) : null,
        },
    ];

    return (
        <div>
            <Title level={4} style={{ marginBottom: 16 }}>Звонки</Title>

            <Space style={{ marginBottom: 16 }} wrap>
                <Input
                    placeholder="Поиск по клиенту или номеру"
                    prefix={<SearchOutlined />}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    allowClear
                    style={{ width: 280 }}
                />
                <Select
                    placeholder="Статус"
                    allowClear
                    style={{ width: 150 }}
                    value={statusF}
                    onChange={setStatusF}
                    options={[
                        { value: "completed", label: "Завершённые" },
                        { value: "missed",    label: "Пропущенные" },
                    ]}
                />
            </Space>

            <Table
                columns={columns}
                dataSource={filtered}
                rowKey="id"
                size="middle"
                pagination={{ pageSize: 20 }}
                locale={{ emptyText: "Звонки не найдены" }}
                rowClassName={(row) => row.status === "missed" ? "row-missed" : ""}
            />
        </div>
    );
}