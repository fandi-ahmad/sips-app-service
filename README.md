
# Sistem Informasi Pencatat Surat (SIPS) - Service
This application was created for the administrative purposes of making letters as well as filing for the Balaroa Village Office, Palu City. here is a part from the backend side for the frontend display in the repository [sips-app-admin](https://github.com/fandi-ahmad/sips-app-admin).

### Installation
First you must install node js. Duplicate and rename the `.env` and `config.json` files, then remove the `.example` in the file names.

``` 
Project
│
└─── config
│ │ 
│ └─── config.json
│
└─── .env
```

Create a database and adjust it to the configuration in the `config.json` file, here is an example.

``` json
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```

Change `.env` file, for example in below.

| key           | value                         |
| :--------     | :---------------------------- |
| `APP_PORT`    | 8000                          |
| `APP_API_URL` | http://localhost:8000/api/v1/ |

Now that run the command below.

``` bash
  npm install
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
```

Run this project.
```
  npm start
```






