#!/bin/bash
echo "tag with new patch level version, since publishing is wanted"
old_version=`npm view @testeditor/testexec-details version`
echo "old version (before tagging) was v$old_version"
if [ "$GH_EMAIL" == "" -o "$GH_TOKEN" == "" ]; then
  echo "tagging is not done since email and token for push into github is missing!"
else
  npm version patch
  new_version=`npm view @testeditor/testexec-details version`
  echo "tagging now with v$new_version"
  git config user.name "automatic patch version publish"
  git config user.email "$GH_EMAIL"
  git remote add gh-token "$GH_TOKEN"
  git tag v$new_version
  git push origin v$new_version
fi
