import axios from 'axios';


export async function createOrder(products: number[], token: string) {
    try {
        if(!products.length) {
            throw new Error ("No hay productos agregados al pedido")
        } else if (!token) {
            throw new Error ("No token provided")
        }
    const response = await axios.post('http://localhost:3001/orders',
    {
        body: products
    }, {
        headers: {
            Authorization: token,
        }
    })
    return response;
    } catch (error: any) {
        throw new Error (error)
    }
}


export async function getOrders(token:string) {
    try {
        if (!token) {
            throw new Error ("No token provided")
        }
        const response = await axios.get('http://localhost:3001/users/orders',{
            headers: {
                Authorization: token,
            }
        })
        return response.data;
    } catch (error: any) {
        throw new Error (error);
    }
    
}


