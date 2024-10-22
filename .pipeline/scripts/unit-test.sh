#!/bin/bash
echo "Running Unit Tests"

echo "Environment: $ENVIRONMENT"

ls

npm install

npm run test:coverage

BRANCH_NAME=$(aws codepipeline get-pipeline-state --name SSTV3DemoPipeline --query 'stageStates[].actions[].inputArtifacts[].revision' --output text)

# Print the branch name
echo "$BRANCH_NAME"

echo " BRANCH_NAME >>> $BRANCH_NAME "

exit 0