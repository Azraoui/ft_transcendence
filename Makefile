# 1337

all:
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