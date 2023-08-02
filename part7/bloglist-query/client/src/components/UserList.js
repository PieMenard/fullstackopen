import { useQuery} from 'react-query';
import { getUsers } from '../requests';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap'

const UserList = () => {
    const result = useQuery('users', getUsers, {retry:false})

    if ( result.isLoading ) {
        return <div>loading data...</div>
    }

    if ( result.isError) {
        return <div>user display not available due to problems in server</div>
    }

    const users = result.data

  return (
    <div>
      <h2>users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
               <td>
                <Link to={user.id}>{user.name}</Link>
              </td>
              <td>{user.blogs?.length ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList