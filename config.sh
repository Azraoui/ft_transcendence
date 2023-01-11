#!/usr/bin/env bash
export IP=$(ifconfig en0 | perl -ne 'print $1 if /inet\s.*?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/')
echo "IP is set to" $IP