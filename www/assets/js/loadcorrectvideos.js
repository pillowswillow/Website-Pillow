// WARNING: this needs to be run before modal-box.js!
(function() {

	const initTrailerVideo = function() {
		var blockedList = [
		"China",
		"Crimea",
		"Cuba",
		"Iran",
		"North Korea",
		"Sudan",
		"Syria"
		];

        // http://userinfo.io/ for more information!
        var blocked = true;
        $.getJSON("https://api.userinfo.io/userinfos", function(data) {
        	var blocked = true;
        	if (data != null) {
        		if (data.country.name != null && blockedList.indexOf(data.country.name) == -1) {
                    blocked = false;    // Country is not on blacklist
                }
            }

            if (blocked) {
                // Substitute locally hosted HTML5 video
                console.log("Youtube is blocked in your region! Substituting local copy of videos. For faster loading, please use a VPN.");
                $('#sol_trailer_anchor')
                .before(
                	"<video id='trailer-player' controls><source src='assets/video/sol_trailer_720.mp4' type='video/mp4'/></video>"
                	);
                
                // Set up extra events for modal closes and such
                var player = $('#trailer-player');
                $('#details-sol span.close-btn').on('click', function() {
                	console.log("STOPPPED");
                	player.trigger('pause');
                });
            }
            else {
                // Use regular youtube embed
                $('#sol_trailer_anchor')
                .before(
                	"<iframe src='https://www.youtube.com/embed/yoVucmzfa_o?rel=0&amp;showinfo=0' frameborder='0' allowfullscreen></iframe>"
                	);
            }    
        });
    };

    // Should this be triggered immediately? Needs to trigger BEFORE modal-box.js!
    initTrailerVideo();

})();