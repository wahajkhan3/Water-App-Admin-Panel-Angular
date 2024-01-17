export interface userSignupError {
    success: boolean
    message: Message
    data: any
  }
  
  export interface Message {
    name: string[]
    email: string[]
    contactNo: string[]
    famContactNo: string[]
    role: string[]
    cnic: string[]
    leaveTypeId: string[]
    designation: string[]
    address: string[]
    schedule: string[]
    joinDate: string[]
    employeeId: string[]

  }
  