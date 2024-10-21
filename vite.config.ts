/// <reference types="vitest/config" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        /* for example, use global to avoid globals imports (describe, test, expect): */
        // globals: true,
        globals: true, // Use global APIs without importing them
        environment: 'node', // Set testing environment to Node.js
        coverage: {
            provider: 'istanbul', // Use Istanbul for coverage
            reporter: ['text', 'lcov'], // Generate text summary and lcov report
            reportsDirectory: './coverage', // Where coverage reports will be stored
            include: ['src/**/*.ts'], // Files to include for coverage
            exclude: ['node_modules', 'src/**/*.spec.ts'], // Exclude node_modules from coverage
            all: true, // Whether to check coverage for all files, not just tested ones
            thresholds: {
                // Use threshold instead of check
                global: {
                    lines: 80, // Minimum coverage percentage for lines
                    functions: 80, // Minimum coverage percentage for functions
                    branches: 80, // Minimum coverage percentage for branches
                    statements: 80, // Minimum coverage percentage for statements
                },
            },
        },
        typecheck: {
            enabled: true,
        },
        benchmark: {},
    },
});
