resync:
	rsync -avz --delete -e "ssh -p 7272" ./dist/ risyal@43.157.224.223:/home/risyal/porto/