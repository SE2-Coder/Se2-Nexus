export const API_URL = "https://api.se2code.engineer";

export async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Credenciales inválidas");
        }

        const data = await response.json();
        return data; // Should contain JWT token
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
}

export async function healthCheck() {
    try {
        const res = await fetch(`${API_URL}/health`);
        return await res.json();
    } catch (e) {
        return { status: "offline" };
    }
}
