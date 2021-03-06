import _ from 'lodash';

const templates = {
  markupTemplate:
    '<header class="header">' +
    '<h1 class="header__title">YouTube Search Application</h1>' +
      '<form id="submitForm" class="form-wrapper" action="#">' +
        '<input type="text" class="search" id="searchField" placeholder="Search for..." required>' +
        '<input type="submit" value="go" class="submit" id="submitButton">' +
      '</form>' +
    '</header>' +
    '<div class="wrapper">' +
      '<div class="container">'+
        '<div id="results" class="results" style="transform: translateX(0px)"></div>'+
      '</div>'+
    '</div>'+
    '<footer class="footer">'+
      '<div id="pagination" class="pagination"></div>'+
    '</footer>',
    /* раз уж пишешь на es6, то почему бы не заюзать темплейтовые строки, например

    `<div class="wrapper">
      <div class="container">
        <div id="results" class="results" style="transform: translateX(0px)"></div>
      </div>
    </div>`

    это бы избавило тебя от такого количества плюсов, да и операция конкатенации не самая резвая
     */
  videoTemplate:
    '<%' +
    '_.each(items,function(item,key,list){' +
    'const date = new Date(Date.parse(item.snippet.publishedAt))%>' +
    '<div class="youtube-item">' +
      '<h2 class="youtube-item__title"><a href="https://youtu.be/<%- item.id.videoId%>" class="youtube-item__link">' +
        '<%= item.snippet.title %></a></h2>' +
      '<img class="youtube-item__img" src="<%= item.snippet.thumbnails.medium.url %>">' +
      '<p class="youtube-item__date fa fa-calendar"><%=date.getDate()%>.<%=date.getMonth() + 1%>.<%=date.getFullYear()%></p>' +
      '<p class="youtube-item__author"><%=item.snippet.channelTitle%></p>' +
      '<p class="youtube-item__description"><%=item.snippet.description%></p>' +
    '</div>' +
    '<%' +
      '});' +
    '%>',
  paginationTemplate:
    '<a class="pagination__nav">&#9668;</a>' +
    '<span class="pagination__items"></span>'+
    '<a class="pagination__nav">&#9658;</a>',
  paginationAddTemplate:
    '<% for (let i = items.firstItem; i < items.lastItem; i++) { %>' +
      '<a class="pagination__item" data-tooltip="page <%=i%>"><%=i%></a>' +
    '<% } %>',
  paginationLastTemplate:
    '<i>...</i><a class="pagination__item" data-tooltip="page <%=items.lastItem%>"><%=items.lastItem%></a>',
  paginationFirstTemplate:
    '<a class="pagination__item" data-tooltip="page <%=items.firstItem%>"><%=items.firstItem%></a><i>...</i>',
}
export const render = (templateName, model) => {
  templateName = `${templateName}Template`;
  const renderFn = _.template(templates[templateName]);
  return renderFn({items: model});
}
