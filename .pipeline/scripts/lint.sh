#!/bin/bash
echo "Checking code quality for $APPLICATION"

# Install dependencies
npm install

# Run Lint
npm run lint

exit 0