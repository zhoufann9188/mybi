//获取标准格式北京时间 2019-7-12 20:30:19
function getNow () {
    	var datetime=new Date();
    	//北京时间比标准时间晚8个小时，转时区
    	datetime.setHours(datetime.getHours()+8);

		//格式化输出
    	datetime=datetime.toISOString().slice(0, 19).replace('T', ' ');

    	return datetime;
	}

//请求数据库,sql语句，fun成功后运行函数, isasync 表示是否异步  如成功返回json数据
//改造完成后必须注释掉
function requestWebDB(sql,fun,isasync) {

    var json_data;

    if(!isasync){
        $.ajaxSettings.async = false; //关闭异步
    }

    $.post(window.location.href,{"action":"web","script":sql},function(data){

        var head=data[0][0];

        if(head.status=="successed"){
            //获取数据
            json_data=data[1];

            if(json_data.length==0){
                json_data=[];
            }

            //运行逻辑
            fun(json_data);

        }else if(head.status=="error"){
            //失败，提示异常信息
            alert(head.info);
        }
    },"json");

    $.ajaxSettings.async = true; //打开异步

	}

//请求后端数据库, para是一个对象，包括所有所有参数,fun成功后运行函数, isasync 表示是否异步  如成功返回json数据
function requestWeb(para,fun,isasync) {
    var json_data;
    if(!isasync){
        $.ajaxSettings.async = false; //关闭异步
    }
    $.post(window.location.href,para,function(data){

        var head=data[0][0];

        if(head.status=="successed"){
            //获取数据
            json_data=data[1];

            if(json_data.length==0){
                json_data=[];
            }
            //运行逻辑
            fun(json_data);


        }else if(head.status=="error"){
            //失败，提示异常信息
            alert(head.info);
        }
    },"json");

    $.ajaxSettings.async = true; //打开异步

	}

//请求云操作服务, para是一个对象，包括所有所有参数,fun成功后运行函数, isasync 表示是否异步  如成功返回json数据
function requestCloudOper(para,fun,isasync) {
    var json_data;
    if(!isasync){
        $.ajaxSettings.async = false; //关闭异步
    }
    $.post("/operCloud",para,function(data){
        console.log(json_data)

        var head=data[0][0];

        if(head.status=="successed"){
            //获取数据
            json_data=data[1];

            if(json_data.length==0){
                json_data=[];
            }
            //运行逻辑
            fun(json_data);

        }else if(head.status=="error"){
            //失败，提示异常信息
            alert(head.info);
        }
    },"json");

    $.ajaxSettings.async = true; //打开异步

	}

//请求web公共数据服务
function requestWebData(para,fun,isasync) {
    var json_data;

    if(!isasync){
        $.ajaxSettings.async = false; //关闭异步
    }

    $.post("/dataService/web",para,function(data){

        var head=data[0][0];

        if(head.status=="successed"){
            //获取数据
            json_data=data[1];

            if(json_data.length==0){
                json_data=[];
            }
            //运行逻辑
            fun(json_data);


        }else if(head.status=="error"){
            //失败，提示异常信息
            alert(head.info);
        }
    },"json");

    $.ajaxSettings.async = true; //打开异步

	}

//请求alipay支付服务
function requestAliPay(para,fun,isasync) {
    var json_data;

    if(!isasync){
        $.ajaxSettings.async = false; //关闭异步
    }

    $.post("/to_alipay",para,function(data){

        var head=data[0][0];

        if(head.status=="successed"){
            //获取数据
            json_data=data[1];

            if(json_data.length==0){
                json_data=[];
            }
            //运行逻辑
            fun(json_data);


        }else if(head.status=="error"){
            //失败，提示异常信息
            alert(head.info);
        }
    },"json");

    $.ajaxSettings.async = true; //打开异步

	}

