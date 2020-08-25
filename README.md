# backPixowl

## Stack
* ExpressJS
* MySQL
* Sequelize
* others useful npm modules

## How to use it?
1. Install dependencies with `npm install`
2. Set environment variables for database and JWT encryption with the following names:
    ```bash
    export DATABASE_HOST=remotemysql.com
    export DATABASE_PORT=3306
    export DATABASE_USER=root
    export DATABASE_PASSWORD=
    export DATABASE_INSTANCE=backPixowl
    export JWTKEY=*Str0ng-P4ssw0rd!
    #Note: Use SET on Windows or Export on Unix Like systems
    ```
        
3. Run `npm start`

4. Import the attached Postman Collection (`postman_collection.json`) and follow their guideline
