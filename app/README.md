# Luvaii E-Commerce Website

Model: E-Commerce

## Website

#### Production

[crm.luvaii.sonesolution.com](https://crm.luvaii.sonesolution.com)

#### Development

[crm.luvaii.sonesolution.com](https://crm.luvaii.sonesolution.com)

## Install

```bash
yarn
```

## Run localhost

you must run https under localhost according to the command below to be able to use login

```bash
yarn dev:http
```

## Build Project

##### Development env

```bash
yarn build:dev
yarn start:dev
```

### Production

```bash
yarn build
yarn start
```

###### Noted: you must use https to log into the system

## Instructions for deployment on the server environment

```bash
ssh ...
cd /opt/docker/apps/imedia/web/app
sudo git pull
cd ../app
sudo make build
```

## Clear Cache

```
yarn cache clean --force
```

## Upgrade Package Version

1. Check the list of packages that need updating

run

```bash
yarn upgrade-interactive
```

or run

```bash
yarn upgrade-interactive --lastest
```

if you want to upgrade the version latest

2. Updates package.json with versions installed from yarn.lock

```bash
syncyarnlock -s -k
```

3. Updates yarn.lock with current version constraint from package.json

```bash
yarn install
```
