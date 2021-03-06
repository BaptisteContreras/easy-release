#!/bin/bash

if [ ! -f .initialized ]; then
    echo "Initializing container"
    echo "Create repository destination $REPO_DIR_NAME ..."
    mkdir $REPO_DIR_NAME
    cd $REPO_DIR_NAME
    git clone https://$GITHUB_TOKEN@github.com/BaptisteContreras/test.git .
    git config --global user.email "easyrelease@example.com"
    git config --global user.name "easyrelease DEV"
    cd /
    touch .initialized
    echo "Initialization done"
fi

echo "Exec CMD $@"
exec "$@"
