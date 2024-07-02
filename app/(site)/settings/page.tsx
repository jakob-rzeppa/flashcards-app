import React from 'react'

function SettingsPage() {
  return (
    <div className='flex flex-col m-8 max-w-96 mx-auto gap-4'>
        <input type="email" placeholder='email' className='input input-primary' />
        <input type="email" placeholder='username' className='input input-primary' />
        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">Public Library</span>
                <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
            </label>
        </div>
        <button className='btn btn-primary'>Save</button>
    </div>
  )
}

export default SettingsPage