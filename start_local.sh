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

webapp_home_dir=$script_directory_path/weather-webapp
service_home_dir=$script_directory_path/weather-service

node -v
npm -v

# kill previous services if it is running
if [ -f "$stop_script_path" ]
then
    eval $stop_script_path || true
    rm $stop_script_path
fi

cd $service_home_dir 
tsc --skipLibCheck && ENV=$ENV DEPLOYMENT_ENVIRONMENT=$DEPLOYMENT_ENVIRONMENT MONGO_CONNECTION_STRING=$MONGO_CONNECTION_STRING TOKEN=$TOKEN PORT=$PORT node ./dist/server.js > $local_working_path/weather-service-console.log 2>&1 & 
service_pid=$!

echo "weather-service pid=$service_pid"

# cd $webapp_home_dir 
# npm start > $local_working_path/weather-webapp-console.log 2>&1 &
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