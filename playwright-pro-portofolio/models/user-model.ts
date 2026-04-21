import { DbHelper } from '../utils/db-helper';

export class UserModel {
    // Fungsi untuk update status user berdasarkan email
    static async updateStatus(email: string, status: string) {
        const query = `UPDATE users SET status = '${status}' WHERE email = '${email}'`;
        return await DbHelper.query(query);
    }

    // Fungsi untuk ambil data status user
    static async getStatus(email: string) {
        const query = `SELECT status FROM users WHERE email = '${email}'`;
        const rows = await DbHelper.query(query) as any[];
        return rows.length > 0 ? rows[0].status : null;
    }

    // Fungsi tambahan: Hapus user (buat bersih-bersih nanti)
    static async deleteUser(email: string) {
        return await DbHelper.query(`DELETE FROM users WHERE email = '${email}'`);
    }
}