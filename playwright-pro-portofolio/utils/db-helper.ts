import * as mysql from 'mysql2/promise'; // Gunakan import * as agar lebih kompatibel
import * as dotenv from 'dotenv'; // Kita panggil dotenv secara manual di sini

// Inisialisasi dotenv agar process.env dikenali di file ini
dotenv.config();

export class DbHelper {
    static async query(sql: string) {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await connection.execute(sql);
        await connection.end();
        return rows as any; // Pindahkan 'as any' ke balikan datanya
    }
}