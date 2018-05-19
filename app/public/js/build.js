var dv = $('<div></div>');

dv.clone().attr('id', 'particle')
  .prependTo('body')
  .after(
    tpl.mainTpl(),
    dv.clone().attr('id', 'mdls'),
    dv.clone().addClass('bottomNav'),
    dv.clone().addClass('mask'),
    dv.clone().attr('id', 'settingsMenu')
  )

_.forEach(['to','from','subject'],function(i){
  $('#mailMain').append(tpl.inputTpl({"upper":_.capitalize(i),"lower":i}))
})

_.forEach(['text','html'],function(i){
  $('#mailMain').append(tpl.textareaTpl({"upper":_.capitalize(i),"lower":i}))
})

$('#mailMain').append(tpl.attachmentsTpl());

$('#mailTo').after('<div id="mailToList" class="badgeDiv"></div>')
$('#toStore').after(
  tpl.btnA({
    "href":"#mailToMdl",
    "title":"import"
  }),
  tpl.btnA({
    "href":"#mailToExportMdl",
    "title":"export"
  })
);

_.forEach(['btn','globe'],function(i){
  $('.bottomNav').append(dv.clone().addClass(i+'Div'))
})

_.forIn(appConf.btmNav.btn,function(e,i){
  $('.btnDiv').append('<button type="button" id="'+i+'" class="mini-btn waves-effect waves-light blink">'+e+'</button>')
})

_.forEach(appConf.btmNav.globe,function(i){
  $('.globeDiv').append('<div id="'+i+'" class="redGlobe blink"></div>')
})

_.forIn(appConf.tplDirs,function(i,e){
  $('#mdls').append(
    tpl.importMdlTpl({"id":_.capitalize(e)}),
    tpl.exportMdlTpl({"id":_.capitalize(e),"name":e})
  )
})

$('#mdls').append(
  tpl.importMdlTpl({"id":"Attachment"})
)

_.forIn(appConf.settingsMenu,function(i,e){
  $('#settingsMenu').append(dv.clone().attr('id', e).append('<h3>'+i+'</h3>'))
})

_.forEach(["storeSession","resetSession"],function(i){
  $('#session').append(tpl.btnB({"id":i,"title":i.slice(0,-7)}))
})

_.forEach(["sendMail","resetMail"],function(i){
  $('#confirm').append(tpl.btnB({"id":i,"title":i.slice(0,-4)}))
})



$('body').prepend(tpl.navTpl({"title":appConf.title}))
var mailToList = _.clone(arr);
