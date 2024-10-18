'use server';
import backInstance from "@/utils/instance";

export async function PermissionLists() {
    const apiCall = await backInstance.get('/listOperationPages');
    const response = apiCall.data;
    // console.log(response, 'response');    
    return response.data;
}

export async function PermissionCreate(data:any) {
    const apiCall = await backInstance.post('/users', data);
    const response = apiCall.data;
    // console.log(response, 'response');    
    return response;
}

export async function UsersList(skip = 1, limit = 10) {
    const apiCall = await backInstance.get(`/users?limit=${limit}${skip!=1?`&skip=${+skip -1}`:''}`);
    const response = apiCall.data;
    // console.log(response, 'response');    
    return response.data;
}

