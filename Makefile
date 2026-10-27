resync:
	rsync -avz --delete -e "ssh -p 7272" ./dist/ risyal@43.173.11.86:/home/risyal/projects/porto/