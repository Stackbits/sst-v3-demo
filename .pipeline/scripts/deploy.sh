#!/bin/bash
echo "Deploying Application"

echo "Environment: $ENVIRONMENT"

# Get the branch name from the source artifact
# Fetch the execution ID of the pipeline
# Get the branch name from the CodePipeline variable
BRANCH_NAME=$(aws codepipeline get-pipeline-state --name your-pipeline-name --query 'stageStates[].actions[].inputArtifacts[].revision' --output text)

# Print the branch name
echo "$BRANCH_NAME"

echo " BRANCH_NAME >>> $BRANCH_NAME "

# Check if the branch is 'main' (or any branch you want)
if [[ $BRANCH_NAME == 'refs/heads/main' ]]; then
    echo 'On main branch, proceeding...'
    # Place your commands here
else
    echo 'Not on main branch, skipping stage...'
    exit 0 # This will skip the stage
fi

ls

# printenv

# npm install

# export SST_STAGE=$ENVIRONMENT

# echo "SST Stage = $SST_STAGE"

# npx sst deploy --print-logs

exit 0