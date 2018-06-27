#!/bin/bash
echo "tag with new patch level version, since publishing is wanted"
old_version=`npm view @testeditor/testexec-details version`
echo "old version (before tagging) was v$old_version"
if [ "$GH_EMAIL" == "" -o "$GH_TOKEN" == "" ]; then
  echo "tagging is not done since email and token for push into github is missing!"
else
  # configure for git push to work automatically
  git config user.name "automatic patch version publish"
  git config user.email "$GH_EMAIL"
  git remote add gh-token "$GH_TOKEN"
  git checkout - # if detached, try to return to a regular branch
  npm version patch # create git commit and tag automatically!
  # postversion action in package.json will execute git push && git push --tags
  new_version=`npm view @testeditor/testexec-details version`
  echo "tagged now with v$new_version"
fi
