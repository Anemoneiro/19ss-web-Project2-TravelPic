let searchType = "";
let searchContent = "";
let totalPage = 0;
let currentPage = 1;

function checkIfLogin() {
	const upload = document.getElementById("Upload");
	const myphoto = document.getElementById("MyPhoto");
	const myfavor = document.getElementById("MyFavor");
	const login = document.getElementById("Login");
	const logout = document.getElementById("Logout");
	const personal = document.getElementById("Personal");

	$.ajax({
		url: '../php/checkIfLogin.php',
		type: 'POST',
		success:function(data){
			if (data !='') {
				login.style.display = "none";
				personal.style.display = "block";
			} else {
				upload.style.display = "none";
				myphoto.style.display = "none";
				myfavor.style.display = "none";
				logout.style.display = "none";
				personal.style.display = "none";
				login.style.display = "block";
			}
		},
		error:function(err){
			$.dialog({
				title: '错误',
				content: '无法连接后台！',
				type: 'red',
			});
		}
	});

	logout.addEventListener("click",function () {
		$.ajax({
			url: '../php/logout.php',
			type: 'POST',
			success:function(data){
				$.alert({
					title: '提示',
					content: '注销成功！',
					buttons: {
						"好的": function () {
							window.location.href = "../html/login.html";
						}
					}
				});
			},
			error:function(err){
				$.dialog({
					title: '错误',
					content: '无法连接后台！',
					type: 'red',
				});
			}
		});
	})
}

function goToDetail(event) {
	const id = event.target.getAttribute('id');
	window.location.href = `../html/details.html?id=${id}`;
}

function goToPage(event) {
	let id = event.target.getAttribute('id').split('-')[1];
	getSearchResult(searchType, searchContent, id);
}

function goToPrevPage() {
	if(currentPage == 1) getSearchResult(searchType, searchContent, currentPage);
	else getSearchResult(searchType, searchContent, parseInt(currentPage) - 1);
}

function goToNextPage() {
	if(currentPage == totalPage) getSearchResult(searchType, searchContent, currentPage);
	else getSearchResult(searchType, searchContent, parseInt(currentPage) + 1);
}

function getSearchResult(type, content, pageNumber){
	let searchNum = document.getElementsByClassName("box-body-searchNum");
	searchNum[0].style.display = "block";

	let searchItem = document.getElementsByClassName("picDisplayBox-filter");
	let realPic = document.getElementsByClassName("realPic");
	let totalSize = document.getElementById("totalSize");
	currentPage = pageNumber;

	$.ajax({
		url: '../php/browse.php',
		type: 'POST',
		async: false,
		data: {
			type: type,
			content: content,
			page: pageNumber,
		},
		success: function (data) {
			let rtn = JSON.parse(data);
			let imgs = rtn.imgs;
			let nowSize = 0;
			for (const i in imgs) {
				if(imgs[i].src !== 'null'){
					eval("realPic[i].style.backgroundImage = 'url(../../img/travel-images/large/" + imgs[i].src + ")';");
					realPic[i].id = imgs[i].id;
				}
				nowSize++;
			}
			totalSize.innerHTML = rtn.totalSize;

			/* 处理搜索无结果情况 */
			if(nowSize == 0){
				return;
			}

			let searchResult = document.getElementsByClassName("box-body-filteResult");
			searchResult[0].style.display = "block";

			/* 计算总页数，向上取整 */
			totalPage = Math.ceil(rtn.totalSize / 12);

			let isLastPage = false;
			if(totalPage == pageNumber) isLastPage = true;

			/* 处理翻页 */
			let pages = document.getElementsByName("page");
			if(totalPage <= 5 || pageNumber <= 3) {
				for (let i = 0; i < pages.length; i++) {
					pages[i].id = "page-" + (i + 1).toString();
					pages[i].innerHTML = (i + 1).toString();
					pages[i].className = "normalPage";
				}

				for(let i = 0; i < pages.length; i++) {
					pages[i].style.display = "inline";
				}

				if(totalPage < pages.length) {
					for(let i = totalPage; i < pages.length; i++) {
						pages[i].style.display = "none";
					}
				}

				for (let i = 0; i < 12; i++) {
					searchItem[i].style.display = "block";
				}

				if(isLastPage) {
					for (let i = nowSize; i < 12; i++) {
						searchItem[i].style.display = "none";
					}
				}
			} else if(pageNumber >= totalPage - 2) {
				for (let i = 0; i < pages.length; i++) {
					pages[i].id = "page-" + (totalPage - 4 + i).toString();
					pages[i].innerHTML = (totalPage - 4 + i).toString();
					pages[i].className = "normalPage";
				}

				for (let i = 0; i < 12; i++) {
					searchItem[i].style.display = "block";
				}

				if(isLastPage) {
					for (let i = nowSize; i < 12; i++) {
						searchItem[i].style.display = "none";
					}
				}
			} else {
				for (let i = 0; i < pages.length; i++) {
					pages[i].id = "page-" + (pageNumber - 2 + i).toString();
					pages[i].innerHTML = (pageNumber - 2 + i).toString();
					pages[i].className = "normalPage";
				}

				for (let i = 0; i < 12; i++) {
					searchItem[i].style.display = "block";
				}

				if(isLastPage) {
					for (let i = nowSize; i < 12; i++) {
						searchItem[i].style.display = "none";
					}
				}
			}

			/* 处理高亮 */
			if(pageNumber <= 3 || totalPage <= 5) {
				pages[pageNumber - 1].className = "activePage";
			} else if(pageNumber == totalPage) {
				pages[4].className = "activePage";
			} else if(pageNumber == totalPage - 1) {
				pages[3].className = "activePage";
			} else {
				pages[2].className = "activePage";
			}
		},
		error: function (err) {
			$.dialog({
				title: '错误',
				content: '无法连接数据库！',
				type: 'red',
			});
		}
	});
}

