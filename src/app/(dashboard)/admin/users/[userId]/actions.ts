'use server';
import backInstance from "@/utils/instance";

export async function UserPermission(data:any) {
    const apiCall = await backInstance.get(`/users/${data}`);
    const response = await apiCall.data;
    console.log(response, 'response user permission');    
    return response.data;
}


