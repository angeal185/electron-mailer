// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.



appUtils.onlineStatus('on','red','green',help.online)
appUtils.onlineStatus('off','green','red',help.offline)

var inputHelpLst = ["To","From","Subject"]
_.forEach(inputHelpLst,function(i){
  appUtils.helpMsg('#mail'+i,'mail'+i, help['mail'+i])
})


ipcRenderer.on('modalData', function(event,arg){
  console.log('modal data recieved.')
})


appUtils.updateOnlineStatus()
ipcRenderer.send('getData')



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
