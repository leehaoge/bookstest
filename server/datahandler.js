var all, initialized;

const DEFAULT_PAGE_SIZE = 10;

function getFiltered(filter) {
    if (filter == undefined || filter.length == 0) {
        return all;
    }
    var ret = [];
    for (var i in all) {
        var item = all[i], s = item.title;
        if (item.title && item.title.indexOf(filter) > -1) {
            console.log(item.title);
            ret.push(item);
        }
    }
    return ret;
}

function getTotalPages(pageSize, keyword) {
    if (all == undefined) return 0;
    var data = all;
    if (keyword && keyword.length > 0) {
        data = getFiltered(keyword);
    }
    pageSize = pageSize || DEFAULT_PAGE_SIZE;
    var total = data.length;
    var delta = total % pageSize == 0 ? 0 : 1;
    var ret = Math.floor(total / pageSize) + delta;
    return ret;
}

function getBooks(page, pageSize, keyword) {
    page = page || 1;
    pageSize = pageSize || DEFAULT_PAGE_SIZE;
    var data = all;
    if (keyword && keyword.length > 0) {
        data = getFiltered(keyword);
    }
    var ret = [], total = data.length,
        start = (page - 1) * pageSize,
        end = Math.min(total, start + pageSize);

    for (var i = start; i < end; i++) {
        ret.push(data[i]);
    }

    return ret;
}

exports.init = function(data) {
    all = data;
    initialized = true;
    console.log('data initialized!');
};

exports.dummy = function() {
    return 'dummy';
};

exports.getPageJson = function(page, pageSize, keyword) {
    pageSize = pageSize || DEFAULT_PAGE_SIZE;
    var ret = {
        pageSize: pageSize,
        pageNo: page,
        totalPages: getTotalPages(pageSize, keyword),
        books: getBooks(page, pageSize, keyword),
    };
    return ret;
};

exports.searchBooks = function(keyword, page, pageSize) {
    return this.getPageJson(page, pageSize, keyword);
};
