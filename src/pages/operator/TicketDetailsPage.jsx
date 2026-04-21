import { useParams, useNavigate } from "react-router-dom";
import {
    Card, Descriptions, Tag, Button, Timeline,
    Input, Space, Typography, Divider, Select, message,
} from "antd";
import {
    ArrowLeftOutlined, UserOutlined,
    ClockCircleOutlined, MessageOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Title, Text } = Typography;

// Моковые данные одного обращения
const MOCK_TICKET = {
    id: 2,
    title: "Ошибка при оплате",
    status: "in_progress",
    priority: "high",
    client: { name: "Сергей Морозов", phone: "+375297654321", email: "morozov@mail.ru" },
    created_at: "2026-03-29T11:00:00Z",
    description: "Клиент сообщает, что при попытке оплатить заказ №45678 появляется ошибка «Платёж отклонён». Карта Visa, банк — Сбербанк.",
    comments: [
        { id: 1, author: "Иван Петров", text: "Принял в работу. Проверяю статус транзакции.", time: "2026-03-29T11:05:00Z" },
        { id: 2, author: "Система", text: "Статус изменён: Новый → В работе", time: "2026-03-29T11:05:00Z", isSystem: true },
    ],
};

const STATUS_OPTIONS = [
    { value: "new",         label: "Новый" },
    { value: "in_progress", label: "В работе" },
    { value: "escalated",   label: "Эскалация" },
    { value: "resolved",    label: "Решён" },
    { value: "closed",      label: "Закрыт" },
];

const STATUS_COLOR = {
    new: "blue", in_progress: "orange",
    escalated: "red", resolved: "cyan", closed: "green",
};

export function TicketDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const ticket = MOCK_TICKET; // потом заменить на запрос по id

    const [status, setStatus]       = useState(ticket.status);
    const [comment, setComment]     = useState("");
    const [comments, setComments]   = useState(ticket.comments);

    const handleAddComment = () => {
        if (!comment.trim()) return;
        setComments((prev) => [
            ...prev,
            { id: Date.now(), author: "Вы", text: comment, time: new Date().toISOString() },
        ]);
        setComment("");
        message.success("Комментарий добавлен");
    };

    const handleStatusChange = (val) => {
        setStatus(val);
        message.success(`Статус изменён на: ${STATUS_OPTIONS.find(o => o.value === val)?.label}`);
    };

    return (
        <div>
            {/* Шапка */}
            <Space style={{ marginBottom: 16 }}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    type="text"
                    onClick={() => navigate("/operator/tickets")}
                    style={{ paddingLeft: 0 }}
                >
                    Обращения
                </Button>
            </Space>

            <Space align="center" style={{ marginBottom: 20 }}>
                <Title level={4} style={{ margin: 0 }}>
                    Обращение #{id}
                </Title>
                <Tag color={STATUS_COLOR[status]}>
                    {STATUS_OPTIONS.find(o => o.value === status)?.label}
                </Tag>
            </Space>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>

                {/* Основная информация */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <Card title="Описание" size="small">
                        <Title level={5}>{ticket.title}</Title>
                        <Text>{ticket.description}</Text>
                    </Card>

                    {/* История и комментарии */}
                    <Card
                        title={<Space><MessageOutlined /> История</Space>}
                        size="small"
                    >
                        <Timeline
                            items={comments.map((c) => ({
                                color: c.isSystem ? "gray" : "blue",
                                children: (
                                    <div>
                                        <Text strong={!c.isSystem}>{c.author}</Text>
                                        <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                                            {new Date(c.time).toLocaleString("ru")}
                                        </Text>
                                        <div style={{ marginTop: 4 }}>
                                            <Text type={c.isSystem ? "secondary" : undefined}>{c.text}</Text>
                                        </div>
                                    </div>
                                ),
                            }))}
                        />
                        <Divider style={{ margin: "12px 0" }} />
                        <Space.Compact style={{ width: "100%" }}>
                            <Input.TextArea
                                placeholder="Добавить комментарий..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={2}
                                style={{ resize: "none" }}
                            />
                        </Space.Compact>
                        <Button
                            type="primary"
                            style={{ marginTop: 8 }}
                            onClick={handleAddComment}
                            disabled={!comment.trim()}
                        >
                            Отправить
                        </Button>
                    </Card>
                </div>

                {/* Боковая панель */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {/* Управление */}
                    <Card title="Управление" size="small">
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <div>
                                <Text type="secondary" style={{ fontSize: 12 }}>Статус</Text>
                                <Select
                                    value={status}
                                    onChange={handleStatusChange}
                                    options={STATUS_OPTIONS}
                                    style={{ width: "100%", marginTop: 4 }}
                                />
                            </div>
                        </Space>
                    </Card>

                    {/* Клиент */}
                    <Card
                        title={<Space><UserOutlined /> Клиент</Space>}
                        size="small"
                    >
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Имя">
                                {ticket.client.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Телефон">
                                <a href={`tel:${ticket.client.phone}`}>{ticket.client.phone}</a>
                            </Descriptions.Item>
                            <Descriptions.Item label="Email">
                                <a href={`mailto:${ticket.client.email}`}>{ticket.client.email}</a>
                            </Descriptions.Item>
                        </Descriptions>
                        <Button
                            block
                            style={{ marginTop: 12 }}
                            onClick={() => navigate("/operator/clients")}
                        >
                            Профиль клиента
                        </Button>
                    </Card>

                    {/* Детали */}
                    <Card
                        title={<Space><ClockCircleOutlined /> Детали</Space>}
                        size="small"
                    >
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Создано">
                                {new Date(ticket.created_at).toLocaleString("ru")}
                            </Descriptions.Item>
                            <Descriptions.Item label="Приоритет">
                                <Tag color={ticket.priority === "high" ? "red" : "orange"}>
                                    {ticket.priority === "high" ? "Высокий" : "Средний"}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </div>
            </div>
        </div>
    );
}