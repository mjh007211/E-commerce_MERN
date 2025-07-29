import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/orderModel";

interface Registdata {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Logindata {
  email: string;
  password: string;
}

interface GetMyOrders {
  userID: string;
}

const generateJWT = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY || "");
};

export const signUp = async ({
  firstName,
  lastName,
  email,
  password,
}: Registdata) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return { data: "User already exist!", statusCode: 400 };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });

  await newUser.save();

  return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
};

export const login = async ({ email, password }: Logindata) => {
  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return { data: "Incorrect email or passowrd", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (passwordMatch) {
    return {
      data: generateJWT({
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email,
      }),
      statusCode: 200,
    };
  }

  return { data: "Incorrect email or passowrd", statusCode: 400 };
};

export const fetchMyOrders = async ({ userID }: GetMyOrders) => {
  const myOrders = await orderModel.find({ userID });
  if (!myOrders) {
    return { data: "My orders not found", statusCode: 400 };
  }

  return { data: myOrders, statusCode: 200 };
};
