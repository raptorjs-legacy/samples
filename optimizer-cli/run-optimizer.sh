#!/bin/sh

npm install &&
rm -rf build &&
raptor-optimizer \
    raptor \
    /css/global.css \
    pages/index \
    module-c \
    module-d? \
    --name index \
    --source modules \
    --out build/static \
    --url-prefix static/ \
    --extensions browser,raptor/logging/console \
    --html \
    --minify && 
node write-page.js