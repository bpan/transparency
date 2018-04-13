import * as $ from 'jquery'
import React from 'react'
import { render } from 'react-dom';
import Controller from './components/Controller.jsx';
import './scss/reset.scss'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import './scss/controller.scss'

render(<Controller />, document.getElementById('app'));

var od = opener.document;
var bgImage = "url(../img/Panther%20Aqua%20Graphite.jpg)";
var $song = $('div#song', od);
var $verses = $song.children('div.verse');
var $mon = $('div#monitor');
var $set = $([]);
var TOPMARGIN = 20;

var t = {
	cont: {
		blackScreen: function() {
			if ($('div#blackScreen', od).hasClass('active')) {
				$('div#blackScreen', od).fadeOut('fast').css('z-index', '-1').toggleClass('active');
				$('div#controller input#blackScreen').val('Black').toggleClass('highlight');
			} else {
				$('div#blackScreen', od).css('z-index', '100').fadeIn().toggleClass('active');
				$('div#controller input#blackScreen').val('Resume').toggleClass('highlight');
			}
		},
		clearSong: function(callback) {
			callback = callback || function() { };
			$('div#debugTop', od).text('clear');
			$song.fadeOut(function() {
				$verses.removeClass('old').removeClass('current');
				$mon.html($song.html());
				var $currSong = $('li.current', $set);
				if ($currSong[0]) {
					$currSong.removeClass('current');
				}
				callback();
			});
		},
		initSet: function() {
			$('div#setDiv').html($('div#setDiv', od).html());
			$set = $('ul#setList');
			$('li.setTitle', $set).remove("click").click(function() {
				$set.children().removeClass('current');
				t.cont.loadSong($(this));
			});
			$('div.deleteSong', $set).remove("click").click(function(){
				$(this).parent().remove();
				$('ul#setList', od).html($set.html());
			});
			$set.sortable(
				{
					axis: 'y',
					containment: $('div#setDiv'),
					delay: 1,
					update: function() {
								setTimeout(function() { $('ul#setList', od).html($set.html()); }, 1);
							}
				}
			);
			if ($('li', $set)[0]) {
				$('div#controlHints').css("visibility","visible");
			}
		},
		initSong: function() {
			$mon.html($song.html());
			$('div#monitor div.versePad').click(function(e) {
				t.cont.scrollJump($mon.children('div.verse').index(this.parentNode));
			});
		},
		loadSong: function($setElement) {
			//var $setElement = $set.children().eq(i);
			var params = { action: "load_song", song_id: $('div.songName', $setElement).text() };
			t.cont.clearSong(function() {
				$setElement.addClass('current');
				$.post("index.php", params, function(data) {
					$song.empty().html(data);
					if (data.match("ERROR")) {
						$mon.html("<div class='error'>" + data + "</div>");
					} else {
						$('ul#setList', od).html($set.html());
						$verses = $song.children('div.verse');
						t.cont.songTop();
						$song.fadeIn('fast');
						//$('div#controlHints').show();
						$('div#controlHints').css("visibility","visible");
					}
				});
			});
		},
		songTop: function() {
			$verses.removeClass('old').removeClass('current');
			$('div#top', $song).addClass('current');
			t.cont.initSong();
			//$song.stop();
			$song.animate({ top: TOPMARGIN + 'px' }, 400);
			//$song.animate({ top: TOPMARGIN + 'px' }, "fast", "linear"); // For Safari
			$('div#debugTop', od).text('top');
		},
		scrollPrev: function() {
			var totHeight = 0;
			var $currSection = $('div.current', $song);
			if (!$currSection[0]
				|| !$currSection.prev()[0]) {
				t.cont.songTop();
			} else if ($currSection.attr('id') == 'top') {
				return;
			} else {
				$verses.slice(0, $verses.index($currSection[0]) - 1).each(function() {
					totHeight += $(this).height();
				});
				$currSection.removeClass('current');
				$currSection.prev().addClass('current').removeClass('old');
				t.cont.initSong();
				$song.stop();
				$song.animate({top: TOPMARGIN-totHeight + 'px'}, 400, "linear");
				$song.animate({top: TOPMARGIN-totHeight + 'px'}, 400, "linear"); // FF + Safari
				$('div#debugTop', od).text(totHeight);
			}
		},
		scrollNext: function() {
			var totHeight = 0;
			var $currSection = $('div.current', $song);
			if (!$currSection[0]) {
				t.cont.songTop();
			} else if ($currSection.next()[0]) {
				$verses.slice(0, $verses.index($currSection[0]) + 1).each(function() {
					totHeight += $(this).height();
				});
				$currSection.addClass('old').removeClass('current');
				$currSection.next().addClass('current');
				t.cont.initSong();
				$song.stop();
				$song.animate({top: TOPMARGIN-totHeight + 'px'}, 400, "linear");
				//$song.animate({top: TOPMARGIN-totHeight + 'px'}, 400, "linear"); // For Safari
				$('div#debugTop', od).text(totHeight);
			}
		},
		scrollJump: function(i) {
			var totHeight = 0;
			var $currSection = $('div.current', $song);

			if (i < 0) {
				return;
			} else if (i > $verses.length-1) {
				i = $verses.length-1;
			}
			if ($verses.slice(i-1, i)) {
				$verses.removeClass('old').removeClass('current');
				$verses.slice(0, i).each(function() {
					totHeight += $(this).height();
					$(this).addClass('old');
				});
				$verses.slice(i, i+1).addClass('current');
				t.cont.initSong();
				$song.stop();
				$song.animate({top: TOPMARGIN-totHeight + 'px'}, 400, "linear");
				$song.animate({top: TOPMARGIN-totHeight + 'px'}, 400, "linear"); // For Safari
				$('div#debugTop', od).text(totHeight);
			}
		},
		setPrev: function() {
			var $currSong = $('li.current', $set);
			if (!$currSong[0]) {
				//$set.children().removeClass('current');
				t.cont.loadSong($set.children().eq(0));
			} else if ($currSong.prev()[0]) {
				$currSong.removeClass('current');
				t.cont.loadSong($currSong.prev());
			}
		},
		setNext: function() {
			var $currSong = $('li.current', $set);
			if (!$currSong[0]) {
				//$set.children().removeClass('current');
				t.cont.loadSong($set.children().eq(0));
			} else if ($currSong.next()[0]){
				$currSong.removeClass('current');
				t.cont.loadSong($currSong.next());
			}
		}
	},
	init: function() {
		var animateDelay = 9000;

		$('body', od).css('cursor', 'auto');

		if ($('div#titleScreen div', od).html().search(/controller/) >= 0) {
			animateDelay = 2000;
		}
		setTimeout(function() {
			$('div#titleScreen', od).animate({top: '60px', left: '-600px'}, 150, "linear", function() {
				$('div#titleScreen', od).hide();
			});
		}, animateDelay);

		/* Set Control */
		$('div#controller input#setPrev').click(function(e) { 		t.cont.setPrev();		});
		$('div#controller input#setNext').click(function(e) { 		t.cont.setNext();		});
		/* Song Control */
		$('div#controller input#songTop').click(function(e) {		t.cont.songTop();		});
		$('div#controller input#songPrev').click(function(e) {		t.cont.scrollPrev();	});
		$('div#controller input#songNext').click(function(e) {		t.cont.scrollNext();	});
		/* Style Control */
		$('div#controller input#clearSong').click(function(e) {		t.cont.clearSong();		});
		$('div#controller input#blackScreen').click(function(e) {	t.cont.blackScreen();	});
		$('div#controller input#textToggle').click(function(e) { 	t.style.toggleText();	});
		$('div#controller input#bgToggle').click(function(e) {	t.style.toggleBackground(); });

		if ($('div#blackScreen', od).hasClass('active')) {
			$('div#controller input#blackScreen').val('Resume').toggleClass('highlight');
		}

		t.suggest.init();

		t.cont.initSet();
		t.cont.initSong();

		if ($set.html().replace(/\s+/, "") == "") {
			$set.html('<div class="defaultText">Use the input above to start building your song set.</div>');
			$set.append('<div class="defaultText">Drag-and-drop the songs to reorder.</div>');
		}
		if ($mon.html().replace(/\s+/, "") == "") {
			$mon.html('<div class="defaultText"><p>This monitor will mirror what is displaying on the transparency screen.'
						+ '<p>Click on any song or verse to control the transparency screen.</div>');
		}
	},
	keyAction: function(e) {
		if (e.target.id != 'addASong' && e.target.id != 'findALyric') {
			$('div#debugKey', od).text(e.keyCode);
			switch(e.keyCode) {
				/* Set Control */
				case 219:	// [
					e.preventDefault();
					t.cont.setPrev();
					break;
				case 221:	// ]
					e.preventDefault();
					t.cont.setNext();
					break;
				/* Song Control */
				case 27:	// Esc
				case 81:	// Q
					t.cont.songTop();
					break;
				case 8:		// delete
				case 37:	// left
				case 38:	// up
				case 65:	// A
					t.cont.scrollPrev();
					break;
				//case 13:	// return
				case 32:	// space
				case 39:	// right
				case 40:	// down
				case 90:	// Z
					t.cont.scrollNext();
					break;
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54:
				case 55:
				case 56:
				case 57:
					t.cont.scrollJump(e.keyCode-48-1);
					break;
				/* Style Control */
				case 67:	// C
					t.cont.clearSong();
					break;
				case 66:	// B
					t.cont.blackScreen();
					break;
				case 76:	// L
					//t.style.toggleText();
					break;
				case 75:	// K
					//t.style.toggleBackground();
					break;
				default:
					break;
			}
		}
	},
	suggest: {
		init: function() {
			$('input#addASong').autocomplete(
				"index.php",
				{
					minChars:3,
					delay:300,
					cacheLength: 0,
					matchSubset: 1,
					matchContains: 1,
					extraParams: { action: "find_title" },
					onItemSelect:t.suggest.selectSong,
					onFindValue:t.suggest.findValue,
					selectFirst:true,
					width:290
				}
			);
			$('input#findALyric').autocomplete(
				"index.php",
				{
					minChars:4,
					delay:300,
					cacheLength: 0,
					matchSubset: 1,
					matchContains: 1,
					extraParams: { action: "find_lyric" },
					onItemSelect:t.suggest.selectSong,
					onFindValue:t.suggest.findValue,
					selectFirst:true,
					width:290
				}
			);
		},
		findValue: function(li) {
			if (li == null ) return alert("No match!");

			if (!!li.extra) {
				var sValue = li.extra[0];
			} else {
				var sValue = li.selectValue;
				alert("The value you selected was: " + sValue);
			}

		},
		selectSong: function(li) {
			if (li == null ) return alert("No song selected!");
			var songName = li.extra[0];
			//var songPreview = li.selectValue.replace(/.*<span class='preview'>/, "").replace(/<br>/g, "\\n");
			//var songName = li.selectValue;

			var setHtml = '<li class="setTitle"><div class="songName"><a>' + songName + '</a></div>';
			setHtml += '<div class="deleteSong">X</div><div class="spacer"></div></li>';
			$set.append(setHtml).sortable("refresh");
			$('div.defaultText', $set).remove();
			$('ul#setList', od).html($set.html());

			$('li.setTitle', $set).remove("click").click(function() {
				$set.children().removeClass('current');
				t.cont.loadSong($(this));
			});
			$('div.deleteSong', $set).remove("click").click(function(){
				$(this).parent().remove();
				$('ul#setList', od).html($set.html());
			});

			$('input#addASong,input#findALyric').val('');
			$('input#addASong').focus();
		}
	},
	style: {
		toggleText: function() {
			if ($('body', od).hasClass('black')) {
				$('body', od).removeClass('black').addClass('white');
			} else {
				$('body', od).removeClass('white').addClass('black');
			}
		},
		toggleBackground: function() {
			if ($('body', od).css('backgroundImage') == "none") {
				$('body', od).css('backgroundImage', bgImage);
			} else {
				$('body', od).css('backgroundImage', 'none');
			}
		}
	}
}

$().ready(t.init).keydown(t.keyAction);
