import { DbHelper } from '../utils/db-helper';

export class UserModel {
    static async updateStatus(email: string, status: string) {
        return await DbHelper.query(
            `UPDATE users SET status = ? WHERE email = ?`, 
            [status, email]
        );
    }

    static async getStatus(email: string) {
        const rows = await DbHelper.query(
            `SELECT status FROM users WHERE email = ?`, 
            [email]
        ) as any[];
        return rows.length > 0 ? rows[0].status : null;
    }

   static async getUserData(email: string) {
        const query = `SELECT username, password FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1`;
        
        // Kita panggil query-nya secara langsung
        const result: any = await DbHelper.query(query, [email]);
        
        // Tambahkan log ini untuk "INTEROGASI" isi database sebenarnya
        console.log("ISI RESULT DARI DB:", JSON.stringify(result));

        // Jika result-nya ada dan tipenya array
        if (Array.isArray(result) && result.length > 0) {
            return result[0];
        } 
        // Antisipasi jika result-nya terbungkus [rows, fields]
        else if (result.rows && result.rows.length > 0) {
            return result.rows[0];
        }

        throw new Error(`User dengan email ${email} tidak ditemukan didatabase , Prof!`);
    }
    static async getAllActiveUsers() {
    // Kita ambil semua saja tanpa filter 'Active' biar kelihatan semua
    const query = `SELECT email, username, password FROM users`; 
    const result: any = await DbHelper.query(query);
    return Array.isArray(result) ? result : (result.rows || []);
}
}