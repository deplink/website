eval "$(ssh-agent -s)"
ssh-add - <<< "${$TRAVIS_KEY}"

scp -r build/* travis@deplink.org:~/
