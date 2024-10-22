#!/bin/bash
echo "Deploying Application"

echo "Environment: $ENVIRONMENT"

# Get the branch name from the source artifact
# Fetch the execution ID of the pipeline
PIPELINE_EXECUTION=$(aws codepipeline get-pipeline-execution --pipeline-name SSTV3DemoPipeline --pipeline-execution-id $CODEBUILD_RESOLVED_SOURCE_VERSION)

# Extract the branch name from the source revision
BRANCH_NAME=$(echo $PIPELINE_EXECUTION | jq -r '.pipelineExecution.sourceRevisions[0].revision')

echo " BRANCH_NAME >>> $BRANCH_NAME || PIPELINE_EXECUTION >>> $PIPELINE_EXECUTION"

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