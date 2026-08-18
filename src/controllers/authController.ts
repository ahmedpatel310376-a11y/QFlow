import { Request, Response } from "express";
import { User } from "../models/User";
import { signToken } from "../utils/jwt";

export async function register(req: Request, res: Response): Promise<void> {
  const { name, email, password, role = "user", organizationId } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ success: false, message: "name, email and password are required" });
    return;
  }

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(409).json({ success: false, message: "Email already registered" });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    organizationId
  });

  const token = signToken({
    userId: String(user._id),
    role: user.role
  });

  res.status(201).json({
    success: true,
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  });
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    res.status(401).json({ success: false, message: "Invalid email or password" });
    return;
  }

  const token = signToken({
    userId: String(user._id),
    role: user.role
  });

  res.json({
    success: true,
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  });
}
