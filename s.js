
    let currentLang = "en";

    function handleInput(input) {
      input.classList.toggle("filled", input.value !== "");
    }

    function fixTime(hour, minute) {
      const now = new Date();
      const guessedDate = new Date();
      guessedDate.setHours(hour, minute, 0, 0);
      if (guessedDate < now) guessedDate.setHours(hour + 12, minute);
      return guessedDate;
    }

    function showWakeTime() {
      const input = document.getElementById("sleepTime").value;
      const result = document.getElementById("result");
      const error = document.getElementById("error");
      result.innerHTML = '';
      error.innerHTML = '';
      if (!input) {
        error.innerText = currentLang === "en" ? "Please select your sleep time." : "कृपया अपना सोने का समय चुनें।";
        return;
      }
      let [h, m] = input.split(":").map(Number);  // ✅ FIXED
      const sleepTime = fixTime(h, m);
      const wakeTime = new Date(sleepTime.getTime() + (9 * 60 + 10) * 60000);
      const formatted = wakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      result.innerHTML = currentLang === "en"
        ? `🌞 <strong>Your Wake Up Time:</strong><br>⏰ ${formatted}`
        : `🌞 <strong>आपका जागने का समय:</strong><br>⏰ ${formatted}`;
    }

    function showSleepTime() {
      const input = document.getElementById("wakeTime").value;
      const result = document.getElementById("result");
      const error = document.getElementById("error");
      result.innerHTML = '';
      error.innerHTML = '';
      if (!input) {
        error.innerText = currentLang === "en" ? "Please select your wake-up time." : "कृपया अपना उठने का समय चुनें।";
        return;
      }
      let [h, m] = input.split(":").map(Number);  // ✅ FIXED
      const wakeTime = fixTime(h, m);
      const sleepTime = new Date(wakeTime.getTime() - (9 * 60 + 10) * 60000);
      const formatted = sleepTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      result.innerHTML = currentLang === "en"
        ? `🌙 <strong>You should sleep at:</strong><br>🛏️ ${formatted}`
        : `🌙 <strong>आपको इस समय सोना चाहिए:</strong><br>🛏️ ${formatted}`;
    }

    function toggleTheme() {
      document.body.classList.toggle("light");
    }

    function toggleLang() {
      currentLang = currentLang === "en" ? "hi" : "en";
      document.getElementById("title").innerText = currentLang === "en" ? "🕒 WUTM" : "🕒 उठो समय प्रबंधक";
      document.getElementById("sleepLabel").innerText = currentLang === "en" ? "Select your sleep time" : "अपना सोने का समय चुनें";
      document.getElementById("wakeLabel").innerText = currentLang === "en" ? "Select your wake-up time" : "अपना जागने का समय चुनें";
      document.getElementById("calcBtn").innerText = currentLang === "en" ? "Check/Calculate Your Wake Up Time" : "अपना जागने का समय जांचें/गणना करें";
      document.getElementById("revBtn").innerText = currentLang === "en" ? "Calculate/Check Your Sleep Time" : "अपना सोने का समय जांचें/गणना करें";
      document.getElementById("langBtn").innerText = currentLang === "en" ? "हिंदी" : "English";
      document.getElementById("langStatus").innerText = currentLang === "en" ? "You selected English" : "आपने हिंदी चुनी है";
      document.getElementById("sleepNote").innerText = currentLang === "en" ? "For Check Your Sleep Time Click Here 👇" : "अपना सोने का समय जांचने के लिए यहां क्लिक करें 👇";
      document.getElementById("a08293").innerText = currentLang === "en" ? "🧹 Clear" : "साफ करें 🧹";
      document.getElementById("wakeNote").innerText = currentLang === "en" ? "For Check Your Wake Up Time Click Here 👇" : "अपना जागने का समय जांचने के लिए यहां क्लिक करें 👇";
      if (document.getElementById("result").innerHTML) {
        if (document.getElementById("sleepTime").value) showWakeTime();
        else if (document.getElementById("wakeTime").value) showSleepTime();
      }
    }

    function clearInputs() {
      document.getElementById("sleepTime").value = "";
      document.getElementById("wakeTime").value = "";
      document.getElementById("result").innerHTML = "";
      document.getElementById("error").innerHTML = "";
      handleInput(document.getElementById("sleepTime"));
      handleInput(document.getElementById("wakeTime"));
    }
