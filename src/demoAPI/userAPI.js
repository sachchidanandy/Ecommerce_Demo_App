import delay from './delay';

const users = [
    {
      id: 'sachin@gmail.com',
      email : 'sachin@gmail.com',
      password : 'password',
      firstName : 'Sachin',
      middleName : '',
      lastName : 'Yadav',
      inCart : [],
      ordered : []
    }
]

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (user) => {
    return user.email.toLowerCase();
};
  
class userApi {
    static login(user) {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (user.email) {
                const existingUserIndex = users.findIndex(a => a.id === user.email);
                if ( existingUserIndex >= 0) {
                    users[existingUserIndex].password === user.password ? resolve(users[existingUserIndex]) : reject('Wrong Password');
                } else {
                    reject('email Id is not Registered');
                }
            }
            reject('Invalid Email Id');
        }, delay);
        });
    }

    static saveUser(user) {
        user = Object.assign({}, user); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate server-side validation
            const minuserNameLength = 3;
            if (user.firstName.length < minuserNameLength) {
            reject(`First Name must be at least ${minuserNameLength} characters.`);
            }

            if (user.lastName.length < minuserNameLength) {
            reject(`Last Name must be at least ${minuserNameLength} characters.`);
            }

            if (user.email.length < minuserNameLength) {
                reject(`Email must be at least ${minuserNameLength} characters.`);
            }
            
            const existingUserIndex = users.findIndex(a => a.id === user.email.toLowerCase());

            if (existingUserIndex >= 0) {
                reject('Email Id Already Registered');
            } else {
            //Just simulating creatin here.
            //The server would generate ids for new users in a real app.
            //Cloning so copy returned is passed by value rather than by reference.
            user.id = generateId(user);
            user.inCart = [];
            user.ordered = [];
            users.push(user);
            }

            resolve(user);
        }, delay);
        });
    }

    static addToCart(userId, product) {
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                const existingUserIndex = users.findIndex(user => user.id === userId);

                if (existingUserIndex < 0) {
                    reject ('User dose not exixt');
                }

                const productIndex = users[existingUserIndex].inCart.findIndex(item => item.product.sku === product.product.sku);

                if (productIndex >= 0) {
                    users[existingUserIndex].inCart[productIndex].quantity = product.quantity;
                    resolve(users[existingUserIndex].inCart);
                } else {
                    users[existingUserIndex].inCart.push(product);
                    resolve(users[existingUserIndex].inCart);
                }
            },delay);
        });
    }

    static deleteFromCart(userId, productSku) {
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                const existingUserIndex = users.findIndex(user => user.id === userId);

                if (existingUserIndex < 0) {
                    reject ('User dose not exixt');
                }
                const newCart = users[existingUserIndex].inCart.filter(item => item.product.sku !== productSku);
                users[existingUserIndex].inCart = newCart;
                resolve(newCart);
            },delay);
        });
    }

    // static deleteUser(userId) {
    //     return new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         const indexOfUserToDelete = users.findIndex(user => {
    //           user.id == userId;
    //         });
    //         users.splice(indexOfUserToDelete, 1);
    //         resolve();
    //       }, delay);
    //     });
    // }
}

export default userApi;