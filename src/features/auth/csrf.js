import { http } from "../../shared/api/http";

export async function ensureCsrfCookie() {
    // Важно: с withCredentials, чтобы cookie установилась/читалась
    await http.get("/api/csrf/");
}
