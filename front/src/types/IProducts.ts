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


export interface userInformation {
    token: string;
    userData: {
        address: string;
        email: string;
        id: number;
        name: string;
        phone: string;
        role: string;
        orders:[]
    }
}

export interface IOrder {
    id: number;
    date: Date;
    status: string;
    products: IProducts []
}

