"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogs = void 0;
const data_source_1 = require("../config/data-source");
const log_entity_1 = require("../entities/log.entity");
const getLogs = async (req, res) => {
    try {
        //hacer la consulta a la base de datos para obtener los logs según los parámetros de búsqueda y paginación
        const repository = data_source_1.AppDataSource.getRepository(log_entity_1.Log);
        // Obtener los parámetros de consulta para paginación y filtrado
        const page = Math.max(1, Number(req.query.page) || 1);
        // Limitar el número de registros por página entre 1 y 100, con un valor predeterminado de 50
        const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 50));
        // Obtener los parámetros de consulta para filtrado
        const severity = req.query.severity;
        const search = req.query.search;
        const query = repository.createQueryBuilder("log");
        if (severity &&
            Object.values(log_entity_1.LogSeverity).includes(severity)) {
            query.andWhere("log.severity = :severity", { severity });
        }
        if (search?.trim()) {
            query.andWhere("log.message LIKE :search", {
                search: `%${search.trim()}%`
            });
        }
        const [logs, total] = await query
            .orderBy("log.timestamp", "DESC")
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return res.json({
            data: logs,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    }
    catch (error) {
        console.error("Error al consultar logs:", error);
        return res.status(500).json({
            message: "No se pudieron obtener los registros."
        });
    }
};
exports.getLogs = getLogs;
