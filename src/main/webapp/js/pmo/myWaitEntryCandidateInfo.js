var currentPage = "";//当前页码
var pageCount = "";//共几页 
var exportdata;
var statusMap = {"招聘中":"0","offer中":"1","已入职":"2","闲置中":"3","暂不关注":"4","黑名单":"5","入职他司":"6"};

$(function(){
	loadCandidateList();	
	loadCandidateSkillInfo();
	loadCusDeptInfo();
	dateType();
	dateType1();
    addMyWaitCandidateValidate();
})
function dateType(){
	$('.form_datetime').datetimepicker({
		weekStart: 1,
		minView:'month',
		todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
		language:'zh-CN',
		format: 'yyyy-mm-dd',
		pickerPosition: 'bottom-left',
		showMeridian: 1
	}).on('changeDate', function(ev){
		 $('#entryCandidateForm').bootstrapValidator('revalidateField', 'entryMyWaitCandidateArrivalDate'); 
	});
}

function dateType1(){
	$('.form_datetime1').datetimepicker({
		weekStart: 1,
		minView:'month',
		todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
		language:'zh-CN',
		format: 'yyyy-mm-dd',
		pickerPosition: 'bottom-left',
		showMeridian: 1,
		startDate:new Date()
	}).on('changeDate', function(ev){
		 $('#delayCandidateForm').bootstrapValidator('revalidateField', 'delayMyWaitCandidateArrivalDate'); 
	});
}
$('#searchCandidateBtn').bind("click", function(){
	loadCandidateList();
});

$('#exportCandidateExcel').bind("click", function(){	
	exportdata = new FormData(document.getElementById("candidateForm"));
	$('#myCandidateListModal').modal('show');	
});


function exportCondition(){
	var lb = $("label input");
	var exportDataColumn = "";
	var exportPageColumn = "";
	if(lb.length <= 0){
		alert("未勾选导出列！");
		return;
	}
	for (var i=0;i<lb.length;i++)
	{
		if (lb.eq(i).is(':checked'))
		{
			exportDataColumn += lb.eq(i).attr("name")+",";
			exportPageColumn += lb.eq(i).val()+",";
		}
	}
	
	exportdata.append("exportDataColumn",exportDataColumn);
	exportdata.append("exportPageColumn",exportPageColumn);
	$.ajax({
		url:path+'/service/candidate/transformCandidateData',
		dataType:"json",
		data:exportdata,
		async:true,
		cache:false,
		processData:false,
        contentType:false,
		type:"post",
		success:function(result){
			if(result == '1')
			{
				exportData();
			}
		}
	})
}
function exportData(){
	var url = path+'/service/candidate/exportExcel';
	$("#exceltHrefCandidate").attr("href",url);
	document.getElementById("exceltHrefCandidate").click();
	
	$('#myCandidateListModal').modal('hide');
	$("[type='checkbox']").attr("checked","checked");
}

function entryMyWaitCandidate(candidateId,candidateName){
	$('#entryMyWaitCandidateId').val(candidateId);
	$('#entryMyWaitCandidateName').val(candidateName);	
	$('#entryMyWaitCandidateModal').modal('show');
	
}

function  entryClearData(){
	$('#entryCandidateForm').bootstrapValidator('resetForm', true);
}
function  delayClearData(){
	$('#delayCandidateForm').bootstrapValidator('resetForm', true);
}
function  abortClearData(){
	$('#abortCandidateForm').bootstrapValidator('resetForm', true);
}
function addMyWaitCandidateValidate(){
	$("#entryMyWaitCandidateSubmit").on("click", function(){		
		   var bootstrapValidator = $("#entryCandidateForm").data('bootstrapValidator');
		   bootstrapValidator.validate();
		   if(bootstrapValidator.isValid())
			   entryMyWaitCandidateOk();
		   else return;

		});
	$("#delaySubmit").on("click", function(){		
		   var bootstrapValidator = $("#delayCandidateForm").data('bootstrapValidator');
		   bootstrapValidator.validate();
		   if(bootstrapValidator.isValid())
			   delayMyWaitCandidateOk();
		   else return;

		});
	
	$("#abortSubmit").on("click", function(){		
		   var bootstrapValidator = $("#abortCandidateForm").data('bootstrapValidator');
		   bootstrapValidator.validate();
		   if(bootstrapValidator.isValid())
			   abortMyWaitCandidateOk();
		   else return;

		});
	$("#entryCandidateForm").bootstrapValidator({
		 feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {       	
	        	entryMyWaitCandidateRealSalary: {
	        		group: '.group',
	          		validators: {
	          			 notEmpty: {
	                          message: 'Please input REAL SALARY'
	                      }
	                  }
	              },
		          entryMyWaitCandidateArrivalDate: {   
		        	    group: '.group',
		          		validators: {
		                      notEmpty: {
		                          message: 'Please select ARRIVAL DATE'
		                      },
		                      date : {  
		                          format : 'YYYY-MM-DD',  
		                          message : 'Time format is incorrect'  
		                      }
		                  }
		              }
	     
	        }
	    });	
	
	$("#delayCandidateForm").bootstrapValidator({
		 feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {       		        	
	        	delayMyWaitCandidateArrivalDate: {   
		        	    group: '.group',
		          		validators: {
		                      notEmpty: {
		                          message: 'Please select ARRIVAL DATE'
		                      },
		                      date : {  
		                          format : 'YYYY-MM-DD',  
		                          message : 'Time format is incorrect'  
		                      }
		                      
		                  }
		              }
	     
	        }
	    });	
	
	$("#abortCandidateForm").bootstrapValidator({
		 feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {       	
	        	abortMyWaitCandidateStatus: {
	        		group: '.group',
	          		validators: {
	          			 notEmpty: {
	                          message: 'Please select CANDIDATE STATUS'
	                      }
	                  }
	              },
	              abortMyWaitCandidateRemark: {
	        		group: '.group',
	          		validators: {
	          			 notEmpty: {
	                          message: 'Please select REMARK'
	                      }
	                  }
	              }
	        }
	    });	
}


