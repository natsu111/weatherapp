window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        ".temperature-description"
    );
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/d84e9c8a24b7d4f833690e41622c94ed/${lat},${long}?units=si&lang=ja&exclude=alerts,flags`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently;
                    temperatureDegree.textContent = temperature + "度";
                    temperatureDescription.textContent = summary;

                    if (data.timezone.endsWith('Minh')) {
                        locationTimezone.textContent = "アジア/ホーチミン市";
                    } else {
                        locationTimezone.textContent = data.timezone;
                    }
                    setIcons(icon, document.querySelector('.icon'));

                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});