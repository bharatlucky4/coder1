(() => {
  const target = new Date('2027-01-01T00:00:00');
  const fields = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };
  const celebration = document.getElementById('celebration');
  const countdown = document.querySelector('.countdown');
  let previous = {};

  function update() {
    const remaining = Math.max(0, target.getTime() - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const values = {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60
    };
    Object.entries(fields).forEach(([key, element]) => {
      const value = key === 'days' ? String(values[key]).padStart(2, '0') : String(values[key]).padStart(2, '0');
      if (previous[key] !== value) {
        element.textContent = value;
        element.classList.remove('tick');
        void element.offsetWidth;
        element.classList.add('tick');
        previous[key] = value;
      }
    });
    const arrived = remaining === 0;
    countdown.hidden = arrived;
    celebration.hidden = !arrived;
    document.title = arrived ? 'Happy New Year! ✦' : `${values.days} days to 2027 — Midnight`;
  }

  update();
  window.setInterval(update, 250);
})();