function entryMyWaitCandidateOk(){
	var realSalary = $("#entryMyWaitCandidateRealSalary").val();		
	var arrivalDate = $("#entryMyWaitCandidateArrivalDate").val();		
	var candidate = new FormData();
	candidate.append("candidateId",$("#entryMyWaitCandidateId").val());
	candidate.append("arrivalDate",arrivalDate);
	candidate.append("realSalary",realSalary);
	
	$.ajax({
		url:path+'/service/candidate/entryMyWaitCandidateOk',
		dataType:"json",
		data:candidate,
		async:true,
		cache:false,
		processData:false,
        contentType:false,
		type:"post",
		success:function(flag){
			if(flag){
				alert("入职信息填写成功！");
			}else{
				alert("入职信息填写失败！请刷新页面重试！");
			}
			$('#entryMyWaitCandidateModal').modal('hide');	
			entryClearData();
			loadCandidateList();
		}
	})
}

function abortMyWaitCandidate(candidateId,candidateName,candidateStatus,remark){
	$('#abortMyWaitCandidateId').val(candidateId);
	$('#abortMyWaitCandidateName').val(candidateName);
	$("#abortMyWaitCandidateStatus").val(statusMap[candidateStatus]);
	$('#abortMyWaitCandidateRemark').val(remark);
	$('#abortMyWaitCandidateModal').modal('show');
}
function abortMyWaitCandidateOk(){
	var candidateStatus = $("#abortMyWaitCandidateStatus").val();	
	/*if(candidateStatus == ''){
		alert("候选人状态不能为空！");
		return;
	}*/
	var remark = $("#abortMyWaitCandidateRemark").val();	
	/*if(remark == ''){
		alert("请填写具体备注信息！");
		return;
	}*/
	var candidate = new FormData();
	candidate.append("candidateId",$("#abortMyWaitCandidateId").val());
	candidate.append("candidateStatus",candidateStatus);
	candidate.append("remark",remark);
	
	$.ajax({
		url:path+'/service/candidate/abortMyWaitCandidateOk',
		dataType:"json",
		data:candidate,
		async:true,
		cache:false,
		processData:false,
        contentType:false,
		type:"post",
		success:function(flag){
			if(flag){
				alert("abort成功！");
			}else{
				alert("abort失败！请刷新页面重试！");
			}
			$('#abortMyWaitCandidateModal').modal('hide');	
			abortClearData();
			loadCandidateList();
		}
	})
}
function delayMyWaitCandidate(candidateId,candidateName){	
	$('#delayMyWaitCandidateId').val(candidateId);
	$('#delayMyWaitCandidateName').val(candidateName);
	$('#delayMyWaitCandidateModal').modal('show');
}
function delayMyWaitCandidateOk(){
	var arrivalDate = $("#delayMyWaitCandidateArrivalDate").val();	
	var candidate = new FormData();
	candidate.append("candidateId",$("#delayMyWaitCandidateId").val());
	candidate.append("arrivalDate",arrivalDate);
	
	$.ajax({
		url:path+'/service/candidate/delayMyWaitCandidateOk',
		dataType:"json",
		data:candidate,
		async:true,
		cache:false,
		processData:false,
        contentType:false,
		type:"post",
		success:function(flag){
			if(flag){
				alert("延期成功！");
			}else{
				alert("延期失败！请刷新页面重试！");
			}
			$('#delayMyWaitCandidateModal').modal('hide');	
			entryClearData1();
			loadCandidateList();
		}
	})
}

function loadCusDeptInfo(){
	$.ajax({
		url:path+'/service/candidate/loadCusDeptInfo',
		dataType:"json",
		async:true,
		cache:false,
		type:"post",
		success:function(list){
			for(var i = 0;i<list.length;i++){
				$("#csSubdeptName").append("<option value='"+list[i].csSubDeptId+"'>"+list[i].csSubDeptName+"</option>");
			}
		}
	})
}

