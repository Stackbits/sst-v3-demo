#!/bin/bash
echo "Deploying $APPLICATION in environment $ENVIRONMENT"

# Install dependencies
npm install

# Set stage name
export SST_STAGE=$ENVIRONMENT

# Deploy Application
echo "Starting $ENVIRONMENT deployment"
npx sst deploy --print-logs
echo "Completed $ENVIRONMENT deployment"

exit 0