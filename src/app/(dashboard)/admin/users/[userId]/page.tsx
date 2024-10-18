import React from 'react'
import { UserPermission } from './actions';
import TablePermissionEdit from '@/components/PermissionForm/TablePermissionEdit';

async function page({ params }: { params: { userId: string } }) {
  const { userId } = params
console.log(params,'params');
const data:any = await UserPermission(userId)
console.log(data,'data');

  return (
    <div>
      {/* page */}
      Permission of User
      <TablePermissionEdit arrayofobj={data.permissions} userValue={data} />
    </div>
  )
}

export default page