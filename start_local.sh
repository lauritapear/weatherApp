#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

if [ $(uname) = "Darwin" ];
then
  if ! [[ -x $(command -v ggrep) ]] || ! [[ -x $(command -v greadlink) ]];
  then
    echo "Install coreutils and GNU grep with \`brew install coreutils grep\`"
    exit 1
  fi
  shopt -s expand_aliases # https://unix.stackexchange.com/a/158040
  alias readlink='greadlink'
  alias grep='ggrep'
fi

set -x

# get end variables
ENV=$1
DEPLOYMENT_ENVIRONMENT=$2
MONGO_CONNECTION_STRING=$3
TOKEN=$4
PORT=$5

# all paths used
script_file_path=$(readlink -f ${BASH_SOURCE[0]})
script_directory_path=$(dirname ${script_file_path})
stop_script_path="$script_directory_path/tmp/stop_local.sh"
local_working_path="$script_directory_path/tmp/local_work"
# mongod_db_path="$local_working_path/mongo_data"

# project specific attribute value/parse
# project_artifact_id=prp
# project_version=1.0.1

# cmd_npm_scripts_dir_path=$script_directory_path/scripts
webapp_home_dir=$script_directory_path/weather-webapp
service_home_dir=$script_directory_path/weather-service

# build node scripts
# cd scripts 
# npm install
# cd -

# pushd $script_directory_path

# what node and npm versions we have
node -v
npm -v

# kill previous services if it is running
if [ -f "$stop_script_path" ]
then
    eval $stop_script_path || true
    rm $stop_script_path
fi

# cleanup of previous run - files and logs
# rm -rf "$local_working_path"
# mkdir -p "$local_working_path"

# cleanup mongo data files and create new data path 
# rm -rf $mongod_db_path
# mkdir -p $mongod_db_path

## read -n 1 -s -r -p "Cleanup finished, Press any key to continue to start services..."

# start mongo and capture its PARENT PID
## export MONGO_URL="mongodb://127.0.0.1:27027/" 
# mongod --port 27017 --dbpath=$mongod_db_path > $local_working_path/mongod.log 2>&1 &
# mongod_pid=$!
# echo "mongod pid=$mongod_pid"
# if [[ "${OS:-Linux}" =~ ^Win ]]
# then
# 	pgid=$(ps -p $mongod_pid | grep -v 'PGID' | awk '{print $3}')
# else
# 	pgid=$(ps -p $mongod_pid -o pgid | grep -v PGID | awk '{print $1}')
# fi

# give mongo a little time to start
# sleep 2 

# restore seed data into mongo collections
# if [ -d $billing_restore_data/dump ] 
# then
#     echo "Directory cointaining dump data already exist" 
# else
#    unzip $billing_restore_data/dump.zip -d $billing_restore_data
# fi

# node scripts/cmd.js --cmd=checkMongoConnection 
#mongorestore --port 27017 $billing_restore_data/dump
# mongoimport --db verdeeco_acme_db  --collection customer_field_mapping  --file $service_home_dir/src/test/data/verdeeco_acme_db.customer_field_mapping.json
# mongoimport --db verdeeco_acme_db  --collection daily_records  --file $service_home_dir/src/test/data/verdeeco_acme_db.daily_records.json
# mongoimport --db verdeeco_acme_db  --collection device  --file $service_home_dir/src/test/data/verdeeco_acme_db.device.json
# mongoimport --db verdeeco_acme_db  --collection endpoint_history  --file $service_home_dir/src/test/data/verdeeco_acme_db.endpoint_history.json
# mongoimport --db verdeeco_central_db  --collection unit_of_measure  --file $service_home_dir/src/test/data/verdeeco_central_db.unit_of_measure.json
# mongoimport --db verdeeco_central_db  --collection utility --file $service_home_dir/src/test/data/verdeeco_central_db.utility.json
# mongoimport --db verdeeco_central_db  --collection config --file $service_home_dir/src/test/data/billing_config.json

cd $service_home_dir 
tsc --skipLibCheck && ENV=$ENV DEPLOYMENT_ENVIRONMENT=$DEPLOYMENT_ENVIRONMENT MONGO_CONNECTION_STRING=$MONGO_CONNECTION_STRING TOKEN=$TOKEN PORT=$PORT node ./dist/server.js > $local_working_path/weather-service-console.log 2>&1 & service_pid=$!

echo "prp-service pid=$service_pid"

# cd $webapp_home_dir 
# npm start > $local_working_path/billing-webapp-console.log 2>&1 &
# ui_pid=$!
# echo "ui_pid pid=$ui_pid"

# generate stop script for next start to use it
echo "#!/bin/bash" > $stop_script_path
echo "set -euo pipefail" >> $stop_script_path
echo "IFS=$'\n\t'" >> $stop_script_path
echo "set -x" >> $stop_script_path
echo "kill -9 -- -$pgid || true" >> $stop_script_path
echo "sleep 2" >> $stop_script_path
echo "rm -rf $mongod_db_path" >> $stop_script_path
echo "" >> $stop_script_path

chmod u+x $stop_script_path

popd