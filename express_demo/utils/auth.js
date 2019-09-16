var auth = {
    users: [{
        "userName": 
        "password": "password"
    }],
    authorize: function(userName, password) {
        var validUser = this.users.filter((user) => {
            return user.userName === userName && user.password === password;
        });

        if (validUser.length === 1) {
            return true;
        }
        return false;
    }
};

module.exports = {
    auth
};