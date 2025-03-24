// https://jsonplaceholder.typicode.com/posts?userId=putuserid
// https://jsonplaceholder.typicode.com/posts/PUTPostID/comments
var req = new XMLHttpRequest;
req.open('GET', "https://jsonplaceholder.typicode.com/users")
req.send()
req.onreadystatechange = function (){
  if(req.readyState === 4){
    var users = JSON.parse(req.responseText)
    // console.log(users)
    for (var i = 0; i < users.length; i++){
      // console.log(users[i].username)
      usernameUI(users[i])
    }
  }
}

function usernameUI(user){
var btn = document.createElement('button');
btn.textContent = user.username
btn.onclick = ()=> getPosts(user)
document.getElementById('parent').appendChild(btn)
}



function getPosts(user){
  var req = new XMLHttpRequest;
  req.open('GET', 'https://jsonplaceholder.typicode.com/posts?userId='+user.id)
  req.send()
  req.onreadystatechange = function(){
    if(req.readyState === 4){
      var posts = JSON.parse(req.responseText)
      document.querySelector('#poster').innerHTML = ''

      document.querySelector('#posts').innerHTML = ''
      var poster = document.createElement('h1')
poster.textContent= user.username
      console.log(posts)
      for(var i = 0; i < posts.length; i++){
        showuserPosts(posts[i])
      }
      document.querySelector('#poster').appendChild(poster)

    }
  }
}

function showuserPosts(post){
  console.log(post.id)
  var postbody = document.createElement('div')
  postbody.classList.add('postbody')
  var h3 = document.createElement('h3')
  var show = document.createElement('button');
  //git Comments
  show.onclick = function(){
    getComments(post.id, show.parentNode)
  }
  show.textContent = 'comments'
  var del = document.createElement('button');
  del.textContent = 'delete'
  del.onclick = function (){
    del.parentNode.remove()
  }


  h3.textContent = post.title


  postbody.append(h3, show, del)
  document.querySelector('#posts').appendChild(postbody)
}

function getComments(id, parent){
  var req = new XMLHttpRequest;
  req.open('GET', 'https://jsonplaceholder.typicode.com/posts/'+id+'/comments')
  req.send()
  req.onreadystatechange = function(){
    if(req.readyState === 4){
      var comments = JSON.parse(req.responseText)
      console.log(comments)
for(var i = 0; i < comments.length; i++){
  showComments(comments[i].name)
}
// var com = document.createElement('div')
// com.setAttribute('id', 'comments')
// parent.append(com)
}
}
}

function showComments(comment){
  let div = document.createElement('div')
  div.textContent = comment
  document.getElementById('comments').appendChild(div)
}