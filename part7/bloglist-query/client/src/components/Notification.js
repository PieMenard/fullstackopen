import { useNotificationValue } from '../NotificationContext'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
    const notification = useNotificationValue()

    if (notification === '') return null
    
    return (
      <Alert key={'success'} variant={'success'}>
        {notification}
      </Alert>
    )
  }
  
  export default Notification