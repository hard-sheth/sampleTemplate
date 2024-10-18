"use server";
import backInstance from "@/utils/instance";

export async function PermissionLists() {
  const apiCall = await backInstance.get("/listOperationPages");
  const response = apiCall.data;
  // console.log(response, 'response');
  return response.data;
}

export async function PermissionCreate(data: any) {
  try {
    console.log(data, "data", JSON.stringify(data));

    const apiCall = await backInstance.post("/users", data, {
      headers: {
        "Content-Type": "multipart/form-data", // Set content type for file upload
      },
    });
    const response = apiCall.data;
    console.log(response, "response");
    return response.data;
  } catch (error) {
    throw new Error(`User Not Created.`);
  }
}
