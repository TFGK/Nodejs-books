/* ES5 시절 객체 표현 방법
var sayNode = function () {
    console.log('Node');
};
var es = 'ES';
var oldObject = {
    sayJS: function () {
        console.log('JS');
    },
    sayNode: sayNode,
};
oldObject[es + 6] = 'Fantastic';

oldObject.sayNode(); // node
oldObject.sayJS(); // JS
console.log(oldObject.ES6);*/

//ES2015+ 훨씬 간결한 문법
//객체의 메소드에 :function 안붙혀도 됨
// {sayNode: sayNode}를 {sayNode}로 축약 가능
var sayNode = function() {
    console.log('Node');
};

var es = 'ES';

const newObject1 = {
    sayJs() {  
        console.log('JS');
    },
    sayNode,      
    [es + 6]: 'Fantastic',
};

newObject1.sayNode();
newObject1.sayJs(); 
console.log(newObject1.ES6);

