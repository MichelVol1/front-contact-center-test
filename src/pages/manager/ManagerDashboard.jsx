// src/pages/manager/ManagerDashboard.jsx
import { Row, Col, Card, Statistic, Table, Tag, Progress, Typography } from "antd";
import {
    TeamOutlined, CheckCircleOutlined,
    ClockCircleOutlined, RiseOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const STATS = [
    { title: "Операторов онлайн",  value: 8,    suffix: "/ 12",  icon: <TeamOutlined />,          color: "#1677ff" },
    { title: "Закрыто сегодня",    value: 43,   suffix: "",      icon: <CheckCircleOutlined />,    color: "#52c41a" },
    { title: "Среднее время отв.", value: "2:14", suffix: "мин", icon: <ClockCircleOutlined />,   color: "#faad14" },
    { title: "Удовлетворённость",  value: 94,   suffix: "%",     icon: <RiseOutlined />,          color: "#722ed1" },
];

const AGENTS = [
    { name: "Иван Петров",    status: "online",  handled: 9, avg_time: "1:45", score: 98 },
    { name: "Мария Сидорова", status: "online",  handled: 7, avg_time: "2:10", score: 95 },
    { name: "Алексей Громов", status: "break",   handled: 5, avg_time: "3:02", score: 87 },
    { name: "Екатерина Лис",  status: "online",  handled: 8, avg_time: "1:55", score: 96 },
    { name: "Роман Чехов",    status: "offline", handled: 0, avg_time: "—",    score: 91 },
];

const STATUS_COLOR = { online: "success", break: "warning", offline: "default" };
const STATUS_LABEL = { online: "Онлайн", break: "Перерыв", offline: "Офлайн" };

const agentColumns = [
    {
        title: "Оператор",
        dataIndex: "name",
        render: (name, row) => (
            <span>
        {name}
                <Tag color={STATUS_COLOR[row.status]} style={{ marginLeft: 8, fontSize: 11 }}>
          {STATUS_LABEL[row.status]}
        </Tag>
      </span>
        ),
    },
    { title: "Обработано", dataIndex: "handled", width: 110, align: "center" },
    { title: "Сред. время", dataIndex: "avg_time", width: 110, align: "center" },
    {
        title: "Качество",
        dataIndex: "score",
        width: 150,
        render: (score) => (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Progress
                    percent={score}
                    size="small"
                    showInfo={false}
                    strokeColor={score >= 95 ? "#52c41a" : score >= 85 ? "#faad14" : "#ff4d4f"}
                    style={{ flex: 1 }}
                />
                <Text style={{ fontSize: 12 }}>{score}%</Text>
            </div>
        ),
    },
];

// Имитация графика нагрузки по часам
const HOURLY = [
    { hour: "08:00", count: 5 },
    { hour: "09:00", count: 12 },
    { hour: "10:00", count: 18 },
    { hour: "11:00", count: 22 },
    { hour: "12:00", count: 15 },
    { hour: "13:00", count: 10 },
    { hour: "14:00", count: 19 },
    { hour: "15:00", count: 24 },
    { hour: "16:00", count: 17 },
    { hour: "17:00", count: 8 },
];
const maxCount = Math.max(...HOURLY.map(h => h.count));

export function ManagerDashboard() {
    return (
        <div>
            <Title level={4} style={{ marginBottom: 20 }}>Дашборд менеджера</Title>

            {/* KPI */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                {STATS.map((s) => (
                    <Col xs={24} sm={12} lg={6} key={s.title}>
                        <Card size="small">
                            <Statistic
                                title={s.title}
                                value={s.value}
                                suffix={s.suffix}
                                prefix={<span style={{ color: s.color }}>{s.icon}</span>}
                                valueStyle={{ color: s.color }}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={[16, 16]}>
                {/* Операторы */}
                <Col xs={24} lg={14}>
                    <Card title="Работа операторов сегодня" size="small">
                        <Table
                            columns={agentColumns}
                            dataSource={AGENTS}
                            rowKey="name"
                            pagination={false}
                            size="small"
                        />
                    </Card>
                </Col>

                {/* Нагрузка по часам */}
                <Col xs={24} lg={10}>
                    <Card title="Нагрузка по часам" size="small">
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {HOURLY.map(({ hour, count }) => (
                                <div key={hour} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <Text style={{ width: 48, fontSize: 12, color: "#888" }}>{hour}</Text>
                                    <div style={{ flex: 1, background: "#f0f0f0", borderRadius: 4, height: 16 }}>
                                        <div style={{
                                            width: `${(count / maxCount) * 100}%`,
                                            background: "#1677ff",
                                            height: "100%",
                                            borderRadius: 4,
                                            transition: "width 0.3s",
                                        }} />
                                    </div>
                                    <Text style={{ width: 28, fontSize: 12, textAlign: "right" }}>{count}</Text>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}