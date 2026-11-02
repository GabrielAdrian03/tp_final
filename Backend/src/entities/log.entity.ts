
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index
} from "typeorm";

export enum LogSeverity {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG"
}

@Entity("logs")
@Index(["timestamp"])
@Index(["severity"])
export class Log {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "enum",
        enum: LogSeverity
    })
    severity!: LogSeverity;

    @Column({ type: "varchar", length: 1000 })
    message!: string;

    @Column({ type: "varchar", length: 10, nullable: true })
    method!: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    endpoint!: string | null;

    @Column({ type: "int", nullable: true })
    statusCode!: number | null;

    @Column({ type: "int", nullable: true })
    duration!: number | null;

    @Column({ type: "int", nullable: true })
    userId!: number | null;

    @CreateDateColumn()
    timestamp!: Date;
}
