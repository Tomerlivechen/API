interface IAppUserRegister {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  prefix: string;
  first_Name: string;
  last_Name: string;
  pronouns: string;
  imageURL: string;
  permissionlevel: string;
}

const AppUserRegister: IAppUserRegister = {
  email: "",
  userName: "",
  password: "",
  confirmPassword: "",
  prefix: "",
  first_Name: "",
  last_Name: "",
  pronouns: "",
  imageURL: "",
  permissionlevel: "",
};

export { AppUserRegister };
export type { IAppUserRegister };
