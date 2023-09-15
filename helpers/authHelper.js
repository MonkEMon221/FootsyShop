import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
