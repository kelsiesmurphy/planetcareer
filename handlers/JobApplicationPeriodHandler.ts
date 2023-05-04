export const createJobApplicationPeriod = async (supabase:any, userProfile:any) => {
    const { data, error, status } = await supabase
        .from("job_application_period")
        .select("*")
        .eq("id", userProfile.current_application_period_id);
    if (error && status !== 406) {
        throw error;
    }
    return data;
};