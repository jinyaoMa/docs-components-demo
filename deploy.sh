#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run vuepress:build

# navigate into the build output directory
cd "docs/.vuepress/dist"

# if you are deploying to a custom domain
echo 'i.ma-jinyao.cn' >CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:jinyaoMa/yao-ui.git master:gh-pages

cd -
