export const createSignUp = async (supabase:any, firstName:string, email:string, password:any) => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
              first_name: firstName,
            },
          },
    });
    if (error) throw error;
    return data;
};

export const loginUser = async(supabase:any, email:string, password:string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) throw error;
    return data;
}

export const signOut = async (supabase:any, router:any) => {
    supabase.auth.signOut().then(() => router.push("/"));
}

export const forgotPassword = async (supabase:any, email:string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/reset-password',
    })
    if (error) throw error;
    return data;
}

export const changePassword = async (supabase:any, new_password:string) => {
    await supabase.auth.updateUser({ password: new_password })
}