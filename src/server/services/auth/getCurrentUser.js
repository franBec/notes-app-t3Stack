import { verify } from "./signAndVerify";
import { prisma } from "../../db";

const cookieSecret = process.env.COOKIESECRET;

export async function getCurrentUser_deep(jwt) {}

export async function getCurrentUser_shallow(jwt) {}

export async function getCurrentUser_id(jwt) {
  try {
    const { payload } = await verify(jwt, cookieSecret);
    return { currentUserId: payload, message: "ok" };
  } catch (error) {
    return {
      currentUserId: null,
      message: error.message,
    };
  }
}

export async function getCurrentUser_permissions(jwt) {
  try {
    const { payload } = await verify(jwt, cookieSecret);
    const currentUser = await prisma.user.findUnique({
      where: {
        id: payload,
      },
      include: {
        rols: {
          include: {
            permissions: true,
          },
        },
      },
    });

    var permissionArray = [];
    for (const rol of currentUser.rols) {
      for (const permission of rol.permissions) {
        if (!permissionArray.some((it) => it.id === permission.id)) {
          permissionArray.push(permission.name);
        }
      }
    }

    return { permissions: permissionArray, message: "ok" };
  } catch (error) {
    return {
      permissions: null,
      message: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
}
