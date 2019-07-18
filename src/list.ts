import * as $ from 'jquery';

export interface ItemList {
  id: number,
  title: string,
  text: string,
  dateToCreation: string
};

export function getList(): Array<ItemList>  {
  if (localStorage.getItem('data') !== 'undefined') {
    return JSON.parse(localStorage.getItem('data'));
  } else {
    localStorage.setItem('data', JSON.stringify([]));
    return JSON.parse(localStorage.getItem('data'));
  }
};

export function setItem(obj: ItemList): boolean {
  let data: Array<ItemList> = getList();

  if (data.length != 1000) {
    if (obj.title === '' || obj.text === '') {
      alert('Title or text is empty!');
      return false;
    }

    data.push(obj);
    localStorage.setItem('data', JSON.stringify(data));

    alert('List: ' + data.length + '/1000')

    return true;
  }

  return false;
};

export function loadList(): void {
  let data: Array<ItemList> = getList();
  for (let i = 0; i < data.length; i++)
    if (data[i].title == 'null') {
      console.log('NULL');
    } else {
      $('#list').append('<li id="' + data[i].id + '" class="list-item clearfix"><div class="row"><div class="col-9"><span class="date">' + data[i].dateToCreation + '</span><h2>' + data[i].title + '</h2><pre>' + data[i].text + '</pre></div><div class="col-3"><button id="delete-item" type="button" value="Delete" data-id="' + data[i].id + '"><i class="material-icons">clear</i></button></div></li>');
    }
};

export function deleteItem(id: number): void {
  let data: Array<ItemList> = getList();
  data[id].title = 'null';
  localStorage.setItem('data', JSON.stringify(data));
  location.reload();
}

export function deleteList(): void {
  localStorage.removeItem('data');
  location.reload();
}