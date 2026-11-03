"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const data_source_1 = require("../config/data-source");
const log_entity_1 = require("../entities/log.entity");
exports.Logger = {
    async save(severity, message, options = {}) {
        // Siempre mostrar el mensaje en consola.
        const timestamp = new Date().toISOString();
        console.log(`[${severity}] [${timestamp}]: ${message}`);
        try {
            if (!data_source_1.AppDataSource.isInitialized)
                return;
            const repository = data_source_1.AppDataSource.getRepository(log_entity_1.Log);
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
        }
        catch (error) {
            console.error("Error guardando log en BD:", error);
        }
    },
    info(message, options) {
        return this.save(log_entity_1.LogSeverity.INFO, message, options);
    },
    warn(message, options) {
        return this.save(log_entity_1.LogSeverity.WARN, message, options);
    },
    error(message, options) {
        return this.save(log_entity_1.LogSeverity.ERROR, message, options);
    },
    debug(message, options) {
        return this.save(log_entity_1.LogSeverity.DEBUG, message, options);
    }
};
