
// http request server link

let mainPostBlock = document.getElementById('main-post-block');
let postContent = document.getElementById('post-content');
let postCard = document.getElementById('post-card');
let postClose = document.getElementById('close');

function serverRequest(url,callBack){
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function(){
        let data = JSON.parse(request.responseText);
        callBack(data);
    })
    request.send();
};

serverRequest('https://jsonplaceholder.typicode.com/posts', function(data){
    printPosts(data)
});

function printPosts(data) {
    data.slice(0,4).forEach(element => {
        createPosts(element);             
    });
}

// this function brings posts from server, get id and title
function createPosts(item){
    let post = document.createElement('div');
    post.classList.add('post-div');
    post.setAttribute('data-id', item.id);
       
    let postTitle = document.createElement('h2');
    postTitle.classList.add('h2-title');
    postTitle.textContent =  item.id;

    let postElement = document.createElement('h3');
    postElement.classList.add('title');
    postElement.textContent =  item.title;

    let postviewButton = document.createElement('button');
    postviewButton.classList.add('view-post');
    postviewButton.textContent = 'View Post';
    postviewButton.setAttribute('data-id', item.id);

    post.addEventListener('click', function(event){
        postContent.innerHTML = '';
        let id = event.target.getAttribute('data-id');
        openPostCard(id);
        
    });
    postTitle.addEventListener('click', onTextClick); 
    postElement.addEventListener('click', onTextClick); 

    post.appendChild(postTitle);
    post.appendChild(postElement);
    post.appendChild(postviewButton);
    mainPostBlock.appendChild(post);
}
// this function opens the post by clicking anywhere
function onTextClick(event) {
    event.stopPropagation();
    postContent.innerHTML = '';
    let id = event.target.parentElement.getAttribute('data-id');
    openPostCard(id);
};
// this function opens the specific post that I select
function openPostCard(id){
    postCard.classList.add('active-post');
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    serverRequest(url, function(data){
        // console.log(data[id]);
        postCardInfo(data);
    });
}
// this function shows what should appear when a post will open
function postCardInfo(item){
    let titlePost = document.createElement('h2');
    titlePost.classList.add('post-title');
    titlePost.innerHTML = item.title;

    let descriptionPost = document.createElement('p');
    descriptionPost.classList.add('post-description');
    descriptionPost.innerHTML = item.body;
 
    postContent.appendChild(titlePost);
    postContent.appendChild(descriptionPost);
    postCard.appendChild(postContent);

    postClose.addEventListener('click', function(){
        postCard.classList.remove('active-post');
        postContent.innerHTML = '';
    });
}


// xml http request: 
let currentPage = 1;
let totalPage;

function getUsers(page){
    let requist = new XMLHttpRequest();
    requist.addEventListener('load' , render);
    requist.addEventListener('error' , errorRender);

    requist.open('GET', 'https://reqres.in/api/users?page=' + page);

    requist.send();
}

function render(){
    let response = this.responseText;
    let responseData = JSON.parse(response);
    let fragment = document.createDocumentFragment();

    responseData.data.forEach(Element => {
        let li = document.createElement('li');
        let pEmail = document.createElement('p');
        pEmail.textContent = Element.email;
        pEmail.classList.add('p-Email');
        let userImg = document.createElement('img');
        userImg.classList.add('user-img');
        userImg.src = Element.avatar;
        li.appendChild(userImg);
        li.appendChild(pEmail);

        fragment.appendChild(li);

    });
    totalPage = responseData.total_pages;
    document.getElementById('user_ul').innerHTML = ' ';
    document.getElementById('user_ul').appendChild(fragment);

}

function errorRender(error){
    if(error == 404){
        let ptext = document.createElement('p');
        ptext.textContent = 'Server Error';
        ptext.classList.add('p-text');
        document.getElementById('user_div').appendChild(ptext);
    }
    let perror = document.createElement('p');
    perror.textContent = 'Page Is Not Found';
    perror.classList.add('p-text');
    document.getElementById('user_div').appendChild(perror);
};

document.getElementById('next').addEventListener('click' , function() {
    if(currentPage == totalPage){
        return;
    }
    currentPage ++;
    getUsers(currentPage);
});

document.getElementById('prev').addEventListener('click' , function() {
    if(currentPage == 1){
        return;
    }
    currentPage --;
    getUsers(currentPage);
})

getUsers(currentPage);