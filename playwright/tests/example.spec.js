const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'log in' })).toBeVisible()
    await expect(page.locator('input[name="username"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[name="username"]').fill("mluukkai")
      await page.locator('input[name="password"]').fill("salainen")
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByText('logged in as mluukkai').waitFor()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('input[name="username"]').fill("mluukkai")
      await page.locator('input[name="password"]').fill("väärä salasana")
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByText('Wrong username or password').waitFor()
    })
  })

})
