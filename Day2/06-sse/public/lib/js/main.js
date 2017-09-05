
	window.onload = function setDataSource() {
		if (!!window.EventSource) {
			var source = new EventSource("/events/");

			source.addEventListener("message", function(e) {
				updatePrice(JSON.parse(e.data));
				logMessage(e);
			}, false);
			
			source.addEventListener("open", function(e) {
				logMessage("OPENED");
			}, false);

			source.addEventListener("error", function(e) {
				logMessage("ERROR");
				if (e.readyState == EventSource.CLOSED) {
					logMessage("CLOSED");
				}
			}, false);
		} else {
			document.getElementById("notSupported").style.display = "block";
		}
	}

	function updatePrice(data) {
		console.log(data)
		var ticket = data.ticketName;
		var price = data.ticketPrice;
		
		var el = document.getElementById("t_" + ticket);
		var oldPrice = el.innerHTML;
		el.innerHTML = price;
		if (parseFloat(oldPrice) < parseFloat(price)) {
			el.style.backgroundColor = "lightgreen";
		} else {
			el.style.backgroundColor = "tomato";
		}
		window.setTimeout(function clearBackground() {
			el.style.backgroundColor = "gainsboro";
		}, 500);
	}

	function logMessage(obj) {
		console.log(obj)
		var el = document.getElementById("log");
		if (typeof obj === "string") {
			el.innerHTML += obj + "<br>";
		} else {
			el.innerHTML += obj.lastEventId + " - " + obj.data + "<br>";
		}
		el.scrollTop += 20;
	}

