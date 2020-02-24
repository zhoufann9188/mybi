 $(document).ready(function() {
// 条件: "user_id":user_id,"dashboard_id":dashboard_id,"control_key":getControlType($control),"control_html_key":$control.attr("id")

//------------页面初始化
     //提示语
     window.setTimeout(function () {
         $("#info").html('');
     },5000)

	  var $controls=$("#controls"),
		 $canvas=$("#canvas")


	 //------------------------------控件相关变量设置-----------------------------

	  //KEY和ID命名注意：不要带"_"符号，各分类需有明确标识

	  //控件集合(增加控件后需更新
      var canvas_key="canvas";
      var label_key="label";
      var table_key="table";
      var img_key="img";
      var link_key="link";
      var var_key="var";


      //HighChart基本图表，包括下面几种类型  默认柱状图
      var hc_base_key="hcBase";// line  基本曲线图  column 基本柱状图  area 基本区域图  bar  基本条形图  scatter  基本点状图

	  var hc_pie_key="hcPie";

	  var hc_bubble_key="hcBubble";

	  var hc_gauge_key="hcGauge";

	  var hc_wordcloud_key="hcWordcloud";

	  //控件设置集合,默认展示第1个(增加控件后需更新)
	  var controls=[label_key,table_key,img_key,link_key,hc_base_key,hc_pie_key,hc_bubble_key,hc_gauge_key,hc_wordcloud_key,var_key];

	  //HighChart控件集合(增加控件后需更新)
	  var controls_chart=[hc_base_key,hc_pie_key,hc_bubble_key,hc_gauge_key,hc_wordcloud_key];

	  //控件设置集合,默认展示第1个(增加控件后需更新)
	  var control_sets=[canvas_key+"_sets",label_key+"_sets",img_key+"_sets",link_key+"_sets",table_key+"_sets",hc_base_key+"_sets",hc_pie_key+"_sets",hc_bubble_key+"_sets",hc_gauge_key+"_sets",hc_wordcloud_key+"_sets",var_key+"_sets"];

	 //可改变大小控件集合(增加控件后需要更新)
	  var resize_controls=[label_key,img_key,link_key,table_key,hc_base_key,hc_pie_key,hc_bubble_key,hc_gauge_key,hc_wordcloud_key,var_key];

     //数据源类型集合
      var data_type=["static_data","excel_data","api_data","dbms_data"];

     //颜色样式(class)种类集合 bootstrap专用
	  var color_type=["primary","secondary","dark","success","danger","info","warning"];

	 //当前控件指针
	  var $curcontrol;

	  //当前操作控件指针
	  var $curcontrol_oper;

	  //用户控件相关属性
	  var user_id;
	  var dashboard_id;
	  var control_html_key; //控件在HTML中的ID
	  var control_key; //控件类型

      //是否预览模式
      var is_preview=false;


    //------------------------------表格相关变量设置-----------------------------

	  //boot-startp表格变量
	  var $selected_col;
	  var $selected_row;

     //---自定义表格变量

     //表格默认选项
     const table_options={
                 sortable:true,
                 search:true,
                 searchAlign:'right',
                 pagination:true,
                 cache:true,
                 virtualScroll:true,
                 height:600,
                 theadClasses:'thead-light font-weight-bold',
                 showexport:true,
                 showrefresh:true,
                };

 //------------------------------文件上传变量设置-----------------------------

	  //当前上传文件名
	  var cur_file_name;


 //------------------------------图表highchart变量设置-----------------------------

	//当前hightchart指针
	 var chart=function(){return $curcontrol.highcharts()};

	//highchart全局设置
	 Highcharts.setOptions({
            global: {
                useUTC: false
            }
	 });


	//图表颜色主题

	 //商务蓝
	 var theme_dark_blue={
            colors: ['#DDDF0D', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee',
                '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                    stops: [
                        [0, 'rgb(48, 48, 96)'],
                        [1, 'rgb(0, 0, 0)']
                    ]
                },
                borderColor: '#000000',
                borderWidth: 1,
                plotBackgroundColor: 'rgba(255, 255, 255, .1)',
                plotBorderColor: '#CCCCCC',
                plotBorderWidth: 1
            },
		 	 xAxis: {
                gridLineColor: '#333333',
                gridLineWidth: 1,
                labels: {
                    style: {
                        color: '#A0A0A0'
                    }
                },
                lineColor: '#A0A0A0',
                tickColor: '#A0A0A0',
                title: {
                    style: {
                        color: '#CCC',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                    }
                }
            },

            yAxis: {
                gridLineColor: '#333333',
                labels: {
                    style: {
                        color: '#A0A0A0'
                    }
                },
                lineColor: '#A0A0A0',
                minorTickInterval: null,
                tickColor: '#A0A0A0',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#CCC',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                    }
                }
            },
		 	title:{
            	style: {color: '#ffffff'}
			},
		 	subtitle:{
            	style: {color: '#ffffff'}
			},
		    legend: {
                itemStyle: {
                    font: '9pt Trebuchet MS, Verdana, sans-serif',
                    color: '#A0A0A0'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#444'
                }
            }
        };

	 //互联网黑dark-unica
	 var theme_dark_light={
            colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
                '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
				backgroundColor: {
					linearGradient: {x1: 0, y1: 0, x2: 1, y2: 1},
					stops: [
						[0, '#2a2a2b'],
						[1, '#3e3e40']
					]
				},
				borderColor: '#000000',
                borderWidth: 1,
                plotBackgroundColor: 'rgba(255, 255, 255, .1)',
                plotBorderColor: '#CCCCCC',
                plotBorderWidth: 1
			},
		    xAxis: {
                gridLineColor: '#707073',
				 gridLineWidth: 1,
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3'

                    }
                }
            },
		     yAxis: {
                gridLineColor: '#333333',
                labels: {
                    style: {
                        color: '#A0A0A0'
                    }
                },
                lineColor: '#A0A0A0',
                minorTickInterval: null,
                tickColor: '#A0A0A0',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#CCC',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                    }
                }
            },
		 	title:{
            	style: {color: '#ffffff'}
			},
		 	subtitle:{
            	style: {color: '#ffffff'}
			},
		    legend: {
                itemStyle: {
                    font: '9pt Trebuchet MS, Verdana, sans-serif',
                    color: '#A0A0A0'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#444'
                }
            }
        };

	 //低调灰
	 var theme_gray={
            colors: ['#DDDF0D', '#7798BF', '#55BF3B', '#DF5353', '#aaeeee',
                '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, 'rgb(96, 96, 96)'],
                        [1, 'rgb(16, 16, 16)']
                    ]
                }
            },
            xAxis: {
                gridLineWidth: 0,
                lineColor: '#999',
                tickColor: '#999',
                labels: {
                    style: {
                        color: '#999',
                        fontWeight: 'bold'
                    }
                },
                title: {
                    style: {
                        color: '#AAA',
                        font: 'bold 12px Lucida Grande, Lucida Sans Unicode,' +
                        ' Verdana, Arial, Helvetica, sans-serif'
                    }
                }
            },
            yAxis: {
                alternateGridColor: null,
                minorTickInterval: null,
                gridLineColor: 'rgba(255, 255, 255, .1)',
                minorGridLineColor: 'rgba(255,255,255,0.07)',
                lineWidth: 0,
                tickWidth: 0,
                labels: {
                    style: {
                        color: '#999',
                        fontWeight: 'bold'
                    }
                },
                title: {
                    style: {
                        color: '#AAA',
                        font: 'bold 12px Lucida Grande, Lucida Sans Unicode,' +
                        ' Verdana, Arial, Helvetica, sans-serif'
                    }
                }
            },
            legend: {
                itemStyle: {
                    color: '#CCC'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#333'
                }
            },
		 	title:{
            	style: {color: '#ffffff'}
			},
		 	subtitle:{
            	style: {color: '#ffffff'}
			}
        };

	 //格栅色  grid_light
	 var theme_grid={
            colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066',
                '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
				backgroundColor: '#ffffff',
				borderColor: '#000000',
                borderWidth: 0,
                plotBackgroundColor: 'rgba(255, 255, 255, .1)',
                plotBorderColor: '#CCCCCC',
                plotBorderWidth: 0
				},

            xAxis: {
                gridLineColor: '#dcdcdc',
                gridLineWidth: 1,
                labels: {
                    style: {
                        color: '#595959'
                    }
                },
                lineColor: '#595959',
                tickColor: '#595959',
                title: {
                    style: {
                        color: '#404040',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                    }
                }
            },
		    yAxis:{
            	gridLineColor: '#dcdcdc',
				gridLineWidth: 1,
                labels: {
                    style: {
                        color: '#5f5f5f'
                    }
                },
                lineColor: '#dcdcdc',
                minorTickInterval: null,
                tickColor: '#dcdcdc',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#505050',
                        fontWeight: 'normal',
                        fontSize: '12px',
                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                    }
                }
			},
            legend: {
                itemStyle: {
                    color: '#585858'
                },
                itemHoverStyle: {
                    color: '#999999'
                },
                itemHiddenStyle: {
                    color: '#333'
                }
            },
		 	title:{
            	style: {color: '#191919'}
			},
		 	subtitle:{
            	style: {color: '#191919'}
			}
        };

	 //风情沙滩  sand-signika
	 var theme_sand={
            colors: ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee',
                '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
				backgroundColor: '#ffffff',
				borderColor: '#000000',
                borderWidth: 0,
                plotBackgroundColor: 'rgba(255, 255, 255, .1)',
                plotBorderColor: '#CCCCCC',
                plotBorderWidth: 0
				},

            xAxis: {
                gridLineColor: '#dcdcdc',
                gridLineWidth: 0,
                labels: {
                    style: {
                        color: '#595959'
                    }
                },
                lineColor: '#595959',
                tickColor: '#595959',
                title: {
                    style: {
                        color: '#404040',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                    }
                }
            },
		    yAxis:{
            	gridLineColor: '#dcdcdc',
				gridLineWidth: 1,
                labels: {
                    style: {
                        color: '#5f5f5f'
                    }
                },
                lineColor: '#dcdcdc',
                minorTickInterval: null,
                tickColor: '#dcdcdc',
                tickWidth: 0,
                title: {
                    style: {
                        color: '#505050',
                        fontWeight: 'normal',
                        fontSize: '12px',
                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                    }
                }
			},
            legend: {
                itemStyle: {
                    color: '#585858'
                },
                itemHoverStyle: {
                    color: '#999999'
                },
                itemHiddenStyle: {
                    color: '#333'
                }
            },
		 	title:{
            	style: {color: '#191919'}
			},
		 	subtitle:{
            	style: {color: '#191919'}
			}
        };

	 //默认主题
	 var theme_default= {

		  colors: ["#7cb5ec","#434348","#90ed7d","#f7a35c","#8085e9","#f15c80","#e4d354","#2b908f","#f45b5b","#91e8e1"],

		  chart: {
				backgroundColor: '#ffffff',
				borderColor: '#000000',
                borderWidth: 0,
                plotBackgroundColor: 'rgba(255, 255, 255, .1)',
                plotBorderColor: '#CCCCCC',
                plotBorderWidth: 0
				},

          xAxis: {
                gridLineColor: '#dcdcdc',
                gridLineWidth: 0,
                labels: {
                    style: {
                        color: '#595959'
                    }
                },
                lineColor: '#595959',
                tickColor: '#595959',
                title: {
                    style: {
                        color: '#404040',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                    }
                }
            },
		   yAxis:{
            	gridLineColor: '#dcdcdc',
				gridLineWidth: 1,
                labels: {
                    style: {
                        color: '#5f5f5f'
                    }
                },
                lineColor: '#dcdcdc',
                minorTickInterval: null,
                tickColor: '#dcdcdc',
                tickWidth: 0,
                title: {
                    style: {
                        color: '#505050',
                        fontWeight: 'normal',
                        fontSize: '12px',
                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                    }
                }
			},
		  legend: {
                itemStyle: {
                    color: '#585858'
                },
                itemHoverStyle: {
                    color: '#999999'
                },
                itemHiddenStyle: {
                    color: '#333'
                }
            },
		 	title:{
            	style: {color: '#191919'}
			},
		 	subtitle:{
            	style: {color: '#191919'}
			}

		};



	  //用户控件相关属性
      var user_id=''; //用户id
      var dashboard_id=''; //仪表盘id
      var mode=''; //仪表盘显示模式   edit/browse
      var uid='';//公共用户浏览uid

      var intervals_id=[]; //定时器集合

	  //获取用户信息
      uid=getQueryVariable('uid');

	  para={"action":"getLocalCookieUser"};
	  requestWebData(para,function (json_data) {
	  	user_info=json_data[0];
		//更新用户显示信息及产生dashboard_id
		if(user_info==undefined && uid==false){
			//游客,浏览user_id=1的演示用户的内容
			user_id='1';
			dashboard_id='1';
		}else{
			//获取用户ID
            if(uid!=false){
               user_id=uid;
            }else{
                user_id=user_info["user_id"];
            }
			dashboard_id=new Date().getTime();
			//获取仪表盘分组
			dash_group_key=getQueryVariable("group_key");
			if(dash_group_key==false){
				//已登录用户从首页进来，直接默认分组
				//--插入默认新仪表盘
				//获取仪表盘ID
				para={"action":"addDefaultDash","user_id":user_id,"dashboard_id":dashboard_id};
				requestWeb(para,function () {},true);
			}
			else{
				//有分组参数,继续判断是新登记表盘还是老仪表盘
					my_dash_id=getQueryVariable("dashboard_id");
					if(my_dash_id==false){
						//新仪表盘,直接插入
						para={"action":"addNewDash","user_id":user_id,"dashboard_id":dashboard_id,"group_key":dash_group_key};
						requestWeb(para,function () {},true);
					}
					else{
						//已有仪表盘
                        dashboard_id=my_dash_id;

                        //-------编辑模式和浏览模式进行页面初始化
                        mode=getQueryVariable("mode");

                        if(mode=='edit' || mode=='browse'){
                            //切换布局
                            if(mode=='browse'){
                                toggleBrowser();
                            }
                            //初始化仪表盘
                            initDashboard();
                        }

					}

				}
		}
			//切换默认视图
            toggleFullView();

			//-----仪表盘显示区左上角初始化
		  	//初始化作者
		  	para={"action":"queryUserById","user_id":user_id};
			requestWebData(para,function (json_data) {
				user_info=json_data[0];
				if(user_info["name"]){
					$("#dash_user").html("by "+user_info["name"]);
				}else{
					$("#dash_user").html("by "+user_info["email"]);
				}
			},true);

			//初始化仪表盘标题
		  	para={"action":"queryDashById","dashboard_id":dashboard_id,"user_id":user_id};
			requestWebData(para,function (json_data) {
				dash_info=json_data[0];
				$("#dash_name").html(dash_info["dashboard_name"]);
				$("#dash_title").html(dash_info["dashboard_name"]);
			},true);

			//-----仪表盘显示区右上角功能区初始化
			$("#dash_browser").click(function () {
			    //切换变量
                is_preview=true;
                //切换按钮效果
				$("#dash_edit").removeClass("active");
				$(this).addClass("active");
				//处理预览
				togglePreBrowser();

				//增加定时器
                initDashInterval();

			});

			//-----仪表盘显示区右上角功能区初始化
			$("#dash_edit").click(function () {
			    //切换变量
                is_preview=false;
                //切换按钮效果
				$("#dash_browser").removeClass("active");
				$(this).addClass("active");
				//处理编辑
				toggleEdit();

				//移除定时器
                clearDashInterval();

			});



            //注册页面设置点击事件
            $("#dash_set").click(function () {
                if(is_preview==false){
                    toggleSetView();
                    controlToggle($("#"+canvas_key));
                }

            });



		// --------------函数处理开始---------------

		 //控件栏拖拽事件注册
			 controlDrag($( "a",$controls ),1);

		 //工具新增控件点击事件注册
			 $("#controls").find("a").click(function () {
				$curcontrol=$(this);

				var curcontrolid=getNewControlID($curcontrol);

				  //放置控件并返回新控件
				  $curcontrol=putControls($curcontrol,curcontrolid);
				  //设置控件宽度
				  $curcontrol.css("width",$canvas.width()*0.7);
				  //如果是hichart需要刷新
				  if(getControlType($curcontrol).indexOf("hc")==0){
						$curcontrol.highcharts().reflow();
				  }
				  //设置相对位置
				  setPosition($curcontrol,$canvas.position().left,$canvas.position().top);
				  //切换至该控件
				  $curcontrol.trigger("click");

			 });

        //用户数据源列表初始化
            initDbmsManager($("#db_list"));
            initExcelManager($("#excel_list"));

		//------------设置控件拖入画布事件----------------------

			//画布放置事件注册
			$canvas.droppable({
			  drop: function( event, ui ) {

				  //注册当前控件
				  $curcontrol=ui.draggable;

				  // if(is_preview==true){
				  //     alert('请切换编辑模式再编辑');
				  //     return;
                  //
                  // }

				   //基于鼠标和拖动设置位置
				  var newleft_px=event.pageX-$canvas.offset().left;
				  var newtop_px=event.pageY-$canvas.offset().top;
				  var curleft_px=parseFloat($curcontrol.css('left'));
				  var curtop_px=parseFloat($curcontrol.css('top'));


				  if(curleft_px>$canvas.width() || curtop_px>$canvas.height){

					  }

				  else{


					  if(controls.indexOf($curcontrol.attr("id"))!=-1){
						  //新控件，设置控件ID

						  var curcontrolid=getNewControlID($curcontrol);

							  //放置控件并返回新控件
							  $curcontrol=putControls($curcontrol,curcontrolid);
							  //设置相对位置
							  setPosition($curcontrol,newleft_px,newtop_px);


							}
						else
							{
							//老控件，设置相对位置即可
							  setPosition($curcontrol,curleft_px,curtop_px);
							}

						 }



						//切换至该控件
						$curcontrol.trigger("click");
				  }

			});

		//将控件放入画布函数 返回新控件指针
			function putControls($control,curcontrolid){
					//表格数据json变量
                    var $controla=$control;
					var table_options=new Object();
					var json_columns;
					var json_data;

					//图表变量
					var chart; //图表对象

					//控件属性
					control_html_key=curcontrolid;
					var data_script="";

                    //控件放入画布中
                    if($control.is("#hcBase")){
                      $canvas
                      .append('<div id='+curcontrolid+' style="z-index:0;width:60%;height:40%;" class="border"></div>');

                      data_script=[{"月份":"一月","天猫渠道销售":49.9,"京东渠道销售":83.6,"拼多多渠道销售":48.9,"苏宁易购渠道销售":42.4},{"月份":"二月","天猫渠道销售":71.5,"京东渠道销售":78.8,"拼多多渠道销售":38.8,"苏宁易购渠道销售":33.2},{"月份":"三月","天猫渠道销售":106.4,"京东渠道销售":98.5,"拼多多渠道销售":39.3,"苏宁易购渠道销售":34.5},{"月份":"四月","天猫渠道销售":129.2,"京东渠道销售":93.4,"拼多多渠道销售":41.4,"苏宁易购渠道销售":39.7},{"月份":"五月","天猫渠道销售":144,"京东渠道销售":106,"拼多多渠道销售":47,"苏宁易购渠道销售":52.6},{"月份":"六月","天猫渠道销售":176,"京东渠道销售":84.5,"拼多多渠道销售":48.3,"苏宁易购渠道销售":75.5},{"月份":"七月","天猫渠道销售":135.6,"京东渠道销售":105,"拼多多渠道销售":59,"苏宁易购渠道销售":57.4},{"月份":"八月","天猫渠道销售":148.5,"京东渠道销售":104.3,"拼多多渠道销售":59.6,"苏宁易购渠道销售":60.4},{"月份":"九月","天猫渠道销售":216.4,"京东渠道销售":91.2,"拼多多渠道销售":52.4,"苏宁易购渠道销售":47.6},{"月份":"十月","天猫渠道销售":194.1,"京东渠道销售":83.5,"拼多多渠道销售":65.2,"苏宁易购渠道销售":39.1},{"月份":"十一月","天猫渠道销售":95.6,"京东渠道销售":106.6,"拼多多渠道销售":59.3,"苏宁易购渠道销售":46.8},{"月份":"十二月","天猫渠道销售":54.4,"京东渠道销售":92.3,"拼多多渠道销售":51.2,"苏宁易购渠道销售":51.1}];

                      //插入图表
                      chart=insertChart(curcontrolid,"column",data_script);

                      //更新key和操作指针
                      control_key=hc_base_key;

                      //附加图表主题
                      $("#"+curcontrolid).attr("chart_theme","theme_default");



                    } else if($control.is("#label")){

                      $canvas
                      .append('<div  style="z-index:0;" id='+curcontrolid+' ><label style="font-family: SimSun;font-weight:normal;font-size:12px;width:95%;height:95%">文本</label></div>');

                      control_key=label_key;

                      data_script=[
                            {
                                "value": "文本",
                                "url": ""
                            }
                      ];

                      setLabelEditable($("#"+curcontrolid).find("label"));

                    }

                    else if($control.is("#var")){
                      $canvas
                      // .append('<div id='+curcontrolid+'><input  class="form-control-sm border border-1 bg-white text-dark font-content"  style="width:98%;height:98%" type="text" value=""/></div>');
                      .append('<div class="font-content" style="z-index:0;" id='+curcontrolid+' >' +
                              '<select style="width:95%;height:95%"  >\n' +
                              '  <option value="10020">第一季度</option>\n' +
                              '  <option value="10030">第二季度</option>\n' +
                              '</select></div>');

                      insertSelect2(curcontrolid);

                      control_key=var_key;

                      data_script=[
                            {
                                "id": "10020",
                                "text": "第一季度"
                            },
                            {
                                "id": "10030",
                                "text": "第二季度"
                            }
                      ];

                    }
                    else if($control.is("#img")){

                      //获取默认图片路径
                      var src_path="";

                      $canvas
                      .append('<div id='+curcontrolid+' style="width:25%;z-index:0;"><img src="'+src_path+'" style="width:95%;height:95%" ></div>');

                      control_key=img_key;

                      //data_script=src_path;

                    } else if($control.is("#link")){

                      //获取默认网页URL
                      var link_url="http://www.baidu.com";

                      $canvas
                      .append('<div id='+curcontrolid+' style="width:40%;z-index:0;height:60%"><iframe src='+link_url+' style="width:95%;height:95%" ></iframe></div>');

                      // $("#"+curcontrolid).load(link_url);

                      control_key=link_key;

                      //data_script=src_path;

                    }

                    else if($control.is("#table")){
                      $canvas
                          .append('<input type="password" hidden autocomplete="new-password"><div  id='+curcontrolid+' style="width:25%;z-index:0;"><table class="table table-sm" style="width:100%;height:100%" ><table></div>');

                      control_key=table_key;

                    //设置初始化表的样式
                      table_options={sortable:true,
                                     search:true,
                                     // searchAlign:'right',
                                      buttonsClass: 'primary btn-sm',
                                      showExport:true,
                                       buttonsAlign:'left',
                                      exportTypes:['excel', 'doc','csv', 'png'],
                                      pagination:true,
                                       showPaginationSwitch:true,
                                       showRefresh:false,
                                       showFullscreen:true,
                                       showColumns:true,
                                      cache:true,
                                      virtualScroll:true,
                                      height:300,
                                    };

                    //设置初始化表的列
                      json_columns= [

                            {
                            title: '列1',
                            field: 'col1',
                            sortable:true,

                          }, {
                            title: '列2',
                            field: 'col2',
                            sortable:true,
                          }, {
                            title: '列3',
                            field: 'col3',
                            sortable:true,
                          }];

                       json_data=[{
                           "col1": 1,
                           "col2": "Item 1",
                            "col3": "$1"
                          }, {
                             "col1": 2,
                             "col2": "Item 2",
                             "col3": "$2"
                        }];

                       data_script=json_data;

                     //初始化表格内容
                    insertDataTable($("#"+curcontrolid),table_options,json_columns,json_data);

                    } else if($control.is("#hcPie")){
                      $canvas
                      .append('<div id='+curcontrolid+' style="z-index:0;width:60%;height:40%;" class="border"></div>');

                      //默认脚本
                      data_script=[{"案例":"一季度销售","项目":"副食","占比":0.2},{"案例":"一季度销售","项目":"烟酒","占比":0.3},{"案例":"一季度销售","项目":"家居","占比":0.4},{"案例":"一季度销售","项目":"五金","占比":0.1}];


                      //插入图表
                      chart=insertChart(curcontrolid,"pie",data_script);

                      //更新key和操作指针
                      control_key=hc_pie_key;

                      //附加图表主题
                      $("#"+curcontrolid).attr("chart_theme","theme_default");



                    } else if($control.is("#hcBubble")){
                      $canvas
                      .append('<div id='+curcontrolid+' style="z-index:0;width:60%;height:50%;" class="border"></div>');

                      //脚本保存
                      data_script=[{"年度":2018,"月度":"1月","销量":15,"毛利":55,"总利润":825},{"年度":2018,"月度":"2月","销量":24,"毛利":49,"总利润":1176},{"年度":2018,"月度":"3月","销量":74,"毛利":81,"总利润":5994},{"年度":2018,"月度":"4月","销量":65,"毛利":10,"总利润":650},{"年度":2018,"月度":"5月","销量":46,"毛利":71,"总利润":3266},{"年度":2018,"月度":"6月","销量":88,"毛利":87,"总利润":7656},{"年度":2018,"月度":"7月","销量":88,"毛利":77,"总利润":6776},{"年度":2018,"月度":"8月","销量":62,"毛利":72,"总利润":4464},{"年度":2018,"月度":"9月","销量":51,"毛利":83,"总利润":4233},{"年度":2018,"月度":"10月","销量":11,"毛利":20,"总利润":220},{"年度":2018,"月度":"11月","销量":26,"毛利":17,"总利润":442},{"年度":2018,"月度":"12月","销量":16,"毛利":75,"总利润":1200},{"年度":2019,"月度":"1月","销量":21,"毛利":4,"总利润":84},{"年度":2019,"月度":"2月","销量":78,"毛利":7,"总利润":546},{"年度":2019,"月度":"3月","销量":80,"毛利":38,"总利润":3040},{"年度":2019,"月度":"4月","销量":94,"毛利":21,"总利润":1974},{"年度":2019,"月度":"5月","销量":92,"毛利":55,"总利润":5060},{"年度":2019,"月度":"6月","销量":76,"毛利":19,"总利润":1444},{"年度":2019,"月度":"7月","销量":2,"毛利":92,"总利润":184},{"年度":2019,"月度":"8月","销量":54,"毛利":52,"总利润":2808},{"年度":2019,"月度":"9月","销量":13,"毛利":85,"总利润":1105},{"年度":2019,"月度":"10月","销量":100,"毛利":18,"总利润":1800},{"年度":2019,"月度":"11月","销量":54,"毛利":82,"总利润":4428},{"年度":2019,"月度":"12月","销量":53,"毛利":33,"总利润":1749}];

                      //插入图表
                      chart=insertChart(curcontrolid,"bubble",data_script);

                      //更新key和操作指针
                      control_key=hc_bubble_key;

                      //附加图表主题
                      $("#"+curcontrolid).attr("chart_theme","theme_default");



                    } else if($control.is("#hcGauge")){
                      $canvas
                      .append('<div id='+curcontrolid+' style="z-index:0;width:60%;height:50%;" class="border"></div>');
                      //脚本保存
                      data_script=[{"速度":85}];
                      //插入图表
                      chart=insertChart(curcontrolid,"gauge",data_script);

                      //更新key和操作指针
                      control_key=hc_gauge_key;

                      //附加图表主题
                      $("#"+curcontrolid).attr("chart_theme","theme_default");



                    } else if($control.is("#hcWordcloud")){
                      $canvas
                      .append('<div id='+curcontrolid+' style="z-index:0;width:60%;height:50%;" class="border"></div>');
                      //脚本保存
                      data_script=[{"商品评价关键词":"商品很有质感","权重":4},{"商品评价关键词":"很漂亮","权重":3},{"商品评价关键词":"摸起来舒服","权重":1},{"商品评价关键词":"很好吃","权重":2},{"商品评价关键词":"味道很好","权重":5},{"商品评价关键词":"好摸又好玩","权重":1},{"商品评价关键词":"我无语","权重":1},{"商品评价关键词":"物流很慢","权重":2},{"商品评价关键词":"物流哥哥很好","权重":3},{"商品评价关键词":"OMG!盘它","权重":10},{"商品评价关键词":"我的天哪!","权重":10},{"商品评价关键词":"挺喜欢","权重":6},{"商品评价关键词":"还不错","权重":6},{"商品评价关键词":"一般吧","权重":2},{"商品评价关键词":"就这样","权重":1},{"商品评价关键词":"客服态度太差","权重":1},{"商品评价关键词":"客服姐姐声音很温柔","权重":6}];
                      //插入图表
                      chart=insertChart(curcontrolid,"wordcloud",data_script);

                      //更新key和操作指针
                      control_key=hc_wordcloud_key;

                      //附加图表主题
                      $("#"+curcontrolid).attr("chart_theme","theme_default");



                    }


                    // });


                     //重新注册当前控件
                    $control=$("#"+curcontrolid);

                    if(mode!='browse'){
                        //注册可变大小属性(相对位置)
                        controlResize($control);

                        //注册面板中控件拖拽事件
                        $control.draggable({
                            containment:$canvas,
                        });
                    }


                    //控件数据入库
                    var para={"action":"insertDashControl","user_id":user_id,"dashboard_id":dashboard_id,"control_key":control_key,"control_html_key":control_html_key,"datasource_script":JSON.stringify(data_script)};
                    requestWeb(para,function () {},true);


                    return $control;

			};

		//设置当前控件相对位置函数
			function setPosition($control,left_px,top_px){

				  var left_precent=(left_px/$canvas.width())*100+"%";
				  var top_precent=(top_px/$canvas.height())*100+"%";
				  // alert("当前控件top "+top_px);
                  // alert("当前画布高度 "+$canvas.height());

					//设置位置
                  $control.css({"position": "absolute","left": left_precent, "top": top_precent});


			};


		//-----------处理右键菜单------------------------------

			//关掉默认右键菜单----
			$(document).contextmenu(function(){
			    if(mode!='browse'){
				    return false;
                }
			});

			//右键显示自定义菜单
			$($canvas).mousedown($curcontrol,function(event){
						//获取选择控件指针
						$curcontrol=getDragControl($(event.target));

						if(event.button == 2&& isControl($curcontrol) && mode!='browse'){
							//处理控件选中后边框效果
							controlToggle($curcontrol);
							//生成自定义菜单
							setContentMenu($curcontrol);
							// 显示自定义菜单
							$("#content_menu").css({
								//定义菜单显示位置为事件发生的X坐标和Y坐标
								top : event.pageY,
								left : event.pageX
							}).slideDown(100);

							//如果点击鼠标左键，隐藏菜单
						}else if(event.button == 0){
							$("#content_menu").slideUp(100);
						}

			});

			//动态生成右键菜单
			 function setContentMenu($control){

				$("#content_menu").html("");

				//生成公共自定义菜单
				var menu='  <li id="moveup_max" class="list-group-item">置于顶层 </li>\n' +
						'  <li id="movedown_max" class="list-group-item">置于底层 </li> \n' +
						'  <li id="moveup" class="list-group-item">上移一层</li> \n' +
						'  <li id="movedown" class="list-group-item">下移一层</li> \n' +
						'  <li id="control_copy" class="list-group-item">克隆</li> \n' +
						'  <li id="control_del" class="list-group-item">删除</li> ';

				$("#content_menu").append(menu);

				//根据控件添加菜单
				switch (getControlType(getDragControl($control))) {
					case table_key:
						$("#content_menu").append('  <li id="row_add" class="list-group-item">添加行</li> \n' +
								'  <li id="row_del" class="list-group-item">删除行</li>\n'+
								'  <li id="col_add" class="list-group-item">添加列</li>\n'+
								'  <li id="col_del" class="list-group-item">删除列</li>\n');

						break;
					default:
						break;

				}
			 }

			//处理右键菜单功能
			$("#content_menu").on("click","li",function(){

				//初始化参数
				$curcontrol=getDragControl($curcontrol);
				alert($curcontrol.prop('outerHTML'));
				var z_index=$curcontrol.css("z-index");

				//如果当前控件是表格，初始化数据
				if(getControlType($curcontrol)==table_key){

				  var $table=getTablePart($curcontrol,'table');
				  //var table_options=$table.bootstrapTable('getOptions');
				  var columns=$table.bootstrapTable('getVisibleColumns');
				  var data=$table.bootstrapTable('getData');

				}

				//菜单功能处理
				 switch($(this).attr("id")){
					 case "moveup_max":
						$canvas.children().each(function(){
						    console.log($(this).css("z-index"));
							if(z_index<$(this).css("z-index")){
								z_index=$(this).css("z-index");
							};
						});
						 z_index++;
						 $curcontrol.css("z-index",z_index);
						 break;
					 case "movedown_max":
						$canvas.children().each(function(){
							if(z_index>$(this).css("z-index")){
								z_index=$(this).css("z-index");
							};
						});
						z_index--;
						if(z_index<0){
							$curcontrol.css("z-index","0");
						}else{
							$curcontrol.css("z-index",z_index);
						}

						 break;
					 case "moveup":
						 z_index++;
						 $curcontrol.css("z-index",z_index);
						 break;
					 case "movedown":
						z_index--;
						if(z_index<0){
							$curcontrol.css("z-index","0");
						}else{
							$curcontrol.css("z-index",z_index);
						}
						break;
					 case "control_copy":
						 controlClone($curcontrol);

						 break;
					 case "control_del":
						 controlDel($curcontrol);
						 break;
					 case "row_add":
						var new_row_par={};
						var new_row={};
						var cols=[];

						//行索引
						new_row_par.index=new Date().getTime();

						//获取列集合
						for(var i=0;i<columns.length;i++){
							cols.push(columns[i].field);
						}

						//初始化row
						for(var i=0;i<cols.length;i++){
							new_row[cols[i]]='';
						}

						//表格添加行
						new_row_par.row=new_row;
						$table.bootstrapTable('insertRow',new_row_par);

						//更新数据集
						fillTabelData($table,$("#table_input_script"));

						break;
					 case "row_del":

						for(var i=0;i<data.length;i++){
							if(data[i]==$selected_row){
								data.splice(i,1);
							}
						}
                        $table.bootstrapTable("showLoading");
						$table.bootstrapTable('load',data);
						$table.bootstrapTable("hideLoading");


						//更新数据显示面板
						fillTabelData($table,$("#table_input_script"));

						break;
					 case "col_add":
						$("#add_col").trigger('click');
						break;

					 case "col_del":
						$("#del_col").trigger('click');
						break;




			 };

				   //隐藏菜单
			   $("#content_menu").slideUp(100);





		 });


		// -----------点击canvas控件后，初始化设置面板
			$canvas.click(function(event){
			    var $control_oper;
			    var $control;

                $control_oper=$(event.target);
				$control=getDragControl($control_oper);


				if(isControl($control)&& is_preview==false && mode!='browse'){
				    //切换全局变量
				    $curcontrol_oper=$control_oper;
				    $curcontrol=$control;

				    //切换布局
                    toggleSetView();

				    //重置输入框
                    resetInput();

					//更新控件指针
					control_key=getControlType($curcontrol);
					control_html_key=$curcontrol.attr("id");

					//画布中控件切换至当前控件
					controlToggle($curcontrol_oper);

				}

				//点击了空白按钮,恢复默认视图
				if(getControlType($curcontrol)==canvas_key && is_preview==false && mode!='browse'){
				    //切换布局
                    toggleSetView();
                    controlToggle($control_oper);
                }


			});

		// -----------控件与设置面板间交互处理-------------------------

		 //填充控件面板函数
			function fillSets($control,$sets){

				//填充用户数据源
				fillUserDB($control);

				//填充控件内容
			   switch (getControlType($control)){
				case canvas_key:
					  fillCanvasStyle($control,$sets);
					  break;
				case label_key:
					  fillLabelStyle($control,$sets);
					  fillLabelData($control,$sets);
					  fillLabelInteract($control,$sets);
					  break;
				case table_key:
					  fillTabelStyle($control,$sets);
					  fillTabelData($control,$sets);
					  fillTabelInteract($control,$sets);
					  break;

				case img_key:
					  fillImgStyle($control,$sets);
					  break;
				case link_key:
					  fillLinkStyle($control,$sets);
					  break;
				case hc_base_key:
					  fillhcBaseStyle($control,$sets);
					  fillhcBaseData($control,$sets);
					  fillhcBaseInteract($control,$sets);
					  break;
				case hc_pie_key:
					  fillhcPieStyle($control,$sets);
					  fillhcPieData($control,$sets);
					  fillhcPieInteract($control,$sets);
					  break;
				case hc_bubble_key:
					  fillhcBubbleStyle($control,$sets);
					  fillhcBubbleData($control,$sets);
					  fillhcBubbleInteract($control,$sets);
					  break;
				 case  hc_gauge_key:
					  fillhcGaugeStyle($control,$sets);
					  fillhcGaugeData($control,$sets);
					  fillhcGaugeInteract($control,$sets);
					   break;
				 case  hc_wordcloud_key:
					  fillhcWordcloudStyle($control,$sets);
					  fillhcWordcloudData($control,$sets);
					  fillhcWordcloudInteract($control,$sets);
					   break;
				 case  var_key:
					  fillVarStyle($control,$sets);
					  fillVarData($control,$sets);
					  fillVarInteract($control,$sets);
					   break;
				  default:
					  break;
			  };



			};

		//填充画布样式面板
			function fillCanvasStyle($control,$sets){
				  //初始化背景
				  $("#bg_color").val($control.css("background-color").toString());

				  //其他待补充
				  //背景图链接
				  //页面缩放方式
				  //MyBi水印




			};


		 //填充控件面板-文本-样式函数
			function fillLabelStyle($control,$sets){
				  //初始化字体颜色
				  $("#label_color").val($control.find("label").css("color").toString());
				  //初始化字体类型
				  $("#label_type").val($control.find("label").css("font-family"));

				  //初始化字号
				  $("#label_px").val($control.find("label").css("font-size"));

				  //初始化字体粗细
				  $("#label_weight").val($control.find("label").css("font-weight"));

			};

		 //填充控件面板-文本-数据函数
			function fillLabelData($control,$sets){
				//填充数据面板
				fillControlDataSet($curcontrol);

			};

		 //填充控件面板-文本-交互函数
			function fillLabelInteract($control,$sets){

			};

		 //填充控件面板-图片-样式函数
			function fillImgStyle($control,$sets){

				var img=$curcontrol.find("img");

				//图片链接
				$("#img_url").val(img.attr("src"));
				//图片透明度
				$("#img_transparent").val(img.css("opacity")*100);
				//图片超链接
				var img_href;
				if(img.parent().is("a")){
					img_href=img.parent().attr("href");
				}else{
					img_href="";
				}
				$("#img_href").val(img_href);


			};

			function fillLinkStyle($control,$sets){

				$("#link_href").val($("iframe",$curcontrol).attr("src"));

			};
		  //填充控件面板-表格-样式函数
			function fillTabelStyle($control,$sets){

				$control=getDragControl($control);

			//初始化数据列选项卡

				updateSetsTabeltab($control,$("#table_columns"));


			//-------初始化表头设置选项-----------
				var $tab_tr=getTablePart($control,"tr");
				//表头背景颜色
				if(typeof($tab_tr.attr("style"))!="undefined"){
					$("#table_tr_color").val($tab_tr.css("background-color").toString());
				}else{
					$("#table_tr_color").val("#FFFFFF");
				}
				//表头文本对齐
				$("#table_tr_align").val($tab_tr.css("text-align"));
				//表头字体
				$("#table_tr_font_type").val($tab_tr.css("font-family"));
				//文本颜色
				$("#table_tr_font_color").val($tab_tr.css("color").toString());
				//文本字号
				$("#table_tr_font_px").val($tab_tr.css("font-size"));
				//表格风格
				var table_type='default-table';
				var $table=getTablePart($control,"table");

				 for(var type in color_type){
					if($table.hasClass("table-"+color_type[type])){
						table_type="table-"+color_type[type];
						break;
					 }
					}

				 $("#table_type").val(table_type.replace("table-",""));

			//-------初始化数据列设置选项-----------

				$control=getDragControl($control);
				var columns=$table.bootstrapTable('getVisibleColumns');
                if(columns.length!=0){
                    //获取选中状态的列
                    if(typeof($(".active","#table_columns")).attr("id")!="undefined"){
                        var $col=$(".active","#table_columns");
                    }else{
                        var $col=$("#column_"+columns[0].field);
                    };
                    //列字段初始化
                    var col_id=$col.attr("id").slice(7);
				    $("#table_col_id").val(col_id);

                    //列显示标题初始化
                    var col_title=$col.html();
                    $("#table_col_name").val(col_title);

                    //文本对齐
                    for(var i=0;i<columns.length;i++){
                        if(columns[i].field==col_id){
                            $("#table_th_align").val(columns[i].align);
                            break;
                        }
                    }

                    //  字体\ 文本颜色\字号\粗细
                    for(var i=0;i<columns.length;i++){
                        if(columns[i].field==col_id){
                            if(typeof(columns[i].cellStyle)!="undefined"){
                                $("#table_th_font_type").val(columns[i].cellStyle.css["font-family"]);
                                $("#table_th_font_color").val(columns[i].cellStyle.css["color"]);
                                $("#table_th_font_px").val(parseFloat(columns[i].cellStyle.css["font-size"])+"px");
                                $("#table_th_font_weight").val(columns[i].cellStyle.css["font-weight"]);
                            }else{
                                $("#table_th_font_type").val('');
                                $("#table_th_font_color").val('');
                                $("#table_th_font_px").val('');
                                $("#table_th_font_weight").val('');
                            }
                            break;
                        }
                    }

                    //切换active
                    $col.addClass("active");
                }



			};

			function updateSetsTabeltab($control,$col_tab){

				//获取当前选中表格信息
				var $table=getTablePart($control,'table');
				var columns=$table.bootstrapTable('getVisibleColumns');
				var active_id;

				//保存active_id
				if($("a",$col_tab).length==0){
					active_index=0;
				}else{
					active_index=$(".active",$col_tab).index();
				}


				//清理tab,重新生成
				$col_tab.html("");


				//填充选项卡HTML
				for(var i=0;i<columns.length;i++){
						//增加元素
						$col_tab.append(
								'<a id="column_'+columns[i].field+'" class="flex-sm-fill text-sm-center nav-link text-white" data-toggle="pill"  href="#th1">'+columns[i].title+'</a>'
						);
						//绑定click事件
						$("#column_"+columns[i].field).click(function(){
							toggleColTab($(this));
						});

				}

				//增加active

					$col_tab.find("a:eq("+active_index+")").addClass("active");



			}

			 //初始化数据列的tab面板切换
			function toggleColTab(event){
				//列字段初始化
				$curcontrol=getDragControl($curcontrol);
				$table=getTablePart($curcontrol,'table');

				//获取选中状态的列ID
				var col_id=event.attr("id").slice(7);
				$("#table_col_id").val(col_id);

				//列显示标题初始化
				$("#table_col_name").val(event.html());

				//文本对齐
				var columns=$table.bootstrapTable('getVisibleColumns');
				for(var i=0;i<columns.length;i++){
					if(columns[i].field==col_id){
						$("#table_th_align").val(columns[i].align);
						break;
					}
				}

				//  字体\ 文本颜色\字号\粗细
				for(var i=0;i<columns.length;i++){
					if(columns[i].field==col_id){
						if(typeof(columns[i].cellStyle)!="undefined"){
							$("#table_th_font_type").val(columns[i].cellStyle.css["font-family"]);
							$("#table_th_font_color").val(columns[i].cellStyle.css["color"]);
							$("#table_th_font_px").val(parseFloat(columns[i].cellStyle.css["font-size"])+"px");
							$("#table_th_font_weight").val(columns[i].cellStyle.css["font-weight"]);
						}else{
							$("#table_th_font_type").val('');
							$("#table_th_font_color").val('');
							$("#table_th_font_px").val('');
							$("#table_th_font_weight").val('');
						}
						break;
					}
				}
			  }

			 //更新数据表格脚本至数据库
			function uptTableStaticScript($table) {
				data=JSON.stringify($table.bootstrapTable('getData'));
				// 前端表格变更向数据库更新
				 para={"action":"uptTableData",'data':data,'user_id':user_id,'dashboard_id':dashboard_id,"control_html_key":getDragControl($table).attr("id")};
				 requestWeb(para,function () {
				     //保存元数据
                     saveControlMeta(getDragControl($table));
                 },true)
			}


		 //填充控件面板-表格-数据函数     参数必须是对应$table对象
			function fillTabelData($control,$sets){
				//重新填充数据面板
				fillControlDataSet($curcontrol);
			};

		 //填充控件面板-表格-交互函数
			function fillTabelInteract($control,$sets){

			};

		//填充控件面板-hc-柱形图-样式函数
			function fillhcBaseStyle($control,$sets){
				//标题名称
				if(chart().userOptions.title.text!="undefined"){
					$("#hcBase_title").val(chart().userOptions.title.text);
				}
				//副标题名称
				if(typeof chart().userOptions.subtitle.text!="undefined"){
					$("#hcBase_subtitle").val(chart().userOptions.subtitle.text);
				}

				//纵标题名称
				if(typeof chart().userOptions.yAxis.title.text!="undefined"){
					$("#hcBase_y_title").val(chart().userOptions.yAxis.title.text);
				}

				//图表背景色
					$("#hcBase_backcolor").val(chart().userOptions.chart.backgroundColor);


				//图表风格
				$("#hcBase_type").val($control.attr("chart_theme"));

				//图表类型填充
				$("#hcBase_chart").val(chart().userOptions.chart.type);

				//------------曲线组合列填充
				//填充列
				fillhcBaseColumns(chart());

				//取出并设置默认列
				if($control.attr("cross_type")!=""){
					$("#hcBase_combine_line").val($control.attr("cross_type"));
				}else{
					$control.attr("cross_type","");
				}



			};

			//接收的图例列表，对HTML的内容进行切换
			function fillhcBaseColumns(chart){

				var $list=$("#hcBase_combine_line");

				var series=chart.series;

				//取出数据列的列表
				var columns_list=[];
				for(var i=0;i<series.length;i++){
					columns_list.push(series[i]["name"]);
				}
				//默认
				$list.html("");
				$list.append('<option value="">无</option>');

				//根据数据列填充
				for(var i=0;i<columns_list.length;i++){
					$list.append('<option value="'+columns_list[i]+'">'+columns_list[i]+'</option>');
				}

			}

		 //填充控件面板-hc-柱形图-数据函数
			function fillhcBaseData($control,$sets){
				//填充数据面板
				fillControlDataSet($control);

			};

		 //填充控件面板-hc-柱形图-交互函数
			function fillhcBaseInteract($control,$sets){

			};

		//填充控件面板-hc-饼状图-样式函数
			function fillhcPieStyle($control,$sets){
				//标题名称
				if(chart().userOptions.title.text!="undefined"){
					$("#hcPie_title").val(chart().userOptions.title.text);
				}
				//副标题名称
				if(typeof chart().userOptions.subtitle.text!="undefined"){
					$("#hcPie_subtitle").val(chart().userOptions.subtitle.text);
				}

				//图表背景色
				$("#hcPie_backcolor").val(chart().userOptions.chart.backgroundColor);


				//图表风格
				$("#hcPie_type").val($control.attr("chart_theme"));

				//图表类型填充
				$("#hcPie_chart").val(chart().userOptions.chart.type);


			};

		 //填充控件面板-hc-饼状图-数据函数
			function fillhcPieData($control,$sets){
				//填充数据面板
				fillControlDataSet($control);

			};

		 //填充控件面板-hc-饼状图-交互函数
			function fillhcPieInteract($control,$sets){

			};

		//填充控件面板-hc-点图-样式函数
			function fillhcBubbleStyle($control,$sets){
				//标题名称
				if(chart().userOptions.title.text!="undefined"){
					$("#hcBubble_title").val(chart().userOptions.title.text);
				}
				//副标题名称
				if(typeof chart().userOptions.subtitle.text!="undefined"){
					$("#hcBubble_subtitle").val(chart().userOptions.subtitle.text);
				}

				//纵标题名称
				if(typeof chart().userOptions.yAxis.title.text!="undefined"){
					$("#hcBubble_y_title").val(chart().userOptions.yAxis.title.text);
				}

				//图表背景色
				$("#hcBubble_backcolor").val(chart().userOptions.chart.backgroundColor);


				//图表风格
				$("#hcBubble_type").val($control.attr("chart_theme"));

				//图表类型填充
				$("#hcBubble_chart").val(chart().userOptions.chart.type);


			};

		 //填充控件面板-hc-饼状图-数据函数
			function fillhcBubbleData($control,$sets){
				//填充数据面板
				fillControlDataSet($control);

			};

		 //填充控件面板-hc-饼状图-交互函数
			function fillhcBubbleInteract($control,$sets){

			};

		//填充控件面板-hc-仪表盘-样式函数
			function fillhcGaugeStyle($control,$sets){
				//标题名称
				if(chart().userOptions.title.text!="undefined"){
					$("#hcGauge_title").val(chart().userOptions.title.text);
				}
				//副标题名称
				if(typeof chart().userOptions.subtitle.text!="undefined"){
					$("#hcGauge_subtitle").val(chart().userOptions.subtitle.text);
				}

				//表盘标题hcGauge_boardtitle
				if(typeof chart().userOptions.yAxis.title.text!="undefined"){
					$("#hcGauge_boardtitle").val(chart().userOptions.yAxis.title.text);
				}

				//图表背景色
				$("#hcGauge_backcolor").val(chart().userOptions.chart.backgroundColor);

				//图表风格
				$("#hcGauge_type").val($control.attr("chart_theme"));

				//填充数据范围
				var plotBands=$control.highcharts().userOptions.yAxis.plotBands;
				$("#hcGauge_from1").val(plotBands[0].from);
				$("#hcGauge_to1").val(plotBands[0].to);
				$("#hcGauge_color1").val(plotBands[0].color);
				$("#hcGauge_from2").val(plotBands[1].from);
				$("#hcGauge_to2").val(plotBands[1].to);
				$("#hcGauge_color2").val(plotBands[1].color);
				$("#hcGauge_from3").val(plotBands[2].from);
				$("#hcGauge_to3").val(plotBands[2].to);
				$("#hcGauge_color3").val(plotBands[2].color);






			};

		 //填充控件面板-hc-仪表盘-数据函数
			function fillhcGaugeData($control,$sets){
				//填充数据面板
				fillControlDataSet($control);

			};

		 //填充控件面板-hc-仪表盘-交互函数
			function fillhcGaugeInteract($control,$sets){

			};

		//填充控件面板-hc-仪表盘-样式函数
			function fillhcWordcloudStyle($control,$sets){
				//标题名称
				if(chart().userOptions.title.text!="undefined"){
					$("#hcWordcloud_title").val(chart().userOptions.title.text);
				}
				//副标题名称
				if(typeof chart().userOptions.subtitle.text!="undefined"){
					$("#hcWordcloud_subtitle").val(chart().userOptions.subtitle.text);
				}

				//图表背景色
				$("#hcWordcloud_backcolor").val(chart().userOptions.chart.backgroundColor);


				//图表风格
				$("#hcWordcloud_type").val($control.attr("chart_theme"));


			};

		 //填充控件面板-hc-仪表盘-数据函数
			function fillhcWordcloudData($control,$sets){
				//填充数据面板
				fillControlDataSet($control);

			};

		 //填充控件面板-hc-仪表盘-交互函数
			function fillhcWordcloudInteract($control,$sets){

			};

		//填充控件面板-var-查询控件-样式函数
			function fillVarStyle($control,$sets){
				para={"action":"queryControlByAllCon","user_id":user_id,"dashboard_id":dashboard_id,"control_key":control_key,"control_html_key":$control.attr("id")};
				requestWebData(para,function (json_data) {
					control_info=json_data[0];
					$("#var_id").val(control_info["var_id"]);
				},true)

			};

		 //填充控件面板-var-查询控件-数据函数
			function fillVarData($control,$sets){
				//填充数据面板
				fillControlDataSet($curcontrol);
				//更新查询条件默认值


			};

		 //填充控件面板-var-查询控件-交互函数
			function fillVarInteract($control,$sets){

			};

		//-------------设置面板值被改变后，更新canvas控件----------

		  //-------------------页面控件更新---样式----------

			//设置背景颜色
			$("#bg_color").colorpicker();

			$("#bg_color").on('colorpickerChange', function(event) {
				$canvas.css('background-color', event.color.toString());
				saveCanvasCss();
			  });

			// //设置背景图片

			  //文件上传成功后处理
			$("#input_img").on("fileuploaded", function(event, data, previewId, index) {

				var rel_path=data.response[1].rel_path;
				var url_path="{{static_url('')}}"+rel_path.split('\\').join('/');

				$canvas.css("background-image","url('"+url_path+"')");
				$canvas.css("background-size","contain");

				//保存样式
                saveCanvasCss();

				//更新文件名称以便入库
				cur_file_name=data.response[1].file_name;

			});

			 //清除背景图片触发
			$("#clear_background").click(function () {
				$canvas.css("background-image","");
				saveCanvasCss();
			});

			  //超链接输入
			$("#background_img_url").change(function () {
				$canvas.css("background-image","url('"+$(this).val()+"')");
				$canvas.css("background-size","contain");
				saveCanvasCss();
			});



		  //-------------------文本控件更新---样式

			  //设置文本颜色
			  $("#label_color").colorpicker();

			  $("#label_color").on('colorpickerChange', function(event) {
				if(getControlType($curcontrol)==label_key){

					$curcontrol.find("label").css('color', event.color.toString());
					saveControlCss($curcontrol);
				}
			  });

			  //设置字体
			  $("#label_type").change(function(){

				if(getControlType($curcontrol)==label_key){

				  setFontFamily($curcontrol.find("label"),$(this));

				}

			  });

			  //设置字体大小
			  $("#label_px").change(function(){
				if(getControlType($curcontrol)==label_key){

					setFontPx($curcontrol.find("label"),$(this).val().replace("px","")+"px");
				}
			  });

			  //设置字体粗细
			  $("#label_weight").change(function(){
				  if(getControlType($curcontrol)==label_key){
					 setFontWeight($curcontrol.find("label"),$(this));
				  }
			  });

			  //设置文本超链接
			  $("#label_href").change(function(){
				 if(getControlType($curcontrol)==label_key){

					  if($("#label_href").val().trim()!=''){
                        var $label=$curcontrol.find("label");
                        if(!$label.parent().is("a")){
                            $label.wrap("<a></a>");
                        }
                        $label.parent("a").attr("href",$(this).val().trim());
                        $label.parent("a").attr("target","_Blank");
					  }

					  saveControlCss($curcontrol);
				 }

			  });

		  //-------------------文本控件更新--数据------------------------

			  //设置静态数据脚本
			  $("#label_input_script").change(function(){
				if(getControlType($curcontrol)==label_key){
				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
					//更新页面值
					toggleDataShow($curcontrol,para_data);

					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"]);
				}


			  });

			  //设置EXCEL/CSV数据脚本
			  $("#label_source_excel").change(function () {

				if(getControlType($curcontrol)==label_key){

				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['db_id']=$(this).val();

				    //更新前端
					toggleDataShow($curcontrol,para_data);


					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"])

				}

			  });

			  //设置API数据脚本
			  $("#label_api_script").change(function () {

				if(getControlType($curcontrol)==label_key){

				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
				    //更新前端
                    toggleDataShow($curcontrol,para_data);

                    //更新数据库值
                    toggleSource($curcontrol,para_data["src_type"]);
				}

			  });

			  //设置数据库数据脚本
			   $("#label_sql_script").change(function () {

				if(getControlType($curcontrol)==label_key){
                        control_key=$(this).attr("id").split("_")[0];
                        //组装参数
                        var para_data={};
                        para_data["src_type"]=$("#"+control_key+"_source_type").val();
                        para_data['script']=$(this).val();
                        para_data['db_id']=$("#"+control_key+"_source_dbms").val();

                        if(para_data['db_id']==""){
                            alert("请选择数据源!");
                            $(this).val('');
                            return;
                        }

                        //前端数据刷新
                        toggleDataShow($curcontrol,para_data);


                        //更新数据库值
                        toggleSource($curcontrol,para_data["src_type"]);


				}

			  });



		  //-------------------图片控件更新--样式------------------------
			  //设置背景图片bg_image_upload
			  $("#input_control_img").fileinput({
				langauge: 'zh',
				showPreview: true,
				showUpload: true,
				maxFileCount: 1,
				previewFileType:'any',
				allowedFileExtensions: ["jpg", "png", "gif"],
				uploadExtraData:function () {
					var action={
						"action":"uploadImage",
						"user_id":user_id
					};
					return action;
				},//向后台传递参数
				uploadUrl: window.location.href
			});

			  //文件上传成功后处理
			  $("#input_control_img").on("fileuploaded", function(event, data, previewId, index) {

				var rel_path=data.response[1].rel_path;
				var url_path="{{static_url('')}}"+rel_path.split('\\').join('/');

				//$canvas.css("background-image","url('"+url_path+"')");
				//$canvas.css("background-size","contain");

				$curcontrol.find("img").attr("src",url_path);


			  });

			  //图片上传输入链接
			  $("#img_url").change(function () {
				$curcontrol.find("img").attr("src",$(this).val());
				saveControlCss($curcontrol);
			  });

			  //图片上传透明度
			  $("#img_transparent").change(function () {

				$curcontrol.find("img").css("opacity",parseFloat($(this).val().trim())/100);
				saveControlCss($curcontrol);

			  });

			  //图片超链接配置
			  $("#img_href").change(function () {

				var img=$curcontrol.find("img");
				if(!img.parent().is("a")){
					img.wrap("<a></a>");
				}
				img.parent("a").attr("href",$(this).val().trim());
				saveControlCss($curcontrol);
			  });

		  //-------------------内嵌网页控件更新--样式------------------------

			  $("#link_href").change(function () {
				  $("iframe",$curcontrol).attr("src",$(this).val().trim());
				  saveControlCss($curcontrol);
			  });


		//-------------------表格控件更新--样式----------------------


			// ----设置表头---------------------------------

			  //设置背景颜色
			  //-------设置表头相关样式------
			  $("#table_tr_color").colorpicker();

			  $("#table_tr_color").on('colorpickerChange', function(event) {

				$curcontrol=getDragControl($curcontrol);


				if(getControlType($curcontrol)==table_key){
					getTablePart($curcontrol,'tr').css('background-color', event.color.toString());
					saveControlCss($curcontrol);
				}
			  });

			  //文本对齐
			  $("#table_tr_align").change(function(){

				$curcontrol=getDragControl($curcontrol);

				if(getControlType($curcontrol)==table_key){
					setHorAlign(getTablePart($curcontrol,'tr'),$(this));
				}
			  });

			  //字体
			  $("#table_tr_font_type").change(function(){

				$curcontrol=getDragControl($curcontrol);

				if(getControlType($curcontrol)==table_key){
					setFontFamily(getTablePart($curcontrol,'tr'),$(this));
				}
			  });

			  //文本颜色
			  $("#table_tr_font_color").colorpicker();

			  $("#table_tr_font_color").on('colorpickerChange', function(event) {

				$curcontrol=getDragControl($curcontrol);

				if(getControlType($curcontrol)==table_key){
					getTablePart($curcontrol,'tr').css('color', event.color.toString());
					saveControlCss($curcontrol);

				}
			  });

			  //字号
			  $("#table_tr_font_px").change(function(){
				$curcontrol=getDragControl($curcontrol);
				if(getControlType($curcontrol)==table_key){
				    var font_px=$(this).val().replace("px","")+"px";
				    //注意,由于控件因素,设置顺序不能改变
				    //---设置表格
                    var font_size=$(this).val().replace("px","");
                    var $table=getTablePart($curcontrol,'table');
                    var columns=$table.bootstrapTable('getVisibleColumns');
                    for(var idx in columns){
                        var field=columns[idx]["field"];
                        setColumnAttr($curcontrol,field,'cellStyle',"font-size:"+font_px);
                    }
				    //设置表头
					setFontPx(getTablePart($curcontrol,'tr'),font_px);
                    $(this).val(font_px);


				}


			  });

			  //表格样式
			  $("#table_type").colorpicker();

			  $("#table_type").change(function(){
				$curcontrol=getDragControl($curcontrol);
				var $table=getTablePart($curcontrol,'table');

				if(getControlType($curcontrol)==table_key){
					for(var type in color_type){
						$table.removeClass("table-"+color_type[type]);
					}


					if($(this)!="default-table"){
						$table.addClass("table-"+$(this).val());
					}

					saveControlCss($curcontrol);
					saveControlMeta($curcontrol);

				}


			  });





			//----设置数据列----------------------------------------------

			  //设置数据列ID
			  $("#table_col_id").change(function(){

				  $curcontrol=getDragControl($curcontrol);
				  $table=getTablePart($curcontrol,'table');
				  var columns=$table.bootstrapTable('getVisibleColumns');

				  //获取选中状态的列
				  var $col=$(".active","#table_columns");
				  var col_id=$col.attr("id").slice(7);

				  //判断有无重复列ID
				  var is_col_repeat=false;
				  for(var i=0;i<columns.length;i++){
					if($(this).val().replace(" ","")==columns[i].field){
						is_col_repeat=true;
						break;
					}
				  }


				  //设置列属性
				  if(!is_col_repeat){
					setColumnAttr($curcontrol,col_id,'field',$(this).val());

				  }else{
					alert("列ID与其他列重复,请重新选择");
				  }



			  });

			  $("#table_col_name").change(function(){

				  $curcontrol=getDragControl($curcontrol);

				  //获取选中状态的列
				  var $col=$(".active","#table_columns");
				  var col_id=$col.attr("id").slice(7);

				  //设置列属性
				  setColumnAttr($curcontrol,col_id,'title',$(this).val());


			  });

			  //文本对齐
			  $("#table_th_align").change(function(){

				   $curcontrol=getDragControl($curcontrol);

				  //获取选中状态的列
				   var $col=$(".active","#table_columns");
				   var col_id=$col.attr("id").slice(7);

				  //设置列属性
				  setColumnAttr($curcontrol,col_id,'align',$(this).val());

			  });

			  //设置字体
			  $("#table_th_font_type").change(function(){

				   $curcontrol=getDragControl($curcontrol);

				  //获取选中状态的列
				   var $col=$(".active","#table_columns");
				   var col_id=$col.attr("id").slice(7);

				  //设置列属性
				  setColumnAttr($curcontrol,col_id,'cellStyle',"font-family:"+$(this).val());

			  });

			  //设置字颜色
			  $("#table_th_font_color").colorpicker();

			  $("#table_th_font_color").on('colorpickerChange', function(event){

				   $curcontrol=getDragControl($curcontrol);

				  //获取选中状态的列
				   var $col=$(".active","#table_columns");
				   var col_id=$col.attr("id").slice(7);

				  //设置列属性
				  setColumnAttr($curcontrol,col_id,'cellStyle',"color:"+event.color.toString());

			  });

			  //设置字号
			  $("#table_th_font_px").change(function(){

				   $curcontrol=getDragControl($curcontrol);

				  //获取选中状态的列
				   var $col=$(".active","#table_columns");
				   var col_id=$col.attr("id").slice(7);

				  //设置列属性
				  setColumnAttr($curcontrol,col_id,'cellStyle',"font-size:"+$(this).val().replace("px","")+"px");

			  });

			  //设置字体粗细
			  $("#table_th_font_weight").change(function(){

				   $curcontrol=getDragControl($curcontrol);

				  //获取选中状态的列
				   var $col=$(".active","#table_columns");
				   var col_id=$col.attr("id").slice(7);

				  //设置列属性
				  setColumnAttr($curcontrol,col_id,'cellStyle',"font-weight:"+$(this).val());

			  });

			  //数据表增加新列
			  $("#add_col").click(function(){
				$curcontrol=getDragControl($curcontrol);

				var $table=getTablePart($curcontrol,'table');
				var table_options=$table.bootstrapTable('getOptions');
				var columns=table_options.columns[0];

				var new_col_field='col'+new Date().getTime();

				var new_col={title: '列',field: new_col_field,sortable:true};

				columns.push(new_col);


			  //刷新表缓存
			  table_options.columns[0]=columns;

			  $table.bootstrapTable('refreshOptions',table_options);

			  //克隆表样式
				cloneTableStyle($curcontrol);

			  //重新填充tab设置面板
				fillTabelStyle($curcontrol,$("#table_sets"));



			  });

			  //数据表减少列table_excel_data
			  $("#del_col").click(function(){

				var $table=getTablePart($curcontrol,'table');
				var table_options=$table.bootstrapTable('getOptions');
				var columns=table_options.columns[0];

				var $col=$(".active","#table_columns");
				var col_id=$col.attr("id").slice(7);

				//如果只剩下最后一列，拒绝更新表
				if(columns.length==1){
					alert("表格要保证至少有一列!");
					return;
				}


				//删除列数组元素
				for(var i=0;i<columns.length;i++){
					if(col_id==columns[i].field){
						columns.splice(i,1);
						break;
					}
				}

			  //刷新表缓存
			  table_options.columns[0]=columns;

			  $table.bootstrapTable('refreshOptions',table_options);

			  //克隆表样式
				cloneTableStyle($curcontrol);

			  //重新填充tab设置面板
				fillTabelStyle($curcontrol,$("#table_sets"));

			  });

		//-------------------表格控件更新--数据-------------------------------

			   //设置静态数据脚本
			  $("#table_input_script").change(function(){
				if(getControlType($curcontrol)==table_key){
				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
					//更新页面值
					toggleDataShow($curcontrol,para_data);

					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"]);

				};

			  });

			  //设置EXCEL/CSV数据脚本
			  $("#table_source_excel").change(function () {

				if(getControlType($curcontrol)==table_key){
				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['db_id']=$(this).val();

				    //更新前端
					toggleDataShow($curcontrol,para_data);


					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"])

				}

			  });

			  //设置API数据脚本
			  $("#table_api_script").change(function () {

				if(getControlType($curcontrol)==table_key){
				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
				    //更新前端
                    toggleDataShow($curcontrol,para_data);

                    //更新数据库值
                    toggleSource($curcontrol,para_data["src_type"]);
				}

			  });

			  //设置数据库sql响应脚本
			  $("#table_sql_script").change(function(){

                    if(getControlType($curcontrol)==table_key){
                        control_key=$(this).attr("id").split("_")[0];
                        //组装参数
                        var para_data={};
                        para_data["src_type"]=$("#"+control_key+"_source_type").val();
                        para_data['script']=$(this).val();
                        para_data['db_id']=$("#"+control_key+"_source_dbms").val();

                        if(para_data['db_id']==""){
                            alert("请选择数据源!");
                            $(this).val('');
                            return;
                        }

                        //前端数据刷新
                        toggleDataShow($curcontrol,para_data);

                        //更新数据库值
                        toggleSource($curcontrol,para_data["src_type"]);








                    }
			 });


			 $("#input_excel").on("fileuploaded", function(event, data, previewId, index) {

				//更新文件名称以便入库
				cur_file_name=data.response[1].file_name;

			});



			//---------highchart控件---------基本图--------样式---------------

			 //标题
			 $("#hcBase_title").change(function () {
				updateChart(chart(),"title.text",$(this).val());

			 });

			 //副标题
			 $("#hcBase_subtitle").change(function () {

				updateChart(chart(),"subtitle.text",$(this).val());

			 });

			 //纵标题
			 $("#hcBase_y_title").change(function () {

				updateChart(chart(),"yAxis.title.text",$(this).val());

			 });

			 //设置文本颜色
			 $("#hcBase_backcolor").colorpicker();

			 $("#hcBase_backcolor").on('colorpickerChange', function(event) {

					updateChart(chart(),"chart.backgroundColor",$(this).val());
			  });

			 //表格风格
			 $("#hcBase_type").change(function () {

				toggleChartTheme(chart(),$(this).val());

				//设置附加主题属性
				$curcontrol.attr("chart_theme",$(this).val());

			 });

			 //切换图表主题风格
			 function toggleChartTheme(chart,theme) {

				var chose_theme;

				 switch(theme){
					 case 'theme_dark_blue':chose_theme=theme_dark_blue;break;
					 case 'theme_dark_light':chose_theme=theme_dark_light;break;
					 case 'theme_gray':chose_theme=theme_gray;break;
					 case 'theme_grid':chose_theme=theme_grid;break;
					 case 'theme_sand':chose_theme=theme_sand;break;
					 case 'theme_default':chose_theme=theme_default;break;
					 default:return;
				 }
				 chart.update(chose_theme);
				 saveControlCss($curcontrol);
			 }

			 //图表类型切换
			 $("#hcBase_chart").change(function () {
				 updateChart(chart(),"chart.type",$(this).val());
			 });

			  //加入组合图
			 $("#hcBase_combine_line").change(function () {

				const series=chart().userOptions.series;

				var upt_series=[];
				var cross_col=$(this).val();

				//增加cross_type
				for(var i=0;i<series.length;i++){
					obj={};
					obj["name"]=series[i]["name"];
					obj["data"]=series[i]["data"];

					if(series[i]["name"]==cross_col){
						obj["type"]="spline";
					}

					upt_series.push(obj);
				}


				//更新至图表中
				updateChart(chart(),"series",upt_series);


				//
				//控件记录属性
				$curcontrol.attr("cross_type",cross_col);
			  });


			//---------highchart控件---------基本图--------数据---------------


			 //静态数据脚本更新
			 $("#hcBase_input_script").change(function () {
				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
					//更新页面值
					toggleDataShow($curcontrol,para_data);

					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"]);

			 });

			 //Excel数据脚本更新
			 $("#hcBase_source_excel").change(function () {

				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['db_id']=$(this).val();

				    //更新前端
					toggleDataShow($curcontrol,para_data);


					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"])
			 });

			 //设置API数据脚本
			 $("#hcBase_api_script").change(function () {

				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
				    //更新前端
                    toggleDataShow($curcontrol,para_data);

                    //更新数据库值
                    toggleSource($curcontrol,para_data["src_type"]);

			  });

			 //设置数据库sql响应脚本
			 $("#hcBase_sql_script").change(function(){

					control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
				    //更新前端
                    toggleDataShow($curcontrol,para_data);

                    //更新数据库值
                    toggleSource($curcontrol,para_data["src_type"]);

			 });

			 //从数据Json中获取对应的categories和series数据 返回对象 {categories,series}，用于基本类图表
			 function getCategoriesAndSeries(json_data) {

					var columns=getColumnnList(json_data);

					//获取第一个列名
					for(var key in columns){
						var first_field=columns[key];
						break;
					}

					//组装json
					var categories=[];
					var series=[];

					 //组装categories
					for(var i=0;i<json_data.length;i++){
						categories.push(json_data[i][first_field]);
					}

					 //组装series
					for(var key in columns){
						//跳过第一列数据
						if(first_field!=columns[key]){
							var col={};
							var col_data=[];

							col["name"]=columns[key];

							for(var i=0;i<json_data.length;i++){

								col_data.push(parseFloat(json_data[i][columns[key]]));

							}
							col["data"]=col_data;

							series.push(col);

						}

					}

					var result={};
					result["categories"]=categories;
					result["series"]=series;

					return result;

			 }

			 //从数据Json中获取对应seies
			 function getSeries(json_data,control_key) {

				var columns=getColumnnList(json_data);

				var column_array=[];

				//获取第一个列名
				for(var key in columns){
					column_array.push(key);
				}

				//组装json
				var series=[];
				var obj={};

				switch (control_key) {
					case hc_pie_key:
						//获取name
							obj["name"]=json_data[0][column_array[0]];
						//获取Data
							data=[];

							for(var i=0;i<json_data.length;i++){
									row=[];
									row.push(json_data[i][column_array[1]]);
									row.push(json_data[i][column_array[2]]);
									data.push(row);
							}

							obj["data"]=data;

							series.push(obj);

						break;

					case hc_bubble_key:

						if(column_array.length>=5){ //5个列表的组装方法

							//图例数据获取
							var first_field_values=[];

							//遍历获取第一列的值
							for(var i=0;i<json_data.length;i++){
								if(first_field_values.indexOf(json_data[i][column_array[0]])==-1){
									first_field_values.push(json_data[i][column_array[0]])
								}
							}

							//组装series
							for(var i=0;i<first_field_values.length;i++){

								obj={};

								obj["name"]=first_field_values[i];

								var data=[];

								for(var j=0;j<json_data.length;j++){
									if(json_data[j][column_array[0]]==first_field_values[i]){
										var row={};
										row["name"]=json_data[j][column_array[1]];
										row["x"]=json_data[j][column_array[2]];
										row["x_name"]=column_array[2];
										row["y"]=json_data[j][column_array[3]];
										row["y_name"]=column_array[3];
										row["z"]=json_data[j][column_array[4]];
										row["z_name"]=column_array[4];

										data.push(row);
									}

								}

								obj["data"]=data;

								series.push(obj);

							 }
						} else if(column_array.length<=4){  //4列的组装方法

							//组装series

								var data=[];

								for(var j=0;j<json_data.length;j++){
										var row={};
										row["name"]=json_data[j][column_array[0]];
										row["x"]=json_data[j][column_array[1]];
										row["x_name"]=column_array[1];
										row["y"]=json_data[j][column_array[2]];
										row["y_name"]=column_array[2];
										row["z"]=json_data[j][column_array[3]];
										row["z_name"]=column_array[3];

										data.push(row);
								}

								obj["data"]=data;

								series.push(obj);

							 };
					break;

					case hc_gauge_key:
						obj={};
						obj["name"]=column_array[0];

						data=[];
						data.push(json_data[0][column_array[0]]);

						obj["data"]=data;

						series.push(obj);

					break;

					case hc_wordcloud_key:

						obj={};
						data=[];

						for(var i=0;i<json_data.length;i++){
							row={};
							row["name"]=json_data[i][column_array[0]];
							row["weight"]=json_data[i][column_array[1]];

							data.push(row);
						}

						obj["data"]=data;

						series.push(obj);

					break;

				}

					return series;

			 }


			//---------highchart控件---------饼状图--------样式---------------

			 //标题
			 $("#hcPie_title").change(function () {

				updateChart(chart(),"title.text",$(this).val());

			 });

			 //副标题
			 $("#hcPie_subtitle").change(function () {

				updateChart(chart(),"subtitle.text",$(this).val());

			 });


			 //设置背景颜色
			 $("#hcPie_backcolor").colorpicker();

			 $("#hcPie_backcolor").on('colorpickerChange', function(event) {

					updateChart(chart(),"chart.backgroundColor",$(this).val());
			  });

			 //表格风格
			 $("#hcPie_type").change(function () {

				toggleChartTheme(chart(),$(this).val());

				//设置附加主题属性
				$curcontrol.attr("chart_theme",$(this).val());

			 });


			//---------highchart控件---------饼状图--------数据---------------


			 //静态数据脚本更新
			 $("#hcPie_input_script").change(function () {
				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
					//更新页面值
					toggleDataShow($curcontrol,para_data);

					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"]);


			 });

			 //Excel数据脚本更新
			 $("#hcPie_source_excel").change(function () {

				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['db_id']=$(this).val();

				    //更新前端
					toggleDataShow($curcontrol,para_data);


					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"])

			 });

			 //设置API数据脚本
			 $("#hcPie_api_script").change(function () {

				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
				    //更新前端
                    toggleDataShow($curcontrol,para_data);

                    //更新数据库值
                    toggleSource($curcontrol,para_data["src_type"]);

			  });

			 //设置数据库sql响应脚本
			 $("#hcPie_sql_script").change(function(){
                control_key=$(this).attr("id").split("_")[0];
                //组装参数
                var para_data={};
                para_data["src_type"]=$("#"+control_key+"_source_type").val();
                para_data['script']=$(this).val();
                para_data['db_id']=$("#"+control_key+"_source_dbms").val();

                if(para_data['db_id']==""){
                    alert("请选择数据源!");
                    $(this).val('');
                    return;
                }

                //前端数据刷新
                toggleDataShow($curcontrol,para_data);


                //更新数据库值
                toggleSource($curcontrol,para_data["src_type"]);

			 });




			//---------highchart控件---------汽泡图--------样式---------------

			 //标题
			 $("#hcBubble_title").change(function () {

				updateChart(chart(),"title.text",$(this).val());

			 });

			 //副标题
			 $("#hcBubble_subtitle").change(function () {

				updateChart(chart(),"subtitle.text",$(this).val());

			 });

			 //纵标题
			 $("#hcBubble_y_title").change(function () {

				updateChart(chart(),"yAxis.title.text",$(this).val());

			 });

			 //设置背景颜色
			 $("#hcBubble_backcolor").colorpicker();

			 $("#hcBubble_backcolor").on('colorpickerChange', function(event) {

					updateChart(chart(),"chart.backgroundColor",$(this).val());
			  });

			 //表格风格
			 $("#hcBubble_type").change(function () {

				toggleChartTheme(chart(),$(this).val());

				//设置附加主题属性
				$curcontrol.attr("chart_theme",$(this).val());

			 });

			//---------highchart控件---------汽泡图--------数据---------------

			 //静态数据脚本更新
			 $("#hcBubble_input_script").change(function () {
				if(getControlType($curcontrol)==table_key){
				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
					//更新页面值
					toggleDataShow($curcontrol,para_data);

					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"]);

				};


			 });

			 //Excel数据脚本更新
			 $("#hcBubble_source_excel").change(function () {
				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['db_id']=$(this).val();

				    //更新前端
					toggleDataShow($curcontrol,para_data);


					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"])

			 });

			 //设置API数据脚本
			 $("#hcBubble_api_script").change(function () {

				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
				    //更新前端
                    toggleDataShow($curcontrol,para_data);

                    //更新数据库值
                    toggleSource($curcontrol,para_data["src_type"]);

			  });

			 //设置数据库sql响应脚本
			 $("#hcBubble_sql_script").change(function(){
                control_key=$(this).attr("id").split("_")[0];
                //组装参数
                var para_data={};
                para_data["src_type"]=$("#"+control_key+"_source_type").val();
                para_data['script']=$(this).val();
                para_data['db_id']=$("#"+control_key+"_source_dbms").val();

                if(para_data['db_id']==""){
                    alert("请选择数据源!");
                    $(this).val('');
                    return;
                }

                //前端数据刷新
                toggleDataShow($curcontrol,para_data);


                //更新数据库值
                toggleSource($curcontrol,para_data["src_type"]);

			 });



				//---------highchart控件---------仪表盘--------样式---------------

			 //标题
			 $("#hcGauge_title").change(function () {

				updateChart(chart(),"title.text",$(this).val());

			 });

			 //副标题
			 $("#hcGauge_subtitle").change(function () {

				updateChart(chart(),"subtitle.text",$(this).val());

			 });

			 //表盘标题
			 $("#hcGauge_boardtitle").change(function () {
				 updateChart(chart(),"yAxis.title.text",$(this).val());
			 });


			 //设置背景颜色
			 $("#hcGauge_backcolor").colorpicker();

			 $("#hcGauge_backcolor").on('colorpickerChange', function(event) {

					updateChart(chart(),"chart.backgroundColor",$(this).val());
			  });

			 //表格风格
			 $("#hcGauge_type").change(function () {

				toggleChartTheme(chart(),$(this).val());

				//设置附加主题属性
				$curcontrol.attr("chart_theme",$(this).val());

			 });

		  //数据范围
			 //数据各阶梯颜色
			 $("#hcGauge_from1").change(function () {

				var plotBands=chart().userOptions.yAxis.plotBands;
				var min=parseFloat($(this).val());

				plotBands[0]["from"]=min;

				updateChart(chart(),"yAxis.plotBands",plotBands);
				updateChart(chart(),"yAxis.min",min);

			 });

			 $("#hcGauge_to1").change(function () {

				var plotBands=chart().userOptions.yAxis.plotBands;
				var to1=parseFloat($(this).val());

				plotBands[0]["to"]=to1;

				updateChart(chart(),"yAxis.plotBands",plotBands);
			 });

			 $("#hcGauge_color1").colorpicker();
			 $("#hcGauge_color1").change(function (){

				var plotBands=chart().userOptions.yAxis.plotBands;

				plotBands[0]["color"]=$(this).val();

				updateChart(chart(),"yAxis.plotBands",plotBands);
			 });


			 $("#hcGauge_from2").change(function () {

				var plotBands=chart().userOptions.yAxis.plotBands;
				var from2=parseFloat($(this).val());

				plotBands[1]["from"]=from2;

				updateChart(chart(),"yAxis.plotBands",plotBands);

			 });

			 $("#hcGauge_to2").change(function () {

				var plotBands=chart().userOptions.yAxis.plotBands;
				var to2=parseFloat($(this).val());

				plotBands[1]["to"]=to2;

				updateChart(chart(),"yAxis.plotBands",plotBands);

			 });

			 $("#hcGauge_color2").colorpicker();
			 $("#hcGauge_color2").change(function () {

				var plotBands=chart().userOptions.yAxis.plotBands;

				plotBands[1]["color"]=$(this).val();

				updateChart(chart(),"yAxis.plotBands",plotBands);

			 });

			 $("#hcGauge_from3").change(function () {

				var plotBands=chart().userOptions.yAxis.plotBands;
				var from3=parseFloat($(this).val());

				plotBands[2]["from"]=from3;

				updateChart(chart(),"yAxis.plotBands",plotBands);

			 });

			 $("#hcGauge_to3").change(function () {

				var plotBands=chart().userOptions.yAxis.plotBands;
				var max=parseFloat($(this).val());

				plotBands[2]["to"]=max;

				updateChart(chart(),"yAxis.plotBands",plotBands);
				updateChart(chart(),"yAxis.max",max);

			 });

			  $("#hcGauge_color3").colorpicker();
			 $("#hcGauge_color3").change(function () {

				var plotBands=chart().userOptions.yAxis.plotBands;

				plotBands[2]["color"]=$(this).val();

				updateChart(chart(),"yAxis.plotBands",plotBands);


			 });

			//---------highchart控件---------仪表盘--------数据---------------


			 //静态数据脚本更新
			 $("#hcGauge_input_script").change(function () {
				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
					//更新页面值
					toggleDataShow($curcontrol,para_data);

					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"]);


			 });

			 //Excel数据脚本更新
			 $("#hcGauge_source_excel").change(function () {
				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['db_id']=$(this).val();

				    //更新前端
					toggleDataShow($curcontrol,para_data);


					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"])

			 });

			 //设置API数据脚本
			 $("#hcGauge_api_script").change(function () {
				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
				    //更新前端
                    toggleDataShow($curcontrol,para_data);

                    //更新数据库值
                    toggleSource($curcontrol,para_data["src_type"]);

			  });

			 //设置数据库sql响应脚本
			 $("#hcGauge_sql_script").change(function(){
                control_key=$(this).attr("id").split("_")[0];
                //组装参数
                var para_data={};
                para_data["src_type"]=$("#"+control_key+"_source_type").val();
                para_data['script']=$(this).val();
                para_data['db_id']=$("#"+control_key+"_source_dbms").val();

                if(para_data['db_id']==""){
                    alert("请选择数据源!");
                    $(this).val('');
                    return;
                }

                //前端数据刷新
                toggleDataShow($curcontrol,para_data);


                //更新数据库值
                toggleSource($curcontrol,para_data["src_type"]);

			 });


			//---------highchart控件---------词云图--------样式---------------

			 //标题
			 $("#hcWordcloud_title").change(function () {

				updateChart(chart(),"title.text",$(this).val());

			 });

			 //副标题
			 $("#hcWordcloud_subtitle").change(function () {

				updateChart(chart(),"subtitle.text",$(this).val());

			 });


			 //设置背景颜色
			 $("#hcWordcloud_backcolor").colorpicker();

			 $("#hcWordcloud_backcolor").on('colorpickerChange', function(event) {

					updateChart(chart(),"chart.backgroundColor",$(this).val());
			  });

			 //表格风格
			 $("#hcWordcloud_type").change(function () {

				toggleChartTheme(chart(),$(this).val());

				//设置附加主题属性
				$curcontrol.attr("chart_theme",$(this).val());

			 });


			//---------highchart控件---------词云图--------数据---------------


			 //静态数据脚本更新
			 $("#hcWordcloud_input_script").change(function () {
				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
					//更新页面值
					toggleDataShow($curcontrol,para_data);

					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"]);

			 });

			 //Excel数据脚本更新
			 $("#hcWordcloud_source_excel").change(function () {

				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['db_id']=$(this).val();

				    //更新前端
					toggleDataShow($curcontrol,para_data);


					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"])

			 });

			 //设置API数据脚本
			 $("#hcWordcloud_api_script").change(function () {

				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
				    //更新前端
                    toggleDataShow($curcontrol,para_data);

                    //更新数据库值
                    toggleSource($curcontrol,para_data["src_type"]);

			  });

			 //设置数据库sql响应脚本
			 $("#hcWordcloud_sql_script").change(function(){
                control_key=$(this).attr("id").split("_")[0];
                //组装参数
                var para_data={};
                para_data["src_type"]=$("#"+control_key+"_source_type").val();
                para_data['script']=$(this).val();
                para_data['db_id']=$("#"+control_key+"_source_dbms").val();

                if(para_data['db_id']==""){
                    alert("请选择数据源!");
                    $(this).val('');
                    return;
                }

                //前端数据刷新
                toggleDataShow($curcontrol,para_data);


                //更新数据库值
                toggleSource($curcontrol,para_data["src_type"]);

			 });


			//---------查询条件控件-----样式---------------
			 $("#var_id").change(function () {
				para={"action":"uptVarId","var_id":$(this).val().replace(" ",""),"user_id":user_id,"dashboard_id":dashboard_id,"control_html_key":control_html_key};
				requestWeb(para,function () {},true);

			 });

			 //--------查询条件控件-----数据-----------------

			  //设置静态数据脚本
			  $("#var_input_script").change(function(){
				if(getControlType($curcontrol)==var_key){
				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
					//更新页面值
					toggleDataShow($curcontrol,para_data);

					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"]);
				}


			  });

			  //设置EXCEL/CSV数据脚本
			  $("#var_source_excel").change(function () {

				if(getControlType($curcontrol)==var_key){

				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['db_id']=$(this).val();

				    //更新前端
					toggleDataShow($curcontrol,para_data);


					//更新数据库值
					toggleSource($curcontrol,para_data["src_type"])

				}

			  });

			  //设置API数据脚本
			  $("#var_api_script").change(function () {

				if(getControlType($curcontrol)==var_key){

				    control_key=$(this).attr("id").split("_")[0];
				    //组装参数
				    var para_data={};
				    para_data["src_type"]=$("#"+control_key+"_source_type").val();
				    para_data['script']=$(this).val();
				    //更新前端
                    toggleDataShow($curcontrol,para_data);

                    //更新数据库值
                    toggleSource($curcontrol,para_data["src_type"]);
				}

			  });

			  //设置数据库数据脚本
			   $("#var_sql_script").change(function () {

				if(getControlType($curcontrol)==var_key){
                        control_key=$(this).attr("id").split("_")[0];
                        //组装参数
                        var para_data={};
                        para_data["src_type"]=$("#"+control_key+"_source_type").val();
                        para_data['script']=$(this).val();
                        para_data['db_id']=$("#"+control_key+"_source_dbms").val();

                        if(para_data['db_id']==""){
                            alert("请选择数据源!");
                            $(this).val('');
                            return;
                        }

                        //前端数据刷新
                        toggleDataShow($curcontrol,para_data);


                        //更新数据库值
                        toggleSource($curcontrol,para_data["src_type"]);
				}

			  });

		//------------------------------------------------公共处理函数及事件------------


		 //-------------公共参数或处理--------------------------------------

			//获取控件新ID，按组件类型+时间组合
			function getNewControlID($control){
				var new_id=getControlType($control)+"_"+new Date().getTime();
				return new_id;
			}

			//重写控件resize事件函数 ,设置成相对位置
			function controlResize($control){

				//resize事件需要先解绑
				if($control.hasClass("ui-resizable")){
					$control.resizable("destroy");

				}

			  if(resize_controls.indexOf(getControlType($control))!=-1){
					$control.resizable({
						 containment:$canvas,
						  delay:100,
						  stop:function(event,ui){

                                // if(is_preview==true){
                                //     alert("请切换编辑模式再编辑");
                                //     return;
                                // }

								//设置相对大小
								var new_width=ui.size.width;
								var new_height=ui.size.height;

								$(this).css("width",(new_width/$canvas.width())*100+"%");
								$(this).css("height",(new_height/$canvas.height())*100+"%");

								//设置表样式
                                restoreControlCss($control);

								//表格控件处理
								if(getControlType($control)==table_key){
									var $table=getTablePart($control,'table');
									var table_options=$table.bootstrapTable('getOptions');

									//数据更新
									table_options.height=new_height;

									$table.bootstrapTable('refreshOptions',table_options);

									//重新填充tab设置面板
									fillTabelStyle($control,$("#table_sets"));

									}

								//HightCharts控件处理
								if(controls_chart.indexOf(getControlType($control))!=-1){

									$(this).highcharts().reflow();

								}


						}
					});
			   }

			}

			//控件拖动事件注册, type: 1是拖动后，原控件还在   2 是直接拖动原控件
			function controlDrag($control,type){

				switch(type){
					case 1:
						$control.draggable({
							helper:"clone"
						});break;
					case 2:
						$control.draggable({
							  containment:$canvas,
							  tolerance:"fit"
							});
						break;
					default:break;
				}

			}

			//画布中切换控件
			function controlToggle($control){


			   $control=getDragControl($control);
			  //处理控件选中后边框效果
				$("*","#"+canvas_key).removeClass("control-border");
				if(isControl($control)){
					$control.addClass("control-border");
				}

				//填充并显示控件设置面板
				var $sets=$(("#"+getControlType($control))+"_sets");

				fillSets($control,$sets);

				$sets.show(500);

				//隐藏其他所有控件设置
				for(var key in control_sets){
					if(control_sets[key]!=$sets.attr("id")){
						$("#"+control_sets[key]).hide();
						}
					}

				//更新全局控件指针
				$curcontrol=$control;
			}

			//通过当前控件，获取可拖动的整体控件
			function getDragControl($control){


				if($control.parent().attr("id")==canvas_key){
					//已经是最上级控件，直接返回
					return $control;
				}else{
					$control.parents().each(function () {
						if($(this).parent().attr("id")==canvas_key){
							$control=$(this);
						}
						return $control;

					})
				}

				return $control;





			}

			//克隆当前控件
			function controlClone($control){
                var new_control_id=getNewControlID($control);
                //入库并加载样式、数据
				para={"action":'cloneControl',"new_control_id":new_control_id,"user_id":user_id,"dashboard_id":dashboard_id,"control_key":getControlType($control),"control_html_key":$control.attr("id")}
				requestWeb(para,function () {
				    //克隆控件
                    controlRestore($control,new_control_id);
                },true)



			}

			//删除当前控件
            function controlDel($control) {
			    //后端删除
                para={"action":"delDashControl","user_id":user_id,"dashboard_id":dashboard_id,"control_key":getControlType($control),"control_html_key":$control.attr("id")}
                requestWeb(para,function () {
                    //前端删除
                    $control.remove();
                    // //切换视图
                    // toggleFullView();
                },true)
            }

			//页面刷新后重构控件以保持有效
            //如果传入新控件ID,将按照克隆控件模式
			function  controlRestore($control,new_control_id){
                var control_type=getControlType($control);
                var div_style=$control.attr("style");

				var $new_control;

				var para={"action":"queryControlByAllCon","user_id":user_id,"dashboard_id":dashboard_id,"control_key":control_type,"control_html_key":new_control_id};
				requestWebData(para,function (json_data) {
				    var control_info=json_data[0];

                    //删除原控件
                    //如果是相同ID的控件,删除原控件,否则为克隆控件
                    if($control.attr("id")==new_control_id){
                        $control.remove();
                    }

				    var meta_data=JSON.parse(control_info["meta_data"]);


				    //表格控件重构  基于bootstrap-table插件
                    if (control_type==table_key){

                            //放置控件并返回新控件指针
                            $new_control=putControls($("#"+control_type),new_control_id);
                            //---------更新表格元数据
                            var $table= getTablePart($new_control,'table');
                             //开始初始化数据
                             $table.bootstrapTable({
                                 data: meta_data["data"]
                             });

                            $table_tr=getTablePart($new_control,'tr');
                             //刷新表格选项
                            var table_options=meta_data["table_options"];
                            table_options.columns[0]=meta_data["columns"];
                            $table.bootstrapTable('refreshOptions', table_options);

                            //更新表格指针
                            $table= getTablePart($new_control,'table');
                            var $table_tr=getTablePart($new_control,'tr');

                            //让表格可编辑
					        setTableEditable($table);

                        //highcharts控件克隆
                        }
                    else if(controls_chart.indexOf(control_type)!=-1){

                        //放置控件并返回新控件指针
                        $new_control=putControls($("#"+control_type),new_control_id);

                        var newchart=$new_control.highcharts();

                        //对选项进行刷新
                        newchart.update(meta_data["userOptions"]);
                    }
                    else{

                        $new_control=putControls($("#"+control_type),new_control_id);

                    }

                    //容器样式恢复
                    $new_control.attr("style",div_style);

                    //增加overflow属性
                    if(mode=='browse'){
                        if(controls_chart.indexOf(getControlType($control))==-1 && getControlType($control)!=label_key){
                            //除highchart和label外,其他组件需增加自适应属性
                            $new_control.css("overflow","auto");
                        }


                    }


                    //控件样式恢复
                    restoreControlCss($new_control);


                    //数据重载
                    if(control_info["vars_name"]=="[]"){
                        //不涉及查询条件变量的直接加载数据
                        reloadData($new_control);
                    }

                    //初始化数据刷新定时器
                    if(mode=='browse' && control_info["is_refresh"]==1){
                        initDataInterval($new_control,control_info["refresh_fre"]);
                    }



                },true);



			}

			//读取excel;参数：excel名称,成功后运行函数 isasync 表示是否异步  如成功返回json数据
			function readExcel(filename,fun,isasync) {

				var json_data;

				if(!isasync){
					$.ajaxSettings.async = false; //关闭异步
				}

				$.post(window.location.href,{"action":"readExcel","file_name":filename},function(data){

					var head=data[0][0];

					if(head.status=="successed"){
						//获取数据
						json_data=data[1];

						if(json_data.length==0){
							json_data=[{}];
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

			//发起api请求,返回数据
			function requestAPI(url,fun,isasync) {

				var json_data;

				if(!isasync){
					$.ajaxSettings.async = false; //关闭异步
				}

				$.post(window.location.href,{"action":"requestAPI","url":url},function(data){

					var head=data[0][0];

					if(head.status=="successed"){
						//获取数据
						json_data=data[1];

						if(json_data.length==0){
							json_data=[{}];
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

			//自定义数据源  db_conn连接信息, script 脚本语句  成功函数,isasync 表示是否异步  如成功返回json数据
			function requestUserDB(db_type,db_conn,script,fun,isasync) {

				var json_data;

				if(!isasync){
					$.ajaxSettings.async = false; //关闭异步
				}

				$.post(window.location.href,{"action":"requestUserDB","db_type":db_type,"db_conn":db_conn,"script":script},function(data){
				    console.log(data);

					var head=data[0][0];

					if(head.status=="successed"){
						//获取数据
						json_data=data[1];

						if(json_data.length==0){
							json_data=[{}];
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

			//根据Json数据获取对应的列的列表  json_data为后端传过来的数据；返回json对象（不是列表)
			function getColumnnList(json_data){

				columns_list={};

				if(json_data.length!=0){
					for(var key in json_data[0]){
						columns_list[key]=key;
					}
				}
				return columns_list;

			}

			//基于控件当数据脚本发生变化时更新页面显示
			function toggleShow($control,script) {

				if(typeof script!="object"){
				    //字符串需要先处理单引号
                    script=script.trim().replace(/\'/g,"\"");
					var json_data=JSON.parse(script);
				}else{
					var json_data=script;
				}

				switch (getControlType($control)) {
					case label_key:
					    var columns=getColumnnList(json_data);
					    var data=json_data[0];
					    //获取第一个列名
                        for(var key in columns){
                            var first_field=columns[key];
                            break;
                        }
						$control.find("label").html(data[first_field]);
						break;
					case table_key:
						 //获取表格指针以及内容
						var $table=getTablePart($control,'table');
						var table_options=$table.bootstrapTable('getOptions');
						var columns=getBtTableColumns(json_data);
						//更新表内容
						updateDataTable($control,table_options,columns,json_data);
						break;
					case hc_base_key:
						//刷新控件
                        var obj=getCategoriesAndSeries(json_data);
						updateChart(chart(),"xAxis.categories",obj["categories"]);
						updateChart(chart(),"series",obj["series"]);
						//刷新数据列设置列表
						fillhcBaseColumns(chart());
						break;

					case hc_pie_key:
					    var obj=getSeries(json_data,hc_pie_key);
						updateChart(chart(),"series",obj);
						break;

					case hc_bubble_key:
					    var obj=getSeries(json_data,hc_bubble_key);
						updateChart(chart(),"series",obj);
						break;

					case hc_gauge_key:
					    var obj=getSeries(json_data,hc_gauge_key);
						updateChart(chart(),"series",obj);
						break;

					case hc_wordcloud_key:
					    var obj=getSeries(json_data,hc_wordcloud_key);
						updateChart(chart(),"series",obj);
						break;

					case var_key:
						updateSelect2($control,json_data);
						break;

					default:break;
				}

			}

			//当数据脚本发生变化时更新前端
            function toggleDataShow($control,para_data) {
                if(para_data['src_type']=='excel_data'){
                    var para={"action":"queryUserDbByid","db_id":para_data['db_id'],"user_id":user_id};
                    //读取excel名称并传入后台进行解析
                    requestWebData(para,function (json_data) {
                        var file_name=json_data[0].script;
                        readExcel(file_name,function(json_excel){
                            //读取后的excel,显示到前端
                            var columns=getBtTableColumns(json_excel);
                            if(columns.length!=0){
                                //赋值
                                toggleShow($control,json_excel );
                            }else{
                                alert("数据为空,请重新选择文件");
                            }
                        },true);

                    },true);
                }
                else{
                    para_data['script']=para_data['script'].trim();
                    if(para_data['script']!=''){
                        //静态数据不需要变量解析
                        if(para_data['src_type']=='static_data'){
                            toggleShow($control,para_data['script']);
                        }
                        //API和数据库源需要先进行变量解析
                        if(para_data['src_type']=='api_data'||para_data['src_type']=='dbms_data'){
                            var para={"action":"queryAllControlByType","user_id":user_id,"dashboard_id":dashboard_id,"control_key":var_key};
                            requestWebData(para,function (vars_data) {
                                para_data['script']=parseInputScript(para_data['script'],vars_data);

                                if(para_data['src_type']=='api_data'){
                                    requestAPI(para_data['script'],function (api_data) {
                                        toggleShow($control,api_data);
                                    },true);
                                }
                                if(para_data['src_type']=='dbms_data'){
                                    var para={"action":"queryUserDbByid","db_id":para_data['db_id'],"user_id":user_id};
                                    requestWebData(para,function (json_data) {
                                        var db_conn=json_data[0]["script"];
                                        var db_type=json_data[0]["conn_type"];
                                        requestUserDB(db_type,db_conn,para_data['script'],function (sql_data) {
                                            //读取后的数据,显示到前端
                                            toggleShow($control,sql_data);
                                        },true);
                                    },true);
                                }

                            },true)
                        }


                        //前端发生变化后需要保存元数据
                        saveControlMeta($control);
                    }
                }








            }

			//当数据脚本发生变化时保存入库
			function toggleSource($control,src_type) {

				var control_key=getControlType($control);

				var para={"action":"uptControlDbScriptByAllCon","datasource_type":src_type,"user_id":user_id,"dashboard_id":dashboard_id,"control_key":control_key,"control_html_key":control_html_key};

				//切换入库
				if(src_type=="static_data"){
					para["db_id"]="";
					para["datasource_script"]=$("#"+control_key+"_input_script").val().trim();
					para["vars_name"]="[]";
				}else if(src_type=="excel_data"){
					para["db_id"]=$("option:selected",$("#"+control_key+"_source_excel")).val().trim();
					para["datasource_script"]="";
					para["vars_name"]="[]";
				}else if(src_type=="api_data"){
					para["db_id"]="";
					para["datasource_script"]=$("#"+control_key+"_api_script").val().trim();
					para["vars_name"]=JSON.stringify(getVarsNameList(para["datasource_script"]));
				}else if(src_type=="dbms_data"){
					para["db_id"]=$("option:selected",$("#"+control_key+"_source_dbms")).val().trim();
					para["datasource_script"]=$("#"+control_key+"_sql_script").val();
					para["vars_name"]=JSON.stringify(getVarsNameList(para["datasource_script"]));
				}

				requestWeb(para,function () {},true);
			}

			//找到字符串的变量名集合并返回数组,只接收字符串参数
            function getVarsNameList(str_script) {
			    var vars_name=[];
                var script_split=str_script.split('|');
                //判断如果首尾都是符号|,代表是变量
                for(var idx in script_split){
                    if(str_script.indexOf("|"+script_split[idx]+"|")!=-1 && isVarName(script_split[idx])){
                        vars_name.push(script_split[idx]);
                    }
                }
                return vars_name;

            }
            //判断字符串是普通字符串还是变量名,返回布尔值
            function isVarName(str_para) {
                if(str_para.indexOf(" ")!=-1){
                    return false;
                }
                if(str_para.indexOf("&")!=-1){
                    return false;
                }
                if(str_para.indexOf("=")!=-1 || str_para.indexOf(">")!=-1 ||str_para.indexOf(">=")!=-1 ||str_para.indexOf("<")!=-1
                ||str_para.indexOf("<=")!=-1 ||str_para.indexOf("<>")!=-1|| str_para.indexOf("!=")!=-1){
                    return false;
                }

                return true;
            }

			function fillControlDataSet($control) {

				var control_key=getControlType($control);

				//初始化数据相关信息
				para={"action":"queryControlByAllCon","user_id":user_id,"dashboard_id":dashboard_id,"control_key":control_key,"control_html_key":control_html_key};
				//查询数据并填充数据框
				requestWebData(para,function (json_data) {

					var source_type=json_data[0].datasource_type;
					var data_script=json_data[0].datasource_script;
					var db_id=json_data[0].db_id;
					var refresh_fre=json_data[0].refresh_fre;
					var is_refresh=json_data[0].is_refresh;

					//选择项设置
					$("#"+control_key+"_source_type").val(source_type);

					//切换显示窗口
					changeSourceType(source_type,control_key);


					//填充数据脚本或数据源
					switch(source_type){
						case "static_data":
							$("#"+control_key+"_input_script").val(data_script);
							break;
						case "excel_data":
							$("#"+control_key+"_source_excel").val(db_id);
							break;
						case "api_data":
						    //更新数据脚本
							$("#"+control_key+"_api_script").val(data_script);
							break;
						case "dbms_data":
						    //更新数据脚本
							$("#"+control_key+"_source_dbms").val(db_id);
							$("#"+control_key+"_sql_script").val(data_script);
							break;
						default:break;
					   };


                    //更新脚本刷新频率
                    if(is_refresh=='1'){
                        $("#"+control_key+"_input_refresh").prop('checked',true);
                    }else{
                        $("#"+control_key+"_input_refresh").prop('checked',false);
                    }
                    $("#"+control_key+"_dur_refresh").val(refresh_fre);


				},true);

			}

			//设置Excel/CSV数据源upload
			$("#input_excel").fileinput({
				langauge: 'zh',
				showPreview: true,
				showUpload: true,
				maxFileCount: 1,
				previewFileType:'any',
				uploadExtraData:function () {
					var action={
						"action":"uploadExcel",
						"user_id":user_id
					};
					return action;
				},//向后台传递参数
				allowedFileExtensions: ["xlsx", "xls", "csv"],
				uploadUrl: window.location.href
			});

			//设置背景图片bg_image_upload
			$("#input_img").fileinput({
				langauge: 'zh',
				showPreview: true,
				showUpload: true,
				maxFileCount: 1,
				previewFileType:'any',
				allowedFileExtensions: ["jpg", "png", "gif"],
				uploadExtraData:function () {
					var action={
						"action":"uploadImage",
						"user_id":user_id
					};
					return action;
				},//向后台传递参数
				uploadUrl: window.location.href
			});

			//保存excel/csv数据源
			$("#db_excel_save").click(function () {
				var conn_type=$("#excel_file_type").val();
				var db_name=$("#db_excel_name").val();
				var datasource_type="excel_data";
				var script=cur_file_name;


				para={"action":"insertUserDb","user_id":user_id,"conn_type":conn_type,"datasource_type":datasource_type,"db_name":db_name,"script":script}
				if(db_name.trim().length==0){
					alert("请定义数据源名称!");
				}
				else{
					//入库
					requestWeb(para,function () {
						initExcelManager($("#excel_list"));
						fillUserDB($curcontrol);
						alert(script+" 上传成功!");
					},true)

				}




			});

			//保存sql数据源
			$("#db_sql_save").click(function () {

				var conn_type=$("#db_sql_type").val();
				var db_name=$("#db_sql_name").val();
				var datasource_type="dbms_data";
				var script={};

				//数据库信息获取,组装script
				script["host"]=$("#db_sql_host").val();
				script["user"]=$("#db_sql_user").val();
				script["passwd"]=$("#db_sql_pwd").val();
				script["port"]=parseInt($("#db_sql_port").val());
				script["db"]=$("#db_sql_schema").val();

				//空值判断
				for(key in script){
					if(script[key].toString().trim().length==0 || db_name.toString().trim().length==0){
						alert("请填写所有必填信息！");
						return;
					}
				}

				//插入数据
				para={"action":"insertUserDb","user_id":user_id,"conn_type":conn_type,"datasource_type":datasource_type,"db_name":db_name,"script":JSON.stringify(script)}

				if($("#db_name").val()==""){
					alert("请定义数据源名称!");
				}
				else{
					//入库
					requestWeb(para,function () {
						alert("保存成功!");
						initDbmsManager($("#db_list"));
					},true)

					//更新数据源下拉框
					fillUserDB($curcontrol);
				}
			});

			//控件刷新事件注册
			for(var i=0;i<controls.length;i++){

				$("#"+controls[i]+"_input_refresh").change(function () {
					var fre_id=$(this).attr("id").split("_")[0]+"_dur_refresh";
					var para={"action":"uptControlRefreshByAllCon","refresh_fre":$("#"+fre_id).val(),"user_id":user_id,"dashboard_id":dashboard_id,"control_key":control_key,"control_html_key":control_html_key};
					if($(this).is(":checked")){
						 para["is_refresh"]='1';
					}else{
						 para["is_refresh"]='0';
					}

					//入库
					requestWeb(para,function(){},true);

				});


				$("#"+controls[i]+"_dur_refresh").change(function () {
				var is_refresh_id=$(this).attr("id").split("_")[0]+"_input_refresh";
				var para={"action":"uptControlRefreshByAllCon","refresh_fre":$(this).val(),"user_id":user_id,"dashboard_id":dashboard_id,"control_key":control_key,"control_html_key":control_html_key};

				if($("#"+is_refresh_id).is(":checked")){
					 para["is_refresh"]='1';
				}else{
					 para["is_refresh"]='0';
				}

				//入库
				requestWeb(para,function(){},true);

			});
			}

			//数据源切换事件
			 $("select[id$='_source_type']").change(function(){
				  changeSourceType($(this).val(),getControlType($curcontrol));
			  });

			 //数据源类型切换函数  参数:数据源类型、控件类型
			 function changeSourceType(source_type,control_type){

				  //切换数据源窗口设置
						 for(var type in data_type){
							 if(data_type[type]==source_type){
									$("#"+control_type+"_"+data_type[type]).show();
								}
							 else{
									$("#"+control_type+"_"+data_type[type]).hide();
							 }
						 }

				  //读取各项配置
						switch(source_type){
							case "static_data":
								$("#"+control_type+"_is_refresh").hide();
								break;
							case "excel_data":
								$("#"+control_type+"_is_refresh").hide();
								break;
							case "api_data":
								$("#"+control_type+"_is_refresh").show();
								break;
							case "dbms_data":
								$("#"+control_type+"_is_refresh").show();
								break;
							default:break;
						   };

			  };

             //对输入脚本进行变量解析,返回解析后的脚本
			 function parseInputScript(script,vars_data) {
                var script_list=script.split("|");
                var new_script=[];

                for(var index in script_list){
                    var str=script_list[index];
                    //匹配如果是变量进行转换
                    for(var key in vars_data){
                        if(vars_data[key]["var_id"]==str){
                            //找到变量,替换为当前选中
                            str=$("#"+vars_data[key]["control_html_key"]).find("select").val();
                        }
                    }
                    new_script.push(str);
                };

                return new_script.join("");
             }

             //------用户数据库数据源管理
		    //初始化数据源
            function initDbmsManager($dbms_list) {
                para={"action":"queryDataSourceList","user_id":user_id,"datasource_type":"dbms_data"};
                requestWeb(para,function (json_data) {
                    json_columns=getBtTableColumns(json_data);
                     //映射表格列
                     for(var i=0;i<json_columns.length;i++){
                         json_columns[i]["title"]=mapColumns(json_columns[i]["field"]);
                     }
                     //刷新表格选项
                     var options=table_options;
                     options["toolbar"]="#toolbar_dbms";
                     options["uniqueId"]='db_id';
                     options["detailView"]=false;
                     options["height"]=300;

                     if(json_columns.length!=0){
                         //隐藏uniquer列
                         json_columns[0]["visible"]=false;
                         //增加操作列
                         oper_col={title:"操作",field:"operate",events:dbEvent,formatter: operateFormatterDbms};
                         json_columns.push(oper_col);
                     }
                     //生成表格
                     $table=$dbms_list.html('<div id="toolbar_dbms"><a id="add_dbms" data-toggle="modal" data-target="#set_user_db" class="btn btn-primary font-content text-white"  role="button">新建</a></div><table></table>').find('table')
                     $table.bootstrapTable({data:json_data,columns:json_columns});
                     $table.bootstrapTable('refreshOptions',options);
                     DbmsEditable($table);

                },true);
            }

            //数据库管理操作函数
            function operateFormatterDbms(value, row, index) {
                //添加按钮
                 var oper='<a id="del_db" class="normal-link-sm" href="javascript:void(0)">删除</a>';
                 return oper;
            }

            //数据源列编辑函数
            function DbmsEditable($table){
                    //编辑单元格
                    $table.on("dbl-click-cell.bs.table", function (e,field,value,row,$element) {
                        var old_val=$element.text();
                        var input="<input type='text' id='temp' size='20rem' value='"+old_val+"'>";
                        $element.text("");
                        $element.append(input);

                        $("input#temp").focus();

                        $("input",$table).blur(function () {
                            //可修改的列集合
                            edit_cols=['db_name'];

                            if(edit_cols.indexOf(field)!=-1){
                                 //更新界面
                                $table.bootstrapTable('updateCellByUniqueId',{
                                    id:row["db_id"],
                                    field:field,
                                    value:$(this).val()
                                });
                                //发起后台更新操作
                                para={"action":"uptDb","column":field,"value":$(this).val(),"db_id":row["db_id"]};
                                requestWeb(para,function () {
                                	fillUserDB($curcontrol)
								},true);
                            }else{
                                alert("此列不可修改,请重新选择");
                                $element.text(old_val);
                            }
                            $(this).remove();
                        })

                     });
                }

            //数据库操作事件
            dbEvent = {
                'click #del_db': function (e, value, row, index) {
                   if(confirm("确定要删除此条记录吗?")){
                        //后端删除
                        para={"action":"delDbById","db_id":row["db_id"]};
                        requestWeb(para,function () {
                            initDbmsManager($("#db_list"));
                            fillUserDB($curcontrol);
                        },true)
                   }


                }

             }

             //------用户EXCEL数据源管理
		    //初始化数据源
            function initExcelManager($excel_list) {
                para={"action":"queryDataSourceList","user_id":user_id,"datasource_type":"excel_data"};
                requestWeb(para,function (json_data) {
                    json_columns=getBtTableColumns(json_data);
                     //映射表格列
                     for(var i=0;i<json_columns.length;i++){
                         json_columns[i]["title"]=mapColumns(json_columns[i]["field"]);
                     }
                     //刷新表格选项
                     var options=table_options;
                     options["toolbar"]="#toolbar_excel";
                     options["uniqueId"]='db_id';
                     options["detailView"]=false;
                     options["height"]=300;

                     if(json_columns.length!=0){
                         //隐藏uniquer列
                         json_columns[0]["visible"]=false;
                         //增加操作列
                         oper_col={title:"操作",field:"operate",events:excelEvent,formatter: operateFormatterExcel};
                         json_columns.push(oper_col);
                     }
                     //生成表格
                     $table=$excel_list.html('<div id="toolbar_excel"><a id="add_excel" data-toggle="modal" data-target="#set_user_excel" class="btn btn-primary font-content text-white"  role="button">新建</a></div><table></table>').find('table')
                     $table.bootstrapTable({data:json_data,columns:json_columns});
                     $table.bootstrapTable('refreshOptions',options);
                     excelEditable($table);
                },true);
            }

            //excel管理操作函数
            function operateFormatterExcel(value, row, index) {
                //添加按钮
                 var oper='<a id="del_excel" class="normal-link-sm" href="javascript:void(0)">删除</a>';
                 return oper;
            }

            //数据源列编辑函数
            function excelEditable($table){
                    //编辑单元格
                    $table.on("dbl-click-cell.bs.table", function (e,field,value,row,$element) {
                        var old_val=$element.text();
                        var input="<input type='text' id='temp' size='20rem' value='"+old_val+"'>";
                        $element.text("");
                        $element.append(input);

                        $("input#temp").focus();

                        $("input",$table).blur(function () {
                            //可修改的列集合
                            edit_cols=['db_name'];

                            if(edit_cols.indexOf(field)!=-1){
                                 //更新界面
                                $table.bootstrapTable('updateCellByUniqueId',{
                                    id:row["db_id"],
                                    field:field,
                                    value:$(this).val()
                                });
                                //发起后台更新操作
                                para={"action":"uptDb","column":field,"value":$(this).val(),"db_id":row["db_id"]};
                                requestWeb(para,function () {
                                	fillUserDB($curcontrol)
								},true);
                            }else{
                                alert("此列不可修改,请重新选择");
                                $element.text(old_val);
                            }
                            $(this).remove();
                        })

                     });
                }

            //数据源操作事件
            excelEvent = {
                'click #del_excel': function (e, value, row, index) {
                   if(confirm("确定要删除此条记录吗?")){
                        //后端删除
                        para={"action":"delDbById","db_id":row["db_id"]};
                        requestWeb(para,function () {
                            initExcelManager($("#excel_list"));
                            fillUserDB($curcontrol);
                        },true)
                   }


                }

             }

		  	//用户切换预览模式控件处理
		    function togglePreBrowser() {

			 	//切换布局
                toggleFullView();
				$("#controls").hide();

				//隐藏保存按钮
                $("#dash_save").hide();


			}
			//用户浏览模式控件处理
            function toggleBrowser() {

				$("[id$='_sets']").removeClass("col-md-3").addClass("col-md-0");
				$("[id$='_sets']").hide();
				$("#panel").removeClass("col-md-9").addClass("col-md-12");
				$("#controls").hide();
				$("#dash_nav").hide();

			}
			
			//用户切换编辑模式控件处理
			function toggleEdit() {
			 	//切换布局
                toggleSetView();
				$("#controls").show();
				$("#canvas_sets").show();
				//显示保存按钮
                $("#dash_save").show();
				//切换变量
                is_preview=false;
			}

			function toggleFullView() {
			    $("[id$='_sets']").removeClass("col-md-3").addClass("col-md-0");
				$("[id$='_sets']").hide();
				$("#panel").removeClass("col-md-9").addClass("col-md-12");
				//刷新前端显示
				refreshDashShow();
            }

            function toggleSetView() {
				$("[id$='_sets']").removeClass("col-md-0").addClass("col-md-3");
				$("#panel").removeClass("col-md-12").addClass("col-md-9");
				//刷新前端显示
				refreshDashShow();
            }
			//刷新dashboard所有控件前端展示
		    function refreshDashShow() {
				$(".ui-draggable",$("#"+canvas_key)).each(function () {

					if(getControlType($(this))==table_key){
						var $table=getTablePart($(this),'table');
						$table.bootstrapTable('resetView')
					}

					if(controls_chart.indexOf(getControlType($(this)))!=-1){
						$(this).highcharts().reflow();
					}
				})
			}

			//重载控件数据
		    function reloadData($control){
			     // if($control.attr("id")=='hcPie_1575770707624'){
			     //     console.log('饼图加载')
                 // }
			 	var control_key=getControlType($control);
			    if(control_key==table_key){
			         //表格数据加载提示语
			         var $table=getTablePart($control,'table');
			         $table.bootstrapTable('showLoading');
                 }
			    // console.log('控件ID: '+$control.attr("id")+"数据加载")

				//获取组件信息
				var para={"action":"queryControlByAllCon","user_id":user_id,"dashboard_id":dashboard_id,"control_key":control_key,"control_html_key":$control.attr("id")};
				requestWebData(para,function (data) {
					var control_info = data[0];

					if (control_info["datasource_type"] == "dbms_data" || control_info["datasource_type"] == "api_data"){
						//解析脚本变量值
						para = {
							"action": "queryAllControlByType",
							"user_id": user_id,
							"dashboard_id": dashboard_id,
							"control_key": var_key
						};

						requestWebData(para, function (vars_data) {
                            var input_script = parseInputScript(control_info["datasource_script"], vars_data);

                            if(control_info["datasource_type"] == "dbms_data"){
                                //更新前端页面  数据库源
                                var para = {"action": "queryUserDbByid", "db_id": control_info["db_id"], "user_id": user_id};

                                requestWebData(para, function (json_data) {

                                    var db_conn = json_data[0]["script"];
                                    var db_type = json_data[0]["conn_type"];

                                    requestUserDB(db_type, db_conn, input_script, function (sql_data) {
                                        //读取后的数据,显示到前端
                                        if(control_key==table_key){
                                            //表格
                                            $table.bootstrapTable('load', sql_data);
                                            $table.bootstrapTable('hideLoading');

                                        } else if(controls_chart.indexOf(control_key)!=-1){
                                                var $chart=$control.highcharts();
                                                //highchart
                                                if(control_key==hc_base_key){
                                                    var obj = getCategoriesAndSeries(sql_data);
                                                    var meta_data=JSON.parse(control_info["meta_data"]);
                                                    reloadChart($chart,"xAxis.categories",obj["categories"]);
                                                    //组合图处理
                                                    multiple_servies=getMultipleChartSeries(obj["series"],meta_data["userOptions"]["series"]);
                                                    reloadChart($chart,"series",multiple_servies);
                                                }else{
                                                    var obj=getSeries(sql_data,control_key);
                                                    reloadChart($chart,"series",obj);
                                                }
                                                $chart.reflow();
                                        }else{
                                            toggleShow($control,sql_data);
                                        }

                                    }, true);

                                }, true);

                            }

                            if(control_info["datasource_type"] == "api_data"){
                                //更新前端页面  API源
                                requestAPI(input_script,function (api_data) {
                                    if (control_key == table_key) {
                                        //表格
                                        $table.bootstrapTable('load', api_data);
                                        $table.bootstrapTable('hideLoading');

                                    } else if (controls_chart.indexOf(control_key) != -1) {
                                        var $chart=$control.highcharts();
                                        //highchart
                                        if (control_key == hc_base_key) {
                                            var obj = getCategoriesAndSeries(api_data);
                                            var meta_data=JSON.parse(control_info["meta_data"]);
                                            reloadChart($chart,"xAxis.categories",obj["categories"]);
                                            //组合图处理
                                            var multiple_servies=getMultipleChartSeries(obj["series"],meta_data["userOptions"]["series"]);
                                            reloadChart($chart,"series",multiple_servies);
                                        } else {
                                            var obj = getSeries(api_data, control_key);
                                            reloadChart($chart,"series",obj);
                                        }
                                        $chart.reflow();
                                    }else {
                                        toggleShow($control, api_data);
                                    }
                                },true)
                            }

						}, true)


					}

					if(control_info["datasource_type"] == "static_data"){
					    var json_data=JSON.parse(control_info["datasource_script"].replace(/\'/g,"\""));
                        if(control_key==table_key){
                            //表格
                            $table.bootstrapTable('load', json_data);
                            $table.bootstrapTable('hideLoading');

                        } else if(controls_chart.indexOf(control_key)!=-1){
                                var $chart=$control.highcharts();
                                //highchart
                                if(control_key==hc_base_key){
                                    var obj=getCategoriesAndSeries(json_data);
                                    var meta_data=JSON.parse(control_info["meta_data"]);
                                    reloadChart($chart,"xAxis.categories",obj["categories"]);
                                    //组合图处理
                                    var multiple_servies=getMultipleChartSeries(obj["series"],meta_data["userOptions"]["series"]);
                                    reloadChart($chart,"series",multiple_servies);
                                }else{
                                    var obj=getSeries(json_data,control_key);
                                    reloadChart($chart,"series",obj);
                                }
                                $chart.reflow();
                        }else{
                            toggleShow($control,json_data);

                        }
                    }

					if(control_info["datasource_type"] == "excel_data"){
					    var para = {"action": "queryUserDbByid", "db_id": control_info["db_id"], "user_id": user_id};
					    requestWebData(para,function (json_data) {
					        var file_name=json_data[0].script;
                                readExcel(file_name,function(json_excel){
                                    //读取后的excel,显示到前端
                                    if(control_key==table_key){
                                        //表格
                                        $table.bootstrapTable('load', json_excel);
                                        $table.bootstrapTable('hideLoading');

                                    } else if(controls_chart.indexOf(control_key)!=-1){
                                            var $chart=$control.highcharts();
                                            //highchart
                                            if(control_key==hc_base_key){
                                                var obj = getCategoriesAndSeries(json_excel);
                                                var meta_data=JSON.parse(control_info["meta_data"]);
                                                reloadChart($chart,"xAxis.categories",obj["categories"]);
                                                //组合图处理
                                                var multiple_servies=getMultipleChartSeries(obj["series"],meta_data["userOptions"]["series"]);
                                                reloadChart($chart,"series",multiple_servies);
                                            }else{
                                                var obj=getSeries(json_excel,control_key);
                                                reloadChart($chart,"series",obj);
                                            }
                                            $chart.reflow();
                                    }else{
                                        toggleShow($control,json_excel);
                                    }
                                },true);
                        },true)

                    }

				},true)



			}

			//Dashboard保存事件
		    $("#dash_save").click(function () {
		        //保存所有控件样式及元数据
                 $("#canvas").find("div.ui-draggable").each(function () {
                     saveControlCss($(this))
                     saveControlMeta($(this));
                 })

                //保存html代码
		        html_code=$("#canvas").html();
				para={"action":"saveDash","user_id":user_id,"dashboard_id":dashboard_id,"html_code":html_code};
				requestWeb(para,function () {
				    alert("保存成功!");
				},true)

			});

			//保存控件前端无法直接获取的元数据
            function saveControlMeta($control) {
                var control_type=getControlType($control);
                meta_data={};
                //获取元数据
                if(control_type==table_key){
					var $table=getTablePart($control,'table');
					meta_data["table_options"]=$table.bootstrapTable('getOptions');
					meta_data["columns"]=$table.bootstrapTable('getVisibleColumns');
					meta_data["data"]=$table.bootstrapTable('getData');
                }
                else if(controls_chart.indexOf(control_type)!=-1){
                    var chart=$control.highcharts();
                    meta_data["userOptions"]=chart.userOptions;
                }

                //入库
                para={"action":"saveControlMeta","meta_data":JSON.stringify(meta_data),"user_id":user_id,"dashboard_id":dashboard_id,"control_key":control_type,"control_html_key":$control.attr("id")};
                requestWeb(para,function () {},true);
            }

            //清空用户输入当前页面脚本输入框
            function resetInput() {
                //清除sql输入和api输入框
                for (var idx in controls){
                    $("#"+controls[idx]+"_sql_script").val('');
                    $("#"+controls[idx]+"_api_script").val('');
                }
            }

            //初始化仪表盘
            function initDashboard(){
                //------恢复画布及控件
                var para={"action":"queryDashById","user_id":user_id,"dashboard_id":dashboard_id};
                requestWebData(para,function (data) {
                    var dash_info=data[0];
                    //加载画布HTML
                    $("#canvas").html(dash_info["script"]);
                    //加载画布样式
                    restoreCanvasCss();
                    //遍历画布控件并恢复
                    $("#"+canvas_key).find("div.ui-draggable").each(function () {
                        console.log("加载控件ID: "+$(this).attr("id"))
                        controlRestore($(this),$(this).attr("id"));
                    });

                },true);

            }

            //修改默认setInterval函数,使其可以调用带参数的函数
            // var __sto = setInterval;
            // window.setInterval = function(callback,timeout,param){
            //     var args = Array.prototype.slice.call(arguments,2);
            //     var _cb = function(){
            //         callback.apply(null,args);
            //     }
            //     __sto(_cb,timeout);
            // }

            //初始化仪表盘定时器
            //传入需要初始定时器的控件及秒数
            function initDataInterval($control,interval) {
                var id=setInterval(function (){reloadData($control)},interval*1000);
                intervals_id.push(id);
            }
            
            //初始化页面所有定时器
            function initDashInterval() {
                $("#"+canvas_key).children('div').each(function () {
                    para={"action":"queryControlByAllCon","user_id":user_id,"dashboard_id":dashboard_id,"control_key":getControlType($(this)),"control_html_key":$(this).attr("id")};
                    requestWebData(para,function (json_data) {
                        control_info = json_data[0];
                        if(is_preview==true && control_info["is_refresh"]==1){
                            initDataInterval($("#"+control_info["control_html_key"]),control_info["refresh_fre"]);
                        }
                    },true);
                });

            }

            //清除所有定时器
            function clearDashInterval() {
                if(mode=='edit' && is_preview==false){
                    for(var idx in intervals_id){
                        clearInterval(intervals_id[idx]);
                    }

                    intervals_id=[];
                }

            }
            
            //注册模拟请求测试器
            $("button[id$='_test']").click(function () {
                var db_key=$(this).attr("id").split("_")[1];
                var script=$("#"+control_key+"_"+db_key+"_script").val().trim().replace(/\'/g,"\"");
                var src_type=$("#"+control_key+"_source_type").val();
                //对变量进行解析
                var para={"action":"queryAllControlByType","user_id":user_id,"dashboard_id":dashboard_id,"control_key":var_key};
                requestWebData(para,function (vars_data) {
                    script = parseInputScript(script, vars_data);
                    //解析后变量写入
                    $("#request_script").val(script);

                    //模拟请求并写入
                    if(src_type=='api_data'){
                    requestAPI(script,function (api_data) {
                        $("#request_result").val(JSON.stringify(api_data));
                    },true);
                    }
                    if(src_type=='dbms_data'){
                    var db_id=$("#"+control_key+"_source_dbms").val();
                    var para={"action":"queryUserDbByid","db_id":db_id,"user_id":user_id};
                    requestWebData(para,function (json_data) {
                        var db_conn=json_data[0]["script"];
                        var db_type=json_data[0]["conn_type"];
                        requestUserDB(db_type,db_conn,script,function (sql_data) {
                            //读取后的数据,显示到前端
                            $("#request_result").val(JSON.stringify(sql_data));
                        },true);
                    },true);
                    }
                },true)

            });
            // $("#table_api_test").click(function () {
            //     var script=$("#table_api_script").val().trim().replace(/\'/g,"\"");
            //     var src_type=$("#table_source_type").val();
            //     //对变量进行解析
            //     var para={"action":"queryAllDashVars","user_id":user_id,"dashboard_id":dashboard_id,"control_key":var_key};
            //     requestWebData(para,function (vars_data) {
            //         script = parseInputScript(script, vars_data);
            //         //解析后变量写入
            //         $("#request_script").val(script);
            //
            //         //模拟请求并写入
            //         if(src_type=='api_data'){
            //             requestAPI(script,function (api_data) {
            //                 $("#request_result").val(JSON.stringify(api_data));
            //             },true);
            //         }
            //         if(src_type=='dbms_data'){
            //             var db_id=$("#"+control_key+"_source_dbms").val();
            //             var para={"action":"queryUserDbByid","db_id":db_id,"user_id":user_id};
            //             requestWebData(para,function (json_data) {
            //                 var db_conn=json_data[0]["script"];
            //                 var db_type=json_data[0]["conn_type"];
            //                 requestUserDB(db_type,db_conn,script,function (sql_data) {
            //                     //读取后的数据,显示到前端
            //                     $("#request_result").val(JSON.stringify(sql_data));
            //                 },true);
            //             },true);
            //         }
            //     },true)
            //
            // });


            //注册互联网公共API接口触发器
           //var_pub_api
            $("a[id$='_pub_api']").click(function () {
                initPubApi($("#pub_api_list"),getControlType($curcontrol));
            });

            function initPubApi($pub_api_list,control_key) {
                para={"action":"queryPubApiByControl","control_key":control_key};
                requestWeb(para,function (json_data) {
                    json_columns=getBtTableColumns(json_data);
                     //映射表格列
                     for(var i=0;i<json_columns.length;i++){
                         json_columns[i]["title"]=mapColumns(json_columns[i]["field"]);
                     }
                     //刷新表格选项
                     var options=table_options;
                     options["toolbar"]="#toolbar_pubapi";
                     options["uniqueId"]='pub_api_id';
                     options["detailView"]=false;
                     options["height"]=300;

                     if(json_columns.length!=0){
                         //隐藏uniquer列
                         json_columns[0]["visible"]=false;
                         //增加选择列
                         json_columns.unshift({'title':'选择',radio:true});
                     }

                     //生成表格
                     $table=$pub_api_list.html('<div id="toolbar_pubapi"><select class="w-100 form-control form-control-sm border border-1 bg-dark text-white font-content"><option value="business">电商</option></select></div><table></table>').find('table')
                     $table.bootstrapTable({data:json_data,columns:json_columns});
                     $table.bootstrapTable('refreshOptions',options);

                     //表格选择事件
                     $table.on("check.bs.table",function (e,row, $element) {
                         //--填充选择的API链接
                         //获取用户datakey
                         var para={"action":'queryUserById','user_id':user_id};
                         requestWebData(para,function (json_data) {
                             var user_info=json_data[0];
                             var api_url=row["url"]+"&datakey="+user_info["data_key"];
                             var $input_script=$("#"+control_key+"_api_script");
                             //设置填充框
                             $input_script.val(api_url);
                             //触发数据更新事件
                             $input_script.trigger('change');


                         },true)
                     })

                     
                     
                     
    },true);
}


		 //-----------样式公共设置------------------------------
             //保存画布属性
            function saveCanvasCss() {
                css={};
                css["canvas_style"]=$canvas.attr("style");
                var para={"action":'saveCanvasCss','user_id':user_id,"dashboard_id":dashboard_id,"canvas_css":JSON.stringify(css)};
                requestWeb(para,function () {},true)
            }

            //恢复画布属性
            function restoreCanvasCss() {
                var para={"action":'queryDashById','user_id':user_id,"dashboard_id":dashboard_id};
                requestWebData(para,function (json_data) {
                    dash_info=json_data[0];
                    if(dash_info['canvas_css']!=null){
                        css=JSON.parse(dash_info["canvas_css"]);
                        $canvas.attr("style",css["canvas_style"]);
                    }

                },true)
            }

			//设置水平对齐，参数： $control 当前操作控件;；$set设置面板中的值对象
			function setHorAlign($tag,$set){

				var align=$set.val();

				switch($tag.get(0).tagName){

					default: $tag.css('text-align',align); break;

				}
				saveControlCss($tag);
			}

			//设置字体，参数：$control 当前操作控件;；$set设置面板中的值对象
			function setFontFamily($control,$set){

			   $control.css('font-family',$set.val());
			   saveControlCss($control);
			}

			//设置字号，参数：$control 当前操作控件;；$set设置面板中的值对象
			function setFontPx($control,font_px){

			  // $control.css('font-size',$set.val().replace("px","")/16+"rem");
				$control.css('font-size',font_px);
				saveControlCss($control);
			}

			//设置字体粗细，参数：$control 当前操作控件;；$set设置面板中的值对象
			function setFontWeight($control,$set){

			  $control.css('font-weight',$set.val());
			  saveControlCss($control);

			}

			//填充用户数据源
			 function fillUserDB($control){
				para={"action":"queryUserDbByUser","user_id":user_id};
				var control_key=getControlType($control);

				requestWebData(para,function (json_data) {
					//填充数据源下拉框
					var src_excel=$("#"+control_key+"_source_excel");
					var src_db=$("#"+control_key+"_source_dbms");

					src_excel.html("<option value=''>请选择</option>");
					src_db.html("<option value=''>请选择</option>");

					for(var i=0;i<json_data.length;i++){
						if(json_data[i].datasource_type=="excel_data"){
							src_excel.append("<option value='"+json_data[i].db_id+"' >"+json_data[i].db_name+"</option>");
						}else if(json_data[i].datasource_type=="dbms_data"){
							src_db.append("<option value='"+json_data[i].db_id+"' >"+json_data[i].db_name+"</option>");
						}
					};

				},true);

			 }

			 //保存控件样式
             function saveControlCss($control){
                $control=getDragControl($control);
                var control_key=getControlType($control);
                var css={};
                //保存容器全局样式
                //  css["div_style"]=$control.attr("style")
                //保存具体控件样式
                if(control_key==table_key){
                    $table=getTablePart($control,'table');
                    $table_tr=getTablePart($control,'tr');
                    css["tr_style"]=$table_tr.attr("style");
                    css["table_class"]=$table.attr("class");
                }

                if(control_key==label_key){
                    var $label=$control.find("label");
                    var $hy_link=$control.find("a");
                    css["label_style"]=$label.attr("style");
                    css["hy_link"]=$hy_link.attr("href");
                }

                if(control_key==link_key){
                    var $link=$control.find("iframe");
                    css["link_src"]=$link.attr("src");
                }

                if(control_key==img_key){
                    var $img=$control.find("img");
                    var $hy_link=$control.find("a");
                    css["img_style"]=$img.attr("style");
                    css["img_src"]=$img.attr("src");
                    css["hy_link"]=$hy_link.attr("href");
                }

                if(controls_chart.indexOf(control_key)!=-1){
                    css["chart_theme"]=$control.attr("chart_theme");
                    if(control_key==hc_base_key){
                        //组合曲线属性
                        css["cross_type"]=$control.attr("cross_type");
                    }
                }


                para={"action":"saveControlCss","css":JSON.stringify(css),"user_id":user_id,"dashboard_id":dashboard_id,"control_key":getControlType($control),"control_html_key":$control.attr("id")};
                requestWeb(para,function () {},true);

             }

             function restoreControlCss($control){
                $control=getDragControl($control);
                var control_key=getControlType($control);
                para={"action":"queryControlByAllCon","user_id":user_id,"dashboard_id":dashboard_id,"control_key":getControlType($control),"control_html_key":$control.attr("id")};
				requestWebData(para,function (json_data) {
				    var control_info=json_data[0];
				    var css=JSON.parse(control_info["css"]);
				    if(css!=null){
                        if(control_key==table_key){
                            $table=getTablePart($control,'table');
                            $table_tr=getTablePart($control,'tr');
                            $table.attr("class",css["table_class"]);
                            $table_tr.attr("style",css["tr_style"]);
                        }

                        if(controls_chart.indexOf(control_key)!=-1){
                            var $chart=$control.highcharts();
                            $control.attr("chart_theme",css["chart_theme"]);
                            if(control_key==hc_base_key){
                                //组合曲线属性
                                $control.attr("cross_type",css["cross_type"]);
                            }
                        }

                        if(control_key==label_key){
                            var $label=$control.find("label");
                            if(!$label.parent().is("a") && 'hy_link' in css){
                                $label.wrap("<a></a>");
                            }
                            var $hy_link=$control.find("a");

                            $label.attr("style",css["label_style"])
                            $hy_link.attr("href",css["hy_link"])
                            $hy_link.attr("target","_Blank");
                        }

                        if(control_key==link_key){
                            var $link=$control.find("iframe");
                            $link.attr("src",css["link_src"]);
                        }

                        if(control_key==img_key){
                            var $img=$control.find("img");
                            if(!$img.parent().is("a") && 'hy_link' in css){
                                $img.wrap("<a></a>");
                            }
                            var $hy_link=$control.find("a");
                            $img.attr("style",css["img_style"]);
                            $img.attr("src",css["img_src"]);
                            $hy_link.attr("href",css["hy_link"]);

                        }
                    }
				    //恢复容器样式
                    // $control.attr("style",css["div_style"]);
                    //恢复内部控件样式




                },true)

             }


		//-------------键盘监听事件-------------------------------------------

			$(document).keydown(function(event){
				  var keycode=event.keyCode;
				  var isCtrl=event.ctrlKey;
				   if(keycode>=37 &&keycode<=40){
				       //防止键盘上下操作滚动条
				       event.preventDefault();
                   }

				  //alert(keycode);

				  //确保input或textarea控件输入状态时，控件不接受键盘操作
				  var is_input=false;
				  for(var i=0;i<$("input,textarea").length;i++){
					if($($("input,textarea")[i]).is(":focus")){
						is_input=true;
						break;
					}
				  }

				  //处理键盘事件
				  if(isControl($curcontrol)&&!is_input &&mode!='browse'){
					  var left_px=$curcontrol.position().left;
					  var top_px=$curcontrol.position().top;
					  var control_width;
					  var control_height;

					  if(getControlType($curcontrol)==label_key){
						  control_width=$curcontrol.html().length*parseFloat($curcontrol.css("font-size"));
						  control_height=$curcontrol.height();
					  }else{
						  control_width=$curcontrol.width();
						  control_height=$curcontrol.height();
					  }


					  switch(parseInt(keycode)){
						case 37://左移
							  left_px--;
							  if(left_px>=0){
								$curcontrol.css("left",(left_px/$canvas.width())*100+"%");
							  }
							  break;
						case 39://右移
							  left_px++;
							  if((left_px+control_width)<=$canvas.width()){
							   $curcontrol.css("left",(left_px/$canvas.width())*100+"%");
							  }
							  break;
						case 38://上移
							  top_px--;
							  if(top_px>=(parseFloat($canvas.offset().top)-parseFloat($("#controls").offset().top))){
								$curcontrol.css("top",(top_px/$canvas.height())*100+"%");
							  }
							  break;
						case 40://下移
							  top_px++;
							  $curcontrol.css("top",(top_px/$canvas.height())*100+"%");
							  break;
						case 46://删除
							  controlDel(getDragControl($curcontrol));
							  break;
						case 67://按下键盘"C"
							  if(isCtrl){
								  //按下CTRL+C,进行复制操作
									 controlClone($curcontrol);

								   //设置控件位置
									setPosition($curcontrol,$canvas.width()/2,$canvas.height()/2);
							  };break;
						case 68://按下键盘"S"
							  if(isCtrl){
								  //保存当前页面
                                  $("#dash_save").trigger('click');
							  };break;

						default:break;
							 };


				  }


			  });


		//获取画布上控件类型  返回控件类型值
			function getControlType($control){
				var control_id=$control.attr("id");
				var control_type;

				if(control_id.indexOf("_")!=-1){
					control_type=control_id.split("_")[0];
				}else{
					control_type=control_id;
				}

				return control_type;
			}

		//判断是否是画布中合法控件,返回布尔值
			function isControl($control){

				 var isControl=controls.indexOf(getControlType($control));
				 if (isControl!=-1){
					 //合法控件
					 return true;
				 }else{
					 //非法控件
					 return false;
				 }
			 }

        //------------------------文本处理----------------------------------------------------------------------------------
          	//让label可编辑
			function setLabelEditable($label){
				//表格点击效果及单元格点击指针
                $label.dblclick(function(){

                    var input="<input type='text' id='temp' size='100rem' value='"+$label.html()+"'>";

                    $label.html("");
                    $label.append(input);

                    $("input#temp").focus();


                    $("input",$label).blur(function () {

                        if ($(this).val() == "") {
                            $(this).remove();
                        } else {
                            var data=[{"value":$(this).val(),"url":""}];
                            var $div=getDragControl($label);
                            //更新页面值
                            toggleShow($div,data);
                            //更新数据库
                            var para={"action":"uptControlDbScriptByAllCon","datasource_type":'static_data',"db_id":"","datasource_script":JSON.stringify(data),"vars_name":"[]","user_id":user_id,"dashboard_id":dashboard_id,"control_key":getControlType($div),"control_html_key":$div.attr("id")};
                            requestWeb(para,function () {},true);

                            //删除input
                            $(this).remove();
                        }
                    })
                });



			}

		//------------------------表格处理----------------------------------------------------------------------------------

			//从原始HTML新增表格，参数： $control当前控件 table_option 表格选项（字符串）  table_columns （JSON）   table_data （JSON）
			function insertDataTable($control,table_options,table_columns,table_data){

				 var $table=$("table.table",$control);


				 if(getControlType($control)==table_key){
					//开始初始化数据
					 $table.bootstrapTable({
					  columns:table_columns,
					  data:table_data}
                         );

					 //刷新表格选项
					$table.bootstrapTable('refreshOptions',table_options);

					 //使列可变大小
				   // $table.colResizable({postbackSafe:true,flush:true});

					//让表格可编辑
					setTableEditable($table);

					//设置表格默认宽度
                    $control.css("width",$canvas.width()*0.7);

                    //让插件生成的工具栏按钮显示小按钮
					//  $control.find(".fixed-table-toolbar").find("button").addClass("btn-sm");


				 }

			 }
			//表格数据更新函数，参数： $control当前控件 table_option 表格选项（字符串）  table_columns （JSON）   table_data （JSON）
			function updateDataTable($control,table_options,table_columns,table_data) {

					//初始化表格控件
					//resize事件需要先解绑
					if($control.hasClass("ui-resizable")){
						$control.resizable("destroy");

					}

					//初始化html
					$control.html("<table class='table table-sm'></table>");
					var $table=$("table.table",$control);


					//生成数据
					if (getControlType($control) == table_key) {

						 //开始初始化数据
						 $table.bootstrapTable({
							 data: table_data
						 });

					 }

					//刷新表格选项
					table_options.columns[0]=table_columns;
					$table.bootstrapTable('refreshOptions', table_options);

					//使表格列可变大小
					//$table.colResizable({postbackSafe: true, flush: true});

					//注册拖动事件
					controlDrag($control, 2);

					//注册可变大小属性
					controlResize($control);

					//让表格可编辑
					setTableEditable($table);

					//克隆表格样式
					cloneTableStyle($control);

					//保存元数据
                    saveControlMeta($control);

                    //让插件生成的工具栏按钮显示小按钮
					//  $control.find(".fixed-table-toolbar").find("button").addClass("btn-sm");

					//切换至该控件
					// $curcontrol=$control;
					// $curcontrol.trigger("click");


				}

			// //通过后台元数据重构表格
            // function rebuildDataTable($control,meta_data) {
			// 		//初始化表格控件
			// 		//resize事件需要先解绑
			// 		if($control.hasClass("ui-resizable")){
			// 			$control.resizable("destroy");
            //
			// 		}
            //
			// 		//初始化html
			// 		$control.html("<table class='table table-sm'></table>");
			// 		var $table=$("table.table",$control);
            //
            //
			// 		//生成数据
			// 		if (getControlType($control) == table_key) {
            //
			// 			 //开始初始化数据
			// 			 $table.bootstrapTable({
			// 				 data: meta_data["data"]
			// 			 });
            //
			// 		 }
            //
			// 		//刷新表格选项
            //         var table_options=meta_data["table_options"];
			// 		table_options.columns[0]=meta_data["columns"];
			// 		$table.bootstrapTable('refreshOptions', table_options);
            //
			// 		//注册拖动事件
			// 		controlDrag($control, 2);
            //
			// 		//注册可变大小属性
			// 		controlResize($control);
            //
			// 		//让表格可编辑
			// 		setTableEditable($table);
            //
            // }

			//从已生成的BootTable中，获取Thead指针
			function getTablePart($control,part_type){
				var $table_part;
				$control=getDragControl($control);
				if(getControlType($control)==table_key){
					switch (part_type){
						case "table":$table_part=$("div.fixed-table-body > table.table",$control);break;
						case "tr":$table_part=$("thead > tr",$control);break;
						case "th":$table_part=$("th",$("thead > tr",$control));break;
						default: break;
					};

					return $table_part;
				}
			}

			//根据列ID设置对应column的属性   col_id 对应的列ID  attr需要设置的属性 val 需要设置的值
			function setColumnAttr($control,col_id,attr,val)	{

				  //获取表格指针以及内容
				  var $table=getTablePart($control,'table');
				  var table_options=$table.bootstrapTable('getOptions');
				  var columns=table_options.columns[0];
				  var data=$table.bootstrapTable('getData');


				  //设置控件的属性值
				  if(getControlType($control)==table_key){

					  //设置colmuns的属性值
					  for(var i=0;i<columns.length;i++){

						  if(columns[i].field==col_id){
							//如果是样式，需在原有样式上增加；否则直接赋值
							   if(attr=="cellStyle"){
									if(typeof(columns[i][attr])!="undefined"){
										columns[i][attr].css[val.split(":")[0]]=val.split(":")[1];
									}else{

										columns[i][attr]={css:{}};
										columns[i][attr].css[val.split(":")[0]]=val.split(":")[1];
									}

							   }else{

									columns[i][attr]=val;
							   }

							   break;
						  }

					  }

				  //刷新表缓存
				  table_options.columns[0]=columns;

				  $table.bootstrapTable('refreshOptions',table_options);

				  //克隆表样式
					cloneTableStyle($control);

				  //重新填充tab设置面板
					fillTabelStyle($control,$("#table_sets"));

				  //保存元数据
                    saveControlMeta($control);


				  }
			}

			//让表格可编辑,传入表格参数
			function setTableEditable($table){
			    if(mode!='browse'){
                    //表格点击效果及单元格点击指针
                    $table.on("click-cell.bs.table", function (e,field, value,row, $element) {
                        //处理选中效果
                        $table.find("td").css("background","");
                        $element.css("background","#b0d2f0")

                        //定位所选择的单元格及行
                        $selected_row={};
                        $selected_col={};
                        $selected_row=row;
                        $selected_col["field"]=field;
                        $selected_col["value"]=value;


                        //切换数据列Tab
                        $(".active",$("#table_columns")).removeClass("active");
                        $("#column_"+$selected_col["field"],$("#table_columns")).addClass("active");
                     });

                    //编辑单元格
                    $table.on("dbl-click-cell.bs.table", function (e,field, value,row, $element) {

                        var row_index=$element.parent().attr("data-index");

                        var input="<input type='text' id='temp' size='5rem' value='"+$element.text()+"'>";

                        $element.text("");
                        $element.append(input);

                        $("input#temp").focus();


                        $("input",$table).blur(function () {
                            if ($(this).val() == "") {
                                $(this).remove();
                            } else {
                                $table.bootstrapTable('updateCell',{
                                    index:row_index,
                                    field:field,
                                    value:$(this).val()
                                });

                                //更新后台脚本
                                uptTableStaticScript($table);
                                //更新设置面板
                                fillTabelData($table,$("#table_input_script"));

                                $(this).remove();
                            }
                        })

                     });

                }




			}

			//复制表格外部样式
			function cloneTableStyle($control) {
					//主动触发事件或设置更新表头样式
					getTablePart($control,'tr').css('background-color', $("#table_tr_color").val());
					setHorAlign(getTablePart($control,'tr'),$("#table_tr_align"));
					setFontFamily(getTablePart($control,'tr'),$("#table_tr_font_type"));
					getTablePart($control,'tr').css('color', $("#table_tr_font_color").val());
					getTablePart($control,'tr').css('font-size',$("#table_tr_font_px").val());

					//表格样式
					var $table=getTablePart($control,'table');

					for(var type in color_type){
						$table.removeClass("table-"+color_type[type]);
					}

					if($(this)!="default-table"){
						$table.addClass("table-"+$("#table_type").val());
					}
			 }


		//------------------------HighCharts处理------------------------------------------------------------------------------

			 //初始化柱状图
			function insertChart(control_id,chart_type,default_data){
                //数据预处理
                if(chart_type=='column'){
                    var hc_base_obj=getCategoriesAndSeries(default_data);
                }
                if(chart_type=='pie'){
                    var hc_pie_series=getSeries(default_data,hc_pie_key);
                }
                if(chart_type=='bubble'){
                    var hc_bubble_series=getSeries(default_data,hc_bubble_key);
                }
                if(chart_type=='gauge'){
                    var hc_gauge_series=getSeries(default_data,hc_gauge_key);
                }
                if(chart_type=='wordcloud'){
                    var hc_wordcloud_series=getSeries(default_data,hc_wordcloud_key);
                }


				//设置初始柱形图图表选项
			   var chart = {
				  type: chart_type,
			   };
			   var title = {
				  text: '标题'
			   };
			   var subtitle = {
				  text: '子标题'
			   };
			   if(chart_type=='column'){
                   var xAxis = {
                      categories: hc_base_obj["categories"],
                      crosshair: false
                   };
               }

			   var yAxis;
			   switch(chart_type){
				   case "gauge":
					yAxis={
								min: 0,
								max: 200,
								minorTickInterval: 'auto',
								minorTickWidth: 1,
								minorTickLength: 10,
								minorTickPosition: 'inside',
								minorTickColor: '#666',
								tickPixelInterval: 30,
								tickWidth: 2,
								tickPosition: 'inside',
								tickLength: 10,
								tickColor: '#666',
								labels: {
									step: 2,
									rotation: 'auto'
								},

								title: {
									text: 'km/h'
								},
								plotBands: [{
									from: 0,
									to: 120,
									color: '#55BF3B' // green
								}, {
									from: 120,
									to: 160,
									color: '#DDDF0D' // yellow
								}, {
									from: 160,
									to: 200,
									color: '#DF5353' // red
								}]
							}

					break;

				   default:
					yAxis = {
						  min: 0,
						  title: {
							 text: '纵轴标题'
						  }
					   };
				   break;
			   }


			   var tooltip;

			   switch (chart_type) {
				   case "pie":
					 tooltip={pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'};
					 break;

				   case "bubble":
					 userHtml:true,
					 tooltip= {
						 headerFormat: '<span style="font-size:14px;font-weight: bold;">{series.name}</span><br><table>',
						 pointFormat: '<tr><td><b>{point.name}</b></td></tr><br>'+'<tr><td><b>{point.x_name}</b>:{point.x}</td></tr><br>'+'<tr><td><b>{point.y_name}</b>:{point.y}</td></tr><br>'+'<tr><td><b>{point.z_name}</b>:{point.z}</td></tr>',
						 footerFormat: '</table>'
						};
						 break;

				   case "wordcloud":
					 tooltip={
						 pointFormat:'({point.weight})'
					 }
					 break;

				   default:
					 tooltip={
							  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
							  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
							  footerFormat: '</table>',
							  shared: true,
							  useHTML: true
						};
					break;
			   }

			   //仪表盘专用
				var pane={
					startAngle: -150,
					endAngle: 150
				};

			   var plotOptions = {
				  column: {
					 pointPadding: 0.2,
					 borderWidth: 0
				  },
				  series:{
					 turboThreshold:100000//set it to a larger threshold, it is by default to 1000
				  }
			   };
			   var credits = {
				  enabled: false
			   };

			   var series;

			   switch (chart_type) {
			       	case "column":
					series=hc_base_obj["series"];
					break;
				    case "pie":
					series=hc_pie_series;
					break;

				   case "bubble":
					series= hc_bubble_series;
					break;

				   case "gauge":
					series=hc_gauge_series;
					break;

				   case "wordcloud":
					series=hc_wordcloud_series;
					break;

				   default:
					series=[{name: '列1', data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]}, {name: '列2', data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]}, {name: '列3', data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]}, {name: '列4', data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]}];
					break;

			   }
			   var options = {};
			   options.chart = chart;
			   options.title = title;
			   options.subtitle = subtitle;
			   options.tooltip = tooltip;

			   if(chart_type=='column'){
                    options.xAxis = xAxis;
			   }

			   if(chart_type=="gauge"){
				options.pane=pane;
			   }
			   options.yAxis = yAxis;
			   options.series = series;
			   options.plotOptions = plotOptions;
			   options.credits = credits;

				//插入图
				return Highcharts.chart(control_id,options);


			}

			//更新hightcharts图对象属性,attr属性使用快捷方式(以点的方式访问属性)  obj为chart对象  val为要更新的值

			 //注意：如果是更新对象，需传入对象
			function updateChart(obj,attr,value){
				var attr_objs=attr.split(".");
				var json_str="";

				if(typeof value=="object"){

					value=JSON.stringify(value);

				}else if(!isNaN(parseFloat(value))){

					value=parseFloat(value);

				}else{
					value="\""+value+"\"";
				}



				//如果更新series，需保证新旧series数量一致
				if(attr=="series"){
					const series_length=obj.series.length;

					//删除现有series
					if(series_length>0){
						for(var i=0;i<series_length;i++){
							obj.series[0].remove(false);
						}
					}

					//增加新的空白series
					for(var i=0;i<JSON.parse(value).length;i++){
						obj.addSeries({});
					}
				}


				//拼接json字符串前部分
				for(var i=0;i<attr_objs.length;i++){
					if(i!=attr_objs.length-1){
						json_str+="\""+attr_objs[i]+"\":{";
					}else{
						json_str+="\""+attr_objs[i]+"\":"+value;
					}
				}

				//拼接json字符串后部分
				for(var i=0;i<attr_objs.length-1;i++) {
					json_str+="}";
				}


				//封装对象
				json_str=JSON.parse("{"+json_str+"}");

				//更新图表
				obj.update(json_str);

				//保存元数据
                saveControlMeta($curcontrol);

                //保存样式
                saveControlCss($curcontrol);

			}

			 //从数据库恢复chart属性数据
			function reloadChart(obj,attr,value){
				var attr_objs=attr.split(".");
				var json_str="";

				if(typeof value=="object"){

					value=JSON.stringify(value);

				}else if(!isNaN(parseFloat(value))){

					value=parseFloat(value);

				}else{
					value="\""+value+"\"";
				}



				//如果更新series，需保证新旧series数量一致
				if(attr=="series"){
					const series_length=obj.series.length;

					//删除现有series
					if(series_length>0){
						for(var i=0;i<series_length;i++){
							obj.series[0].remove(false);
						}
					}

					//增加新的空白series
					for(var i=0;i<JSON.parse(value).length;i++){
						obj.addSeries({});
					}
				}


				//拼接json字符串前部分
				for(var i=0;i<attr_objs.length;i++){
					if(i!=attr_objs.length-1){
						json_str+="\""+attr_objs[i]+"\":{";
					}else{
						json_str+="\""+attr_objs[i]+"\":"+value;
					}
				}

				//拼接json字符串后部分
				for(var i=0;i<attr_objs.length-1;i++) {
					json_str+="}";
				}


				//封装对象
				json_str=JSON.parse("{"+json_str+"}");

				//更新图表
				obj.update(json_str);

			}

			//传入两个servies对象,将组合图样式加入后返回
			function getMultipleChartSeries(single_series,multiple_series) {
			    new_series=single_series;
                for(var idx in multiple_series){
                    // if('type' in multiple_series[idx]){
                       if(multiple_series[idx]['type']!=undefined){
                        //发现type对象,向single的series里加入该name的属性中
                        for(var sin_idx in new_series){
                            if(new_series[sin_idx]["name"]==multiple_series[idx]["name"]){
                                new_series[sin_idx]["type"]=multiple_series[idx]["type"];
                            }
                        }
                    }
                }

                return new_series;
            }

		//------------------------Select2处理------------------------------------------------------------------------------

			 //更新前端页面下拉框
			 function updateSelect2($control,json_data) {
				 var $sel = $control.find("select");
				 $sel.select2('destroy').empty();
				 $sel.select2({
					 data: json_data,
                     tags: true
					 // placeholder: "请选择",
					 // placeholderOption: "first",
					 // allowClear: true
				 })
				 $sel.trigger('change');
			 }

			 //插入seelct2
			 function insertSelect2(control_id) {
			    var $sel=$("#"+control_id).find("select");
			    //生成控件
                $sel.select2({
                 tags: true
                // placeholder: "请选择",
                // placeholderOption: "first",
                // allowClear: true
                });

			    //绑定值变化事件
			    $sel.change(function () {
			        //获取当前组件信息
                    var para={"action":"queryControlByAllCon","user_id":user_id,"dashboard_id":dashboard_id,"control_key":var_key,"control_html_key":control_id};
                    requestWebData(para,function (json_data) {
                        var control_info=json_data[0];
                        //如果是自定义tag,需要在数据源中增加
                        if(control_info["datasource_type"]=="static_data"){
                            var cur_val=$sel.val();
                            //如果是编辑模式,防止脚本与实际不一致,直接从前端取.
                            if(mode=='edit'&& script!=undefined){
                                var script=JSON.parse($("#"+var_key+"_input_script").val().replace(" ",""));
                            }
                            else{
                                var script=JSON.parse(control_info["datasource_script"]);
                            }
                            var old_script=script;
                            var num=0;
                            //判断是否是已经存在的选择值
                            for (var idx in script){
                                for(var key in script[idx]){
                                    if(script[idx][key]==cur_val){
                                        num=num+1;
                                    }
                                }
                            }

                            if(num==0){
                                //数据集中不存在此属性,增加
                                var row={};
                                row["id"]=cur_val;
                                row["text"]=cur_val;
                                script.push(row);

                            }

                            if(old_script!=script){
                                //脚本回写并刷新控件
                                var para={"action":"uptControlDbScriptByAllCon","db_id":"","datasource_script":JSON.stringify(script),"datasource_type":"static_data","vars_name":"[]","user_id":user_id,"dashboard_id":dashboard_id,"control_key":var_key,"control_html_key":control_id};
                                requestWeb(para,function () {
                                    refreshSelect2Controls(control_id);
                                },true)
                            }else{
                                //脚本未变化,直接刷新
                                refreshSelect2Controls(control_id);
                            }

                        }else{
                            //其他属性类型直接刷新
                            refreshSelect2Controls(control_id);
                        }


                    },true)



                });



             }
             //对涉及的变量控件组件进行更新
             function refreshSelect2Controls(control_id) {
                //获取涉及该变量ID的所有组件并刷新值
                var para={"action":"queryControlsByVar","user_id":user_id,"dashboard_id":dashboard_id,"control_id":control_id};
                requestWebData(para,function (control_list) {
                    //找到后的所有组件进行数据刷新
                    for(var idx in control_list){
                        reloadData($("#"+control_list[idx]["control_html_key"]));
                    }
                },true)
             }


	},true)
//---------------------------整体入口函数结束------------------------------------------
});