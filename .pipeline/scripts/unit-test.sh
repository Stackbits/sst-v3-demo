#!/bin/bash
echo "Running Unit Tests"

echo "Environment: $ENVIRONMENT"

echo pipeline id #{codepipeline.PipelineExecutionId}

ls

npm install

npm run test:coverage

exit 0