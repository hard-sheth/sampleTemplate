'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import useDictionary from '@/locales/dictionary-hook'
import FileInput from '../FileInput/FileInput';
import { User } from '@/utils/User';
import { PermissionCreate } from '@/app/(dashboard)/admin/permission/actions';
import { Image } from 'react-bootstrap';
import 'holderjs';
export default function TablePermissionEdit({ arrayofobj, userValue }: { arrayofobj: Object[], userValue: object }) {
  console.log(arrayofobj, 'permission edit of user', userValue);

  const [permissionList, setPermissionList] = useState([...arrayofobj]);
  const [showPass, setShowPass] = useState(false)
  const { register, control, handleSubmit } = useForm({
    defaultValues: userValue
  });
  const updateCheckbox = (event: React.ChangeEvent<HTMLInputElement>, permissionName: any) => {
    const copyPermissions = permissionList;
    console.log(event.target.name, event.target.checked, permissionName, 'permission');
    const findIndex = permissionList.findIndex((item: any) => item.collectionName === permissionName.collectionName);
    const forDetails = permissionList[findIndex];
    const detailsForPermission = { ...forDetails, [event.target.name]: event.target.checked };
    copyPermissions[findIndex] = detailsForPermission;
    console.log(detailsForPermission, 'detailsForPermission', copyPermissions, 'permissionList');
    setPermissionList([...copyPermissions]);
  };
  const dict = useDictionary()
  const submitPermission = (data: any) => {
    const createNewUser = new User({ ...data, permssion: permissionList });
    const formData = new FormData();
    for (const [key, value] of Object.entries(createNewUser)) {
      if (key === 'profilePicture') {
        formData.append(key, value[0])
      } else {
        formData.append(key, value)
      }
    }
    PermissionCreate(formData)
  }

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6 mb-2">
          <label htmlFor="userName" className="form-label">User Name <span className="text-danger">*</span> </label>
          <input type="text" {...register('username')} id="userName" className="form-control" autoComplete='off' />
        </div>
        <div className="col-12 col-md-6 mb-2">
          <label htmlFor="fullName" className="form-label">Full Name <span className="text-danger">*</span> </label>
          <input type="text" {...register('name')} id="fullName" className="form-control" />
        </div>
        <div className="col-12 col-md-6 mb-2">
          <label htmlFor="userEmail" className="form-label">User Email <span className="text-danger">*</span> </label>
          <input type="email" {...register('email')} id="userEmail" className="form-control" />
        </div>
        <div className="col-12 col-md-6 mb-2">
          <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span> </label>
          <div className="input-group mb-3">
            {showPass && <input type="text" {...register('password', {})} className="form-control" aria-describedby="password-operation" autoComplete='off' />}
            {!showPass && <input type="password" {...register('password', {})} className="form-control" aria-describedby="password-operation" autoComplete='off' />}
            {showPass && <span className="input-group-text" id="password-operation" onClick={() => setShowPass(!showPass)}> <FontAwesomeIcon icon={faEyeSlash} fixedWidth /></span>}
            {!showPass && <span className="input-group-text" id="password-operation" onClick={() => setShowPass(!showPass)}><FontAwesomeIcon icon={faEye} fixedWidth /></span>}
          </div>
        </div>
        <div className="col-12 col-md-6 mb-2">
          <label htmlFor="userRole" className="form-label">User Role <span className="text-danger">*</span> </label>
          <select {...register('role')} className='form-select'>
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
              <Image
                src="holder.js/360x270"
                className='rounded-3'
                />
              <div className="mb-2"></div>
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
          {permissionList.map((item: {
            collectionName: string,
            create: boolean,
            delete: boolean,
            read: boolean,
            update: boolean,
            _id: string
          }) => {
            console.log(item, 'item table');

            return (
              <tr key={item._id} className="align-middle">
                <td>{item.collectionName}</td>
                <td><input type='checkbox' onChange={(event) => updateCheckbox(event, item)} name={"read"}
                  checked={item.read}
                /></td>
                <td><input type='checkbox' onChange={(event) => updateCheckbox(event, item)} name={"create"}
                  checked={item.create}
                /></td>
                <td><input type='checkbox' onChange={(event) => updateCheckbox(event, item)} name={"update"}
                  checked={item.update}
                /></td>
                <td><input type='checkbox' onChange={(event) => updateCheckbox(event, item)} name={"delete"}
                  checked={item.delete}
                /></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="mt-4 text-end">
        <button className="btn btn-primary" onClick={handleSubmit(submitPermission)}> Submit</button>
      </div>
    </>
  )
}


// onChange={updateFor}