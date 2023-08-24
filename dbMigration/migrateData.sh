mongodump --uri="mongodb+srv://dork7:vUe9WHLa0TiQCcjJ@mcluster.7kxtv.mongodb.net/node_app?retryWrites=true&w=majority" --out=/mongodb_data

# mongorestore --nsInclude=node_app.* /mongodb_data

mongorestore --host db --port 27017  /mongodb_data
