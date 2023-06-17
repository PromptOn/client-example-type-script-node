# Prompton node SDK - basic Node Typescript example
default: 
  just --list


install:
    yarn install

watch: 
    yarn tsc --watch --project tsconfig.json

compile:
    yarn tsc

run:
    yarn tsc && yarn node dist/index.js

run2:
    yarn tsc && yarn node dist/index_oapi_gen.js