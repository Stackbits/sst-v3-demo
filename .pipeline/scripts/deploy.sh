#!/bin/bash
echo "Deploying Application"

echo "Environment: $ENVIRONMENT"

# Get the branch name from the source artifact
BRANCH_NAME=$(aws codepipeline get-pipeline-state --name SSTV3DemoPipeline \
| jq -r '.stageStates[] | select(.stageName == "Source") | .actionStates[0].latestExecution.revisionUrl' \
| grep -o 'refs/heads/.*')

echo "Branch Name: $BRANCH_NAME"


# Conditionally execute based on branch
if [ "$BRANCH_NAME" == "refs/heads/main" ]; then
    echo "On main branch, proceeding with commands..."
    # Run your AWS CLI commands or other scripts here
    aws s3 ls
else
    echo "Not on main branch, skipping this action."
    exit 0  # Exit to skip the remaining commands
fi

ls

# printenv

# npm install

# export SST_STAGE=$ENVIRONMENT

# echo "SST Stage = $SST_STAGE"

# npx sst deploy --print-logs

exit 0