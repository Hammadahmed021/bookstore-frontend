import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminMain = () => {
  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Welcome, Admin!</h2>
      <Outlet />
    </div>
  )
}

export default AdminMain
