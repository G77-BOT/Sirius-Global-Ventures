import { test, expect } from '@playwright/test';

test.describe('Careers Page', () => {
  test('should display open positions', async ({ page }) => {
    // Navigate to the careers page
    await page.goto('/careers');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle(/Careers at Sirius Global Ventures/);
    
    // Check that the careers heading is visible
    await expect(page.getByRole('heading', { name: /join our team/i })).toBeVisible();
    
    // Check that job listings are loaded
    const jobListings = page.getByRole('article');
    await expect(jobListings.first()).toBeVisible();
  });

  test('should allow applying for a job', async ({ page }) => {
    // Navigate to the careers page
    await page.goto('/careers');
    
    // Click on the first job listing
    const firstJob = page.getByRole('article').first();
    const jobTitle = await firstJob.locator('h3').textContent();
    await firstJob.getByRole('link', { name: /apply now/i }).click();
    
    // Check that we've navigated to the job application page
    await expect(page).toHaveURL(/.*careers\/.*/);
    
    // Check that the job title is displayed
    await expect(page.getByRole('heading', { level: 1 })).toContainText(jobTitle!);
    
    // Fill out the application form
    await page.getByLabel(/first name/i).fill('Test');
    await page.getByLabel(/last name/i).fill('User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/phone/i).fill('+1234567890');
    
    // Upload a test resume
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByLabel(/resume/i).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('e2e/fixtures/test-resume.pdf');
    
    // Fill in cover letter
    await page.getByLabel(/cover letter/i).fill('I am excited to apply for this position!');
    
    // Submit the form
    await page.getByRole('button', { name: /submit application/i }).click();
    
    // Check for success message
    await expect(page.getByText(/thank you for your application/i)).toBeVisible();
  });
});
