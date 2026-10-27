export const Logger = {
    // Para eventos normales del sistema (Levantar servidor, semillas, etc.)
    info: (message: string) => {
        console.log(`🟩 [INFO] [${new Date().toISOString()}]: ${message}`);
    },

    // Para advertencias que no rompen la app (Intentos de login fallidos, tokens expirados)
    warn: (message: string) => {
        console.warn(`⚠️ [WARN] [${new Date().toISOString()}]: ${message}`);
    },

    // Para fallos críticos del sistema (Caídas de base de datos, excepciones atrapadas)
    error: (message: string) => {
        console.error(`❌ [ERROR] [${new Date().toISOString()}]: ${message}`);
    }
};
