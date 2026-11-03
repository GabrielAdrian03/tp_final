import { AppDataSource } from "../config/data-source";
import { Log, LogSeverity } from "../entities/log.entity";

interface LogOptions {
    method?: string;
    endpoint?: string;
    statusCode?: number;
    duration?: number;
    userId?: number;
}

export const Logger = {
    async save(
        severity: LogSeverity,
        message: string,
        options: LogOptions = {}
    ) {
        // Siempre mostrar el mensaje en consola.
        const timestamp = new Date().toISOString();
        console.log(`[${severity}] [${timestamp}]: ${message}`);

        try {
            if (!AppDataSource.isInitialized) return;

            const repository = AppDataSource.getRepository(Log);

            const log = repository.create({
                severity,
                message,
                method: options.method ?? null,
                endpoint: options.endpoint ?? null,
                statusCode: options.statusCode ?? null,
                duration: options.duration ?? null,
                userId: options.userId ?? null
            });

            await repository.save(log);
        } catch (error) {
            console.error("Error guardando log en BD:", error);
        }
    },

    info(message: string, options?: LogOptions) {
        return this.save(LogSeverity.INFO, message, options);
    },

    warn(message: string, options?: LogOptions) {
        return this.save(LogSeverity.WARN, message, options);
    },

    error(message: string, options?: LogOptions) {
        return this.save(LogSeverity.ERROR, message, options);
    },

    debug(message: string, options?: LogOptions) {
        return this.save(LogSeverity.DEBUG, message, options);
    }
};
