#!/bin/bash
echo "Deploying Application"

echo "Environment: $ENVIRONMENT, CODEBUILD_WEBHOOK_HEAD_REF: ${CODEBUILD_WEBHOOK_HEAD_REF}"

ls

printenv

npm install

export SST_STAGE=$ENVIRONMENT

echo "SST Stage = $SST_STAGE"

# npx sst deploy --print-logs

exit 0