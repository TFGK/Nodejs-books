async function find(Users) {
    try{
        let user -= await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({gender : 'm'});
    }catch (error) {
        console.error(error);
    }
}
//findOne , save 함수 안에 new Promise(객체) 를 가지고 있어서
//가능한 것. reslove값을 리턴할 수 있으니


//뒤에 예제 나오면 익숙해질 것
