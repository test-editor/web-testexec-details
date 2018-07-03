#!/bin/bash
echo "tag with new patch level version, since publishing is wanted"
old_version=`npm view @testeditor/testexec-details version`
echo "old version (before tagging) was v$old_version"
if [ "$GH_EMAIL" == "" -o "$GH_TOKEN" == "" ]; then
  echo "tagging is not done since email and token for push into github is missing!"
else
  # configure for git push to work automatically
  github_project=`git config --get remote.origin.url | sed 's|.*\(/[^/]*/[^/]*\)$|\1|g'`
  git config user.name "srvte"
  git config user.email "$GH_EMAIL"
  git remote remove origin || true
  git remote add origin https://$GH_TOKEN@github.com$github_project
  git remote -v # show the now configured remotes
  git checkout - # if detached, try to return to a regular branch
  git branch --set-upstream-to=origin/master
  git remote -v # show the now configured remotes
  git status # show some info
  git tag # show tag info
  npm version patch # create git commit and tag automatically!
  # postversion action in package.json will execute git push && git push --tags
  new_version=`npm view @testeditor/testexec-details version`
  echo "tagged now with v$new_version"
fi
