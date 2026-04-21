import { http, HttpResponse } from "msw";

// Mock пользователи
const USERS = {
    operator: { id: 1, name: "Иван Петров", role: "operator" },
    manager:  { id: 2, name: "Анна Сидорова", role: "manager" },
};

export const handlers = [

    // Инициализация сессии (вызывается при старте)
    http.get("/api/auth/me/", () => {
        return HttpResponse.json(USERS.operator); // меняй на manager для теста
    }),

    // Логин
    http.post("/api/auth/login/", async ({ request }) => {
        const { username } = await request.json();
        const user = username === "manager" ? USERS.manager : USERS.operator;
        return HttpResponse.json({ user });
    }),

    // Logout
    http.post("/api/auth/logout/", () => {
        return HttpResponse.json({ success: true });
    }),

    // Список обращений
    http.get("/api/tickets/", () => {
        return HttpResponse.json({
            count: 3,
            results: [
                { id: 1, title: "Не работает интернет", status: "new",         client: "Ольга Кузнецова", created_at: "2026-03-29T10:00:00Z" },
                { id: 2, title: "Ошибка при оплате",    status: "in_progress", client: "Сергей Морозов",  created_at: "2026-03-29T11:00:00Z" },
                { id: 3, title: "Возврат товара",        status: "closed",      client: "Мария Новикова",  created_at: "2026-03-29T12:00:00Z" },
            ],
        });
    }),

    // Детали обращения
    http.get("/api/tickets/:id/", ({ params }) => {
        return HttpResponse.json({
            id: params.id,
            title: "Не работает интернет",
            status: "in_progress",
            client: { id: 1, name: "Ольга Кузнецова", phone: "+375291234567" },
            description: "Клиент сообщает, что интернет не работает с утра.",
            created_at: "2026-03-29T10:00:00Z",
            comments: [
                { id: 1, author: "Иван Петров", text: "Принял в работу", created_at: "2026-03-29T10:30:00Z" },
            ],
        });
    }),

    // Список клиентов
    http.get("/api/clients/", () => {
        return HttpResponse.json({
            results: [
                { id: 1, name: "Ольга Кузнецова",  phone: "+375291234567", tickets_count: 2 },
                { id: 2, name: "Сергей Морозов",   phone: "+375297654321", tickets_count: 1 },
                { id: 3, name: "Мария Новикова",   phone: "+375296789012", tickets_count: 5 },
            ],
        });
    }),

    // Статистика для дашборда
    http.get("/api/dashboard/stats/", () => {
        return HttpResponse.json({
            total_tickets: 24,
            open_tickets: 8,
            closed_today: 5,
            avg_handle_time: "00:14:32",
        });
    }),
];