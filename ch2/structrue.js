var candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function() {
        this.status.count--;
        return this.status.count;
    }
};
var count = candyMachine.status.count;
var getCandy = candyMachine.getCandy();
console.log(count, getCandy);

console.log('-----------------↓ 비구조화 할당 ↓----------------------');

const candyMachine1 = {
    status1: {
        name1: 'node1',
        count1: 5,
    },
    getCandy1() {
        this.status.count--;
        return this.status.count;
    },
};

const { status1: { count1 } , getCandy1} = candyMachine1;
console.log(candyMachine1.status1.count1, getCandy1);


