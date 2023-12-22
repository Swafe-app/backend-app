import { Request, Response } from 'express';
import Signalement from '../models/signalement';
import { sendBadRequest, sendError, sendNotFound, sendSuccess, sendUnauthorized } from '../helpers/response';
import { ValidationError } from 'sequelize';

export const createSignalement = async (req: Request, res: Response) => {
  const { coordinates, selectedDangerItems } = req.body;
  const { uid } = res.locals.user;

  if (!coordinates || !selectedDangerItems) return sendBadRequest(res, null, "Invalid data provided");
  if (!uid) return sendBadRequest(res, null, "Invalid uid");

  try {
    const signalement = await Signalement.create({
      userId: uid,
      coordinates,
      selectedDangerItems
    });

    return sendSuccess(res, signalement, "Signalement created successfully");
  } catch (e: any) {
    if (e instanceof ValidationError && e.errors.some((error) => error.path === "selectedDangerItems")) {
      let invalidItems = "";
      e.errors.forEach((error) => {
        if (invalidItems.length > 0) invalidItems += "\n ";
        invalidItems += error.value;
      });
      e.stack = invalidItems ?? e.stack;
      return sendBadRequest(res, e, "Invalid data provided in selectedDangerItems");
    }

    console.log(e);
    return sendError(res, e, "Error while creating signalement");
  }
}

export const getSignalements = async (_req: Request, res: Response) => {
  try {
    const signalements = await Signalement.findAll();

    if (!signalements || signalements.length < 1) return sendNotFound(res, null, "Signalements not found");

    return sendSuccess(res, signalements);
  } catch (e: any) {
    console.log(e);
    return sendError(res, e, "Error while getting signalements");
  }
}

export const getSignalement = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) return sendBadRequest(res, null, "Invalid id");

  try {
    const signalement = await Signalement.findByPk(id);

    if (!signalement) return sendNotFound(res, null, "Signalement not found");

    return sendSuccess(res, signalement);
  } catch (e: any) {
    console.log(e);
    return sendError(res, e, "Error while getting signalement");
  }
}

export const getUserSignalements = async (_req: Request, res: Response) => {
  const { uid } = res.locals.user;

  if (!uid) return sendBadRequest(res, null, "Invalid uid");

  try {
    const signalements = await Signalement.findAll({
      where: { userId: uid }
    });

    if (!signalements || signalements.length === 0) return sendNotFound(res, null, "Signalements not found for this user");

    return sendSuccess(res, signalements);
  } catch (e: any) {
    console.log(e);
    return sendError(res, e, "Error while getting user signalements");
  }
}

export const updateSignalement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { coordinates, selectedDangerItems } = req.body;
  const { uid } = res.locals.user;

  if (!id || isNaN(Number(id))) return sendBadRequest(res, null, "Invalid id");
  if (!coordinates || !selectedDangerItems) return sendBadRequest(res, null, "Invalid data provided");
  if (!uid) return sendBadRequest(res, null, "Invalid uid");

  try {
    const signalement = await Signalement.findByPk(id);

    if (!signalement) return sendNotFound(res, null, "Signalement not found");
    if (signalement.userId !== uid) return sendUnauthorized(res, null, "Unauthorized to modify this signalement");

    await signalement.update({ coordinates, selectedDangerItems });

    return sendSuccess(res, signalement, "Signalement updated successfully");
  } catch (e: any) {
    if (e instanceof ValidationError && e.errors.some((error) => error.path === "selectedDangerItems")) {
      let invalidItems = "";
      e.errors.forEach((error) => {
        if (invalidItems.length > 0) invalidItems += "\n ";
        invalidItems += error.value;
      });
      e.stack = invalidItems ?? e.stack;
      return sendBadRequest(res, e, "Invalid data provided in selectedDangerItems");
    }

    console.log(e);
    return sendError(res, e, "Error while updating signalement");
  }
}

export const deleteSignalement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { uid } = res.locals.user;

  if (!id || isNaN(Number(id))) return sendBadRequest(res, null, "Invalid id");
  if (!uid) return sendBadRequest(res, null, "Invalid uid");

  try {
    const signalement = await Signalement.findByPk(id);

    if (!signalement) return sendNotFound(res, null, "Signalement not found");
    if (signalement.userId !== uid) return sendUnauthorized(res, null, "Unauthorized to delete this signalement");

    await signalement.destroy();

    return sendSuccess(res, { message: "Signalement deleted successfully" });
  } catch (e: any) {
    console.log(e);
    return sendError(res, e, "Error while deleting signalement");
  }
}
