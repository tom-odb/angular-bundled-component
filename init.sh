basedir=$(pwd)
fields="$basedir/fields"
demo="$basedir/fields-demo"

cd $fields

for d in */ ; do
    dir="$fields/$d"

    cd $dir && npm install && npm run build && cd dist && npm link
done

cd $demo && npm install
cd $demo && npm start