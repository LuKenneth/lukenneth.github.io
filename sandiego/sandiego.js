(function () {
  const days = ["tuesday", "wednesday", "thursday", "friday", "saturday"];
  const tabs = Array.from(document.querySelectorAll(".day-tabs button"));
  const panels = Array.from(document.querySelectorAll(".day-panel"));
  const toast = document.querySelector(".toast");
  const dayMaps = new Map();
  const accessSessionKey = "sd-trip:access-unlocked";
  const accessCode = "7897";

  const accessDetails = {
    arrival: "North end of the street",
    mainEntrance: "0279",
    mainNote: "Press bottom button",
    sideGate: "C2501",
    wifi: "jacuzzi",
    wifiPassword: "jacuzzi3678",
    poolSpa: "No glass. Rinse sand first."
  };

  const airbnb = {
    type: "airbnb",
    name: "Airbnb",
    note: "3678 Herbert Street",
    lat: 32.7489,
    lng: -117.1611,
    url: "https://www.google.com/maps/search/?api=1&query=3678%20Herbert%20Street%2C%20San%20Diego%2C%20CA%2092103"
  };

  const pins = [
    { day: "tuesday", type: "airport", name: "SAN Airport", note: "3225 N Harbor Dr", lat: 32.7338, lng: -117.1933, url: "https://www.google.com/maps/search/?api=1&query=3225%20N%20Harbor%20Dr%20San%20Diego%20CA%2092101" },
    { day: "tuesday", type: "park", name: "Balboa Park", note: "1549 El Prado", lat: 32.7341, lng: -117.1446, url: "https://www.google.com/maps/search/?api=1&query=1549%20El%20Prado%20San%20Diego%20CA%2092101" },
    { day: "tuesday", type: "park", name: "Japanese Friendship Garden", note: "2215 Pan American Rd E", lat: 32.7297, lng: -117.1501, url: "https://www.google.com/maps/search/?api=1&query=2215%20Pan%20American%20Rd%20E%20San%20Diego%20CA%2092101" },
    { day: "tuesday", type: "park", name: "Spanish Village", note: "1770 Village Place", lat: 32.7337, lng: -117.1479, url: "https://www.google.com/maps/search/?api=1&query=1770%20Village%20Place%20San%20Diego%20CA%2092101" },
    { day: "tuesday", type: "food", name: "Trader Joe's", note: "1090 University Ave", lat: 32.7488, lng: -117.1548, url: "https://www.google.com/maps/search/?api=1&query=1090%20University%20Ave%20San%20Diego%20CA%2092103" },
    { day: "tuesday", type: "food", name: "Ralphs Fresh Fare", note: "1020 University Ave", lat: 32.7487, lng: -117.1557, url: "https://www.google.com/maps/search/?api=1&query=1020%20University%20Ave%20San%20Diego%20CA%2092103" },
    { day: "tuesday", type: "food", name: "Waterbar", note: "4325 Ocean Blvd", lat: 32.794, lng: -117.2554, url: "https://www.google.com/maps/search/?api=1&query=4325%20Ocean%20Blvd%20San%20Diego%20CA%2092109" },

    { day: "wednesday", type: "food", name: "Better Buzz Hillcrest", note: "801 University Ave", lat: 32.7484, lng: -117.1573, url: "https://www.google.com/maps/search/?api=1&query=801%20University%20Ave%20San%20Diego%20CA%2092103" },
    { day: "wednesday", type: "activity", name: "La Jolla Shores", note: "Beach", lat: 32.8567, lng: -117.2572, url: "https://www.google.com/maps/search/?api=1&query=La%20Jolla%20Shores%20Beach" },

    { day: "thursday", type: "food", name: "Better Buzz Hillcrest", note: "801 University Ave", lat: 32.7484, lng: -117.1573, url: "https://www.google.com/maps/search/?api=1&query=801%20University%20Ave%20San%20Diego%20CA%2092103" },
    { day: "thursday", type: "food", name: "Liberty Public Market", note: "2820 Historic Decatur Rd", lat: 32.7405, lng: -117.2128, url: "https://www.google.com/maps/search/?api=1&query=2820%20Historic%20Decatur%20Rd%20San%20Diego%20CA%2092106" },
    { day: "thursday", type: "food", name: "Tahona", note: "2414 San Diego Ave", lat: 32.7517, lng: -117.1934, url: "https://www.google.com/maps/search/?api=1&query=2414%20San%20Diego%20Ave%20San%20Diego%20CA%2092110" },
    { day: "thursday", type: "event", name: "SOMA", note: "3350 Sports Arena Blvd", lat: 32.7546, lng: -117.2125, url: "https://www.google.com/maps/search/?api=1&query=3350%20Sports%20Arena%20Blvd%20San%20Diego%20CA%2092110" },

    { day: "friday", type: "food", name: "World Famous", note: "711 Pacific Beach Dr", lat: 32.7936, lng: -117.2547, url: "https://www.google.com/maps/search/?api=1&query=711%20Pacific%20Beach%20Dr%20San%20Diego%20CA%2092109" },
    { day: "friday", type: "food", name: "North Park", note: "30th St", lat: 32.7478, lng: -117.1302, url: "https://www.google.com/maps/search/?api=1&query=North%20Park%20San%20Diego" },
    { day: "friday", type: "event", name: "Petco Park", note: "100 Park Blvd", lat: 32.7076, lng: -117.157, url: "https://www.google.com/maps/search/?api=1&query=100%20Park%20Blvd%20San%20Diego%20CA%2092101" },
    { day: "friday", type: "food", name: "Tacos El Gordo", note: "511 F St", lat: 32.7136, lng: -117.1603, url: "https://www.google.com/maps/search/?api=1&query=511%20F%20St%20San%20Diego%20CA%2092101" },

    { day: "saturday", type: "airport", name: "SAN Airport", note: "3225 N Harbor Dr", lat: 32.7338, lng: -117.1933, url: "https://www.google.com/maps/search/?api=1&query=3225%20N%20Harbor%20Dr%20San%20Diego%20CA%2092101" }
  ];

  const colors = {
    airbnb: "#151614",
    park: "#486657",
    activity: "#334f66",
    food: "#8f5145",
    event: "#a36a26",
    airport: "#5b5964"
  };

  function dayFromDate() {
    const start = new Date("2026-08-04T00:00:00-07:00");
    const end = new Date("2026-08-09T00:00:00-07:00");
    const now = new Date();
    if (now < start || now >= end) return "tuesday";
    return days[Math.min(days.length - 1, Math.floor((now - start) / 86400000))];
  }

  function setDay(day, updateHash) {
    const next = days.includes(day) ? day : dayFromDate();

    tabs.forEach((tab) => {
      tab.setAttribute("aria-selected", String(tab.dataset.day === next));
    });

    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.id === next);
    });

    if (updateHash) history.replaceState(null, "", "#" + next);
    ensureDayMap(next);
  }

  function iconFor(pin) {
    const color = colors[pin.type] || colors.airbnb;
    return L.divIcon({
      className: "pin",
      html: `<span style="background:${color}"></span>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    });
  }

  function pinsForDay(day) {
    return [airbnb, ...pins.filter((pin) => pin.day === day)];
  }

  function fitDayMap(day) {
    const entry = dayMaps.get(day);
    if (!entry) return;

    entry.map.invalidateSize();
    entry.map.fitBounds(L.latLngBounds(entry.pins.map((pin) => [pin.lat, pin.lng])), {
      padding: [22, 22],
      maxZoom: day === "saturday" ? 13 : 14
    });
  }

  function ensureDayMap(day) {
    const el = document.querySelector(`[data-map-day="${day}"]`);
    if (!el) return;

    if (dayMaps.has(day)) {
      window.setTimeout(() => fitDayMap(day), 0);
      return;
    }

    if (!window.L) {
      el.textContent = "Map unavailable";
      return;
    }

    const map = L.map(el, {
      attributionControl: false,
      scrollWheelZoom: false,
      zoomControl: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19
    }).addTo(map);

    const dayPins = pinsForDay(day);
    dayPins.forEach((pin) => {
      L.marker([pin.lat, pin.lng], { icon: iconFor(pin) })
        .bindPopup(`<div class="map-popup"><strong>${pin.name}</strong><span>${pin.note}</span><a href="${pin.url}" target="_blank" rel="noopener">Open maps</a></div>`)
        .addTo(map);
    });

    dayMaps.set(day, { map, pins: dayPins });
    window.setTimeout(() => fitDayMap(day), 0);
  }

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      toast.hidden = true;
    }, 1300);
  }

  function readSessionValue(key) {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function writeSessionValue(key, value) {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      // Unlock still works when browser storage is unavailable.
    }
  }

  function revealAccessDetails() {
    document.querySelectorAll("[data-secret]").forEach((el) => {
      const value = accessDetails[el.dataset.secret] || "";
      el.textContent = value;
      if (el.hasAttribute("data-copy")) el.setAttribute("data-copy", value);
    });

    const panel = document.querySelector("[data-access-panel]");
    const grid = document.querySelector("[data-access-grid]");
    if (panel) panel.hidden = true;
    if (grid) grid.hidden = false;
  }

  const accessLock = document.querySelector("[data-access-lock]");
  const accessInput = document.querySelector("[data-access-code]");
  const accessButton = document.querySelector("[data-access-unlock]");
  const accessError = document.querySelector("[data-access-error]");

  function unlockAccess() {
    if (!accessInput) return;
    if (accessInput.value.trim() !== accessCode) {
      if (accessError) accessError.textContent = "Incorrect code";
      accessInput.select();
      return;
    }

    writeSessionValue(accessSessionKey, "true");
    revealAccessDetails();
    showToast("Unlocked");
  }

  if (readSessionValue(accessSessionKey) === "true") {
    revealAccessDetails();
  }

  if (accessLock && accessInput && accessButton) {
    accessButton.addEventListener("click", unlockAccess);
    accessInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        unlockAccess();
      }
    });
    accessInput.addEventListener("input", () => {
      if (accessError) accessError.textContent = "";
      if (accessInput.value.trim() === accessCode) unlockAccess();
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setDay(tab.dataset.day, true));
  });

  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy]");
    if (!button) return;

    event.preventDefault();
    const text = button.getAttribute("data-copy");
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied");
    } catch {
      showToast(text);
    }
  });

  document.querySelectorAll(".checks input[type='checkbox']").forEach((box) => {
    const key = "sd-trip:" + box.id;
    box.checked = localStorage.getItem(key) === "true";
    box.addEventListener("change", () => {
      localStorage.setItem(key, String(box.checked));
    });
  });

  setDay(location.hash.replace("#", ""), false);
})();
