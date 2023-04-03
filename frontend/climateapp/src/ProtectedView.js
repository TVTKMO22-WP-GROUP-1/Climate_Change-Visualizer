import React from 'react'
//This would be the protected view that only logged in users can see
export default function ProtectedView() {
  return (
    <div className="protected">
        <h2>Protected view </h2>
    </div>
  )
}
