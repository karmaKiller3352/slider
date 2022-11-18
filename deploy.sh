#!/usr/bin/env sh

# abort on errors
set -e
DOCS=docs
# build
yarn run build
test -f docs && rm -R docs
rm -R docs
mv -f dist docs
git add .
git commit -m 'deploy'
git push origin dev --force