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

export const updateApplicationStage = async (supabase:any, application:any, stage:any) => {
    const { data, error } = await supabase
      .from("application")
      .update({ stage_id: stage.id })
      .eq("id", application.id)
      .select()
    if (error) {
        throw error;
    }
    return data;
}