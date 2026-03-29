import { useState, useRef, useEffect } from "react";
import {
    Paper,
    Typography,
    Stack,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Chip,
    Box,
    Slider,
    IconButton,
    Divider,
} from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

// --- Мок‑данные записей звонков ---
const callRecordings = [
    {
        id: "rec-001",
        date: "2025-12-22 16:10",
        duration: "5:23",
        customer: "Иванов Иван",
        operator: "Петрова М.",
        phone: "+375291112233",
        satisfaction: 5,
        tags: ["VIP", "платёж"],
        fileUrl: "/api/recordings/rec-001.mp3",
    },
    {
        id: "rec-002",
        date: "2025-12-22 15:45",
        duration: "3:50",
        customer: "Петров Пётр",
        operator: "Иванов С.",
        phone: "+375291112244",
        satisfaction: 4,
        tags: ["тарифы"],
        fileUrl: "/api/recordings/rec-002.mp3",
    },
    {
        id: "rec-003",
        date: "2025-12-22 14:20",
        duration: "8:12",
        customer: "Сидорова Анна",
        operator: "Сидоров А.",
        phone: "+375291556677",
        satisfaction: 3,
        tags: ["техническая"],
        fileUrl: "/api/recordings/rec-003.mp3",
    },
    {
        id: "rec-004",
        date: "2025-12-22 13:15",
        duration: "12:30",
        customer: "Смирнов Алексей",
        operator: "Петрова М.",
        phone: "+375291778899",
        satisfaction: 5,
        tags: ["VIP", "корпоративный"],
        fileUrl: "/api/recordings/rec-004.mp3",
    },
];

// --- Вспомогательные компоненты ---

function RatingChip({ score }) {
    return (
        <Chip
            label={`${score}/5`}
            size="small"
            color={score >= 4 ? "success" : score >= 3 ? "warning" : "error"}
            icon={score >= 4 ? <FileDownloadDoneIcon /> : <ScheduleIcon />}
        />
    );
}

function AudioPlayer({ src }) {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.6);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration || 0);
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleTimeUpdate);
        audio.volume = volume;

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleTimeUpdate);
        };
    }, [volume]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (playing) {
            audio.pause();
        } else {
            audio.play();
        }
        setPlaying(!playing);
    };

    const handleSeek = (_, value) => {
        const audio = audioRef.current;
        if (!audio || !duration) return;
        audio.currentTime = (value / 100) * duration;
    };

    const formatTime = (sec) => {
        if (!isFinite(sec)) return "0:00";
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60)
            .toString()
            .padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <Stack spacing={2}>
            <audio ref={audioRef} src={src} preload="metadata" />

            <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton onClick={togglePlay} size="large">
                    {playing ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
                </IconButton>

                <Box sx={{ flex: 1 }}>
                    <Slider
                        value={duration ? (currentTime / duration) * 100 : 0}
                        onChange={handleSeek}
                        sx={{ height: 6 }}
                    />
                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5 }}>
                        <Typography variant="caption">{formatTime(currentTime)}</Typography>
                        <Typography variant="caption">{formatTime(duration)}</Typography>
                    </Stack>
                </Box>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <VolumeUpIcon fontSize="small" />
                    <Slider
                        value={volume * 100}
                        onChange={(_, v) => setVolume(v / 100)}
                        min={0}
                        max={100}
                        sx={{ width: 90, height: 4 }}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
}

// --- Основная страница ---

export function QualityPage() {
    const [selectedRecording, setSelectedRecording] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterOperator, setFilterOperator] = useState("");
    const [filterRating, setFilterRating] = useState("");

    const operators = [...new Set(callRecordings.map((r) => r.operator))];
    const ratingThresholds = [3, 4, 5];

    const filtered = callRecordings.filter((rec) => {
        const byOperator = !filterOperator || rec.operator === filterOperator;
        const byRating = !filterRating || rec.satisfaction >= Number(filterRating);
        return byOperator && byRating;
    });

    const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    return (
        <Stack spacing={3}>
            <Typography variant="h5">Контроль качества</Typography>
            <Typography variant="body2" color="text.secondary">
                Прослушивание записей звонков для оценки работы операторов и обучения персонала.
            </Typography>

            {/* Фильтры */}
            <Paper sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <InputLabel>Оператор</InputLabel>
                        <Select
                            label="Оператор"
                            value={filterOperator}
                            onChange={(e) => {
                                setFilterOperator(e.target.value);
                                setPage(0);
                            }}
                        >
                            <MenuItem value="">Все операторы</MenuItem>
                            {operators.map((op) => (
                                <MenuItem key={op} value={op}>
                                    {op}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 160 }}>
                        <InputLabel>Оценка от</InputLabel>
                        <Select
                            label="Оценка от"
                            value={filterRating}
                            onChange={(e) => {
                                setFilterRating(e.target.value);
                                setPage(0);
                            }}
                        >
                            <MenuItem value="">Все оценки</MenuItem>
                            {ratingThresholds.map((rt) => (
                                <MenuItem key={rt} value={rt}>
                                    {rt}+
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={{ ml: "auto" }}>
                        <Typography variant="body2" color="text.secondary">
                            Найдено записей: {filtered.length}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>

            {/* Таблица записей */}
            <Paper sx={{ p: 2 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Дата / ID</TableCell>
                                <TableCell>Клиент</TableCell>
                                <TableCell>Оператор</TableCell>
                                <TableCell>Телефон</TableCell>
                                <TableCell>Длительность</TableCell>
                                <TableCell>Оценка клиента</TableCell>
                                <TableCell>Теги</TableCell>
                                <TableCell align="right">Прослушать</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginated.map((rec) => (
                                <TableRow key={rec.id} hover>
                                    <TableCell>
                                        <Stack spacing={0}>
                                            <Typography variant="body2">{rec.date}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {rec.id}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{rec.customer}</TableCell>
                                    <TableCell>{rec.operator}</TableCell>
                                    <TableCell>{rec.phone}</TableCell>
                                    <TableCell>{rec.duration}</TableCell>
                                    <TableCell>
                                        <RatingChip score={rec.satisfaction} />
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={0.5}>
                                            {rec.tags.map((tag) => (
                                                <Chip key={tag} label={tag} size="small" />
                                            ))}
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => setSelectedRecording(rec)}>
                                            <AudiotrackIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {paginated.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8}>
                                        <Typography variant="body2" color="text.secondary">
                                            Нет записей по заданным фильтрам.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    count={filtered.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Paper>

            {/* Диалог с плеером */}
            <Dialog
                open={!!selectedRecording}
                onClose={() => setSelectedRecording(null)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <PhoneIcon sx={{ fontSize: 32, color: "primary.main" }} />
                            <Stack spacing={0.5}>
                                <Typography variant="h6">
                                    {selectedRecording?.customer} ↔ {selectedRecording?.operator}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {selectedRecording?.date} • {selectedRecording?.duration}
                                </Typography>
                            </Stack>
                        </Stack>
                        <IconButton onClick={() => setSelectedRecording(null)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>

                <DialogContent dividers sx={{ p: 3 }}>
                    {selectedRecording && (
                        <Stack spacing={2}>
                            <Divider />
                            <AudioPlayer src={selectedRecording.fileUrl} />
                        </Stack>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setSelectedRecording(null)}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}
