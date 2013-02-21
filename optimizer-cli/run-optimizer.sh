npm install &&
rm -rf build &&
raptor-optimizer \
    raptor \
    /css/global.css \
    ./pages/index/package.json \
    module-c \
    module-d? \
    --name index \
    --source modules \
    --out build/static \
    --url-prefix static/ \
    --html \
    --minify && 
node write-page.js