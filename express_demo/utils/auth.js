var auth = {
    users: [{
        "userName": "foobar@test.com",
        "password": "password"
    }],
    authorize: function(email, password) {
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