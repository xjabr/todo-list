// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import * as $ from 'jquery';

interface ItemList {
  id: number,
  title: string,
  text: string
};

const getList = (): Array<ItemList> => {
  if (localStorage.getItem('data') !== 'undefined') {
    return JSON.parse(localStorage.getItem('data'));
  } else {
    localStorage.setItem('data', JSON.stringify([]));
    return JSON.parse(localStorage.getItem('data'));
  }
};

const setItem = (obj: ItemList): boolean => {
  let data: Array<ItemList> = getList();

  if (data.length != 1000) {
    if (obj.title === '' || obj.text === '') {
      alert('Title or text is empty!');
      return false;
    }

    data.push(obj);
    localStorage.setItem('data', JSON.stringify(data));

    alert('List: ' + data.length +'/1000')

    return true;
  }

  return false;
};

const loadList = (): void => {
  let data: Array<ItemList> = getList();
  for (let i = 0; i < data.length; i++)
    if (data[i].title == 'null') {
      console.log('NULL');
    } else {
      $('#list').append('<li id="' + data[i].id + '" class="list-item clearfix"><div class="row"><div class="col-9"><h2>' + data[i].title + '</h2><p>' + data[i].text + '</p></div><div class="col-3"><button id="delete-item" type="button" value="Delete" data-id="' + data[i].id +'"><i class="material-icons">clear</i></button></div></li>');
    }
};

const deleteItem = (id: number): void => {
  let data: Array<ItemList> = getList();
  data[id].title = 'null';
  localStorage.setItem('data', JSON.stringify(data));
  location.reload();
}

const deleteList = (): void => {
  localStorage.removeItem('data');
  location.reload();
}

const main = (): void => {
  if (localStorage.getItem('data') === null) {
    localStorage.setItem('data', JSON.stringify([]));
  } else {
    loadList();
  }

  $('#add').click((e: JQuery.Event) => {
    let data: Array<ItemList> = getList();
    let title: string = <string>$('#title').val();
    let text: string = <string>$('#text').val();

    if (data.length == 0) {
      var item: ItemList = { id: 0, title: title, text: text };

      if (setItem(item)) {
        location.reload();
      } else {
        alert('Error to add item in the list');
      }
    } else {
      var item: ItemList = { id: data[data.length - 1].id + 1, title: title, text: text };

      if (setItem(item)) {
        location.reload();
      } else {
        alert('Error to add item in the list, list is full (' + data.length + '/1000) or another error!');
      }
    }
  });

  $('#delete-item').click(function(e: JQuery.Event): void {
    let index: JQuery.Selector = $(this).attr('data-id');
    deleteItem(parseInt(index));
  });

  $('#delete-list').click((e: JQuery.Event): void => { deleteList(); });
};

$(window).ready((): void => {
  main();
});