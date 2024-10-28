import { defineConfig } from 'cypress';
import { GenerateCtrfReport } from 'cypress-ctrf-json-reporter';

export default defineConfig({
    e2e: {
        // Configure your E2E tests here
        specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,ts}',
        // Config CTRF report for GitHub Actions
        setupNodeEvents(on, config) {
            // Implement node event listeners here
            new GenerateCtrfReport({
                on,
                outputDir: 'reports',
                outputFile: 'ctrf-report.json',
            });
        },
    },
});
