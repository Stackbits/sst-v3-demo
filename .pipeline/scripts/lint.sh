#!/bin/bash
echo "Checking code quality PR..."

echo "Environment: $ENVIRONMENT"

ls

npm install

npm run lint

exit 0