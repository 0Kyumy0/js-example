#!/bin/bash

BLUE_APP="$CF_APP-blue"
GREEN_APP="$CF_APP"

cf push "${BLUE_APP}" -n "${CF_APP}" --no-start

cf start ${BLUE_APP}

cf app "${GREEN_APP}" && cf stop "${GREEN_APP}"
cf app "${GREEN_APP}" && cf delete "${GREEN_APP}" -f

cf rename "${BLUE_APP}" "${GREEN_APP}"

export APP_NAME="$GREEN_APP"
export APP_URL=http://$(cf app $APP_NAME | grep -e urls: -e routes: | awk '{print $2}')