function doSearch() {
	if (!$('#navSearchText').val())  {
		$.confirm({
			title: '提示',
			content: '请填写完整标题信息！',
			type: 'red',
		});
		return;
	}
	if ($('#navSearchText').val().length > 200) {
		$.confirm({
			title: '提示',
			content: '搜索标题过长！',
			type: 'red',
		});
		return;
	}

	let searchResult = document.getElementsByClassName("box-body-filteResult");
	searchResult[0].style.display = "none";
	let searchNum = document.getElementsByClassName("box-body-searchNum");
	searchNum[0].style.display = "none";

	searchType = "title"
	searchContent = $('#navSearchText').val();
	getSearchResult(searchType, searchContent, 1);
}


function click_Hotbtn(event) {
	let searchResult = document.getElementsByClassName("box-body-filteResult");
	searchResult[0].style.display = "none";
	let searchNum = document.getElementsByClassName("box-body-searchNum");
	searchNum[0].style.display = "none";

	searchType = event.target.getAttribute('name');
	searchContent = event.target.getAttribute('id');
	getSearchResult(searchType, searchContent, 1);
}


function click_Filterbtn() {
	let content = $('#content-filter').val();
	let country = $('#country-filter').val();
	let city = $('#city-filter').val();

	if(!content.trim()) content = "null";
	if(!country.trim()) country = "null";
	if(!city.trim()) city = "null";

	if(content == "null" && country == "null" && city == "null") {
		$.alert({
			title: '提示',
			content: '筛选信息不可都为空，请至少选择一种筛选方式！',
			type: 'red',
		});
		return;
	}

	let searchResult = document.getElementsByClassName("box-body-filteResult");
	searchResult[0].style.display = "none";

	let searchNum = document.getElementsByClassName("box-body-searchNum");
	searchNum[0].style.display = "none";

	searchType = "filter";
	searchContent = content + "@" + country + "@" + city;
	getSearchResult(searchType, searchContent, 1);
}

function getCountries() {
	let countryFilter = document.getElementById("country-filter");

	$.ajax({
		url: '../php/getCountries.php',
		type: 'POST',
		async: false,
		success:function(data){
			let countries = JSON.parse(data);
			for (let i in countries) {
				let option = $(`<option value="${countries[i].ISO}">${countries[i].CountryName}</option>`);
				$(countryFilter).append(option);
			}
		},
		error:function(err){
			$.dialog({
				title: '错误',
				content: '无法连接数据库！',
				type: 'red',
			});
		}
	});
}

function getCitiesOfCountry() {
	let countryFilter = document.getElementById("country-filter");
	let cityFilter = document.getElementById("city-filter");

	let index = countryFilter.selectedIndex; // 选中索引
	let countryCode = countryFilter.options[index].value;

	$(cityFilter).empty();
	$.ajax({
		url: '../php/getCitiesOfCountry.php',
		type: 'POST',
		async: false,
		data: {
			country: countryCode,
		},
		success:function(data){
			let cities = JSON.parse(data);
			let option = $(`<option value="null">null</option>`);
			$(cityFilter).append(option);
			for (let i in cities) {
				let option = $(`<option value="${cities[i].CityCode}">${cities[i].CityName}</option>`);
				$(cityFilter).append(option);
			}
		},
		error:function(err){
			$.dialog({
				title: '错误',
				content: '无法连接数据库！',
				type: 'red',
			});
		}
	});
}

function getHot() {
	$.ajax({
		url: '../php/browse_getHot.php',
		type: 'POST',
		async: false,
		success:function(data){
			let hotResult = JSON.parse(data);
			let navHotBtns = document.getElementsByClassName("navHotBtn");
			let j = 0;

			for (let i = 0; i < hotResult.contentSize; i++) {
				navHotBtns[i].id = hotResult.hotResult[j].valueCode;
				navHotBtns[i].value = hotResult.hotResult[j].name;
				j++;
			}
			for (let i = hotResult.contentSize; i < 4; i++) {
				navHotBtns[i].style.display = "none";
			}

			for (let i = 4; i < 4 + hotResult.countrySize; i++) {
				navHotBtns[i].id = hotResult.hotResult[j].valueCode;
				navHotBtns[i].value = hotResult.hotResult[j].name;
				j++;
			}
			for (let i = 4 + hotResult.countrySize; i < 8; i++) {
				navHotBtns[i].style.display = "none";
			}

			for (let i = 8; i < 8 + hotResult.citySize; i++) {
				navHotBtns[i].id = hotResult.hotResult[j].valueCode;
				navHotBtns[i].value = hotResult.hotResult[j].name;
				j++;
			}
			for (let i = 8 + hotResult.citySize; i < 12; i++) {
				navHotBtns[i].style.display = "none";
			}
		},
		error:function(err){
			$.dialog({
				title: '错误',
				content: '无法连接数据库！',
				type: 'red',
			});
		}
	});

}

window.onload =	function () {
	checkIfLogin();
	getCountries();
	getHot();

	let searchResult = document.getElementsByClassName("box-body-filteResult");
	searchResult[0].style.display = "none";

	let searchNum = document.getElementsByClassName("box-body-searchNum");
	searchNum[0].style.display = "none";
}