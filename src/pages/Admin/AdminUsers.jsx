import React from 'react'
import UserData from '../../components/Admin/UserData'
import { useFetchAllUsersQuery } from '../../store/features/users/usersApi'
import UsersTable from '../../components/Admin/UserData'

const AdminUsers = () => {
  const { data: users} = useFetchAllUsersQuery()
  return (
    <div>
      <UsersTable data={users} />
    </div>
  )
}

export default AdminUsers
