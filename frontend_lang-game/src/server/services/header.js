export default function accessHeader() {
    const user = localStorage.getItem("token");
  
    if (user) {
      return (
        {
            headers: {
                Authorization: 'Bearer ' + user ,//the token is a variable which holds the token
            }
        }
        )
    } else {
      return {};
    }
  }