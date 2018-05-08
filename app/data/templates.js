_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

exports.navTpl = _.template('<nav><div class="nav-wrapper"><div class="brand-logo blink">{{title}}</div></nav>');
exports.toTop = _.template('<span id="toTop" class="fa fa-chevron-up"></span>');
exports.globeTpl = _.template('<div id="{{id}}" class="redGlobe blink"></div>');
exports.helpTpl  = _.template('<div id="helpDiv"><span id="AboutDevTypeText" class="typeing blink"></span><span class="blinker">&#32;</span></div>');
exports.importMdlTpl = _.template('<div id="mail{{id}}Mdl" class="modal bottom-sheet"><div class="modal-content"><h4>{{id}} Modal</h4><div class="{{id}}FilesTtl">test</div><div class="dlt">delete</div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-light btn-flat">close</a></div></div>');
exports.exportMdlTpl = _.template('<div id="mail{{id}}ExportMdl" class="modal bottom-sheet"><div class="modal-content"><h4>export mail tpl</h4><input id="mail{{id}}Export" type="text" class="validate" placeholder="file name"></div><div class="modal-footer"><a id="{{name}}Export" class="modal-action modal-close waves-effect waves-light btn-flat">save</a><a href="#!" class="modal-action modal-close waves-effect waves-light btn-flat">close</a></div></div>');
