var relationship1 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends: function() {
        var that = this;        //relationship1을 가리키는 this를 that에 저장
        this.friends.forEach(function(friend) {
            console.log(that.name, friend);
        });
    },
};
relationship1.logFriends();

console.log('---------------------------------------------');

const realationship2 = {
    name: 'zero',
    friends: ['zero', 'nero', 'xero'],
    logFriends() {
        this.friends.forEach(friend => {
            console.log(this.name, friend);
        });
    },
};
realationship2.logFriends();

