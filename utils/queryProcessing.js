const processAozoraQuery = x => {
    const item = x.dataValues;
    item.source = "aozora";
    item.authorBirthYear = item?.authorBirthDate?.getFullYear() ?? "?";
    item.authorDeathYear = item?.authorDeathDate?.getFullYear() ?? "?";
    item.releaseDate = item?.releaseDate?.toDateString() ?? "?";
    delete item.authorBirthDate;
    delete item.authorDeathDate;
    delete item.id;
    delete item.titleKanaForSort;
    delete item.authorNameKanaForSort;
    delete item.textFileUrl;
    delete item.createdAt;
    delete item.updatedAt;
    return item;
}

const processGutenbergQuery = x => {
    const item = {};
    item.source = "gutenberg";
    item.bookId = x.dataValues.bookId + "";
    item.title = x.dataValues.title;
    item.titleKana = "";
    item.authorName = x?.dataValues?.Authors?.[0]?.dataValues?.name ?? "?";
    item.authorNameKana = "";
    item.authorBirthYear = x?.dataValues?.Authors?.[0]?.dataValues?.birthYear ?? "?";
    item.authorDeathYear = x?.dataValues?.Authors?.[0]?.dataValues?.deathYear ?? "?";
    item.releaseDate = "?";
    return item;
}

const processQueryToTSV = x => {
    return x.source + "\t" + x.bookId + "\t" + x.title + "\t" + x.authorName + "\t" + x.authorBirthYear + "\t" + x.authorDeathYear;
}

module.exports = {
    processAozoraQuery: processAozoraQuery,
    processGutenbergQuery: processGutenbergQuery,
    processQueryToTSV: processQueryToTSV
}