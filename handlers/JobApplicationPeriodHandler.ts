export const selectJobApplicationPeriod = async (supabase:any, userProfile:any) => {
    const { data, error, status } = await supabase
        .from("job_application_period")
        .select("*")
        .eq("id", userProfile.current_application_period_id);
    if (error && status !== 406) {
        throw error;
    }
    return data;
};

export const updateJobApplicationPeriodEndDate = async (supabase:any, jobApplicationId:string) => {
    const { data, error } = await supabase
        .from("job_application_period")
        .update({ end_date: new Date().toISOString().toLocaleString() })
        .eq('id', jobApplicationId)
    if (error) {
        throw error;
    }
    return data;
};

export const createJobApplicationPeriod = async (supabase:any, userProfile:any) => {
    const { data, error } = await supabase
        .from("job_application_period")
        .insert([
            {user_profile_id: userProfile.id},
        ])
        .select("id")
    if (error) {
        throw error;
    }
    return data;
};