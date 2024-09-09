// 本地这里需要替换url为 http://localhost:8080/ssm6940b/
var preview,baseurl,adminurl
preview = "是"
baseurl = "http://localhost:8080/ssm6940b/";
adminurl = "http://localhost:8080/ssm6940b/admin/dist/index.html#/"
/**
 * 网络请求
 * @param {Object} url		地址
 * @param {Object} method	get/post
 * @param {Object} param	参数
 * @param {Object} callback	回调函数
 */
function http(url, type, data, callback) {
	url = baseurl + url;
	$.ajax({
		url: url,
		beforeSend: function(request) {
			request.setRequestHeader("Token", localStorage.getItem("Token"));
		},
		contentType: 'application/x-www-form-urlencoded',
		data: data,
		dataType: 'json',
		type: type,
		success: function(result, status, xhr) {
			if (result.code == 0) {
				callback(result);
			} else if (result.code == 401) {
				window.location.href = '../login/login.html';
			} else {
				alert(result.msg)
			}
		},
		error: function(xhr, status, error) {
			console.log(xhr, status, error)
		}
	});
}

function httpJson(url, type, data, callback) {
	url = baseurl + url;
	var params = null;
	if (data) {
		var params = JSON.stringify(data);
	}
	$.ajax({
		url: url,
		beforeSend: function(request) {
			request.setRequestHeader("Token", localStorage.getItem("Token"));
		},
		contentType: 'application/json',
		data: params,
		dataType: 'json',
		type: type,
		success: function(result, status, xhr) {
			if (result.code == 0) {
				callback(result);
			} else if (result.code == 401) {
				window.location.href = '../login/login.html';
			} else {
				alert(result.msg)
			}
		},
		error: function(xhr, status, error) {
			console.log(xhr, status, error)
		}
	});
}

function upload(file,callback) {
	url = baseurl + "file/upload";
	var formData = new FormData();
	formData.append('file', file);
	$.ajax({
		url: url,
		/*接口域名地址*/
		type: 'post',
		data: formData,
		headers: {
			"Token": localStorage.getItem("Token")
		}, //添加请求头部 
		contentType: false,
		processData: false,
		success: function(res) {
			if (res.code == 0) {
				callback(res);
			} else if (res.code == 401) {
				window.location.href = '../login/login.html';
			} else {
				alert(res.msg)
			}
		}
	})
}
