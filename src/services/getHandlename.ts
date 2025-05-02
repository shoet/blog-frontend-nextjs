import { getAPIPath, handleFailed, handleSuccess } from ".";

type GetHandleNameResponse = {
  handlename: string;
};

export async function getHandlename(
  blogId: number,
  ipaddr: string,
): Promise<GetHandleNameResponse> {
  const query = new URLSearchParams();
  query.append("blogId", blogId.toString());
  return fetch(getAPIPath(`/get_handlename?${query.toString()}`), {
    method: "GET",
    headers: {
      "x-forwarded-for": ipaddr,
    },
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
