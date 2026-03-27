const storageKey = "container-candidate-state";

const defaultState = {
  healthChecks: 0,
  requests: 0,
  latency: 32,
  isPaused: false,
  activity: [
    {
      message: "App initialized and ready for testing.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ],
};

function loadState() {
  try {
    const savedValue = localStorage.getItem(storageKey);

    if (!savedValue) {
      return {
        ...defaultState,
        activity: [...defaultState.activity],
      };
    }

    const parsedValue = JSON.parse(savedValue);

    return {
      ...defaultState,
      ...parsedValue,
      activity: Array.isArray(parsedValue.activity)
        ? parsedValue.activity
        : [...defaultState.activity],
    };
  } catch (error) {
    return {
      ...defaultState,
      activity: [...defaultState.activity],
    };
  }
}

function saveState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (error) {
    return;
  }
}

function getTimestamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function pushActivity(message) {
  state.activity = [{ message, time: getTimestamp() }, ...state.activity].slice(
    0,
    8,
  );
}

function updateStatusText() {
  const status = state.isPaused ? "Paused" : "Healthy";
  const mode = state.isPaused ? "Paused" : "Active";
  const toggleLabel = state.isPaused ? "Resume Service" : "Pause Service";

  heroStatus.textContent = status;
  modeValue.textContent = mode;
  toggleModeButton.textContent = toggleLabel;
  heroStatus.style.color = state.isPaused ? "#8e3718" : "#296341";
}

function renderActivity() {
  activityList.innerHTML = "";

  state.activity.forEach((entry) => {
    const item = document.createElement("li");
    item.className = "activity-item";

    const text = document.createElement("strong");
    text.textContent = entry.message;

    const time = document.createElement("span");
    time.className = "activity-time";
    time.textContent = entry.time;

    item.append(text, time);
    activityList.appendChild(item);
  });
}

function render() {
  healthCheckCount.textContent = state.healthChecks;
  requestCount.textContent = state.requests;
  latencyValue.textContent = `${state.latency} ms`;
  updateStatusText();
  renderActivity();
  saveState();
}

function nextLatencyValue() {
  return Math.floor(20 + Math.random() * 65);
}

const state = loadState();

const heroStatus = document.querySelector("#hero-status");
const healthCheckCount = document.querySelector("#health-check-count");
const requestCount = document.querySelector("#request-count");
const latencyValue = document.querySelector("#latency-value");
const modeValue = document.querySelector("#mode-value");
const activityList = document.querySelector("#activity-list");
const runCheckButton = document.querySelector("#run-check-button");
const simulateTrafficButton = document.querySelector("#simulate-traffic-button");
const toggleModeButton = document.querySelector("#toggle-mode-button");
const resetButton = document.querySelector("#reset-button");

runCheckButton.addEventListener("click", () => {
  state.healthChecks += 1;
  state.latency = nextLatencyValue();
  pushActivity(
    state.isPaused
      ? "Health check completed while service is paused."
      : "Health check passed successfully.",
  );
  render();
});

simulateTrafficButton.addEventListener("click", () => {
  const batchSize = state.isPaused ? 0 : Math.floor(2 + Math.random() * 6);
  state.requests += batchSize;
  state.latency = nextLatencyValue();
  pushActivity(
    state.isPaused
      ? "Traffic request ignored because the service is paused."
      : `Simulated ${batchSize} request${batchSize === 1 ? "" : "s"}.`,
  );
  render();
});

toggleModeButton.addEventListener("click", () => {
  state.isPaused = !state.isPaused;
  pushActivity(
    state.isPaused
      ? "Service paused for maintenance."
      : "Service resumed and accepting traffic.",
  );
  render();
});

resetButton.addEventListener("click", () => {
  state.healthChecks = 0;
  state.requests = 0;
  state.latency = 32;
  state.isPaused = false;
  state.activity = [
    {
      message: "Dashboard reset to its initial state.",
      time: getTimestamp(),
    },
  ];
  render();
});

render();
