#!/bin/bash
echo "Deploying Application"

echo "Environment: $ENVIRONMENT"

ls

npm install

export SST_STAGE=$ENVIRONMENT

echo "SST Stage = $SST_STAGE"

npx sst deploy --print-logs

ls -lrt

cd .sst/artifacts

ls -lrt

exit 0
