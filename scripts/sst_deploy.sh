#!/bin/bash
echo "deploying applciation"

pwd
echo "SST_STAGE = $SST_STAGE"

npx sst deploy

exit 0