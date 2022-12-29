import db from '../utils/db.js';

export default {

    async findAll() {
        const productList = await db('Product');
        if(productList.length === 0)
            return null;
        return productList;
    },

    async findById(id) {
        const productList = await db('Product').where('ProductID', id);
        return productList[0];
    },

    addPro(entity) {
        return  db('Product').insert({
            ProductName:entity.ProductName,
            CatID: 1,
            Price: +entity.Price,
            TinyDes: entity.TinyDes,
            FullDes: entity.FullDes,
            Image: entity.Image,
            Discount: +entity.Discount,
            AvgRate: 0,
            TotalLike: 0,
            Quantity:  +entity.Quantity
        });
    },

    delPro(id) {
        return  db('Product').where('ProductID', id).del();
    },
    patchPro(entity) {
        return  db('Product').where('ProductID', entity.ProductID).update({
            CatID: entity.CatID,
            Price: +entity.Price,
            TinyDes: entity.TinyDes,
            FullDes: entity.FullDes,
            Image: entity.Image,
            Discount: +entity.Discount,
            AvgRate: entity.AvgRate,
            TotalLike: entity.TotalLike,
            Quantity:  +entity.Quantity
        });
        //or
        //const id = entity.CatID;
        //delete entity.CatID;
        //return  db('products').where('CatID', id).update(entity);
    },

}