export const createSignUp = async (supabase:any, firstName:string, email:string, password:any) => {
    const result = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
              first_name: firstName,
            },
          },
    });
    return result;
};

export const loginUser = async(supabase:any, email:string, password:string) => {
    const result = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    return result;
}

export const updateUserWithPlunk = async(supabase:any, id:string, plunkId:string) => {
    const result = await supabase
        .from('user_profile')
        .update({ plunk_id: plunkId })
        .eq('id', id)
    return result;
}

export const updateUserApplicationPeriod = async(supabase:any, userId:string, applicationPeriodId:string) => {
    const result = await supabase
        .from('user_profile')
        .update({ current_application_id: applicationPeriodId })
        .eq('id', userId)
        .select('*')
    return result;
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