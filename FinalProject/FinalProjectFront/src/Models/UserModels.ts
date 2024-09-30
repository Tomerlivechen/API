interface IAppUserDisplay {
  prefix: string;
  first_Name: string;
  last_Name: string;
  userName: string;
  email: string;
  imageURL: string;
  following: boolean;
  pronouns: string;
}

const AppUserDisplay = {
  prefix: "",
  first_Name: "",
  last_Name: "",
  userName: "",
  email: "",
  imageURL: "",
  following: false,
  pronouns: "",
};

export type { IAppUserDisplay };
export { AppUserDisplay };
