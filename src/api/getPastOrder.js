export default async function getPastOrder(order) {
    await new Promise(resolve => setTimeout(resolve, 5000)) // make the function wait for 5 seconds
    const response = await fetch(`/api/past-order/${order}`)
    const data = await response.json()
    return data
}