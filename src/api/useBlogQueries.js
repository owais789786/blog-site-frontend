import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from './axiosInstance';

// Hook 1: Fetch All Posts
export const useGetPosts = (searchQuery = '', page = 1) => {
  return useQuery({
    queryKey: ['posts', searchQuery, page],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/posts?search=${searchQuery}&page=${page}`);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

// Hook 2: Fetch Single Post by Slug
export const useGetPostBySlug = (slug) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/posts/${slug}`);
      return data;
    },
    enabled: !!slug, // Sirf tab run hoga jab slug exist karega
  });
};

// Hook 3: Create New Post Mutation
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPostData) => {
      const { data } = await axiosInstance.post('/posts', newPostData);
      return data;
    },
    onSuccess: () => {
      // Automatic cache invalidate taake feed reload hue bina update ho jaye
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

