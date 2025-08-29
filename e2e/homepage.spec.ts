import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle(/Sirius Global Ventures/);
    
    // Check that the main navigation is visible
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
    
    // Check that the hero section is present
    const hero = page.getByRole('heading', { name: /Innovative Solutions for a Digital World/i });
    await expect(hero).toBeVisible();
  });

  test('should navigate to the about page', async ({ page }) => {
    await page.goto('/');
    
    // Click on the about link in the navigation
    await page.getByRole('link', { name: /about/i }).click();
    
    // Check that we've navigated to the about page
    await expect(page).toHaveURL(/.*about/);
    await expect(page.getByRole('heading', { name: /about us/i })).toBeVisible();
  });
});
