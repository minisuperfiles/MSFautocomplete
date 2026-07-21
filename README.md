# MSFautocomplete

MSFatuocomate is search input library. When you any item name you will get id and name. made with pure JavaScript.

## Installation

Use npm to install the latest version.

```
npm i msfautocomplete
```

```javascript
import MSFautocomplete from 'msfautocomplete';
import 'msfautocomplete/msfautocomplete.min.css';
```

Alternatively, you can simply embed it in your HTML file.

```html
<script src="https://cdn.jsdelivr.net/gh/minisuperfiles/MSFautocomplete/msfautocomplete.min.js"></script>
<link
  href="https://cdn.jsdelivr.net/gh/minisuperfiles/MSFautocomplete/msfautocomplete.min.css"
  rel="stylesheet"
/>
```

## Using Example

Add references to MSFautocomplete’s JavaScript and Stylesheet.

```html
<script src="msfautocomplete.js"></script>
<link rel="stylesheet" href="msfautocomplete.css" />
```

```html
<input type="text" class="searchbox" name="search" id="search" />
```

There are two types one is client side search and anthor one is server side search.

## server side example

```javascript
let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YTYyMTYyZC1mMjVhLTQ0NWQtYTRhMC05MDBiNjRmNjVhYzciLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzg0NTY0NzE5LCJleHAiOjE3ODQ1NjgzMTl9.2FfS5vkk9z_u4Jb9GbuIbYfpXvWubmNVF5PsS4G9x7I';
var search = new MSFautocomplate(document.querySelector('#search'), {
  width: '250px',
  height: '45px',
  className: 'form-control',
  onSelected: function (id, name, instance) {
    console.log('ok...', id, name, instance);
  },
  /* severSide is sever side */
  severSide: {
    url: 'http://localhost:3005/api/categories/cat/search',
    headers: [['Authorization', 'Bearer ' + token]],
  },
});
```

## How to handle server request.

Searching data come from qurey format.

### Example

http://localhost:3005/api/categories/cat?search=ja

### How to handle in database query

````sql SELECT cat_name as name,id FROM category
where LOWER(cat_name) LIKE LOWER('%${search}%') LIMIT 100```

${search} is varable. It's come from url query requst.

### Response must be like this

```javacript
return { statusCode: 200, data:[
    {id:1, name: 'Java' },
    {id:2, name: 'JavaScript' }
]}
````

## Client side example

```javascript
var search = new MSFautocomplate(document.querySelector('#search'), {
  width: '250px',
  height: '45px',
  className: 'form-control',
  onSelected: function (id, name, instance) {
    console.log('ok...', id, name, instance);
  },
  /* data list is client side */
  dataList: [
    { id: '1', name: 'Java' },
    { id: '2', name: 'Javascript' },
    { id: '3', name: 'HTML' },
    { id: '4', name: 'CSS' },
    { id: '5', name: 'Pyton' },
  ],
});
```

## Syntax (arguments)

```
new MSFautocomplate(element, settings)

element = document.getElementById('search')
settings = {
  width: '350px',
  height: '40px',
  className: 'myclass',
  onSelected: function (id, name, instance) {
    console.log('ok...', id, name, instance);
  },
  /* data list is client side */
  dataList: [
    { id: '1', name: 'Java' },
    { id: '2', name: 'Javascript' },
    { id: '3', name: 'HTML' },
    { id: '4', name: 'CSS' },
    { id: '5', name: 'Pyton' },
  ],
  /* Sever side */
  severSide: {
    url: 'http://localhost:3005/api/categories/cat/search',
    headers: [['Authorization', 'Bearer 2FfS5vkk9z_u4Jb9GbuIbYfpXvWubmNVF5PsS4G9x7I']],
  },
}
```

<ol type="1">
<li><b>width</b> : It is control of the MSFautocomplate width.</li>
  <li><b>height</b> :  It is control of the MSFautocomplate height.</li>
  <li><b>className</b> : if you need any custom style, give css class name, it will apply to MSFautocomplate.</li>
  
  <li><b>onSelected</b> : When MSFautocomplate is changed this callback function will run. In this function, there are three parameters.<ol type="i">
  <li><b>id</b> : you receive item id</li>
  <li><b>name</b> : You get selected item name.</li>
  <li><b>instance</b> : It's instance variable of autocomplate, you can access MSFautocomplate properties and methods</li></ol></li>
  <li><b>getSelectedData</b> : This method uses to get user search data.</li>
  </ol>
