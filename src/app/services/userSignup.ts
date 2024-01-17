export interface userSignup {
    data: {
        "name": string;
        "email": string;
        "password": string;
        "role": string;
        "contactNo": string;
        "famContactNo": string;
        "address": string;
        "image": File;
        "totalLeaves": number;
        "cnic": string;
        "designation": number;
        "schedule": string
    }
}
export interface Root {
    success: boolean
    message: string
    data: userRegister[]
  }
  
  export interface userRegister {
    id: number,
    schedule?: any,
    password: any,
    passwordConfirm: any,
    name: any,
    email: any,
    famContactNo: any,
    totalLeaves: any,
    role: any,
    address: any,
    cnic: any,
    contactNo: any,
    image: any,
    designation: any,
  }