var f = function(list,salt) {
  if (!salt)
    var salt = generateKey(8);

  var indexes = new Array(list.length)
    , options = new Array();

  for (var i = 0; i < list.length; i++) {
    for (var j = 0; j < list[i].weight; j++) {
      options.splice(Math.floor(Math.random()*options.length),0,i)
    }
  }

  for (var i = 0; i < indexes.length; i++) {
    indexes[i] = options[(parseInt('0x' + list[i].key) * parseInt('0x' + salt)) % options.length];
    options = removeFromList(indexes[i], options);
  }

  return { salt: salt, indexes: indexes }
}

var removeFromList = function (who, list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] === who) {
      list.splice(i,1)
      i--;
    }
  }
  return list;
}


var generateKey = function(l) {
  //Generate a random 16 bit key with length l
  var chars = ['0','1','2','3','4','5','6','7','a','b','c','d','e','f'];
  var key = '';
  
  for (var i = 0; i < l; i++) {
    key += chars[Math.floor(Math.random()*chars.length)];
  }

  return key;
}

var rrl = function () {
  this.f = f;
  this.generateKey = generateKey
}

module.exports = new rrl();
