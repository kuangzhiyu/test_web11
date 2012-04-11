// Author: Luoyi <luoyi@job001.cn>
var FBCTRL = {
    // 需要回复
    hasReply    : true,
    // 当前页面
    currentPage : document.URL,
    // 反馈表单容器，即悬浮层
    formBox     : null,
    // 反馈表单
    fbForm      : null,
    // 右下角的悬浮链接
    fbLink      : null,
    // 内容
    fbMessage   : null,
    // 用户
    fbUser      : null,
    // 邮件或电话
    fbEmail     : null,
    // 当前用户信息请求地址
    uiAction    : '/modules/feedback/index.php?m=userinfo',
    // 当前用户信息
    currentUser : null,
    // getElementById的别名
    getById     : function (id) {
        return document.getElementById(id);
    },
    // 初始化
    init        : function () {
        this.formBox                = document.getElementById('advice_Bg');
        this.fbLink                 = document.getElementById('feedback-link');
        this.fbForm                 = document.getElementById('feedback-form');
        this.fbMessage              = document.getElementById('feedback-msg');
        this.fbReply                = document.getElementById('feedback-replyme');
        this.fbUser                 = document.getElementById('feedback-user');
        this.fbEmail                = document.getElementById('feedback-email');

        // Ajax Send
        var xmlhttp, self = this;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {// code for IE6, IE5
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                self.currentUser = eval('('+xmlhttp.responseText+')');
            }
        };

        xmlhttp.open('GET', this.uiAction, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send();
    },
    // 打开反馈表单容器
    open        : function () {
        if (this.currentUser.type == 'jobseeker') {
            this.fbUser.value = this.currentUser.name;
            this.fbEmail.value = this.currentUser.email;
        } else if (this.currentUser.type == 'hrmanagers') {
            this.fbUser.value = this.currentUser.name;
            if (this.currentUser.tel != '') {
                this.fbEmail.value = this.currentUser.tel;
            } else {
                this.fbEmail.value = this.currentUser.email;
            }
        } else {
            this.fbReply.checked        = true;
            this.noReply();
        }

        document.getElementById('feedback-tel').innerHTML = this.currentUser.cs_tel;
        this.formBox.className      = 'ready';
        this.formBox.style.display  = '';
        this.fbLink.style.display   = 'none';
        
        console.log(this.currentUser.cs_tel);
    },
    // 关闭反馈表单容器
    close       : function () {
        this.formBox.style.display  = 'none';
        this.fbLink.style.display   = '';

        // 关闭时清空表单项
        //this.hasReply               = true;
        this.fbMessage.value        = '';
        //this.fbReply.checked        = false;
        this.fbEmail.value          = '';
        this.fbUser.value           = '';
        //this.fbEmail.disabled       = false;
        //this.fbUser.disabled        = false;
    },
    // 是否需要回复
    noReply    : function () {
        if (this.hasReply) {
            this.hasReply           = false;
            this.fbEmail.disabled   = true;
            this.fbUser.disabled    = true;
        } else {
            this.hasReply           = true;
            this.fbEmail.disabled   = false;
            this.fbUser.disabled    = false;
        }
    },
    // 发送Ajax请求，提交反馈内容
    send        : function () {
        // 克隆 this 关键字
        var self                    = this, data = 'page=' + encodeURIComponent(this.currentPage);
		var reEmpty					= /^[ ]*$/;
        if (this.fbMessage.value == '' || reEmpty.test(this.fbMessage.value) ) {  
            alert('问题或建议内容不能为空!');
            return false;
        } else {
            data += '&msg=' + encodeURIComponent(this.fbMessage.value);
        }
        if (this.hasReply == true) {
            if (this.fbUser.value == '' || reEmpty.test(this.fbUser.value) ) {
                alert('您的称呼不能为空!');
                return false;
            } else {
                data += '&user=' + encodeURIComponent(this.fbUser.value);
            }
            if (this.fbEmail.value == '') {
                alert('电话/Email不能为空!');
                return false;
            } else {
                // 邮箱
                var reMail      = /^(?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i;
                // 电话
                var rePhone     = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
                // 电话（不含区号、分机）
                var reNumber    = /^\d{7,8}$/;
                // 手机
                var reMobile    = /^0*(13|15|18)\d{9}$/;

                if (reMail.test(this.fbEmail.value) || rePhone.test(this.fbEmail.value) || reNumber.test(this.fbEmail.value) || reMobile.test(this.fbEmail.value)) {
                    data += '&email=' + encodeURIComponent(this.fbEmail.value);
                } else {
                    alert('请填写正确的电话/Email!');
                    return false;
                }
            }
        } 
        this.formBox.className      = 'progress';
        // Ajax Send
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {// code for IE6, IE5
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                if (xmlhttp.responseText == 1) {
                    alert('已收到你的信息，感谢你的反馈!');
                } else {
                    alert('发送失败!');
                }
                // 关闭
                self.close();
            }
        };

        xmlhttp.open('POST', this.fbForm.action, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(data);
    },
    // 是否为IE6
    isIE6       : function () {
        var _isIE6  = false;
        var Sys     = {};
        var ua      = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : 0;
        if(Sys.ie && Sys.ie=="6.0"){
            _isIE6  = true;
        }
        return _isIE6;
    }
};

FBCTRL.init();


