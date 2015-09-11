/*
author : Keen Zhou
blog   : yzhou9071.com
email  : yzhou9071@163.com
Copyright (c) 2015 Keen Zhou All right reserved.
*/
//Set your server
var server = "http://192.168.1.117";

function showAlert(alertMeg,alertTitle,alertBtn){
	navigator.notification.alert(
			alertMeg,
			alertDismissed,
			alertTitle,
			alertBtn
	);
}

function showLoading(){
	$.mobile.loading(
			'show',
			{
				text:'玩儿命加载中...',
				textVisible:true,
				theme:"b",
				textonly:false,
				html:"",
			});
}
function hideLoading(){
	$.mobile.loading('hide');
}

function getPhoto(){
	navigator.camera.getPicture(
		function(imageURI) {
			$("#userPhoto").attr("src",imageURI);
			showLoading();
			uploadPhoto(imageURI);
		},
		function() {
			//TODO something error info
		},
		{
			quality			: 50,
			destinationType : navigator.camera.DestinationType.FILE_URI,
			sourceType		: navigator.camera.PictureSourceType.PHOTOLIBRARY
		}
	);
}

function getCamera(){
	navigator.camera.getPicture(
			cameraSuccess,
			cameraError,
			{
				quality : 50,
				destinationType : navigator.camera.DestinationType.FILE_URI,
			});
}
function cameraSuccess(picURI){
	$("#userPhoto").attr("src",picURI);
	showLoading();
	uploadPhoto(picURI);
}
function cameraError(){
	//TODO something error info
}

function uploadPhoto(imgUrl){
	var options = new FileUploadOptions();
	options.fileKey = "file";
	//options.filName = imgUrl.substr(imgUrl.lastIndexOf('/')+1);
	options.mimeType = "image/jpeg";
	options.chunkedMode = false;

	var params = new Object();
	params.phone = 123456789;
	params.photoname = "123456789";
	params.height = 256;
	params.width = 256;
	options.params = params;

	var ft = new FileTransfer();
	ft.upload(imgUrl,encodeURI(server+"/uploadbackground.php"),upSuccess,upFail,options);
}
function upSuccess(){
	//TODO something profile
	//TODO donwload pic
	hideLoading();
}
function upFail(){
	//TODO something error info
}

function downloadPhoto(imgUrl,desUrl){
	var ft = new FileTransfer();
	var imgurl = encodeURI(imgUrl);
	ft.download(
		encodeURI(imgurl),
		desUrl,
		function(entry){
			$("#userPhoto").attr("src",desUrl);
		},
		function(error){
			if(error.code == FileTransferError.FILE_NOT_FOUND_ERR){
				showAlert("文件找不到","提示","差评");
			}
			if(error.code == FileTransferError.INVALID_URL_ERR){
				showAlert("非法路径","提示","差评");
			}
			if(error.code == FileTransferError.CONNECTION_ERR){
				showAlert("连接错误","提示","差评");
			}
		}
	);
}
