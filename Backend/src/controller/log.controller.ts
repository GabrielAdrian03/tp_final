
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Log, LogSeverity } from "../entities/log.entity";

export const getLogs = async (req: Request, res: Response) => {
    try {
        const repository = AppDataSource.getRepository(Log);

        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(
            100,
            Math.max(1, Number(req.query.limit) || 50)
        );

        const severity = req.query.severity as string | undefined;
        const search = req.query.search as string | undefined;

        const query = repository.createQueryBuilder("log");

        if (
            severity &&
            Object.values(LogSeverity).includes(severity as LogSeverity)
        ) {
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
    } catch (error) {
        console.error("Error al consultar logs:", error);

        return res.status(500).json({
            message: "No se pudieron obtener los registros."
        });
    }
};
