async function initZoomApp() {
  const statusEl = document.getElementById("status");
  const userInfoEl = document.getElementById("user-info");
  const notifyBtn = document.getElementById("notify-btn");

  try {
    // Initialize the SDK
    await zoomSdk.config({
      capabilities: ["getMeetingContext", "showNotification"],
    });
    statusEl.textContent = "SDK Initialized!";

    // Get meeting context
    const context = await zoomSdk.getMeetingContext();
    userInfoEl.innerHTML = `
            <p><strong>User Name:</strong> ${context.screenName || "N/A"}</p>
            <p><strong>Meeting ID:</strong> ${context.meetingID || "N/A"}</p>
        `;

    // Enable notification button
    notifyBtn.disabled = false;
    notifyBtn.addEventListener("click", async () => {
      await zoomSdk.showNotification({
        type: "info",
        title: "Hello!",
        message: "Notification from my Zoom App!",
      });
    });
  } catch (error) {
    statusEl.textContent = "Error: " + error.message;
    console.error(error);
  }
}

initZoomApp();
