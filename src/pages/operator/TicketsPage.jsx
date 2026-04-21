// src/pages/operator/TicketsPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table, Tag, Input, Select, Space,
    Typography, Button, Tooltip
} from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;

const STATUS_COLOR = {
    new:         "blue",
    in_progress: "orange",
    escalated:   "red",
    closed:      "green",
    resolved:    "cyan",
};

const STATUS_LABEL = {
    new:         "Новый",
    in_progress: "В работе",
    escalated:   "Эскалация",
    closed:      "Закрыт",
    resolved:    "Решён",
};

// Моковые данные — потом заменить на запрос к API
const MOCK_TICKETS = [
    { id: 1, title: "Не работает интернет",      status: "new",         client: "Ольга Кузнецова",  created_at: "2026-03-29T10:00:00Z" },
    { id: 2, title: "Ошибка при оплате",          status: "in_progress", client: "Сергей Морозов",   created_at: "2026-03-29T11:00:00Z" },
    { id: 3, title: "Возврат товара",             status: "escalated",   client: "Мария Новикова",   created_at: "2026-03-29T12:00:00Z" },
    { id: 4, title: "Вопрос по тарифу",           status: "resolved",    client: "Иван Смирнов",     created_at: "2026-03-28T09:00:00Z" },
    { id: 5, title: "Не приходит SMS с кодом",    status: "closed",      client: "Анна Петрова",     created_at: "2026-03-28T14:00:00Z" },
    { id: 6, title: "Заблокирована карта",        status: "in_progress", client: "Дмитрий Козлов",   created_at: "2026-03-29T08:30:00Z" },
];

export function TicketsPage() {
    const navigate = useNavigate();
    const [search, setSearch]       = useState("");
    const [statusFilter, setStatus] = useState(null);

    const filtered = MOCK_TICKETS.filter((t) => {
        const matchSearch = !search ||
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.client.toLowerCase().includes(search.toLowerCase());
        const matchStatus = !statusFilter || t.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            width: 70,
            render: (id) => <span style={{ color: "#999" }}>#{id}</span>,
        },
        {
            title: "Тема обращения",
            dataIndex: "title",
            render: (text, row) => (
                <a onClick={() => navigate(`/operator/tickets/${row.id}`)}>{text}</a>
            ),
        },
        {
            title: "Клиент",
            dataIndex: "client",
        },
        {
            title: "Статус",
            dataIndex: "status",
            width: 140,
            render: (s) => (
                <Tag color={STATUS_COLOR[s]}>{STATUS_LABEL[s]}</Tag>
            ),
        },
        {
            title: "Создано",
            dataIndex: "created_at",
            width: 160,
            render: (d) =>
                new Date(d).toLocaleString("ru", {
                    day: "2-digit", month: "2-digit", year: "numeric",
                    hour: "2-digit", minute: "2-digit",
                }),
        },
        {
            title: "",
            width: 60,
            render: (_, row) => (
                <Tooltip title="Открыть">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => navigate(`/operator/tickets/${row.id}`)}
                    />
                </Tooltip>
            ),
        },
    ];

    return (
        <div>
            <Title level={4} style={{ marginBottom: 16 }}>
                Обращения
            </Title>

            <Space style={{ marginBottom: 16 }} wrap>
                <Input
                    placeholder="Поиск по теме или клиенту"
                    prefix={<SearchOutlined />}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    allowClear
                    style={{ width: 280 }}
                />
                <Select
                    placeholder="Все статусы"
                    allowClear
                    style={{ width: 160 }}
                    value={statusFilter}
                    onChange={setStatus}
                    options={Object.entries(STATUS_LABEL).map(([v, l]) => ({
                        value: v,
                        label: l,
                    }))}
                />
            </Space>

            <Table
                columns={columns}
                dataSource={filtered}
                rowKey="id"
                pagination={{ pageSize: 15, showSizeChanger: false }}
                size="middle"
                locale={{ emptyText: "Обращения не найдены" }}
                onRow={(row) => ({
                    style: { cursor: "pointer" },
                    onClick: () => navigate(`/operator/tickets/${row.id}`),
                })}
            />
        </div>
    );
}