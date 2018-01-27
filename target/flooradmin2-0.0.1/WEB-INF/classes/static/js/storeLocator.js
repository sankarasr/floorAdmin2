///////// GOOGLE MAPS ///////////
var mapObject;
var arrayMarkers = new Array();
var markersFilter = new Array();
var storeListPagerMax = 10;
//获得所有的商店位置信息
function fillArrayMarkers($count, $address,$feature, $htmlOverlay, $storeName, $region, $district, $gaStoreName){
	//console.log($address.lat+","+$address.lng);
    arrayMarkers[$count] = new Object();
    arrayMarkers[$count].feature = $feature;
    arrayMarkers[$count].lat = $address.lat;
    arrayMarkers[$count].lng = $address.lng;
    arrayMarkers[$count].options = new Object();
    arrayMarkers[$count].options.htmlOverlay = $htmlOverlay;
    arrayMarkers[$count].title = "111";
    arrayMarkers[$count].options.storename = $storeName;
    arrayMarkers[$count].options.gaStorename = $gaStoreName;
    arrayMarkers[$count].region = $region;
    arrayMarkers[$count].district = $district;
}

function isExitsFeature(markerFeature,featureArr){//markerFeature:store feature  featureArr:my select feature
	if(markerFeature == null || markerFeature.length<=0){
		return false;
	};
	if(featureArr == null || featureArr.length<=0){
		return false;
	};
	
	for(var i=0;i<featureArr.length;i++){
		
		var existsFlag=$.inArray(featureArr[i],markerFeature);
		if(existsFlag==-1){
			return false;
		}
		/*for(var j=0;j<featureArr.length;j++){
			markerFeature[i].indexOf()
			
			if(markerFeature[i] == featureArr[j]){
				return true;
			}
		}*/
	}
	return true;
}


function RegionDistrictFilterMarkers(region, district){
	//console.log("RegionDistrictFilterMarkers("+region+", "+district+")");
//	if (markersFilter.length <= 0){
//		//console.log("RegionDistrictFilterMarkers - arrayFeature not exist");
//		markersFilter = new Array();
//	    for(var i=0;i<arrayMarkers.length;i++){
//	    	markersFilter[i] = arrayMarkers[i];
//	    }
//	}
	if (region.length <= 0 && district.length <= 0){ // do nothing if empty string found in region + district
		return;
	}
	if (region === $('#textAllRegion').val()){ // not filter region
		region = "";
	}
	if (district === $('#textAllDistrict').val()){ // not filter district
		district = "";
	}
	
	var markersLocationFilter = new Array();
	var num = 0;
	
	for(var i=0;i<markersFilter.length;i++){
		if (region.length > 0 && district.length > 0){ // region + district
			if (markersFilter[i].region === region && markersFilter[i].district === district){
				markersLocationFilter[num] = markersFilter[i]; 
				num++;
			}
		}else if(region.length > 0 && district.length <= 0){ // region only
			if (markersFilter[i].region === region){
				markersLocationFilter[num] = markersFilter[i]; 
				num++;
			}
		}else if(region.length <= 0 && district.length > 0){ // district only
			if (markersFilter[i].district === district){
				markersLocationFilter[num] = markersFilter[i]; 
				num++;
			}
		}
		
	}
	
	markersFilter = markersLocationFilter;
}

function locationFilterMarkers(destLang, destLong, dist){
	// scale = HK,KLN,NT,MAC / District / All
	// dist  = 100,20,60,10  /  10  / return()
	
//	if (markersFilter.length <= 0){
//		// console.log("locationFilterMarkers - arrayFeature not exist");
//		markersFilter = new Array();
//	    for(var i=0;i<arrayMarkers.length;i++){
//	    	markersFilter[i] = arrayMarkers[i];
//	    }
//	}
	
	var markersLocationFilter = new Array();
	var num = 0;
	for(var i=0;i<markersFilter.length;i++){
		if (getDistanceFromLatLonInKm(destLang, destLong, markersFilter[i].lat, markersFilter[i].lng) < dist){
			markersLocationFilter[num] = markersFilter[i]; 
			num++;
		}
	}
	markersFilter = markersLocationFilter;
//	scale="default";
//	var dist;
//	if(scale==="HK"){
//		dist = 80;
//	}else if(scale==="KLN"){
//		dist = 3;
//	}else if(scale==="NT"){
//		dist = 60;
//	}else if(scale==="MAC"){
//		dist = 5;
//	}else if(scale==="District"){
//		dist = 1;
//	}else{
//		dist = 2;
//	}
//	var num = 0;
//	for(var i=0;i<markersFilter.length;i++){
//		if (getDistanceFromLatLonInKm(destLang, destLong, markersFilter[i].lat, markersFilter[i].lng) < dist){
//			markersLocationFilter[num] = markersFilter[i]; 
//			num++;
//		}
//	}
//	markersFilter = markersLocationFilter;
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	  var R = 6371; // Radius of the earth in km
	  var dLat = deg2rad(lat2-lat1);  // deg2rad below
	  var dLon = deg2rad(lon2-lon1); 
	  var a = 
	    Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	    Math.sin(dLon/2) * Math.sin(dLon/2)
	    ; 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	  var d = R * c; // Distance in km
	  return d;
	}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
	
