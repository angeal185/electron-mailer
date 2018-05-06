
appUtils.onlineStatus('on','red','green',help.online)
appUtils.onlineStatus('off','green','red',help.offline)

var inputHelpLst = ["To","From","Subject"]
var itemList = ["to","from","subject","text","html"]

_.forEach(inputHelpLst,function(i){
  appUtils.helpMsg('#mail'+i,'mail'+i, help['mail'+i])
})

_.forEach(itemList,function(i){
  appUtils.storeDefault('#'+i+'Store','#mail'+_.capitalize(i))
})

ipcRenderer.on('modalData', function(event,arg){
  console.log('modal data recieved.')
})


appUtils.updateOnlineStatus()
ipcRenderer.send('getData')



appUtils.list('./templates/mailToList/','To')
appUtils.list('./templates/mailToList/','Text')
appUtils.htmlList('./templates/html/')
appUtils.defaults();
appUtils.mask('#mainSettings','.mask','#settingsMenu')


_.forEach(appConf.sounds,function(i){
  $('#audio').append('<source src="'+appConf.paths.audio+i+'"></source>');
})


var hvr = $("#audio")[0];
  $(".btn").hover(function(){
  hvr.play();
});

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
  .append(toTop)
  .append(helpTpl)
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
  ready: function(modal, trigger) {
    console.log('modal '+this.id.slice(4,-3)+' opened');
    console.log('requesting '+this.id+' data from server...');
    ipcRenderer.send('modalData', this.id)
  },
  complete: function() {
     console.log('modal '+this.id.slice(4,-3)+' closed');
   }
});
appUtils.editorSettingsInit()
});


$('#toExport').click(function() {
  appUtils.write('./templates/mailToList/','#mailToExport','txt','#mailTo');
  appUtils.list('./templates/mailToList/','To')
});
