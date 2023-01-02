import db from '../utils/db.js';

export default {
  findAll() {
    return db('Account');
  },

  async findByID(id) {
    const list = await db('Account').where('AccountID', id);
    if(list.length === 0) 
      return null;
    
    return list[0];
  },

  async findByUsername(username) {
    const list = await db('Account').where('Username', username);
    if(list.length === 0) 
      return null;
    
    return list[0];
  },

  async findByEmail(email) {
    const list = await db('Account').where('Email', email);
    if(list.length === 0) 
      return null;
    
    return list[0];
  },

  del(MaTaiKhoan) {
    return db('Account').where('AccountID', MaTaiKhoan).del();
  },

  add(Account) {
    return db('Account').insert({
      Username: Account.Username,
      Password: Account.Password,
      Name: Account.Name,
      Email: Account.Email,
      DOB: Account.DOB,
      AccountType: 'Bronze',
      isAdmin: false     
    });
  },

  edit(id, Account) {
    return db('Account')
    .where({MaTaiKhoan: id})
    .update({
      Name: Account.Name,
      Email: Account.Email,
      DOB: Account.DOB,
      AccountType: Account.AccountType,
    });
  },

  grantAdmin(id) {
    return db('Account').where('AccountID', id).update({isAdmin: true});
  }
}