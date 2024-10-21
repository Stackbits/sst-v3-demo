#!/bin/bash
echo "Checking code quality from new-branch"
ls

npm install

npm run lint

exit 0