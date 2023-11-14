const pushNotification = (to_name, message) => {
   Notification.requestPermission().then(perm => {
      const notification = new Notification("Example notification", {
         body: `${to_name} You got a ${message} from AMRUTAM`,
      });

      notification.addEventListener("error", e => {
         alert('error')
      })
   })
};
