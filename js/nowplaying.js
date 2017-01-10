'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NowPlaying = function () {
	function NowPlaying(opt) {
		_classCallCheck(this, NowPlaying);

		this.el = opt.el;
		this.url = '//ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + opt.user + '&api_key=' + opt.apiKey + '&format=json&limit=1';
	}

	NowPlaying.prototype.init = function init() {
		var _this = this;

		setInterval(function (_) {
			return _this.requestTrack(_this.url);
		}, 1000);
	};

	NowPlaying.prototype.requestTrack = function requestTrack(url) {
		var _this2 = this;

		$.getJSON(url, function (json) {
			return _this2.parse(json);
		});
	};

	NowPlaying.prototype.parse = function parse(json) {
		var track = json.recenttracks.track[0];
		var name = track.name;
		var artist = track.artist['#text'];

		var template = '<p class="recent-track__name">' + name + ' by ' + artist;

		this.el.innerHTML = template;
	};

	return NowPlaying;
}();

var track = document.querySelector('.js-track');

var widget = new NowPlaying({
	el: track,
	apiKey: '68ccaa454b20d81a11a9e1c84ab67291',
	user: 'toneradiouog'
});

widget.init();