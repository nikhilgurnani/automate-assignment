#!/bin/bash

echo "Currently at $PWD"
mkdir -p keys

cd keys

echo "Setting up keys in directory at $PWD"



ssh-keygen -t rsa -b 4096 -m PEM -f private.pem
# Don't add passphrase
openssl rsa -in private.pem -pubout -outform PEM -out public.pem

cd ..