#!/bin/bash
echo "deploying application PR"
ls
npm install
export SST_STAGE=sst-dev
npx sst deploy --print-logs
cat .sst/log/sst.log

exit 0