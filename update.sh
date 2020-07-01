#!/bin/bash

while getopts n: option
do
case "${option}"
in
n) NAME=${OPTARG};;
esac
done

wget https://github.com/gunnarsundberg/covid-tracker-dashboard/archive/master.zip

unzip master.zip -d $NAME
rm master.zip
cp .env $NAME/covid-tracker-dashboard-master

cd $NAME/covid-tracker-dashboard-master
npm install
npm run build
cd ../..
ln -sfn ~/covid-tracker-dashboard/$NAME/covid-tracker-dashboard-master/ current-build
pm2 reload covid-tracker-dashboard