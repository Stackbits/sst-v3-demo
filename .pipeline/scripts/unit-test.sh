#!/bin/bash
echo "Running Unit Tests for $APPLICATION"

# Install dependencies
npm install

# Run units test with coverage
npm run test:coverage

exit 0