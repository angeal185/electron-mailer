const fs = require('fs'),
modJSON = require('../../modules/modJSON');

var editor = ace.edit("mailHtml")

function logEach(i){
  _.forEach(i,function(e){
    console.log(e)
  })
}

exports.storeDefault = function(a,b){
  var src = './app/config/appConfig.json'
  $(a).click(function() {
    var choice = a.slice(1,-5),
    ud;
    if (choice === 'html'){
      ud = editor.getValue()
    } else {
      var ud = $(b).val();
    }

    logEach([ud,choice])
    fs.readFile(src,'utf8',function(err, e){
      if (err) {
        console.log(err);
      }
      e = JSON.parse(e);
      e.defaults[choice] = ud;
      fs.writeFile(src, JSON.stringify(e), function(err){
        if (err) throw err;
        appUtils.showtoast('default updated');
        appUtils.defaults();
      });
    })
  });
}

exports.write = function(dir,b,ext,c){
  var src = $(b).val(),
  dest = $(c).val();

  fs.writeFile(dir + src + '.' + ext, dest, function(err){
    if (err) throw err;
    appUtils.showtoast(dest + ' saved');
    logEach([src,dir,dest])
  });
}


function ToastBuilder(options) {
  // options are optional
  var opts = options || {};


  // setup some defaults
  opts.defaultText = opts.defaultText;
  opts.displayTime = opts.displayTime || 3000;
  opts.target = 'body';

  return function (text) {
    $('<div/>')
      .addClass('toastMsg blink')
      .prependTo($(opts.target))
      .text(text || opts.defaultText)
      .queue(function(next) {
        $(this).css({
          'opacity': 1
        });
        var topOffset = 40;
        $('.toastMsg').each(function() {
          var height = $(this).outerHeight();
          var offset = 15;
          $(this).css('bottom', topOffset + 'px');

          topOffset += height + offset;
        });
        next();
      })
      .delay(opts.displayTime)
      .queue(function(next) {
        var width = $(this).outerWidth() + 20;
        $(this).css({
          'right': '-' + width + 'px',
          'opacity': 0
        });
        next();
      })
      .delay(600)
      .queue(function(next) {
        $(this).remove();
        next();
      });
  };
}

function helpDiv(a, b) {
  for (var data = [{
      AboutDevTypeText: "<span>" + a + "<br/><br/>" + b + "</span>"
    }], allElements = $(".typeing"), j = 0; j < allElements.length; j++) {
    var isTag, text, currentElementId = allElements[j].id,
      currentElementIdContent = data[0][currentElementId],
      element = document.getElementById(currentElementId),
      devTypeText = currentElementIdContent,
      i = 0;
    ! function type() {
      if ((text = devTypeText.slice(0, ++i)) !== devTypeText) {
        element.innerHTML = text + '<span class="blinker">&#32;</span>';
        var char = text.slice(-1);
        if ("<" === char && (isTag = !0), ">" === char && (isTag = !1), isTag) return type();
        setTimeout(type, 60)
      }
    }()
  }
}


exports.list = function(i,x) {
  var items = _.clone(arr);
  var choice = $('#mail'+x+'Mdl > .modal-content');
  choice.empty();
  fs.readdir(i, function(err, files) {
    if (err) {
    console.log(err);
    return;
  }
    _.forEach(files,function(f){
      choice.append('<a class="waves-effect waves-light btn mr5 '+x+'Files">'+f+'</a>')
    });
    $('.'+x+'Files').click(function(){
      fs.readFile(i+this.text,'utf8',function(err, e){
        if (err) {
          console.log(err);
        }
        $('#mail'+x).val(e).keyup();
      })
    })
  });
};

exports.htmlList = function(i) {
  var items = _.clone(arr);
  fs.readdir(i, function(err, files) {
    if (err) {
    console.log(err);
    return;
  }
    _.forEach(files,function(f) {
      $('#mailHtmlMdl > .modal-content').append('<a class="waves-effect waves-light btn mr5 toHtml">'+f+'</a>')
    });
    $('.toHtml').click(function(){
      fs.readFile(i+this.text,'utf8',function(err, e){
        if (err) {
          console.log(err);
        }
      })
    })
  });
};

exports.showtoast = new ToastBuilder();

exports.scrollTop = function() {
  $(window).scroll(function() {
    $(this).scrollTop() > 100 ? $("#toTop").fadeIn() : $("#toTop").fadeOut();
  }), $("#toTop").click(function() {
    return $("html, body").animate({
        scrollTop: 0
    }, 1e3), !1;
  });
}

exports.backToTop = function(i){
  $('html,body').animate({scrollTop: i},200);
}

exports.disableBtn = function(i) {
  $(i).attr("disabled", "true")
}

exports.enableBtn = function(i) {
  $(i).removeAttr("disabled")
}

exports.helpMsg = function(a,b,c){
  $(a).hover(function() {
    $('body').append(helpTpl())
    $('#helpDiv').fadeIn('fast');
    helpDiv(b,c);
  }, function() {
    $('#helpDiv').fadeOut('slow');
    $('#helpDiv').remove();
  });
}

exports.onlineStatus = function(a,b,c,d){
 ipcRenderer.on(a + 'line', function(){
   $('#onlineStatus').removeClass(b + 'Globe').addClass(c + 'Globe')
   console.log(a + 'line')
   appUtils.helpMsg('#onlineStatus',a + 'line', d)
 })
}

exports.updateOnlineStatus = function() {
  ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline')
}

exports.initEditor = function() {
  function previewUpdate(){
    $('.previewCard').html(editor.getValue())
  }
  editor.setTheme("ace/theme/twilight"),
  editor.getSession(), editor.session.setMode("ace/mode/html"),
  editor.commands.addCommand({
    name: "showSettingsMenu",
    bindKey: {
      win: "Ctrl-i",
      mac: "Command-i"
    },
    exec: function(editor) {
      ace.config.loadModule("ace/ext/settings_menu", function(module) {
        module.init(editor), editor.showSettingsMenu()
      })
    }
  })
  editor.on("change", _.debounce(previewUpdate, 500))
  //  editor.execCommand("showSettingsMenu")
}

exports.editorSettingsInit = function() {
  $("#editorSettings").click(function() {
    editor.execCommand("showSettingsMenu");

    $(".chkbx").after(function() {
        return "<label for='" + this.id + "'></label>";
      });

    })
}

exports.defaults = function() {
  var src = './app/config/appConfig.json'
  fs.readFile(src,'utf8',function(err, data){
    if (err) {
      console.log(err);
    }
    data = JSON.parse(data);
    _.forIn(data.defaults,function(i,e){
      $('#'+e+'Default').off();
      $('#'+e+'Default').click(function() {
        if (e === 'html'){
          editor.setValue(i)
        } else {
          $(this).siblings('input, textarea').val(i)
          //console.log(i)
        }
      });
    })
  })
}


exports.mask = function(a,b,c){
  $(a).click(function() {
    $(b+','+c).fadeIn('slow');
  });
  $(b).click(function() {
    $(b+','+c).fadeOut('slow');
  });
}
