import db from '../utils/db.js';

export default {
    async SearchNormal(name) {
        const sql = `SELECT * FROM product
        WHERE MATCH(ProductName, FullDes) AGAINST('` + name + `');`
        const rel = await db.raw(sql);
        return rel;
    },
    async SearchOrderByPrice(name) {
        const sql = `
        SELECT * from
                (SELECT ProductID
                FROM Product
                WHERE MATCH(ProductName, FullDes) 
                AGAINST('` + name + `')) M
                INNER JOIN product p USING(ProductID)
                ORDER BY p.Price`
        const rel = await db.raw(sql);
        return rel;
    },
    async SearchOrderByRate(name) {
        const sql = `SELECT * from
        (SELECT ProductID
        FROM Product
        WHERE MATCH(ProductName, FullDes) 
        AGAINST('` + name + `')) M
        INNER JOIN product p USING(ProductID)
        ORDER BY p.AvgRate DESC`
        const rel = await db.raw(sql);
        return rel;
    }
}
