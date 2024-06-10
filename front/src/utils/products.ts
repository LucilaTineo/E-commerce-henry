import { IProducts} from "@/types/IProducts";
const apiUrl= "http://localhost:3001"


export async function getProducts() {
    try {
        const res= await fetch (`${apiUrl}/products`, {
            method: 'GET',
            next:{revalidate: 3600}
        })

        const products: IProducts[] = await res.json()
        return products;
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export async function getProductById(id:string) {
    try{
        const products = await getProducts();
        const product = products.find((product) => product.id.toString() === id);
        if (!product) throw new Error (`Producto no encontrado`)
            return product;
    }catch (error: any) {
        throw new Error(error)
    }
};