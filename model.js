const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./aozora.db",
    logging: false
});

const AozoraBook = sequelize.define("AozoraBook",
    {
        bookId: {
            type: DataTypes.INTEGER,
            unique: true
        },
        title: {
            type: DataTypes.STRING(510)
        },
        titleKana: {
            type: DataTypes.STRING(510)
        },
        titleKanaForSort: {
            type: DataTypes.STRING(510)
        },
        authorName: {
            type: DataTypes.STRING
        },
        authorNameKana: {
            type: DataTypes.STRING
        },
        authorNameKanaForSort: {
            type: DataTypes.STRING
        },
        authorBirthDate: {
            type: DataTypes.DATE
        },
        authorDeathDate: {
            type: DataTypes.DATE
        },
        releaseDate: {
            type: DataTypes.DATE
        },
        textFileUrl: {
            type: DataTypes.STRING
        }
    }
);

sequelize.sync();

module.exports = {
    AozoraBook: AozoraBook,
}




//User belongsToMany Shelf (Shelves the user created)
//User belongsToMany PickedBook (Books the user picked)
//PickedBook belongsTo QueliedBook (The statement of book which the picked book instanced)
//QueliedBook belongsToMany User (Users who read the book)
//QueliedBook belongsToMany Shelf (Shelves which contain the book)
//Shelf belongsTo User (The user who created the shelf)
//Shelf belongsToMany StoredBook (Books which the shelf contained)
//StoredBook belongsTo QueliedBook (The statement of book which the stored book instanced)
//DisplayShelf belongsToMany StoredBook (Books which the displays contained)