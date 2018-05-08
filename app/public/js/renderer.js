
appUtils.onlineStatus('on','red','green',help.online)
appUtils.onlineStatus('off','green','red',help.offline)

var inputHelpLst = ["To","From","Subject"]


//console.log(itemList.slice(0,-1))
_.forEach(inputHelpLst,function(i){
  appUtils.helpMsg('#mail'+i,'mail'+i, help['mail'+i])
})

_.forEach(appConf.itemList,function(i){
  appUtils.storeDefault('#'+i+'Store','#mail'+_.capitalize(i))
})

ipcRenderer.on('modalData', function(event,arg){
  console.log('modal data recieved.')
})

appUtils.updateOnlineStatus()
ipcRenderer.send('getData')

appUtils.list(appConf.tplDirs.to,'To')
appUtils.list(appConf.tplDirs.text,'Text')
appUtils.htmlList(appConf.tplDirs.html)
appUtils.defaults();
appUtils.mask('#mainSettings','.mask','#settingsMenu')

_.forEach(appConf.sounds,function(i){
  $('#audio').append('<source src="'+appConf.paths.audio+i+'"></source>');
})

var hvr = $("#audio")[0];
$(".btn").hover(function(){
  hvr.play();
})



/*
setInterval(function(){
  console.log(
    process.getCPUUsage(),
    process.getProcessMemoryInfo(),
    process.getSystemMemoryInfo(),
    process.cwd()
  )
},3000)
*/


$('body')
  .append(tpl.toTop)
  .append(tpl.helpTpl)
  $('#mailTo').keyup(function(event) {
    mailToList = _.words(this.value, /[^, ]+/g);
    $('#mailToList').empty();
    _.forEach(mailToList,function(i){
      $('#mailToList').append('<span class="new badge">'+i+'</span>')
    })
  });

  appUtils.initEditor();
  appUtils.scrollTop();
  appUtils.showtoast('loading');




$(document).ready(function(){

  $('.modal').modal({
    dismissible: appConf.dismissible,
    opacity: appConf.opacity,
    inDuration: appConf.inDuration,
    outDuration: appConf.outDuration,
    startingTop: appConf.startingTop,
    endingTop: appConf.endingTop,
    ready: appUtils.mdlReady,
    complete: appUtils.mdlComplete
  });
  appUtils.editorSettingsInit()
  appUtils.localStorage()

  _.forIn(_.omit(appConf.mail,'auth'),function(i,e){
    $('#mailOps').append('<label for="#'+e+'" class="blink">'+_.startCase(e)+'</label><input id="'+e+'" type="text" class="validate" value="'+i+'">')
  })
  _.forIn(_.omit(appConf.mail.auth),function(i,e){
    $('#mailOps').append('<label for="#'+e+'" class="blink">'+_.startCase(e)+'</label><input id="'+e+'" type="text" class="validate" value="'+i+'">')
  })

});

var exp = {
  "to":appConf.tplDirs.to,
  "text":appConf.tplDirs.text
};

_.forIn(exp,function(e,i){
  $('#'+i+'Export').click(function() {
    appUtils.write(e,'#mail'+_.capitalize(i)+'Export','txt','#mail'+_.capitalize(i));
    appUtils.list(e,_.capitalize(i))
  });
})
$('#htmlExport').click(function() {
  appUtils.write(appConf.tplDirs.html,'#mailHtmlExport','html','html');
  appUtils.list(appConf.tplDirs.html,'Html')
});
