import type { JWT } from "~/pages/admin/index.vue";

export async function useJWT(token: string): Promise<JWT> {
      const { data, error } = await useFetch("/api/protected/decode", {
        onRequest({ request, options }) {
            options.headers.set("Authorization", token);
        },
      });

      if (error.value) {
        throw new Error(error.value.message);
      }

      return data.value as unknown as JWT;
    
  };
