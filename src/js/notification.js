export const browserSupportsNotification = () => {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
    return false;
  }
  return true;
};

export const webNotifyMe = () => {
  // Let's check whether notification permissions have already been granted
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    showNotification();
  }
};

export const showNotification = () => {
  const options = {
    body: "You did good. Take a break and come back for another pomodoro.",
    icon: "https://cdn.pixabay.com/photo/2018/01/21/01/46/architecture-3095716_1280.jpg",
    dir: "ltr",
    badge:
      "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    requireInteraction: false, // dialog automaticall disappear or stay
  };

  new Notification("Time's up.", options);
};
