import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export class DbHelper {
    private static connection: mysql.Connection;

    static async query(sql: string, params?: any[]) {
        if (!this.connection) {
            this.connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
        }
        const [results] = await this.connection.execute(sql, params);
        return results;
    }

    static async close() {
        if (this.connection) {
            await this.connection.end();
        }
    }
}