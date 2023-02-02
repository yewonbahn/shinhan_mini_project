const showModal = () => {
    let modal = document.getElementById('modal');
    modal.style.display = 'flex';
}
const closeModal = () => {
    let modal = document.getElementById('modal');
    modal.style.display = 'none';
}
const showModal2 = () => {
    let modal = document.getElementById('modal2');
    modal.style.display = 'flex';
}
const closeModal2 = () => {
    let modal = document.getElementById('modal2');
    modal.style.display = 'none';
}


const showEditmodal = () => {
    let modal = document.getElementById('editModal');
    modal.style.display = 'flex';
}
const closeEditmodal = () => {
    let modal = document.getElementById('editModal');
    modal.style.display = 'none';
}
const showDetailmodal = () => {
    let modal = document.getElementById('detailModal');
    modal.style.display = 'flex';
}
const closeDetailmodal = () => {
    let modal = document.getElementById('detailModal');
    modal.style.display = 'none';
}

const SERVER_URL = 'http://127.0.0.1:8000'

// method 명, table 명
async function postArticle(article) {
  let response = await fetch(`${SERVER_URL}/blog/article`,{
    method: 'POST',
    body: JSON.stringify(article), // json 객체로 만들기
    headers: {
      'Content-type': 'application/json',
    },
  });
  let data = await response.json(); // 응답을 json 객체에서 자바스크립트 객체화
  return data

}

async function submitArticle () {
    let article = {
      title: document.getElementById('title').value,
      content: document.getElementById('content').value,
    }
    let result = await postArticle(article);
    console.log(result);
  }

  async function getArticle(id) {
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`);
    let data = await response.json(); // 여기도 꼭 await 를 해주어야 함
    return data;
  }

  async function insertArticle(id) {
    let data = await getArticle(id);
    let title = document.getElementById('title');
    let content = document.getElementById('content');
    title.innerText = data.title;
    content.innerText = data.content;
  }

  async function getAllarticle() {
    let response = await fetch(`${SERVER_URL}/blog/article`);
    let data = await response.json(); // 여기도 꼭 await 를 해주어야 함
    
    return data;
  }

  async function insertAllarticle() {
    let data = await getAllarticle();
    data.forEach((post)=>{
        uploadPost(post)
      })
    }
      
    async function uploadPost(data){
  
        document.body.insertAdjacentHTML('beforeEnd',
        `<div id=${data.id} class="card border-info mb-3" style="max-width: 50rem;">
        <div class="card-header">작성자: ${data.author}</div>
        <div class="card-body">
        <h4 style="color:black;">카테고리: ${data.category.name}</h4> 
        <h5 style="color:black;">제목: ${data.title}</h5> 
        <h5 style="color:black;">내용 : ${data.content}</h5> 


        <button onclick="deletePost(${data.id})" type="button" class="btn btn-secondary btn-sm">삭제하기</button>
        <button onclick="updateArticle(${data.id})" type="button" class="btn btn-secondary btn-sm">수정하기</button>
        <button onclick="detailArticle(${data.id})" type="button" class="btn btn-secondary btn-sm">자세히 보기</button>
        </div>
      </div>
      
      `
        )
    
      }
      function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }
      
      //삭제 버튼 작동
      async function deletePost(id) {
        let token = getCookie('access_token')
        console.log(token)
        let response = await fetch(`${SERVER_URL}/blog/article/${id}`,{
          method: 'DELETE',
          headers:{
            'Authorization':`Bearer ${token}` 
          }
        });
        if(response.status=="403"){
          alert("본인만 삭제할수 있습니다.")
        }
        else{
          let deleteDiv = document.getElementById(`${id}`);
          deleteDiv.remove()
          alert("삭제완료.")
        }
        location.reload();
    
      }
  
      

      async function InsertPosttobutton(article,id) {
        let response = await fetch(`${SERVER_URL}/blog/article/${id}`,{
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
            },
          });
          let data = await response.json(); 

          let button = document.getElementById('editbutton');
          button.innerHTML= `<button onclick="updatePost(${data.id})">수정하기</button>`;


    }

    async function updatePost(id) {
        let token = getCookie('access_token')
        let editData = document.getElementById('editform');
        let editFormData = new FormData(editData);//{im
        let response2= await fetch(`${SERVER_URL}/blog/article/${id}`,{
            method: 'PUT',
            headers: {
                'Authorization':`Bearer ${token}` 
              },
            body: editFormData, // json 객체로 만들기
          });
          
          location.reload();
          console.log(response2.data)
    }

    async function updateArticle (id) {
        showEditmodal();
        let article = {
          title: document.getElementById('title').value,
          content: document.getElementById('content').value,
        }
        let result = await InsertPosttobutton(article,id);
        console.log(result);
      }
    
      // 함수 실행

      insertAllarticle()



//작성 하기 함수들

      function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }
      
      
      
      async function postArticle(article) {
        let token = getCookie('access_token')

        let response = await fetch(`${SERVER_URL}/blog/article`,{
          method: 'POST',
          body: article, // formData 라서 json 함수 필요 없음
          headers:{
            'Authorization':`Bearer ${token}` ,
            
          }
        });
        let data = await response.json(); // 응답을 json 객체에서 자바스크립트 객체화
        alert("작성 완료")
        location.reload();
        return data
      }
      
      async function submitImage() {
        let formElement = document.getElementById('form');
        let imageFormData = new FormData(formElement);//{image : 파일}  form name= key 역할
        let result = await postArticle(imageFormData);
        console.log(result);
      }



//카테고리 생성

      async function postCategory(article) {
        let token = getCookie('access_token')

        let response = await fetch(`${SERVER_URL}/blog/category`,{
          method: 'POST',
          body: article, // formData 라서 json 함수 필요 없음
          headers:{
            'Authorization':`Bearer ${token}` ,
            
          }
        });
        let data = await response.json(); // 응답을 json 객체에서 자바스크립트 객체화
        return data
      }
      
      async function createCategory () {
        let formElement = document.getElementById('form2');
        let imageFormData = new FormData(formElement);//{image : 파일}  form name= key 역할
        let result = await postCategory(imageFormData);
        console.log(result);
      }


//클릭시 디테일 모달 생성 


async function detailArticle (id) {
    showDetailmodal();
    let data = await getArticle(id);
    let detailAuthor = document.getElementById('detailAuthor');
    let detailtitle = document.getElementById('detailtitle');
    let detailContent = document.getElementById('detailContent');
    let detailCategory = document.getElementById('detailCategory');
    let detailImage = document.getElementById('detailImage');

    console.log(data)
    detailAuthor.innerText = `작성자: ${data.author}`;
    detailtitle.innerText =`제목: ${data.title}`;
    detailContent.innerText =`내용: ${data.content}`;
    detailCategory.innerText =`카테고리: ${data.category.name}`;

  }
  //드롭다운 메뉴 클릭시 카테고리 리스트

  async function listCategory () {
    let menu = document.getElementById('dropdown-menu');
    menu.innerHTML=""
    let response=await fetch(`${SERVER_URL}/blog/category`,{
        method: 'GET',
      });
      let data = await response.json(); // 응답을 json 객체에서 자바스크립트 객체화
      data.forEach((post)=>{
        menu.insertAdjacentHTML('beforeEnd',
        ` <li onclick="filterCategory(${post.id})"><a class="dropdown-item" href="#"> ${post.name}</a></li>`
        )

    })

  }

  async function filterCategory (id) {
    document.body.innerHTML=""
    let data = await getAllarticle();
    data.forEach((post)=>{
        uploadPost(post)
      })

  }

