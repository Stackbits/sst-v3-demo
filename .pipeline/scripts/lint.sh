#!/bin/bash
echo "Checking code quality PR..."
ls

npm install

npm run lint

exit 0