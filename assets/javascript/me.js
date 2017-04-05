var tags = [
 'greens',
 'smoothie',
 'sushi',
 'salads',
];
function tagsList() {
  $.each(tags, function(index, value) {
    $('.giphy-tag-wrapper').append("<button class='tag-item'>" + value +'</button`>');
  });
};
function animateGif(event) {
  event.preventDefault();
  state = $(event.target).attr('data-state');
  if (state == 'still'){
    $(event.target).attr('src', $(event.target).data('animate'));
    $(event.target).attr('data-state', 'animate');
  } else {
    $(event.target).attr('src', $(event.target).data('still'));
    $(event.target).attr('data-state', 'still');
  }
}
function searchTag() {
  var api_key = 'dc6zaTOxFJmzC'
  var search_url = 'https://api.giphy.com/v1/gifs/search?q=';
  var search_text = $(this).text();
  var search_params = search_text.split(' ').join('+');
  var url = (search_url + search_params + "&api_key=" + api_key);
  $('.search-content').empty();
  $.ajax({
    method: 'get',
    url: url,
    success: function(response) {
      for(i = 0; i < response.data.length; i++) {
        gif_item = $('<div class="gif-container"><img class="gif-thumb" src="'
                     + response.data[i].images.original_still.url
                     + '" data-state="still" data-animate="'
                     + response.data[i].images.original.url
                     + '" data-still="'
                     + response.data[i].images.original_still.url
                     + '" /></div>');
        $('.search-content').append(gif_item);
        $('.gif-thumb').on('click', animateGif);
      }
    }
  });
}
function addTag(event) {
  event.preventDefault();
  var new_tag = $(".new-tag-input").val();
  $('.giphy-tag-wrapper').append("<button class='tag-item'>" + new_tag +'</button`>');
  $('.giphy-tag-wrapper .tag-item:last-child').on('click', searchTag);
}
$(document).ready(function() {
  tagsList();

  $('.giphy-tag-wrapper button').on('click', searchTag);

  $('.gif-container a').on('click', animateGif);

  $('#tag-add').on('submit', addTag);

});
