export const getApplicationsByPeriod = async (supabase:any, jobApplicationPeriod:any) => {
    const { data, error, status } = await supabase
        .from("application")
        .select("*")
        .eq("job_application_period_id", jobApplicationPeriod.id)
        .select();
    if (error && status !== 406) {
        throw error;
    }
    return data;
}