//请求alipay支付服务
function requestWxPay(para,fun,isasync) {
    var json_data;

    if(!isasync){
        $.ajaxSettings.async = false; //关闭异步
    }

    $.post("/to_wxpay",para,function(data){

        var head=data[0][0];

        if(head.status=="successed"){
            //获取数据
            json_data=data[1];

            if(json_data.length==0){
                json_data=[];
            }
            //运行逻辑
            fun(json_data);


        }else if(head.status=="error"){
            //失败，提示异常信息
            alert(head.info);
        }
    },"json");

    $.ajaxSettings.async = true; //打开异步

	}

//从data里获取列字段集合，参数需要是json;返回对象数组（仅适用于bootstrap-table)
function getBtTableColumns(data){
    var json_col=[];
    if(data.length!=0){
        //获取col集合
        var fields=Object.keys(data[0]);
        //组装column的json对象数组
        for(var i=0;i<fields.length;i++){
            var col={};
            col.title=fields[i];
            col.field=fields[i];
            col.sortable=true;

            json_col.push(col);
        }
    }
    return json_col;

}

//映射数据库字段与对外展示的表格列名称
function mapColumns(field) {
         var title;
         switch (field) {
             case "dashboard_id": title="仪表盘ID";break;
             case "dashboard_name": title="仪表盘名称";break;
             case "dashboard_desc": title="仪表盘描述";break;
             case "add_time":title="添加时间";break;
             case "update_time":title="更新时间";break;
             case "operation":title="操作";break;
             case "order_id":title="订单编号";break;
             case "buy_type":title="购买类型";break;
             case "buy_time":title="购买时间";break;
             case "invalid_time":title="失效时间";break;
             case "cloud_catalog_name":title="云服务类型";break;
             case "cloud_title":title="云服务描述";break;
             case "buy_price":title="支付金额";break;
             case "status":title="状态";break;
             case "app_type_name":title="应用类型";break;
             case "app_title":title="描述";break;
             case "order_status":title="订单状态";break;
             case "order_remark":title="订单备注";break;
             case "name":title="姓名";break;
             case "email":title="邮箱";break;
             case "phone":title="手机";break;
             case "settle_account":title="支付宝账号";break;
             case "data_key":title="datakey";break;
             case "last_login_time":title="上次登录时间";break;
             case "domain":title="域名";break;
             case "login_user":title="登录用户";break;
             case "ssh_port":title="SSH端口";break;
             case "service_port":title="对外服务端口";break;
             case "port_ip_white":title="IP白名单(多个用英文逗号分隔)";break;
             case "remark":title="备注";break;
             case "web_domain":title="绑定域名";break;
             case "disk_space":title="磁盘容量";break;
             case "free_space":title="剩余容量";break;
             case "settle_id":title="结算编号";break;
             case "is_settle":title="是否结算";break;
             case "pay_account":title="结算账号";break;
             case "pay_money":title="结算金额";break;
             case "contribute_email":title="贡献人账号";break;
             case "contribute_title":title="所购服务";break;
             case "final_price":title="最终价格";break;
             case "db_name":title="数据源名称";break;
             case "pub_api_title":title="API标题";break;
             case "pub_api_desc":title="API描述";break;
             case "url":title="地址链接";break;
             case "seo_domain":title="网站域名";break;
             case "seo_keyword":title="优化关键词";break;
             case "visitor_ip":title="访问IP";break;
             case "visitor_address":title="IP所在地";break;
             case "visitor_time":title="访问时间";break;
             case "related_order_id":title="关联资源订单编号";break;
             case "article_mode":title="文章生成模式";break;
             case "ads_text":title="文章广告语(支持直接HTML输入)";break;

         }
         return title;

     }

//获取URL参数
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

//判断是否手机登录,返回flag值
function is_modbile() {
    var is_mobile=false;

    //判断设备是否为手机
    !function () {
        var devices = ["iPhone","Android","Windows Phone"]
        var ua = window.navigator.userAgent
        for (var i = 0; i < devices.length; i++) {
        if (ua.indexOf(devices[i]) != -1) {
            is_mobile=true;
        }
        }
    }()

    return is_mobile;
}









