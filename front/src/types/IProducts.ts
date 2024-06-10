export interface IProducts {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;

    }

    export interface LoginProps {
        email: string;
        password: string;

    }

    export interface LoginErrorProps {
        email?: string;
        password?: string;

    }

    export interface RegisterProps {
        name: string,
        email: string,
        password: string,
        address: string,
        phone: string,
    
    }

    export interface RegisterErrorProps {
        name?: string,
        email?: string,
        password?: string,
        address?: string,
        phone?: string,
    
    }


    export interface userSession {
        token: string
        userData : {
        name: string,
        email: string,
        password: string,
        address: string,
        phone: string,
        role: string,
        orders: [],
    
    }

}

    
    export interface IOrders {
        id: number,
        status: string,
        date: Date,
        products: IProducts[],

    }

