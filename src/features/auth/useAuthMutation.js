import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitAuth } from './auth.api';

export function useAuthMutation(onSubmit) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (credentials) =>
            onSubmit ? onSubmit(credentials) : submitAuth(credentials),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
        },
    });
}
