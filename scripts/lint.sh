#!/bin/bash
echo "Checking code quality..."
ls

npm install

npm run lint

exit 0