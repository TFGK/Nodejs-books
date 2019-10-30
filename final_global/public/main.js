// window.onload = function(){
//     var contentMain = document.getElementById('content_main');
//     var title = document.getElementById('content_title');
//         contentMain.removeChild(title);
//     showTeam();
// }

// function showTeam(){ // 저장된 조원 출력
//     var xhr = new XMLHttpRequest();
//         xhr.onload = function(){
//             if(xhr.status===200){
//                 var teams = JSON.parse(xhr.responseText);
//                 var content = document.getElementById('content_sub');
//                 content.innerHTML = '';
//                 teams.map(function(team){
//                     var img = document.createElement('img');
//                     img.src=team.img; img.width='250'; img.id=team.hakbun;
//                     img.addEventListener('click', function(){
//                         getTeam(team.hakbun);
//                     });
//                     content.appendChild(img);
//                 });
//             } else {
//                 console.error(xhr.responseText);
//             }
//         };
//         xhr.open('GET', '/team/load');
//         xhr.send();
// }

// function getTeam(hakbun){ // 조원 사진을 클릭 했을때 데이터 출력
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function(){
//         if(xhr.status === 200){
//             var infos = JSON.parse(xhr.responseText);
//             var content = document.getElementById('content_sub');
//             content.innerHTML='';
//                 // 수정, 삭제 버튼 메뉴바에 추가
//                 var nav = document.getElementById('main_nav');
//                 var li = document.createElement('li');
//                 var a = document.createElement('a');
//                 li.id='patch'; a.href="/team/patch"; a.textContent='수정'
//                 nav.appendChild(li); li.appendChild(a);
                
//                 var nav = document.getElementById('main_nav');
//                 var li = document.createElement('li');
//                 var a = document.createElement('a');
//                 li.id='delete'; a.textContent='삭제'
//                 nav.appendChild(li); li.appendChild(a);

//             infos.map(function(info){ 
//                 var img = document.createElement('img');
//                 img.src=info.img; img.width='250';
//                 img.addEventListener('click', function(){
//                     showTeam();
//                 // 다시 돌아갈때 수정, 삭제 버튼 삭제
//                 var li_patch = document.getElementById('patch');
//                 var li_del = document.getElementById('delete');
//                 nav.removeChild(li_patch); nav.removeChild(li_del);
//                 });
//                 // 조원 정보를 넣을 태그 생성
//                 var div = document.createElement('div');
//                 div.id='description';
//                 var h2 = document.createElement('h2');
//                 h2.textContent=info.name;
//                 var p = document.createElement('p');
//                 p.textContent=info.comment;
//                 content.append(div); 
//                 div.appendChild(img); div.appendChild(h2); div.appendChild(p);
//                 // 조원 삭제
//             document.getElementById('delete').addEventListener('click', ()=>{
//                 var xhr = new XMLHttpRequest();
//                 xhr.onload = () =>{
//                     if(xhr.status === 200){    
//                         showTeam();
//                         var li_patch = document.getElementById('patch');
//                         var li_del = document.getElementById('delete');
//                         nav.removeChild(li_patch); nav.removeChild(li_del);
//                     }
//                     else {
//                         console.error(xhr.responseText);
//                     }
//                 }
//                 xhr.open('DELETE', '/team/'+info.hakbun);
//                 xhr.send();
//             });
//             document.getElementById('patch').addEventListener('click', ()=>{
//                 var newComment = prompt('바꿀 내용을 입력하세요.');
//                 if(!newComment){
//                     return alert('입력하셔야 합니다.');
//                 }
//                 var xhr = new XMLHttpRequest();
//                 xhr.onload = ()=>{
//                     if(xhr.status === 200){
//                         showTeam();
//                         var li_patch = document.getElementById('patch');
//                         var li_del = document.getElementById('delete');
//                         nav.removeChild(li_patch); nav.removeChild(li_del);
//                     } else{
//                         console.error(xhr.responseText);
//                     }
//                 };
//                 xhr.open('PATCH', '/team/'+hakbun);
//                 xhr.setRequestHeader('Content-Type', 'application/json');
//                 xhr.send(JSON.stringify({comment: newComment}));
//             })
//         });

//         } else{
//             console.error(xhr.responseText);
//         }
//     };
//     xhr.open('GET', '/team/'+hakbun);
//     xhr.send();
// }



window.onload = function(){
    var contentMain = document.getElementById('content_main');
    var title = document.getElementById('content_title');
    contentMain.removeChild(title);
    contentMain = document.getElementById('content_main');
    getQuestion();
}

function getQuestion(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status === 200){
            var tbody = document.querySelector('#question-list tbody');
            tbody.innerHTML='';
            var questions = JSON.parse(xhr.responseText);
            questions.map(function(question){
                var row = document.createElement('tr');
                row.id= question.id;
                var td = document.createElement('td');
                td.textContent = question.id;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = question.title;
                td.addEventListener('click', ()=>{
                    var description = document.createElement('div');
                    description.textContent=question.description;
                    row.append(description);
                })
                row.appendChild(td);
                td = document.createElement('td');
                var time = question.createdAt;
                td.textContent = time.substring(0,10);;
                row.appendChild(td);
                tbody.appendChild(row);
            });
        } else{
            console.error(xhr.responseText);
        }
    };
    xhr.open('GET', '/faq/load');
    xhr.send();
}