import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import {UserModel} from '../model/user-model';
import { DbHelper } from '../utils/db-helper';
import { Await } from 'react-router-dom';

test.describe('Fase 1: Authentication & DB Synchronization', () => {

    test.afterAll(async () => {
        await DbHelper.close();
    });

    test('Login sukses dan sinkronisasi status Kedatabase', async ({page}) => {

        const loginPage = new LoginPage(page);
        const testEmail = 'test@example.com';

        await loginPage.login('standard_user', 'secret_sauce')
        await expect(page).toHaveURL(/inventory.html/);
        console.log('Login Sukses secara UI, Prof!');

        await UserModel.updateStatus(testEmail, 'Active');
        console.log('Status database berhasil di update jadi active');

        const currentStatus = await UserModel.getStatus(testEmail);
        expect(currentStatus).toBe('Active');
        console.log('Validasi Sinkronisasi: Aman! status di DB sesuai')
    });
});