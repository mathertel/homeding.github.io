// elementsvg.js: script for api of element block diagram

var pObj = document.querySelector('#panel');
var tObj = document.querySelector('#templates');

var y = 12;

function createBox(tName, txt) {
  var cn = tObj.querySelector('#' + tName + 'Template').cloneNode(true);
  cn.removeAttribute('id');
  cn.setAttribute('transform', 'translate(0,' + y + ')');
  var txtObj = cn.querySelector('text');
  txtObj.textContent = txt;
  pObj.appendChild(cn);

  // document.documentElement.setAttribute('viewBox', '0 0 120 ' + (y + 20));
  document.documentElement.setAttribute('height', (y + 28));
  y += 12;
};

function create(def) {
  // remove old blocks
  pObj.querySelectorAll('g.block').forEach(function (x) {
    pObj.removeChild(x)
  });
  y = 12;

  // header
  pObj.querySelector('text').textContent = def.name;
  pObj.querySelector('image').setAttribute("xlink:href", "i/" + def.name + ".svg");

  if (def.properties)
    def.properties.forEach(function (e) {
      if (def.events && (!def.events.includes(e))) {
         createBox("property", e); 
        }
    });
  if (def.events)
    def.events.forEach(function (e) {
      createBox("event", e);
    });
  if (def.actions)
    def.actions.forEach(function (e) {
      createBox("action", e);
    });
};

document.api = {
  create: create
};