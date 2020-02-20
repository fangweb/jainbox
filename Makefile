CLIENT_DIR ?= client/

build:
	@cd $(CLIENT_DIR); npm run build;
	@cp -a $(CLIENT_DIR)/build nginx/ 
	@docker-compose -f docker-compose.yml build 	

run:
	@docker-compose -f docker-compose.yml up
