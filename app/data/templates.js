_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

exports.mainTpl = _.template('<div class="main w90"><div class="row"><div id="mailMain" class="col s6"></div><div class="col s6"><div class="card previewCard"></div></div></div></div>');

exports.navTpl = _.template('<nav><div class="nav-wrapper"><div class="brand-logo blink">{{title}}</div></nav>');
exports.toTop = _.template('<span id="toTop" class="fa fa-chevron-up"></span>');
exports.globeTpl = _.template('<div id="{{id}}" class="redGlobe blink"></div>');
exports.helpTpl  = _.template('<div id="helpDiv"><span id="AboutDevTypeText" class="typeing blink"></span><span class="blinker">&#32;</span></div>');
exports.importMdlTpl = _.template('<div id="mail{{id}}Mdl" class="modal bottom-sheet"><div class="modal-content"><h4>{{id}} Modal</h4><div class="{{id}}FilesTtl">test</div><div class="dlt">delete</div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-light btn-flat">close</a></div></div>');
exports.exportMdlTpl = _.template('<div id="mail{{id}}ExportMdl" class="modal bottom-sheet"><div class="modal-content"><h4>export mail tpl</h4><input id="mail{{id}}Export" type="text" class="validate" placeholder="file name"></div><div class="modal-footer"><a id="{{name}}Export" class="modal-action modal-close waves-effect waves-light btn-flat">save</a><a href="#!" class="modal-action modal-close waves-effect waves-light btn-flat">close</a></div></div>');

exports.btnA = _.template('<a class="waves-effect waves-light btn modal-trigger" href="{{href}}">{{title}}</a>');
exports.btnB = _.template('<button type="button" id="{{id}}" class="waves-effect waves-light btn">{{title}}</button>');

exports.inputTpl = _.template('<div class="input-field mt50"><h4>{{upper}}</h4><input id="mail{{upper}}" type="text" class="validate" placeholder="{{upper}}"><a id="{{lower}}Default" class="waves-effect waves-light btn">default</a><a id="{{lower}}Store" class="waves-effect waves-light btn">store</a></div>');

exports.textareaTpl = _.template('<div class="input-field mt50"><h4>{{upper}}</h4><textarea id="mail{{upper}}" class="materialize-textarea mt50" placeholder="{{upper}}"></textarea><a id="{{lower}}Default" class="waves-effect waves-light btn">default</a><a id="{{lower}}Store" class="waves-effect waves-light btn">store</a><a class="waves-effect waves-light btn modal-trigger" href="#mail{{upper}}Mdl">import</a><a class="waves-effect waves-light btn modal-trigger" href="#mail{{upper}}ExportMdl">export</a>');

exports.attachmentsTpl = _.template('<div class="input-field mt50"><h4>Attachments</h4><div id="mailAttachmentList" class="badgeDiv"></div><a id="#attachmentImport" class="waves-effect waves-light btn modal-trigger" href="#mailAttachmentMdl">import</a></div>');
