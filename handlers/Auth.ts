import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

class AuthHandler {
    const supabase = useSupabaseClient();
    
    createSignUp = async (email:string, password:any) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (error) throw error;
        return data;
    };
}

export default AuthHandler;
  