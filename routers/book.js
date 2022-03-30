const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const { isValidSource, isValidBookId, isValidOrder } = require("../utils/validation");
const { processAozoraQuery, processGutenbergQuery, processQueryToTSV } = require("../utils/queryProcessing");
const { searchAozoraBooks, searchAozoraBookFromId } = require("../utils/searchAozora");

const { GutenBook, Person, Format, sequelize } = require("../gutenmodel");

//get infos from indivisual dbs and append info from queliedbook
//required: source search
//optional: author_year_start, author_year_end, languages, sort, page
//return source,bookId,title,authorName,authorBirthYear,authorDeathYear (TSV)
router.get("/list", (req, res, next) => {
    const limit = 32;
    const { source, search, author_year_start, author_year_end, languages, sort, page } = req.query;
    if (!isValidSource(source) || search === undefined) {
        res.status(400);
        res.send("Bad Request");
        return next();
    }

    if (source == "aozora") {
        const query = { search: search, limit: limit }
        //required queries
        if (sort) {
            query.sort = sort;
        } else {
            query.sort = "lastname";
        }
        if (page && !Number.isNaN(page) && page >= 0) {
            query.page = Number(page);
        } else {
            query.page = 0;
        }
        //optional queries
        if (author_year_start && !Number.isNaN(author_year_start)) {
            query.author_year_start = Number(author_year_start);
        }
        if (author_year_end && !Number.isNaN(author_year_end)) {
            query.author_year_end = Number(author_year_end);
        }

        (async () => {
            let result = await searchAozoraBooks(query);
            result = result.map(processAozoraQuery);
            result = result.map(processQueryToTSV);
            res.send(result.join("\n"));
            return next();
        })().then(() => { return; }).catch((e) => {
            console.error(e);
        });
    }

    //制約: Format mimetype=text/plain  
    //search対象: title Author name
    //出力: title bookId authorname authorBirthYear authorDeathYear
    if (source == "gutenberg") {
        let pageNumber = 0;
        if (page && !Number.isNaN(page) && page >= 1) {
            pageNumber = Number(page);
        }
        (async () => {
            const result = await GutenBook.findAll({
                where: {
                    [Op.or]: [
                        { "title": { [Op.substring]: search } },
                        { "topAuthor": { [Op.substring]: search } }
                    ]
                },
                order: [["downloadCount", "DESC"]],
                offset: pageNumber * limit,
                limit: limit,
                include: [{ model: Person, as: "Authors" }]
            });

            const response = result.map(processGutenbergQuery).map(processQueryToTSV);
            res.send(response.join("\n"));
        })().then(() => { return; }).catch((e) => {
            console.error(e);
        });
    }
});

module.exports = router;