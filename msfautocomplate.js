export default class MSFautocomplate {
  search;
  settings;
  container;
  ul;
  selectedId;
  selectedName;
  constructor(search, settings) {
    this.search = search;
    this.settings = settings;
    if (this.className) this.search.className = this.settings.className;
    if (!this.settings.width) this.settings.width = '250px';
    if (!this.settings.height) this.settings.height = '45px';
    this.create();
    this.init();
    this.render([...this.settings.dataList]);
    this.container.style.display = 'none';
  }
  init() {
    document.addEventListener('click', () => {
      this.container.style.display = 'none';
    });
    let self = this;
    this.search.addEventListener(
      'keyup',
      function () {
        if (self.settings.severSide) {
          self.getDataFromServer(self.search.value);
        } else {
          self.data_render(self.search.value);
        }
      }.bind(self),
    );
  }
  create() {
    this.search.style.width = this.settings.width;
    this.container = document.createElement('div');
    this.container.className = 'msf_autocomplate_container';
    this.search.after(this.container);
    this.ul = document.createElement('ul');
    this.ul.style.width = this.settings.width;
    this.ul.className = 'msf_autocomplate';
    this.container.append(this.ul);
  }
  render(data) {
    this.ul.innerHTML = '';
    let self = this;
    for (let i = 0; i < data.length; i++) {
      let lebal = document.createElement('lebal');
      lebal.setAttribute('msf_data.id', data[i].id);
      lebal.addEventListener(
        'click',
        function () {
          self.search.value = lebal.innerText;
          if (self.settings.onSelected) {
            let id = lebal.getAttribute('msf_data.id');
            let name = lebal.innerText;
            self.selectedId = id;
            self.selectedName = name;
            self.settings.onSelected(id, name, self);
          }
        }.bind(lebal, self),
      );
      let li = document.createElement('li');
      li.innerText = data[i].name;
      lebal.append(li);
      this.ul.append(lebal);
      this.container.style.display = '';
    }
  }
  data_render(value) {
    value = value.toLowerCase();
    let data = [];
    if (this.settings && this.settings.dataList) {
      for (let i = 0; i < this.settings.dataList.length; i++) {
        if (this.settings.dataList[i].name.toLowerCase().search(value) != -1) {
          data.push(this.settings.dataList[i]);
        }
      }
    }
    this.render(data);
  }

  httpRequest(prop = {}) {
    let {
      url, //query string;
      method = 'GET',
      contentType = 'application/json',
      async = true,
      responseType = 'Object',
      headers = [],
    } = prop;

    let prom = new Promise((resolve, reject) => {
      try {
        var request = new XMLHttpRequest();
        request.open(method, url, async);
        request.setRequestHeader('Content-Type', contentType);
        request.setRequestHeader(
          'Cache-Control',
          'no-cache, no-store, must-revalidate',
        );
        request.setRequestHeader('Pragma', 'no-cache');
        request.setRequestHeader('Expires', '0');
        request.setRequestHeader('Cache-Control', 'public, max-age=0');
        if (headers) {
          for (let i = 0; i < headers.length; i++) {
            request.setRequestHeader(headers[i][0], headers[i][1]);
          }
        }
        request.onreadystatechange = function () {
          if (this.readyState == 4) {
            let res = this.responseText;
            if (responseType == 'Object') {
              res = JSON.parse(res);
            }
            resolve(res);
          }
        };
        request.send();
      } catch (error) {
        reject(error);
      }
    });
    return prom;
  }
  getDataFromServer(value) {
    let http = this.httpRequest({
      url: this.settings.severSide.url + '?search=' + encodeURIComponent(value),
      method: 'get',
      headers: this.settings.severSide.headers,
    });
    http
      .then((res) => {
        console.log(res);
        if (res.statusCode == 200) {
          this.settings.dataList = [...res.data];
          this.data_render(value);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getSelectedData() {
    if (this.selectedId && this.selectedName) {
      return { id: this.selectedId, name: this.selectedName };
    } else {
      return null;
    }
  }
}
