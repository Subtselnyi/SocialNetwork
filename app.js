var postId = 0;
var postBodyElement = null;

$('.post').find('.interaction').find('.edit').on('click',function(event){
    event.preventDefault();

    postBodyElement = event.target.parentNode.parentNode.childNodes[1];
    var postBody = event.target.parentNode.parentNode.childNodes[1].textContent;
    postId = event.target.parentNode.parentNode.dataset['postid'];
    $('#post-body').val(postBody);
    $('#edit-modal').modal();
});

$('#modal-save').on('click', function(){
    $.ajax({
       method: 'POST',
       url: urledit,
       data: {body: $('#post-body').val(), postId: postId, _token:token}
    })
        .done(function(msg){
           // console.log(msg['message']);
           // console.log(JSON.stringify(msg));
            $(postBodyElement).text(msg['new-body']);
            $('#edit-modal').modal('hide');
        });
});

$('.like').on('click',function(event){
    event.preventDefault();
    var isLike = event.target.previousElementSibling == null ? true : false;
    postId = event.target.parentNode.parentNode.dataset['postid'];
    //console.log(isLike);
    $.ajax({
        method: 'POST',
        url: urllike,
        data: {isLike: isLike, postId: postId, _token:token}
    })
        .done(function(){
            event.target.innerText = isLike ? event.target.innerText == 'Like' ? 'You like this post' : 'Like' : event.target.innerText == 'Dislike' ? 'You don\'t like this post' : 'Dislike';
            if (isLike) {
                event.target.nextElementSibling.innerText = 'Dislike';
            } else {
                event.target.previousElementSibling.innerText = 'Like';
            }
        });
});