import { IProducts } from "@/types/IProducts";
const apiUrl= "http://localhost:3001"

export async function createOrders(products: number[], token: string) {
    try {
        const res= await fetch (`${apiUrl}/orders`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({
                products
            })
        })

        const orders = await res.json()
        return orders;
    } catch (error:any) {
        throw new Error(error.message)
    }
};


export async function getOrder(token: string) {
    try {
        const res= await fetch (`${apiUrl}/users/orders`, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                Authorization: token,
            }
        })

        const orders = await res.json()
        return orders;
    } catch (error:any) {
        throw new Error(error.message)
    }
};