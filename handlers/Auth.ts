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