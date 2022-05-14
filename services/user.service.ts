import db from "../models/db";

export const createUser = async (user: any) => {
  return await db.user.create({ data: user });
};

export const getUser = async (userId: number) => {
  return await db.user.findUnique({ where: { id: userId } });
};

export const updateUser = async (user: any, userData: any) => {
  return; //await prisma.user.update({where: user, data: userData});
};

export const deleteUser = async (user: any) => {
  return; //await prisma.user.delete({where: user});
};
