# 1337

all:
	source "./config.sh"
	sed '/HOST_MACHINE_URL/d' ./srcs/backend/backend-api/.env > ./srcs/backend/backend-api/.env.example
	echo "HOST_MACHINE_URL= \"http://${IP}\"" >> ./srcs/backend/backend-api/.env.example
	mv -f ./srcs/backend/backend-api/.env.example ./srcs/backend/backend-api/.env
	docker-compose -f srcs/docker-compose.yml up --build -d

migrate: 
	cd srcs/backend/backend-api/ ; npx prisma migrate dev 

backend: 
	cd srcs/backend/backend-api/ ; npm run dev

frontend: 
	cd srcs/frontend ; npm run dev

down:
	docker-compose -f srcs/docker-compose.yml down  --remove-orphans

studio:
	cd srcs/backend/backend-api/ ;  npx prisma studio

pull :
	git add .
	git commit -m "${USER}: pulling"
	git pull

clean:
	docker system prune -a

fclean:

re:

.PHONY: all clean fclean re