function updateResumeInfo(candidateId){
	$("#editForm").attr("action",path+"/service/resume/toUpdateResume");
	$("#candidateId").val(candidateId);
	$("#editForm").submit();
}

function loadCandidateSkillInfo(){
	var url = path+'/json/skill.json'
	$.getJSON(url,  function(data) {
	       $.each(data, function(i, item) {
	    	   $("#skill").append("<option>"+item.name+"</option>");
	       })
	});
}

function loadCandidateList(pageState)
{
	var candidate = new FormData(document.getElementById("candidateForm"));
	if(null != pageState)
	{
		candidate.append("pageState",pageState);
	}
	candidate.append("currentPage",currentPage);
	candidate.append("pageCount",pageCount);
	$.ajax({
		url:path+"/service/candidate/queryMyWaitEntryCandidateList",
		dataType:"json",
		async:true,
		data:candidate,
		cache:false,
		processData:false,
        contentType:false,
		type:"post",
		success:function(result){
			$("#candidateList tbody").remove();
			var tbody = $("<tbody>");
			tbody.appendTo($("#candidateList"));
			if(result.data.length <= 0 ){
				$("#exportCandidateExcel").attr("disabled",true);
				var tr = $("<tr></tr>");
				tr.appendTo(tbody);
				$("<td colspan='13' style='color: red;text-align: center;'>未查询到数据！</td>").appendTo(tr);
			}else{
				$("#exportCandidateExcel").removeAttr("disabled");
			}
			for (var i = 0; i < result.data.length; i++) {
				var tr = $("<tr></tr>");
				tr.appendTo(tbody);
				$("<td><a href='javascript:void(0);'" +
						"onclick=viewCandidataInfo('"+result.data[i].candidateId+"')>" +
						result.data[i].candidateName+"</a></td>"+
				"<td>"+ result.data[i].candidateSex+ "</td>"+
				"<td>"+ result.data[i].candidateAge+ "</td>"+
				"<td>"+ result.data[i].candidateTel+ "</td>"+
				"<td>"+ result.data[i].email+ "</td>"+
				"<td>"+ result.data[i].source+ "</td>"+
				"<td>"+ result.data[i].candidateStatus+ "</td>"+
				"<td>"+ result.data[i].experienceYears+ "</td>"+
				"<td>"+ result.data[i].skill+ "</td>"+
				"<td>"+ result.data[i].interviewStatus+ "</td>"+
				"<td>"+ result.data[i].csSubdeptName+ "</td>"+
				"<td>"+ result.data[i].demandStatus+ "</td>").appendTo(tr);
				if(result.data[i].demandStatus == 'Onboard'){
					$("<td><a href='javascript:void(0);' class='btn btn-info btn-small' " +
							"onclick=updateResumeInfo('"+result.data[i].candidateId+"')>EDIT</a>" +
					"</td>").appendTo(tr);
				}else{
					$("<td><a href='javascript:void(0);' class='btn btn-info btn-small' " +
							"onclick=updateResumeInfo('"+result.data[i].candidateId+"')>EDIT</a>" +
						"<a href='javascript:void(0);' class='btn btn-info btn-small' " +
							"onclick=entryMyWaitCandidate('"+result.data[i].candidateId+"','"+result.data[i].candidateName+"')>ENTRY</a>"+
						"<a href='javascript:void(0);' class='btn btn-info btn-small' " +
							"onclick=abortMyWaitCandidate('"+result.data[i].candidateId+"','"+result.data[i].candidateName+"'," +
								"'"+result.data[i].candidateStatus+"','"+result.data[i].remark+"')>ABORT</a>" +
						"<a href='javascript:void(0);' class='btn btn-info btn-small' " +
							"onclick=delayMyWaitCandidate('"+result.data[i].candidateId+"','"+result.data[i].candidateName+"')>DELAY</a>" +
					"</td>").appendTo(tr);
				}
				
			}
			$("#candidateList").append("</tbdoy>");
			currentPage = parseInt(result.pageInfo.currentPage);
			pageCount = parseInt(result.pageInfo.pageCount);
			var pageDataCount = parseInt(result.pageInfo.pageDataCount);
			var dataCount = parseInt(result.pageInfo.dataCount);
			$("#pageCount").html(pageCount);
			$("#currentPage").html(currentPage);
			$("#pageDataCount").html(pageDataCount);
			$("#dataCount").html(dataCount);
			$("#nextPage").attr("onclick","loadCandidateList('next')");
			$("#previousPage").attr("onclick","loadCandidateList('previous')");
			$("#lastPage").attr("onclick","loadCandidateList('last')");
			$("#fristPage").attr("onclick","loadCandidateList('frist')");
			if(currentPage == pageCount){
				$("#nextPage").removeAttr("onclick");
				$("#lastPage").removeAttr("onclick");
			}
			if(currentPage == 1){
				$("#previousPage").removeAttr("onclick");
				$("#fristPage").removeAttr("onclick");
			}
		}
	})
}