import db from '../utils/db.js';

var max;

export default {

    async findByIdMax() {
        var temp=0;
        while(productList[0] != undefined){
            max = temp;
            temp++;
            const productList = await db('Product').where('ProductID', temp);
        }
        const productList = await db('Product').where('ProductID', max);
        return productList[0];
    },

    register(entity) {
        
        return  db('Account').insert({
            AccountID: max+1,
            Username: max,
            Password: entity.Password,
            Name: entity.Username,
            Email: entity.Email,
            DOB: 1/1/2000,
            AccountType: Silver,
            isAdmin: 0
        });
    },
}