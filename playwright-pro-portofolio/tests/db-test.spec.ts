import { test, expect } from '@playwright/test';
import { DbHelper } from '../utils/db-helper'; // Sesuaikan path-nya

test.describe('Database Validation Prof Aa Tekno', () => {
    
    test('Verify connection and fetch data', async () => {
        // Kita pakai query sederhana dulu buat ngetes "Jembatan"-nya
        // Kalau Prof pake database MySQL asli, ganti 'users' dengan nama tabel Prof
        const query = "SELECT 1 + 1 AS result"; 
        
        const rows = await DbHelper.query(query) as any[];
        
        console.log('Hasil dari Database:', rows);
        
        // Validasi: 1 + 1 harusnya 2
        expect(rows[0].result).toBe(2);
        console.log('Koneksi Database Berhasil, Prof! Siap Bantai!');
    });

    test('Real Case: Check User in DB', async () => {
        // Contoh skenario: Cek apakah user tertentu ada di DB
        const emailToSearch = 'test@example.com';
        const rows = await DbHelper.query(`SELECT * FROM users WHERE email = '${emailToSearch}'`) as any[];

        if (rows.length > 0) {
            console.log(`User ${emailToSearch} ditemukan!`);
            expect(rows[0].email).toBe(emailToSearch);
        } else {
            console.log('User tidak ditemukan, tapi koneksi aman.');
        }
    });
});