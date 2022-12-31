import db from '../utils/db.js';

export default {

    async verifyUser (username, password) {
        try {
            const sql = `SELECT * FROM Account
            WHERE MATCH(Username, Password) AGAINST('` + username + `', '` + password + `');`
            const rel = await db.raw(sql);
            return rel;
    }catch (e){
       
    }
    },
    async login (req, res) {
        console.log(data);
        if (data !== null) {
            res.status(200).json({ message: "null" });
        } else {
            res.status(401).json({ message: "Username hoặc mật khẩu không đúng!" });
        }
        return userInfo;
    },
}