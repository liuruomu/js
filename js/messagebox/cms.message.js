(function() {
	if(typeof messageBox == "undefined" || messageBox == null) {
		messageBox = {};
	}
	var _messagebox = function(options) {
		this._type = options._type || "error";
		this._msg = options._msg || "";
		this._delay = options._delay || 5;

		var me = this;
		var _init = function() {
			_createContent();
			_createTips();
		}
		var _createContent = function() {
			if(document.getElementsByClassName('messagebox_content').length != 0) {
				return ;
			}
			else {
				var body = document.getElementsByTagName("body")[0];
				var content = document.createElement("div");
				content.className = "messagebox_content";
				var title = document.createElement("div");
				title.className  = "messagebox_title";
				var titleLabel = document.createElement('label');
				titleLabel.className = "messagebox_title_label";

				setTextContent(titleLabel,"全部清除")
				// titleLabel.innerText = "全部清除";
				titleLabel.onclick = function() {
					if(document.getElementsByClassName('messagebox_content').length == 0) {
						return ;
					}
					var body = document.getElementsByTagName("body")[0];
					var content = document.getElementsByClassName('messagebox_content')[0];
					body.removeChild(content);
				}
				title.appendChild(titleLabel);
				content.appendChild(title);
				body.appendChild(content);
			}
		}

		var _createTips = function() {
			if(document.getElementsByClassName('messagebox_content').length == 0) {
				return ;
			}
			var content = document.getElementsByClassName('messagebox_content')[0];
			var pane = document.createElement('div');
			pane.className = "messagebox_pane";
			var icon = document.createElement("span");
			icon.className = me._type == "success" ? "messagebox_pane_success_icon" : "messagebox_pane_error_icon";
			pane.appendChild(icon);
			var tip = document.createElement('div');
			tip.className = "messagebox_pane_tip";
				setTextContent(tip,me._msg)
			// tip.innerText = me._msg;
			pane.appendChild(tip);
			var closeBtn = document.createElement("span");
			closeBtn.className = "messagebox_pane_close_btn";
			closeBtn.onclick = function() {
				if(content && pane) {
					content.removeChild(pane);
					if(timer) {
						timer = clearInterval(timer);
					}
					updateContent();
				}
			}
			pane.appendChild(closeBtn);
			var timeLabel = document.createElement("span");
			timeLabel.className = "messagebox_pane_time_label";
			var time = 0;
			var variTime = me._delay - time + "s";
			setTextContent(timeLabel,variTime)

			var timer = setInterval(function(){
                time += 1;
                if (time >= me._delay){
                    timer = clearInterval(timer);
					if(content && pane) {
						content.removeChild(pane);
						updateContent();
					}
                }
                if(timeLabel) {
									var variTime = me._delay - time + "s";
									setTextContent(timeLabel,variTime)
					// timeLabel.innerText = me._delay - time + "s";
				}

            }, 1000);
			pane.appendChild(timeLabel);
			content.appendChild(pane);
		}

		var setTextContent=function(element, text) {
    while (element.firstChild!==null)
        element.removeChild(element.firstChild); // remove all existing content
    element.appendChild(document.createTextNode(text));
}

		var updateContent = function() {
			if(document.getElementsByClassName('messagebox_pane').length > 0) {
				return ;
			}
			if(document.getElementsByClassName('messagebox_content').length == 0) {
				return ;
			}
			var body = document.getElementsByTagName("body")[0];
			var content = document.getElementsByClassName('messagebox_content')[0];
			body.removeChild(content);
		}

		_init();

	}

	messageBox.showMessage = function(type,msg,delay) {
		if(!(type == "success" || type == "error")) {
			return ;
		}
		var options = {
			_type: type,
			_msg: String(msg),
			_delay: parseInt(String(delay)) == NaN ? 5 : parseInt((delay))
		};
		return new _messagebox(options);
	}
})()
