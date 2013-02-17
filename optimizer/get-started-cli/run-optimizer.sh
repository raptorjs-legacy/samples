rm -rf static
raptor-optimizer \
    raptor \
    /css/global.css \
    ./pages/test-page/package.json \
    module-c \
    --name test-page \
    --source modules \
    --out static \
    --url-prefix static/
node update-html.js