function filterArrayMarkers(arrayFeature){
	if(arrayFeature != null && arrayFeature.length>0){
		markersFilter = new Array();
		var num = 0;
		for(var i=0;i<arrayMarkers.length;i++){
			// console.log(arrayMarkers[i].lat + ", " + arrayMarkers[i].lng);
			var featureMarkers = arrayMarkers[i].feature;
			if(featureMarkers != null && featureMarkers.length>0){
				//console.log(featureMarkers);
				//console.log(arrayFeature);
				if(isExitsFeature(featureMarkers,arrayFeature)){
					markersFilter[num] = arrayMarkers[i];
					num++;
				}
			}
		}
	}else{
		// filter page by service.
		markersFilter = new Array();
	    for(var i=0;i<arrayMarkers.length;i++){
	    	markersFilter[i] = arrayMarkers[i];
	    }
	}
	
	//console.log(markersFilter);
}

function initStorePager(){
	var htmlStoreList='';
    var isStoreList = $('#storeList').length;
    if(isStoreList){
        for(var i=0; i<markersFilter.length; i++){
    		if(i%10==0){
    			if(i==0){
    				htmlStoreList += '<div id="storeListArea" class="list-store show">';
    			}else{
    				htmlStoreList += '<div id="storeListArea" class="list-store hide">';
    			}
    		}
    		var storeName = markersFilter[i].options.storename;
    	
    		var markerIndex = i%10+1;
//    		var markerIndex = i + 1;
//    		storeName = storeName.replace('site1.png', 'site'+pad(markerIndex,2)+'.png');
    		storeName = storeName.replace('site1.png', 'site1'+'.png');
//    		storeName = storeName.replace('pharm1.png', 'site'+pad(markerIndex,2)+'.png');
//    		storeName = storeName.replace(new RegExp('markerindex="1"','gm'),'markerindex="'+markerIndex+'"');
    		storeName = storeName.replace(/markerindex="1"/g,'markerindex="'+markerIndex+'"');
    		htmlStoreList +=storeName
    		if((i%10==9) || (i==markersFilter.length-1)){
                htmlStoreList += '</div>';
            }
        }
    }
    if(isStoreList){
        $('#storeList').html(htmlStoreList);
    }
 /*   if(arrayMarkers.length>0){
        initStorePager($pagerMax);
        $('#loaderStoreLocator').remove();
        $('#storeListHolder, #storeResults, #storeMap').removeClass('invisible');
    }*/
    
    if(markersFilter.length > 0){
    	//show footinfo, hide back to all link
    	$("#topFoo").css("display","block");
    	$("#bottomFoo").css("display","block");
    	$("#backToAllDiv").css("display","none");
    	$("#storeFilterLoc").css("display","block");
    	$("#turnPage").css("display","block");
    	//$("#searchFilterResultNumDiv").css("display","none");
    	//$("#backToAllDiv").css("display","none");
    	
    	// 设置分页显示数据
    	storeCounter();
    	currentStoreList = 0;
    	
    	// 设置返回页面数量
    	//$('#resultNumbers').html(markersFilter.length);
    	//set result count
    	if(markersFilter.length == 0){
    		$('#resultCount').parent().css('display','block');
    	}else{
    		$('#resultCount').parent().css('display','none');
    	}
    	$('#resultCount').html(markersFilter.length + '&nbsp;');
    	// 设置分页按钮
    	$('#turnPage .pre').addClass('preEnd');
    	if(markersFilter.length<=storeListPagerMax){
    		$('#turnPage .next').addClass('nextEnd');
    	}else{
    		$('#turnPage .next').removeClass('nextEnd');
    	}
    	// 初始化地图信息
    	initMaps(0,markersFilter.length);
    }
    else{
    	//hide footinfo, show search result, show back to all link
    	//$("#topFoo").css("display","none");
    	if(markersFilter.length == 0){
    		$('#resultCount').parent().css('display','block');
    	}else{
    		$('#resultCount').parent().css('display','none');
    	}
    	$('#resultCount').html(markersFilter.length + '&nbsp;');
    	$('#pageCount').html(markersFilter.length);
    	$("#bottomFoo").css("display","none");
    	$("#turnPage").css("display","none");
    	$("#storeMap").gmap3({
    		action:'clear',
    		name:'marker'
    	});
    	//$("#searchFilterResultNumDiv").css("display","block");
    	//$('#resultNumbers').html(markersFilter.length);
    	//$("#backToAllDiv").css("display","block");
    }
    
}

