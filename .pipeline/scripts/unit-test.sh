#!/bin/bash
echo "Running Unit Tests"

echo "Environment: $ENVIRONMENT"

ls

npm install

npm run test:coverage

exit 0