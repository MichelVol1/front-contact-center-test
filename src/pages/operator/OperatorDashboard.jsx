import { Row, Col, Card, Statistic, Tag, Table, Typography, Badge } from "antd";
import {
    PhoneOutlined, ClockCircleOutlined,
    CheckCircleOutlined, ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

// Моковые данные
const STATS = [
    { title: "В очереди",    value: 4,  icon: <ClockCircleOutlined />,       color: "#faad14" },
    { title: "Мои активные", value: 2,  icon: <PhoneOutlined />,             color: "#1677ff" },
    { title: "Закрыто сегодня", value: 8, icon: <CheckCircleOutlined />,     color: "#52c41a" },
    { title: "Эскалации",    value: 1,  icon: <ExclamationCircleOutlined />, color: "#ff4d4f" },
];

const MY_TICKETS = [
    { id: 2, title: "Ошибка при оплате",       status: "in_progress", client: "Сергей Морозов",  priority: "high" },
    { id: 6, title: "Заблокирована карта",      status: "in_progress", client: "Дмитрий Козлов", priority: "medium" },
];

const QUEUE = [
    { id: 7, title: "Не доставлен заказ",       client: "Елена Фёдорова",  wait: "3 мин" },
    { id: 8, title: "Не работает приложение",   client: "Алексей Волков",  wait: "7 мин" },
    { id: 9, title: "Вопрос по документам",     client: "Наталья Орлова",  wait: "12 мин" },
    { id: 10, title: "Проблема с регистрацией", client: "Роман Соколов",   wait: "15 мин" },
];

const PRIORITY_COLOR = { high: "red", medium: "orange", low: "default" };
const STATUS_COLOR   = { in_progress: "processing", new: "default", closed: "success" };
const STATUS_LABEL   = { in_progress: "В работе", new: "Новый", closed: "Закрыт" };

export function OperatorDashboard() {
    const navigate = useNavigate();

    const myTicketColumns = [
        { title: "Тема",     dataIndex: "title",
            render: (t, row) => (
                <a onClick={() => navigate(`/operator/tickets/${row.id}`)}>{t}</a>
            ),
        },
        { title: "Клиент",   dataIndex: "client", width: 180 },
        { title: "Статус",   dataIndex: "status", width: 120,
            render: (s) => <Badge status={STATUS_COLOR[s]} text={STATUS_LABEL[s]} />,
        },
        { title: "Приоритет", dataIndex: "priority", width: 110,
            render: (p) => (
                <Tag color={PRIORITY_COLOR[p]}>
                    {p === "high" ? "Высокий" : p === "medium" ? "Средний" : "Низкий"}
                </Tag>
            ),
        },
    ];

    const queueColumns = [
        { title: "Тема",    dataIndex: "title" },
        { title: "Клиент",  dataIndex: "client", width: 180 },
        { title: "Ожидание", dataIndex: "wait", width: 100,
            render: (w) => <Text type="warning">{w}</Text>,
        },
    ];

    return (
        <div>
            <Title level={4} style={{ marginBottom: 20 }}>Рабочее место оператора</Title>

            {/* KPI карточки */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                {STATS.map((s) => (
                    <Col xs={24} sm={12} lg={6} key={s.title}>
                        <Card size="small">
                            <Statistic
                                title={s.title}
                                value={s.value}
                                prefix={<span style={{ color: s.color }}>{s.icon}</span>}
                                valueStyle={{ color: s.color, fontSize: 28 }}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={[16, 16]}>
                {/* Мои обращения */}
                <Col xs={24} xl={14}>
                    <Card
                        title="Мои активные обращения"
                        size="small"
                        extra={<a onClick={() => navigate("/operator/tickets")}>Все</a>}
                    >
                        <Table
                            columns={myTicketColumns}
                            dataSource={MY_TICKETS}
                            rowKey="id"
                            pagination={false}
                            size="small"
                            locale={{ emptyText: "Нет активных обращений" }}
                        />
                    </Card>
                </Col>

                {/* Очередь */}
                <Col xs={24} xl={10}>
                    <Card title="Очередь ожидания" size="small">
                        <Table
                            columns={queueColumns}
                            dataSource={QUEUE}
                            rowKey="id"
                            pagination={false}
                            size="small"
                            locale={{ emptyText: "Очередь пуста" }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}