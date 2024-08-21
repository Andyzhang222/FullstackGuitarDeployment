import { User } from "../models/user.model";

class UserService {
  async createUserIfNotExists(sub: string, email: string): Promise<void> {
    try {
      let user = await User.findOne({ where: { sub } });
      if (!user) {
        await User.create({ sub, email });
      }
    } catch (err) {
      console.error("Error in createUserIfNotExists:", err);
      throw err;
    }
  }
  public async checkEmailExists(email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    return !!user;
  }
}

export { UserService };
