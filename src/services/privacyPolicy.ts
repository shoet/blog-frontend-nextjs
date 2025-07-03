import { PrivacyPolicy } from '@/types/api';
import { getAPIPath, handleFailed, handleSuccess } from '.';
import { getServerSideCookie } from '@/utils/cookie';

export async function getPrivacyPolicy(id: string): Promise<PrivacyPolicy> {
  return fetch(getAPIPath(`/privacy_policy/${id}`), { method: 'GET' })
    .then(handleSuccess)
    .catch(handleFailed);
}

export async function editPrivacyPolicy(
  id: string,
  content: string
): Promise<PrivacyPolicy> {
  const token = (await getServerSideCookie('authToken'))?.value;
  if (!token) {
    throw new Error('ログインしてください');
  }
  return fetch(getAPIPath(`/privacy_policy/${id}`), {
    method: 'PUT',
    body: JSON.stringify({ content: content }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleSuccess)
    .catch(handleFailed);
}

export async function deletePrivacyPolicy(id: string): Promise<PrivacyPolicy> {
  const token = (await getServerSideCookie('authToken'))?.value;
  if (!token) {
    throw new Error('ログインしてください');
  }
  return fetch(getAPIPath(`/privacy_policy/${id}`), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
