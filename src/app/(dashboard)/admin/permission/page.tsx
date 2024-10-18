import TablePermission from "@/components/PermissionForm/TablePermission";
import { PermissionCreate, PermissionLists } from "./actions";

async function page() {
  const permissions = await PermissionLists();
  console.log(process.env.API_BASE_URL, 'api bas url', permissions);
  const submitUser = async(data:any)=>{
    try {
     
      console.log(data, 'usreCreate');
      
    } catch (error) {
      console.error(error,'error');      
    }
  }

  return (
    <div>
      <h3>Permission For Operations</h3>
      <TablePermission permission={permissions} />
    </div>
  )
}

export default page