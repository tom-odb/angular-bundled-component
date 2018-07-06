basedir=$(pwd)
capitalize="$basedir/capitalize"
slug="$basedir/slug"
demo="$basedir/fields-demo"

cd $capitalize && npm install && npm run build && cd dist && npm link
cd $slug && npm install && npm run build && cd dist && npm link
cd $demo && npm install
cd $demo && npm start