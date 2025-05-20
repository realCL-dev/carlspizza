export default async function postContact(name, email, message) {
    const response = await fetch("/api/contact",  {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({name, email, message})
    })

    if(!response.ok) {
        throw new Error("Network response was not ok. Please send help!")
    }

    return response.json()
}