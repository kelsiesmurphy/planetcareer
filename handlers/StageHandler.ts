export const getAllStages = async(supabase:any) => {
    const { data: stage, error } = await supabase.from("stage").select("*")
    if (error) throw error;
    return stage;
}