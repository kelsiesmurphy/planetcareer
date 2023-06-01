export const getApplicationsByPeriod = async (supabase:any, jobApplicationPeriod:any) => {
    const { data, error, status } = await supabase
        .from("application")
        .select("*")
        .eq("job_application_period_id", jobApplicationPeriod.id)
        .select()
        .order('created_at', { ascending: true })
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

export const deleteApplication = async (supabase:any, application:any) => {
    const { data, error } = await supabase
        .from('application')
        .delete()
        .eq('id', application.id)
    if (error) {
        throw error;
    }
    return data;
}

export const insertApplication = async (supabase:any, application:any, userProfileId:number, job_period_id:number) => { 
    const { data, error } = await supabase
        .from('application')
        .insert([{ 
            job_application_period_id: job_period_id, 
            posting_url: application.Url,
            pay_range: application.PayRange,
            resume: application.Resume,
            cover_letter: application.CoverLetter,
            role: application.Role,
            applied_date: application.AppliedDate,
            closing_date: null,
            further_details: application.FurtherDetails, 
            company_name: application.Company.name,
            company_logo: application.Company.logo,
            stage_id: application.Stage.id,
            user_profile_id: userProfileId
        }])
        .select()
    if (error) {
        throw error;
    }
    return data;
}

export const updateApplication = async (supabase:any, applicationId:any, application:any, userProfileId:number, job_period_id:number) => { 
    const { data, error } = await supabase
        .from('application')
        .update([{ 
            job_application_period_id: job_period_id, 
            posting_url: application.Url,
            pay_range: application.PayRange,
            resume: application.Resume,
            cover_letter: application.CoverLetter,
            role: application.Role,
            applied_date: application.AppliedDate,
            closing_date: null,
            further_details: application.FurtherDetails, 
            company_name: application.Company.name,
            company_logo: application.Company.logo,
            stage_id: application.Stage.id,
            user_profile_id: userProfileId
        }])
        .eq('id', applicationId)
        .select()
    if (error) {
        throw error;
    }
    return data;
}


export const downloadDocument = async (supabase:any, userProfileId:string, fileName:string) => { 
    const { data, error } = await supabase
    .storage
    .from('files')
    .download(`${userProfileId}/${fileName}`)

    if (error) {
        throw error;
    }
    return data;
}