module.exports = () => global.message;

//global은 window와 비슷하게 사용
//window : BOM 객체(Browser Object Model)의 최고조상, root 객체
//window.alert(), window.prompt() -> alert(), prompt()
//window.console.log(); --> console.log();
//global.console.log(); --> console.log();
//global.require() --> require();
//최고 상위 객체 생략 가능 
//59P
//화살표함수 -> 익명함수
//function() {retrun global.message;};