//设置分页显示页数信息
function storeCounter(){
    var storeCountStart = 0;
    var storeCountEnd = 0;
    var listCountTotal = $('#storeList .list-store:visible').index()-1;
    var addStoreCounter = 0;
    for(var i = listCountTotal; i>=0; i--){
        addStoreCounter += $('#storeList .list-store').eq(i).find('dl').length;
    }
    storeCountStart = addStoreCounter + 1;
    storeCountEnd = addStoreCounter + $('#storeList .list-store:visible').find('dl').length;
    //var html = storeCountStart+"-"+storeCountEnd+" of "+markersFilter.length
    var html = storeCountStart+"-"+storeCountEnd+" ";
    $('#turnPage .storecount-current').html(html+$('#turnPageStores').html());
  
   
    //$('#turnPage .pageStart').html(storeCountStart);
    //$('#turnPage .pageEnd').html(storeCountEnd);
    //var listCountTotal1 = $('#storeList .list-store:visible').index()
    //$('#turnPage .pageCount').html(markersFilter.length);
   // alert($('#resultCount').text());
}

var currentStoreList = 0;
//跳转到下一页
function nextStoreList(e){
    e.preventDefault();
    if($(this).hasClass('nextEnd')){
        return false;
    }
    $('#storeList .list-store').eq(currentStoreList).addClass('hide').removeClass('show');
    currentStoreList += 1;
    $('#storeList .list-store').eq(currentStoreList).removeClass('hide').addClass('show');
    storeCounter();
    if($('#turnPage .pre').hasClass('preEnd')){
        $('#turnPage .pre').removeClass('preEnd');
    }
    if(currentStoreList == $('#storeList .list-store').length-1){
        $('#turnPage .next').addClass('nextEnd');
    }
    
    //console.log(currentStoreList);
}
//跳转到上一页
function prevStoreList(e){
    e.preventDefault();
    if($(this).hasClass('preEnd')){
        return false;
    }
    $('#storeList .list-store').eq(currentStoreList).addClass('hide').removeClass('show');
    currentStoreList -= 1;
    $('#storeList .list-store').eq(currentStoreList).removeClass('hide').addClass('show');
    storeCounter();
    if($('#turnPage .next').hasClass('nextEnd')){
        $('#turnPage .next').removeClass('nextEnd');
    }
    if(currentStoreList == 0){
        $('#turnPage .pre').addClass('preEnd');
    }
    
}

