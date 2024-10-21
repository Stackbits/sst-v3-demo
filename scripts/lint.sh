#!/bin/bash
echo "Checking code quality from new-branch1"
ls

npm install

npm run lint

exit 0