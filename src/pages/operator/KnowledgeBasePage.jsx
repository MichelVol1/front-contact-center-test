import { useState, useMemo } from "react";
import {
    Box,
    Paper,
    Stack,
    Typography,
    TextField,
    List,
    ListItemButton,
    ListItemText,
    Divider,
    Chip,
    Breadcrumbs,
    Link,
    IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArticleIcon from "@mui/icons-material/Article";
import FolderIcon from "@mui/icons-material/Folder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// Мок-данные: категории и статьи
const kbData = [
    {
        id: "cat-1",
        type: "category",
        title: "Платежи и биллинг",
        articles: [
            { id: "art-101", title: "Не проходит платёж картой", tags: ["payment", "card"] },
            { id: "art-102", title: "Возврат средств", tags: ["refund", "payment"] },
            { id: "art-103", title: "Смена реквизитов", tags: ["billing"] },
        ],
    },
    {
        id: "cat-2",
        type: "category",
        title: "Тарифы и подключение",
        articles: [
            { id: "art-201", title: "Подключение нового тарифа", tags: ["tariff", "activation"] },
            { id: "art-202", title: "Сравнение тарифов", tags: ["tariff", "comparison"] },
            { id: "art-203", title: "Отключение услуги", tags: ["deactivation"] },
        ],
    },
    {
        id: "cat-3",
        type: "category",
        title: "Технические вопросы",
        articles: [
            { id: "art-301", title: "Сброс пароля клиента", tags: ["password", "security"] },
            { id: "art-302", title: "Проблемы с доступом к ЛК", tags: ["access", "login"] },
            { id: "art-303", title: "Настройка двухфакторной аутентификации", tags: ["2FA", "security"] },
        ],
    },
];

// Мок-контент статей
const articlesContent = {
    "art-101": {
        title: "Не проходит платёж картой",
        category: "Платежи и биллинг",
        updated: "2025-12-20",
        content: `
Симптомы:
Клиент сообщает, что при попытке оплаты картой система выдаёт ошибку или деньги списываются, но не зачисляются.

Возможные причины:
1. Недостаточно средств на карте
2. Карта заблокирована банком
3. Технический сбой платёжного шлюза
4. Неверные данные карты (CVV, срок действия)

Пошаговое решение:
1. Попросите клиента проверить баланс карты
2. Уточните, не заблокирована ли карта (позвонить в банк)
3. Проверьте статус платежа в CRM (раздел "Транзакции")
4. Если платёж висит в статусе "Pending" более 10 минут — создайте обращение в техподдержку платёжной системы
5. Предложите альтернативный способ оплаты (другая карта, электронный кошелёк)

Эскалация
Если проблема повторяется у нескольких клиентов — немедленно сообщите руководителю и в IT-отдел.
    `,
    },
    "art-102": {
        title: "Возврат средств",
        category: "Платежи и биллинг",
        updated: "2025-12-18",
        content: `
Основания для возврата:
- Двойное списание
- Ошибочный платёж
- Отмена услуги в течение 14 дней (по закону о защите прав потребителей)

Процедура:
1. Уточните у клиента причину возврата и сумму
2. Запросите скриншот/номер транзакции
3. Заполните форму "Заявка на возврат" в CRM (раздел Billing → Refunds)
4. Прикрепите документы (скриншоты, письма)
5. Срок обработки: до 5 рабочих дней

Важно:
Возврат возможен только на ту же карту, с которой был платёж. Комиссия платёжной системы не возвращается.
    `,
    },
    "art-201": {
        title: "Подключение нового тарифа",
        category: "Тарифы и подключение",
        updated: "2025-12-22",
        content: `
Шаги:
1. Идентифицируйте клиента (номер договора / телефон)
2. Откройте карточку клиента в CRM
3. Перейдите в раздел "Тарифы" → "Сменить тариф"
4. Выберите новый тариф из списка доступных
5. Проверьте совместимость (если клиент на акционном тарифе — могут быть ограничения)
6. Подтвердите изменение — система автоматически пересчитает стоимость
7. Проинформируйте клиента о дате активации (обычно с 00:00 следующих суток)

Часто задаваемые вопросы
- Можно ли вернуться на старый тариф? Да, в течение 30 дней.
- Пересчитывается ли абонентская плата? Да, пропорционально дням использования.
    `,
    },
    "art-301": {
        title: "Сброс пароля клиента",
        category: "Технические вопросы",
        updated: "2025-12-19",
        content: `
Стандартная процедура:
1. Идентифицируйте клиента (номер договора + кодовое слово)
2. В CRM: Клиент → Безопасность → "Сбросить пароль"
3. Система отправит ссылку на email/SMS (в зависимости от настроек клиента)
4. Срок действия ссылки: 30 минут

Если у клиента нет доступа к email/телефону:
1. Запросите паспортные данные (серия/номер/дата выдачи)
2. Создайте обращение с типом "Восстановление доступа"
3. Служба безопасности свяжется с клиентом в течение 1 рабочего дня

Безопасность:
Никогда не называйте пароль клиенту вслух, не отправляйте его в открытом виде.
    `,
    },
};

// Все статьи одним массивом (для поиска)
const allArticles = kbData.flatMap((cat) =>
    cat.articles.map((art) => ({ ...art, categoryId: cat.id, categoryTitle: cat.title }))
);

export function KnowledgeBasePage() {
    const [selectedCat, setSelectedCat] = useState(kbData[0].id);
    const [selectedArt, setSelectedArt] = useState(kbData[0].articles[0].id);
    const [search, setSearch] = useState("");

    // Фильтрация статей по поиску
    const searchResults = useMemo(() => {
        if (!search.trim()) return null;
        const q = search.toLowerCase();
        return allArticles.filter(
            (a) =>
                a.title.toLowerCase().includes(q) ||
                a.tags.some((t) => t.toLowerCase().includes(q)) ||
                articlesContent[a.id]?.content.toLowerCase().includes(q)
        );
    }, [search]);

    const currentCategory = kbData.find((c) => c.id === selectedCat);
    const currentArticle = articlesContent[selectedArt] || {};

    const displayArticles = searchResults || currentCategory?.articles || [];

    return (
        <Stack spacing={2}>
            <Typography variant="h6">База знаний</Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 2, height: "calc(100vh - 140px)" }}>
                {/* Левая панель: категории + список статей */}
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <Stack spacing={2} sx={{ flex: 1, overflow: "hidden" }}>
                        <TextField
                            size="small"
                            placeholder="Поиск по статьям..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ mr: 1, color: "action.active" }} />,
                            }}
                        />

                        {!search && (
                            <>
                                <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                                    Категории
                                </Typography>
                                <List disablePadding sx={{ overflow: "auto" }}>
                                    {kbData.map((cat) => (
                                        <ListItemButton
                                            key={cat.id}
                                            selected={cat.id === selectedCat}
                                            onClick={() => {
                                                setSelectedCat(cat.id);
                                                setSelectedArt(cat.articles[0]?.id);
                                            }}
                                            sx={{ borderRadius: 1, mb: 0.5 }}
                                        >
                                            <FolderIcon sx={{ mr: 1.5, fontSize: 20, color: "action.active" }} />
                                            <ListItemText
                                                primary={cat.title}
                                                secondary={`${cat.articles.length} статей`}
                                                primaryTypographyProps={{ variant: "body2" }}
                                            />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </>
                        )}

                        <Divider />

                        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                            {search ? `Результаты поиска (${displayArticles.length})` : "Статьи"}
                        </Typography>

                        <List disablePadding sx={{ overflow: "auto", flex: 1 }}>
                            {displayArticles.map((art) => (
                                <ListItemButton
                                    key={art.id}
                                    selected={art.id === selectedArt}
                                    onClick={() => {
                                        setSelectedArt(art.id);
                                        if (search) setSearch(""); // сбросить поиск при выборе
                                    }}
                                    sx={{ borderRadius: 1, mb: 0.5 }}
                                >
                                    <ArticleIcon sx={{ mr: 1.5, fontSize: 20, color: "action.active" }} />
                                    <ListItemText
                                        primary={art.title}
                                        secondary={search ? art.categoryTitle : null}
                                        primaryTypographyProps={{ variant: "body2" }}
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    </Stack>
                </Paper>

                {/* Правая панель: содержимое статьи */}
                <Paper sx={{ p: 3, overflow: "auto" }}>
                    {currentArticle.title ? (
                        <Stack spacing={2}>
                            <Breadcrumbs>
                                <Link underline="hover" color="inherit" sx={{ cursor: "pointer" }}>
                                    База знаний
                                </Link>
                                <Typography color="text.primary">{currentArticle.category}</Typography>
                            </Breadcrumbs>

                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography variant="h5">{currentArticle.title}</Typography>
                                <IconButton
                                    size="small"
                                    title="Скопировать ссылку на статью"
                                    onClick={() => {
                                        const url = `${window.location.origin}/operator/kb?article=${selectedArt}`;
                                        navigator.clipboard?.writeText(url);
                                    }}
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </IconButton>
                            </Stack>

                            <Stack direction="row" spacing={1} alignItems="center">
                                <Chip size="small" label={`Обновлено: ${currentArticle.updated}`} variant="outlined" />
                            </Stack>

                            <Divider />

                            <Box
                                sx={{
                                    "& h1, & h2, & h3": { mt: 2, mb: 1 },
                                    "& p": { mb: 1 },
                                    "& strong": { fontWeight: 600 },
                                    "& ol, & ul": { pl: 3 },
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                <Typography variant="body1" component="div">
                                    {currentArticle.content}
                                </Typography>
                            </Box>
                        </Stack>
                    ) : (
                        <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
                            <ArticleIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
                            <Typography variant="h6">Выберите статью</Typography>
                        </Box>
                    )}
                </Paper>
            </Box>
        </Stack>
    );
}
