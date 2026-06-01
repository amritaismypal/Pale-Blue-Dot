document.addEventListener('DOMContentLoaded',()=>{
  // set year
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

  // nav toggle for small screens
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.main-nav');
  if(toggle && nav){
    toggle.addEventListener('click',()=>{nav.style.display = nav.style.display==='flex' ? 'none' : 'flex'; nav.style.flexDirection='column'});
  }

  // Blog post modal and comments (localStorage)
  const openPostBtns = document.querySelectorAll('.open-post');
  const modal = document.getElementById('post-modal');
  const closeModal = document.querySelector('.close-modal');
  const commentsList = document.getElementById('comments-list');
  const commentForm = document.getElementById('comment-form');

  function loadComments(postId){
    const raw = localStorage.getItem('comments:'+postId)||'[]';
    try{return JSON.parse(raw)}catch(e){return []}
  }
  function renderComments(postId){
    if(!commentsList) return; commentsList.innerHTML='';
    const comments = loadComments(postId);
    comments.forEach(c=>{
      const li=document.createElement('li');
      li.innerHTML = `<strong>${escapeHtml(c.name)}</strong><div>${escapeHtml(c.text)}</div><small class="meta">${new Date(c.ts).toLocaleString()}</small>`;
      commentsList.appendChild(li);
    });
  }
  function escapeHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

  openPostBtns.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.preventDefault();
      const id = btn.dataset.postId||'1';
      modal.classList.remove('hidden');
      renderComments(id);
    });
  });
  if(closeModal) closeModal.addEventListener('click',()=>modal.classList.add('hidden'));

  if(commentForm){
    commentForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const name = document.getElementById('comment-name').value.trim();
      const text = document.getElementById('comment-text').value.trim();
      if(!name||!text) return;
      const id = '1';
      const comments = loadComments(id);
      comments.unshift({name,text,ts:Date.now()});
      localStorage.setItem('comments:'+id,JSON.stringify(comments));
      commentForm.reset();
      renderComments(id);
    });
  }
});
