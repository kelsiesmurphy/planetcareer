export const createPlunkContact = async (
    firstName:string,
    email:string, 
    subscribed:boolean, 
    id:string
    ) => {
    const result = await fetch('https://api.useplunk.com/v1/contacts', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.NEXT_PUBLIC_PLUNK_SECRET_KEY,
        },
        body: JSON.stringify({
            "email": email,
            "subscribed": subscribed,
            "data": {
                "project": "PlanetCareer",
                "supabase_id": id,
                "first_name": firstName
            }
        }),
    });
    return result
}

export const triggerPlunkEvent = async (event:string, email:string) => {
    await fetch('https://api.useplunk.com/v1/track', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.NEXT_PUBLIC_PLUNK_SECRET_KEY,
        },
        body: JSON.stringify({
            "event": event,
            "email": email,
        }),
    })
}

export const getPlunkContact = async (id:string) => {
    const data = await fetch(`https://api.useplunk.com/v1/contacts/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.NEXT_PUBLIC_PLUNK_SECRET_KEY,
        },
    });
    return data;
}

export const subscribePlunkContact = async (id:string) => {
    await fetch('https://api.useplunk.com/v1/contacts/subscribe', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.NEXT_PUBLIC_PLUNK_SECRET_KEY,
        },
        body: JSON.stringify({
            "id": id
        }),
    });
}

export const unsubscribePlunkContact = async (id:string) => {
    await fetch('https://api.useplunk.com/v1/contacts/unsubscribe', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.NEXT_PUBLIC_PLUNK_SECRET_KEY,
        },
        body: JSON.stringify({
            "id": id
        }),
    });
}