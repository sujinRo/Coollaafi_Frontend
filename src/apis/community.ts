import client from './client';

//전체 게시글
export const posts = async (info: any) => {
  const response = await client.get('/posts/', {
    params: {
      memberId: info.memberId,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

//게시글 detail
export const postDetail = async (info: any) => {
  const reponse = await client.get(`/posts/${info.postId}`, {
    params: {
      memberId: info.memberId,
      postId: info.postId,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return reponse.data;
};

//게시글 댓글
export const comment = async (info: any) => {
  const response = await client.post('/comment/', null, {
    params: {
      postId: info.postId,
      memberId: info.memberId,
      content: info.content,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

//게시글 업로드 시, ootd 변경
export const ootd = async (info: any) => {
  const response = await client.post('/ootd/', info.formdata, {
    params: {
      memberId: info.memberId,
      categorySet: info.categorySet,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

//게시글 업로드
export const uploadPosts = async (info: any) => {
  const response = await client.post('/posts', info.formdata, {
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};
