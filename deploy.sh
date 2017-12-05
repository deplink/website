#!/bin/bash

# Print outputs and exit on first failure.
set -xe

# Register Travis CI key
eval "$(ssh-agent -s)"
ssh-add - <<< "${$TRAVIS_KEY}"

# Upload "build" directory to server
scp -r build/* travis@deplink.org:~/
