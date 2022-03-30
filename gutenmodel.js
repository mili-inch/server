const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./gutenberg.db",
    logging: false
});

const GutenBook = sequelize.define("GutenBook",
    {
        copyright: {
            type: DataTypes.BOOLEAN
        },
        downloadCount: {
            type: DataTypes.INTEGER
        },
        bookId: {
            type: DataTypes.INTEGER,
            unique: true
        },
        mediaType: {
            type: DataTypes.STRING(16)
        },
        title: {
            type: DataTypes.STRING(1024)
        },
        topAuthor: {
            type: DataTypes.STRING(128)
        }
    }
);

const Bookshelf = sequelize.define("Bookshelf",
    {
        name: {
            type: DataTypes.STRING(64)
        }
    }
);

const Format = sequelize.define("Format",
    {
        mimeType: {
            type: DataTypes.STRING(32)
        },
        url: {
            type: DataTypes.STRING(256)
        }
    }
);

const Language = sequelize.define("Language",
    {
        code: {
            type: DataTypes.STRING(4),
            unique: true
        }
    }
);

const Person = sequelize.define("Person",
    {
        birthYear: {
            type: DataTypes.INTEGER
        },
        deathYear: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(128),
        }
    }
);

const Subject = sequelize.define("Subject",
    {
        name: {
            type: DataTypes.STRING(256)
        }
    }
);

GutenBook.belongsToMany(Person, { as: "Authors", through: "BookAuthors" });
GutenBook.belongsToMany(Bookshelf, { through: "BookBookshelves" });
GutenBook.belongsToMany(Language, { through: "BookLanguages" });
GutenBook.belongsToMany(Format, { through: "BookFormats" });
GutenBook.belongsToMany(Subject, { through: "BookSubjects" });
GutenBook.belongsToMany(Person, { as: "Translators", through: "BookTranslators" });

module.exports = {
    GutenBook: GutenBook,
    Person: Person,
    Bookshelf: Bookshelf,
    Language: Language,
    Format: Format,
    Subject: Subject,
    sequelize: sequelize
}