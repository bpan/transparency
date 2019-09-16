var newWindow = '';

function popWindow(url) {
	if (!newWindow.closed && newWindow.location) {
		//newWindow.location.href = url;
	}
	else {
		newWindow = window.open(url,'name','height=800,width=1200,scrollbars=yes,resizable=yes');
		if (!newWindow.opener) newWindow.opener = self;
	}
	if (newWindow.focus) {
		newWindow.focus();
	}
	$('body').css('cursor', 'auto');
	return false;
}

$().ready(function() {
	setTimeout(function() {
		$('div#titleScreen').show().animate({top: '0', left: '0'}, 800, "linear");
		setTimeout(function() {
			$('div#titleScreen').animate({top: '60px', left: '-600px'}, 150, "linear", function() {
				$('div#titleScreen').hide().animate({top: '-600px', left: '-150px'}, 150, "linear", function () {
					$('div#titleScreen div').html('<h4>&nbsp;</h4><h4>Click anywhere on this screen to open a new controller</h4>');
					setTimeout(function() {
						$('div#titleScreen').show().animate({top: '0', left: '0'}, 800, "linear");
					}, 1500);
				});
			});
		}, 5000);
	}, 1500);
});

// $().click(function(e) {
// 	$('body').css('cursor', 'wait');
// 	popWindow("index.html");
// });

