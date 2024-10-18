#!/bin/bash
echo "deploying applciation"
ls
npm install
export SST_STAGE=sst-dev
npx sst deploy --verbose
if [ "$CODEBUILD_BUILD_SUCCEEDING" == "0" ]; then
    cat .sst/log/sst.log
fi
exit 0