import { Request, Response } from 'express';
import Signalement from '../models/signalement';
import { ValidationError } from 'sequelize';

export const createSignalement = async (req: Request, res: Response) => {
  const { coordinates, selectedDangerItems } = req.body;
  const { uid } = res.locals.user;

  if (!coordinates || !selectedDangerItems) return res.status(400).json({ message: "Invalid data provided" });
  if (!uid) return res.status(400).json({ message: "Invalid uid" });

  try {
    const signalement = await Signalement.create({
      userId: uid,
      coordinates,
      selectedDangerItems
    });

    return res.status(201).json(signalement);
  } catch (e) {
    if (e instanceof ValidationError) {
      const invalidItems = e.errors.map(error => error.value);
      return res.status(400).json({
        error: 'Invalid data provided in selectedDangerItems',
        invalidItems: invalidItems
      });
    }

    console.log(e);
    return res.status(500).json(e);
  }
}

export const getSignalements = async (_req: Request, res: Response) => {
  try {
    const signalements = await Signalement.findAll();

    if (!signalements) {
      return res.status(404).json({ message: "Signalements not found" });
    }

    return res.status(200).json(signalements);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
}

export const getSignalement = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) return res.status(400).json({ message: "Invalid id" });

  try {
    const signalement = await Signalement.findByPk(id);

    if (!signalement) {
      return res.status(404).json({ message: "Signalement not found" });
    }

    return res.status(200).json(signalement);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
}

export const getUserSignalements = async (_req: Request, res: Response) => {
  const { uid } = res.locals.user;

  if (!uid) return res.status(400).json({ message: "Invalid uid" });

  try {
    const signalements = await Signalement.findAll({
      where: { userId: uid }
    });

    if (!signalements || signalements.length === 0) {
      return res.status(404).json({ message: "Signalements not found for this user" });
    }

    return res.status(200).json(signalements);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
}

export const updateSignalement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { coordinates, selectedDangerItems } = req.body;
  const { uid } = res.locals.user;

  if (!id || isNaN(Number(id))) return res.status(400).json({ message: "Invalid id" });
  if (!coordinates || !selectedDangerItems) return res.status(400).json({ message: "Invalid data provided" });
  if (!uid) return res.status(400).json({ message: "Invalid uid" });

  try {
    const signalement = await Signalement.findByPk(id);

    if (!signalement) {
      return res.status(404).json({ message: "Signalement not found" });
    }

    if (signalement.userId !== uid) {
      return res.status(403).json({ message: "Unauthorized to modify this signalement" });
    }

    await signalement.update({ coordinates, selectedDangerItems });

    return res.status(200).json(signalement);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
}

export const deleteSignalement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { uid } = res.locals.user;

  if (!id || isNaN(Number(id))) return res.status(400).json({ message: "Invalid id" });
  if (!uid) return res.status(400).json({ message: "Invalid uid" });

  try {
    const signalement = await Signalement.findByPk(id);

    if (!signalement) {
      return res.status(404).json({ message: "Signalement not found" });
    }

    if (signalement.userId !== uid) {
      return res.status(403).json({ message: "Unauthorized to delete this signalement" });
    }

    await signalement.destroy();

    return res.status(200).json({ message: "Signalement deleted successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
}
