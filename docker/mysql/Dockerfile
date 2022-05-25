FROM mysql:8.0
# Add a database
#ENV MYSQL_DATABASE company
# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
#COPY ./sql-scripts/ /docker-entrypoint-initdb.d/

#COPY ./config/ /etc/mysql/conf.d

VOLUME ./.data/mysql /var/lib/mysql

EXPOSE 3306

CMD ["mysqld"]