//初始化地图
function initMaps(pageIndex,pageMax){
	var mapMarker = new Array();
	var start = pageIndex*pageMax;
	var end = start+pageMax;
	var num=0;
	var browserName = navigator.userAgent.toLowerCase();
	if(/ie/.test(browserName)){//Fixed:ie not supported indeOf,when var is array by tony
		if(!Array.indexOf)
		{
		    Array.prototype.indexOf = function(obj)
		    {             
		        for(var i=0; i<this.length; i++)
		        {
		            if(this[i]==obj)
		            {
		                return i;
		            }
		        }
		        return -1;
		    }
		}
	}
	
	var deliverySFExpressFlag = $("#deliverySFExpressFlag").val();
	var shopIcon;
	
	if (deliverySFExpressFlag == 'true'){
		shopIcon = ACC.common.themeResourcePath+"/img/sfexpress"+'.png';
	}
	else{
		shopIcon = ACC.common.themeResourcePath+"/img/site1"+'.png';
	}
	
	for(var i=start;i<end;i++){
		
		if(markersFilter[i] != null){
			mapMarker[num] = markersFilter[i];
			//mapMarker[num].options.icon=ACC.common.themeResourcePath+"/images/site/site"+(pad(num+1, 2))+'.png';
			
			var feature = mapMarker[num].feature;
			//if feature key = P or N or C
			if(null != feature && (feature.indexOf('Pharmacy') != -1 ||feature.indexOf('药房') != -1 ||feature.indexOf('藥房') != -1)){
				mapMarker[num].options.icon=ACC.common.themeResourcePath+"/img/pharm1"+'.png';
			}else{
				mapMarker[num].options.icon = shopIcon;
			}
			
			num++;			
//			var storeName = markersFilter[i].options.storename;
//			if (storeName.indexOf("pharm") != -1) {
//				mapMarker[i].options.icon=ACC.common.themeResourcePath+"/images/site/pharm"+((i+1)%10 == 0 ? 10 : (i+1)%10)+'.png';
//			} else {
//				mapMarker[i].options.icon=ACC.common.themeResourcePath+"/images/site/site"+((i+1)%10 == 0 ? 10 : (i+1)%10)+'.png';
//			}
		}
	}
	
    $("#storeMap").gmap3(
      { action: 'init',
        options: {
          streetViewControl: true,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
          },
          navigationControl: true,
          scrollwheel: true
        },
        callback: function(map){
             $('#storeMap').removeClass('invisible');
             mapObject = map;
        }
      },{
    	 action:'clear', 
    	 name:'marker'
      },{
    	  action:'clear', 
     	 name:'overlay'
      },{
        action: 'addMarkers',
        markers: mapMarker,
        marker: {
          options:{
            draggable: false
          },
          events:{
            click: function(marker, event, data){
              var map = $(this).gmap3('get');
              var htmlOverlayStr = marker.htmlOverlay;
              var offsetY = 0;
              //if the overlay contains featureNotEmpty, change offsetY and arrow position
              if(htmlOverlayStr.indexOf('featureNotEmpty') != -1){
            	  offsetY = -104;
              }else{
            	  offsetY = -65;
              }
              $(this).gmap3({action:'clear', name:'overlay'});
              $(this).gmap3({action:'addOverlay', latLng: [marker.getPosition().lat(), marker.getPosition().lng()], options:{content: marker.htmlOverlay, offset:{x:-335, y:offsetY}}});
              $(this).gmap3({action:'panTo', args:[marker.position]});
              $(this).gmap3({action:'panBy', args:[-100, 0]});
            }
          }
        },
        callback: function(markers){
            if(markers.length < 10){
                for(var i=0; i<markers.length; i++){
                   //$(this).gmap3({action: 'addCircle', options: { center: [markers[i].getPosition().lat(), markers[i].getPosition().lng()], radius : 30, fillColor : "#008BB2", strokeColor : "#005BB7",strokeOpacity: 0,fillOpacity: 0}});
                   $(this).gmap3({action: 'addCircle', options: {radius : 30, fillColor : "#008BB2", strokeColor : "#005BB7",strokeOpacity: 0,fillOpacity: 0}});//remove center function,when change distrtct,zoon also change.
                }
            }
            $('#storeList a#iconLink').bind('click', function(e){
                e.preventDefault();
                var markerIndex = $(this).find('img').attr('markerIndex');
                //console.log('markerindex:'+markerIndex);
                google.maps.event.trigger(markers[markerIndex-1], 'click');
                
                gaSearchStore(markers[markerIndex-1].gaStorename);
            });
            $('.addressLink').bind('click', function(e){
            	
            	var obj=$(this);
            	
            	$('.show').find('.addressLink').each(function(i){

            			$(this).attr('markerIndex',i+1+(currentStoreList*10));
            	})
            	var markerIndex = $(this).attr('markerIndex');
            	//alert(markerIndex);
                e.preventDefault();
                
                google.maps.event.trigger(markers[markerIndex-1], 'click');
                
                gaSearchStore(markers[markerIndex-1].gaStorename);
                
            });
            
            $(this).gmap3({action:'autofit',maxZoom:19});
        }
      }
    );
}

function closeStoreOverlay(){
    $('#storeMap').gmap3({action:'clear', name:'overlay'});
    return false;
}
///////// GOOGLE MAPS ///////////

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

	