//function findAndSaveUser(Users) {
//    Users.findOne({}, (err, user) => {
//        if(err) {
//            return console.error(err);
//        }
//        user.name = 'doeun';
//        user.save((err) => {
//            if(err) {
//                return console.error(err);
//            }
//            Users.findOne({ gender: 'm'}, (err, user) => {
//                if(err) {
//                return console.error(err);
//                }
//                console.log('콜백 끝');
//            });
//        });
//        
//    });
//}


function findAndSaveUser(Users) {
    Users.findOne({
        var a = true;
            return new Promise((res, rej) => {
                if (a) {
                    res('ok');
                } else {
                    rej('no');
                }
            })
        })
        .then((user) => {
            console.log('1');   
            user.name = 'doeun';
            return user.save();
        })
        .then((user) => {
            console.log('2');
            return Users.findOne({
                gender: 'm'
            });
        })
        .catch(err => {
            console.log('3');
            console.error(err);
        });
    }