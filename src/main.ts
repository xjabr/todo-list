// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import * as $ from 'jquery';
import { ItemList, loadList, setItem, getList, deleteItem, deleteList } from './list';

$(window).ready((): void => {
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
      let d: string = new Date().toString();
      let date: string;

      if (d.includes('GMT+0200 (Ora legale dell’Europa centrale)')) {
        date = d.toString().replace('GMT+0200 (Ora legale dell’Europa centrale)', '');
      }

      title = title.replace(/\n/, '<br />');
      let item: ItemList = { id: 0, title: title, text: text, dateToCreation: date.toString() };

      if (setItem(item)) {
        location.reload();
      } else {
        alert('Error to add item in the list');
      }
    } else {
      let d: string = new Date().toString();
      let date: string;

      if (d.toString().includes('GMT+0200 (Ora legale dell’Europa centrale)')) {
        date = d.toString().replace('GMT+0200 (Ora legale dell’Europa centrale)', '');
      }

      title = title.replace(/\r?\n/g, '<br />');
      let item: ItemList = { id: data[data.length - 1].id + 1, title: title, text: text, dateToCreation: date.toString() };

      if (setItem(item)) {
        location.reload();
      } else {
        alert('Error to add item in the list, list is full (' + data.length + '/1000) or another error!');
      }
    }
  });

  $('#delete-item').click(function (e: JQuery.Event): void {
    let index: JQuery.Selector = $(this).attr('data-id');
    deleteItem(parseInt(index));
  });

  $('#delete-list').click((e: JQuery.Event): void => { deleteList(); });
});