
import { createCheckinValidation } from "../validation/checkin-validation";
import { prismaClient } from "../application/database";
import { validate } from "../validation/validation";
import { Request, Response } from "express";
import { PrismaClient, StatusCheckin } from "@prisma/client";

const create = async (request: any) => {
    const user = validate(createCheckinValidation, request);
    return prismaClient.checkIn.create({
        data: user,
    });
}

interface CustomResponse extends Response {
    paginatedResult?: any; // Change 'any' to the actual type of your paginated result
  }
const get = async(req: Request, res:CustomResponse)=>{
    const query = req.query;
    const page: number = parseInt(query.page as string, 10) || 1;
    const limit: number = parseInt(query.limit as string, 10) || 5;
  const last_page = req.query.last_page;
  const status: string = req.query.status as string || "UKS";
  const statusCheckinArray: StatusCheckin[] = (status as string).split(',') as StatusCheckin[];

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const result:any = {};
  const totalCount = await prismaClient.checkIn.count({
    where: {
        status: {
          in: statusCheckinArray,
        },
      },
  });
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;
  try {
    if (page < 0) {
      return res.status(400).json("Page value should not be negative");
    } else if (page === 1 && !last_page) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = currentPage;
      result.next = {
        page: page + 1,
        limit: limit,
      };
      result.data = await prismaClient.checkIn.findMany({
        where: {
            status: {
              in: statusCheckinArray,
            },
          },
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.data).length;
      result.range = currentPage * limit;
      return result
    //   return res.status(200).json(result);
    } else if (endIndex < totalCount && !last_page) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = currentPage;
      result.next = {
        page: page + 1,
        limit: limit,
      };
      result.data = await prismaClient.checkIn.findMany({
        where: {
            status: {
              in: statusCheckinArray,
            },
          },
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.data).length;
      result.range = currentPage * limit;
      return result
    //   return res.status(200).json(result);
    } else if (startIndex > 0 && !last_page) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = currentPage;
      result.previous = {
        page: page - 1,
        limit: limit,
      };
      result.data = await prismaClient.checkIn.findMany({
        where: {
            status: {
              in: statusCheckinArray,
            },
          },
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.data).length;
      result.range = currentPage * limit;
      return result
    //   return res.status(200).json(result);
    } else if (last_page === "true" && page === totalPage) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = totalPage;
      result.last = {
        page: totalPage,
        limit: limit,
      };
      result.data = await prismaClient.checkIn.findMany({
        where: {
            status: {
              in: statusCheckinArray,
            },
          },
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.data).length;
      result.range = totalCount;
      return result
    //   return res.status(200).json(result);
    } else {
      return res.status(404).json({ error: "Resource not found" });
    }
  } catch (err) {
    console.error("error", err);
    return res.status(500).json(err);
  }
    // return prismaClient.checkIn.findMany({
    //     select: {
    //         id: true,
    //         name: true,
    //         address: true,
    //         room: true,
    //         grade: true,
    //         complaint: true,
    //         status: true,
    //         created_at:true,
    //         return_at:true
    //     }
    // })
}

export default {
    create,
    get
}
