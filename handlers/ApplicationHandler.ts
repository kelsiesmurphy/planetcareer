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

export const insertApplication = async (supabase:any, application:any, userProfileId:number, job_period_id:number) => { 
    const { data, error } = await supabase
        .from('application')
        .insert([{ 
            job_application_period_id: job_period_id, 
            posting_url: application.Url,
            pay_range: application.PayRange,
            resume: application.Resume.url,
            cover_letter: application.CoverLetter.url,
            role: application.Role,
            applied_date: new Date(),
            closing_date: null,
            further_details: application.FurtherDetails, 
            company_name: application.Company.name,
            company_logo: application.Company.logo,
            stage_id: application.Stage.id,
            user_profile_id: userProfileId
        }])
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
            resume: application.Resume.url,
            cover_letter: application.CoverLetter.url,
            role: application.Role,
            applied_date: new Date(),
            closing_date: null,
            further_details: application.FurtherDetails, 
            company_name: application.Company.name,
            company_logo: application.Company.logo,
            stage_id: application.Stage.id,
            user_profile_id: userProfileId
        }])
        .eq('id', applicationId)
    if (error) {
        throw error;
    }
    return data;
}