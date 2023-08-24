FROM mongo

WORKDIR /db

COPY migrateData.sh /db

RUN chmod +x migrateData.sh

EXPOSE 27017

# ENTRYPOINT ["sh" , "/db/migrateData.sh"]
CMD './migrateData.sh'

