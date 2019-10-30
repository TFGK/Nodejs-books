function getUsers () { // 로딩 시 사용자 가져오는 함수
    //fetch : ajax기능을 위한 최신 라이브러리
    //fetch ('url주소', 옵션객체)
    fetch('/users',{method:'GET'})      //가져오기
    // url: http://localhost:8085/users

    .then((response)=> {        // 서버로부터 users객체를 포함한 프로미스 객체
        if(response.status=='200') {
            return response.json(); // JSON 형식으로 리턴하는 Promise 객체
        }
    })
    .then((resJson)=>{
        showUsers(resJson,document.querySelector('#list'));
    })
    .catch((error)=>{
        console.error('fetch 호출에서 에러발생 : ' + error.message);
    })
};
function showUsers (users,location) {
    // users: resJson
    // location : document.querySelector("#list")
    location.innerHTML='';
    Object.keys(users).map((key)=>{
        var userDiv = document.createElement('div');
        // <div>/div>
        var span = document.createElement('span');
        // span변수는 <span></span>형태의 엘리먼트 객체
        span.textContent=users[key];
        // span변수는 <sapn>users[key]의 값</sapn>

        var edit = createModifyBtn(key);
        var remove = createDelBtn(key);

        userDiv.appendChild(span);
        // <div> <sapn>users[key]의 값</sapn> /div>
        userDiv.appendChild(edit);
        // <div> <sapn>users[key]의 값</sapn> <Button>수정</Button> /div>
        userDiv.appendChild(remove);
        // <div> <sapn>users[key]의 값</sapn> <Button>수정</Button> <Button>삭제</Button> /div>
        location.appendChild(userDiv);
        // <div> <sapn>users[key]의 값</sapn> <Button>수정</Button> <Button>삭제</Button> /div>
        // 이 내용이 restFront list 에 들어감
    });
}
function createModifyBtn(key) {
    var edit = document.createElement('button');
    edit.textContent = '수정';
    edit.addEventListener('click',()=>{
        var name = prompt('바꿀 이름을 입력하세요.');
        if(!name) {
            return alert('이름을 반드시 입력하셔야 합니다.');
        }
        fetch('/users/'+key,
        {
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            method:"PUT",
            body: JSON.stringify({name:name})
        }
        ).then((response)=>{
            if(response.status == '200') {
                return response.json();
            }
        }).then((resJson)=>{
            console.log(resJson);
            showUsers(resJson,document.querySelector('#list'));
        }).catch((error)=>{
            console.error('fetch 호출에서 에러 발생 : ' , error.message);
        });
    });
    // <button onclick ='...'>수정</button>
    return edit;
}
function createDelBtn(key) {
    var remove = document.createElement('button');
    remove.textContent = '삭제';
    remove.addEventListener('click',()=>{ // 삭제 버튼 클릭
        fetch('/users/'+key,
        {
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            method:"DELETE",
        }
        ).then((response)=>{
            if(response.status == '200') {
                return response.json();
            }
        }).then((resJson)=>{
            showUsers(resJson,document.querySelector('#list'));
        }).catch((error)=>{
            console.error('fetch 호출에서 에러 발생 : ' + error.message);
        });
    });
    return remove;
}

window.onload = getUsers;

// 웹페이지가 실행될 때 getUsers메소드 호출
// window.onload = : 자바에서 main 역할

// 로딩 시 getUser 호출

// 폼 제출
document.querySelector('#form').addEventListener('submit',(e)=>{
    e.preventDefault(); 
    //해당하는 이벤트(submit)의 기본동작을 금지
    //이것응용 a태그의 메뉴를 펼칠 때 > 중간에 서버로 가는것을 막고 > 펼치기 실행
    //e는 form태그에 발생한 이벤트 객체
    var name = e.target.username.value; 
    //e.target.username는 e.target 객체(form객체)의 input태그 객체
    if(!name) {
        return alert('이름을 입력하세요.');
    }
    fetch('/users',
    {
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        method:"POST",
        body: JSON.stringify({name:name})       //{name} 하나로 써도 됨
    }).then((response)=>{
        if(response.status='201') {
            return response.json();
        }
    }).then((result)=>{
        showUsers(result,document.querySelector('#list'));
    }).catch((error)=>{
        console.error('fetch 호출에서 에러 발생 : ' , error.message);
    });
    e.target.username.value=''; //더블클릭 방지용
});