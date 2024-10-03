'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons';
import useDictionary from '@/locales/dictionary-hook'
import FileInput from '../FileInput/FileInput';
export default async function TablePermission({ permission }: { permission: string[] }) {
  const arrayofobj = permission.map((item) => {
    return {
      name: item,
      permission: {
        read: false,
        create: false,
        update: false,
        delete: false,
      }
    }
  });
  const [permissionList, setPermissionList] = useState([...arrayofobj]);
  const [showPass, setShowPass] = useState(false)
  const { register, control, handleSubmit } = useForm();
  const updateCheckbox = (event: React.ChangeEvent<HTMLInputElement>, permissionName: string) => {
    const copyPermissions = permissionList;
    const findIndex = permissionList.findIndex(item => item.name === permissionName);
    const forDetails = permissionList[findIndex];
    const detailsForPermission = { ...forDetails.permission, [event.target.name]: event.target.checked };
    copyPermissions[findIndex] = { ...permissionList[findIndex], permission: { ...detailsForPermission } };
    setPermissionList(copyPermissions);
  };
  const dict = useDictionary()
  console.log(dict.User_Role);
  const submitPermission =(data:any)=>{
    console.log(data, 'data', permissionList);
    
  }

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6 mb-2">
          <label htmlFor="userName" className="form-label">User Name <span className="text-danger">*</span> </label>
          <input type="text" {...register('userName')} id="userName" className="form-control" autoComplete='off' />
        </div>
        <div className="col-12 col-md-6 mb-2">
          <label htmlFor="fullName" className="form-label">Full Name <span className="text-danger">*</span> </label>
          <input type="text" {...register('fullName')} id="fullName" className="form-control" />
        </div>
        <div className="col-12 col-md-6 mb-2">
          <label htmlFor="userEmail" className="form-label">User Email <span className="text-danger">*</span> </label>
          <input type="email" {...register('userEmail')} id="userEmail" className="form-control" />
        </div>
        <div className="col-12 col-md-6 mb-2">
          <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span> </label>
          <div className="input-group mb-3">
            {showPass && <input type="text" {...register('password', {})} className="form-control" aria-describedby="password-operation" autoComplete='off' />}
            {!showPass && <input type="password" {...register('password', {})} className="form-control" aria-describedby="password-operation" autoComplete='off' />}
            {showPass && <span className="input-group-text" id="password-operation" onClick={() => setShowPass(!showPass)}> <FontAwesomeIcon icon={faEye} fixedWidth /></span>}
            {!showPass && <span className="input-group-text" id="password-operation" onClick={() => setShowPass(!showPass)}><FontAwesomeIcon icon={faEye} fixedWidth /></span>}
          </div>
        </div>
        <div className="col-12 col-md-6 mb-2">
          <label htmlFor="userRole" className="form-label">User Role <span className="text-danger">*</span> </label>
          <select {...register('userRole')} className='form-select'>
            {
              dict.User_Role.map((item, index) => {
                return (
                  <option value={item} key={index + 1}>{item}</option>
                )
              })
            }
          </select>
        </div>
        <Controller
          name='profilepic'
          control={control}
          render={({ field, fieldState }) => (
            <>
            <label className='form-label'>Profile Pic</label>
            <FileInput
            field={field}
            fieldState={fieldState}
              item={{
                name: 'profilePic',
                isPreview: true,
                square: false,
                isMulti: true
              }}
            />
            </>
          )}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th >Name </th>
            <th>Read </th>
            <th>Create </th>
            <th>Update </th>
            <th>Delete </th>
          </tr>
        </thead>
        <tbody>
          {permission.map((item: string, index: number) => (
            <tr key={index + 1} className="align-middle">
              <td>{item}</td>
              <td><input type='checkbox' onChange={(event) => updateCheckbox(event, item)} name={"read"} /></td>
              <td><input type='checkbox' onChange={(event) => updateCheckbox(event, item)} name={"create"} /></td>
              <td><input type='checkbox' onChange={(event) => updateCheckbox(event, item)} name={"update"} /></td>
              <td><input type='checkbox' onChange={(event) => updateCheckbox(event, item)} name={"delete"} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-end">
        <button className="btn btn-primary" onClick={handleSubmit(submitPermission)}> Submit</button>
      </div>
    </>
  )
}


// onChange={updateFor}