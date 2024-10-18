#!/bin/bash
echo "Setting up variables"

# Example command to install a package (requires sudo)
# sudo apt-get update
# sudo apt-get install -y nodejs npm

pwd
echo "STAGE = $STAGE"
export SST_STAGE=$STAGE

exit 0