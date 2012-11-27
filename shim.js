enableWebcamStream = function( videoDomElement )
{
	videoDomElement.autoplay = true;

	var getUserMedia =
	(
		navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.oGetUserMedia ||
		navigator.msieGetUserMedia ||
		false
	);

	var onStream = function( stream )
	{
		try
		{
			/**
			* Chrome / Opera
			*/
			videoDomElement.src = ( window.URL || window.webkitURL ).createObjectURL( stream );
		}
		catch( e )
		{
			/**
			* Firefox
			*/
			if( videoDomElement.srcObject )
			{
				videoDomElement.srcObject = stream;
			}
			else
			{
				videoDomElement.mozSrcObject = stream;
			}

			videoDomElement.play();
		}
	};

	var onError = function( error )
	{
		throw error;
	};

	if( getUserMedia )
	{
		getUserMedia.call( navigator, {"video" : true }, onStream, onError );
	}
};

