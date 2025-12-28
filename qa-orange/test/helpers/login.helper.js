export async function loginAsAdmin(page) {
  await page.goto('https://opensource-demo.orangehrmlive.com');

  await page.getByName('username').fill('Admin');
  await page.getByName('password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
}
