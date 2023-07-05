import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
    const notification = useNotificationValue()

    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    if (notification === '') return null
    
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  
  export default Notification