// src/pages/operator/ClientsPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table, Input, Card, Typography,
    Modal, Descriptions, Tag, Button,
    Space, Badge
} from "antd";
import { SearchOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CLIENTS = [
    { id: 1, name: "Ольга Кузнецова",  phone: "+375291234567", email: "kuznetsova@mail.ru", tickets: 3, last_contact: "2026-04-10", status: "active" },
    { id: 2, name: "Сергей Морозов",   phone: "+375297654321", email: "morozov@gmail.com",  tickets: 1, last_contact: "2026-04-09", status: "active" },
    { id: 3, name: "Мария Новикова",   phone: "+375296789012", email: "novikova@yandex.ru", tickets: 5, last_contact: "2026-04-08", status: "vip"    },
    { id: 4, name: "Иван Смирнов",     phone: "+375293456789", email: "smirnov@mail.ru",    tickets: 2, last_contact: "2026-03-30", status: "active" },
    { id: 5, name: "Анна Петрова",     phone: "+375299876543", email: "petrova@gmail.com",  tickets: 0, last_contact: "2026-03-20", status: "inactive"},
    { id: 6, name: "Дмитрий Козлов",   phone: "+375295432109", email: "kozlov@mail.ru",     tickets: 4, last_contact: "2026-04-11", status: "vip"    },
];

const STATUS_LABEL = { active: "Активный", vip: "VIP", inactive: "Неактивный" };
const STATUS_COLOR = { active: "success", vip: "gold", inactive: "default" };

export function ClientsPage() {
    const navigate = useNavigate();
    const [search, setSearch]       = useState("");
    const [selected, setSelected]   = useState(null);

    const filtered = CLIENTS.filter((c) =>
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            title: "Клиент",
            dataIndex: "name",
            render: (name, row) => (
                <Space>
                    <UserOutlined style={{ color: "#999" }} />
                    <a onClick={() => setSelected(row)}>{name}</a>
                </Space>
            ),
        },
        {
            title: "Телефон",
            dataIndex: "phone",
            render: (phone) => (
                <a href={`tel:${phone}`}>
                    <Space size={4}><PhoneOutlined />{phone}</Space>
                </a>
            ),
        },
        { title: "Email",  dataIndex: "email",  render: (e) => <a href={`mailto:${e}`}>{e}</a> },
        {
            title: "Обращений",
            dataIndex: "tickets",
            width: 110,
            render: (n) => (
                <Badge
                    count={n}
                    showZero
                    style={{ backgroundColor: n > 0 ? "#1677ff" : "#d9d9d9" }}
                />
            ),
        },
        {
            title: "Статус",
            dataIndex: "status",
            width: 120,
            render: (s) => <Tag color={STATUS_COLOR[s]}>{STATUS_LABEL[s]}</Tag>,
        },
        {
            title: "Последний контакт",
            dataIndex: "last_contact",
            width: 170,
            render: (d) => new Date(d).toLocaleDateString("ru"),
        },
    ];

    return (
        <div>
            <Title level={4} style={{ marginBottom: 16 }}>Клиенты</Title>

            <Input
                placeholder="Поиск по имени, телефону или email"
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                allowClear
                style={{ width: 360, marginBottom: 16 }}
            />

            <Table
                columns={columns}
                dataSource={filtered}
                rowKey="id"
                size="middle"
                pagination={{ pageSize: 15 }}
                locale={{ emptyText: "Клиенты не найдены" }}
                onRow={(row) => ({
                    style: { cursor: "pointer" },
                    onClick: () => setSelected(row),
                })}
            />

            {/* Модальное окно клиента */}
            <Modal
                title={selected?.name}
                open={!!selected}
                onCancel={() => setSelected(null)}
                footer={[
                    <Button key="tickets" type="primary"
                            onClick={() => { navigate("/operator/tickets"); setSelected(null); }}>
                        Обращения клиента
                    </Button>,
                    <Button key="close" onClick={() => setSelected(null)}>Закрыть</Button>,
                ]}
            >
                {selected && (
                    <Descriptions column={1} size="small" style={{ marginTop: 12 }}>
                        <Descriptions.Item label="Телефон">
                            <a href={`tel:${selected.phone}`}>{selected.phone}</a>
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            <a href={`mailto:${selected.email}`}>{selected.email}</a>
                        </Descriptions.Item>
                        <Descriptions.Item label="Статус">
                            <Tag color={STATUS_COLOR[selected.status]}>{STATUS_LABEL[selected.status]}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Всего обращений">{selected.tickets}</Descriptions.Item>
                        <Descriptions.Item label="Последний контакт">
                            {new Date(selected.last_contact).toLocaleDateString("ru")}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
}