#!/bin/bash

function startNetwork(){
	echo
	#Start the network	
	cd artifacts
	docker-compose -f docker-compose.yaml -f docker-compose-couch.yaml up -d
	cd -
	echo
}
startNetwork
PORT=4000 node app
