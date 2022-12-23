
all:
	docker-compose -f srcs/docker-compose.yml up

down:
	docker-compose -f srcs/docker-compose.yml down

clean:
	docker system prune -a

fclean:

re:

.PHONY: all clean fclean re